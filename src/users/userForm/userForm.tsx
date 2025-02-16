import { useParams } from "react-router-dom";
import UserLayout from "../userLayout";
import { useEffect, useState } from "react";
import UserModel from "../../models/userModel";
import UserService from "../../services/userService";
import { InputEmail, InputGeneric, InputPasword, InputPaswordConfirm } from "../../commons/formsComponents";
import { useForm } from "react-hook-form";
import { InputRut } from "../../commons/formsComponents/inputRut";
import { InputDate } from "../../commons/formsComponents/inputDate";
import BackButton from "../../commons/formsComponents/backButton";
import { ErrorMsg } from "../../commons/msg/errorMsg";
import { SuccessMsg } from "../../commons/msg/successMsg";

export const UserForm = () => {

    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserModel>({} as UserModel);

    const [isNew, setIsNew] = useState<boolean>(false);
    const [title, setTitle] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [okMessage,setOkMessage] = useState("");
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();


    useEffect(() => {

        const fetchUser = async () => {
            try {
                    let data = await UserService.getUserById(id!);
                    setUser(data);
                    setIsNew(false);
                    setTitle("Editar Usuario");
                    // valores iniciales del formulario
                    reset({
                        rut: (data.rut ?? "") + (data.dv ?? ""),
                        name: data.name ?? "",
                        lastName: data.last_name ?? "",
                        email: data.email ?? "",
                        password: data.password ?? "",
                        confirm: data.password ?? "",
                        birthDate: data.birth_date ?? "",
                    });            
                
            } catch (error: any) {
                setErrorMessage(error.response.data.message);
            }
        };

        if (id) fetchUser();
    }, [id, reset]);

    useEffect(()=>{

        if(!id){
            setIsNew(true);
            setTitle("Nuevo Usuario");
        }
    },[id]);

    const updateUserField = (field: keyof UserModel, value: string) => {
        // Actualizar el estado user
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));

        // Actualizar el valor en react-hook-form
        setValue(field, value);
    };

    const handleOnChageName:any = (e:any) =>{
        updateUserField("name", e.target.value);
    }
    const handleOnChageLastName:any = (e:any) =>{
        updateUserField("last_name", e.target.value);
    }
    const handleOnChageEmail:any = (e:any) =>{
        updateUserField("email", e.target.value);
    }
    const handleOnChageBirth:any = (e:any) =>{
        updateUserField("birth_date", e.target.value);
    }
    
    const onSubmit = handleSubmit((data) => {
       
         const user = {} as UserModel;

        user.id = id?id:"";
        user.name = data.name;
        user.last_name = data.lastName;
        user.email = data.email;
        user.password = data.password;
        user.birth_date = data.birthDate;

        let rutSinPuntos = data.rut.replace(/\./g, '');
        rutSinPuntos = rutSinPuntos.replace(/\-/g, '');

        const parteInicial = rutSinPuntos.slice(0, -1); // Todo excepto el último carácter
        const ultimoCaracter = rutSinPuntos.slice(-1); // Último carácter
        user.rut = parteInicial;
        user.dv = ultimoCaracter;

        if(isNew){

            UserService.createUser(user).then((response: unknown) => {
          
                setOkMessage("Usuario Creado");
                setErrorMessage("");
            })
            .catch((error: any) => {
                
                setOkMessage("");
                setErrorMessage(error.response.data.message);
            
            });

        }else{

            UserService.updateUser(user).then((response: unknown) => {
          
                setOkMessage("Datos Actualizados");
                setErrorMessage("");
            })
            .catch((error: any) => {
                
                setOkMessage("");
                setErrorMessage(error.response.data.message);
            
            });
        }

        
    });

    return (
        <UserLayout>
            <div className="row justify-content-center">
                <div className="text-center">
                    <h4>{title}</h4>
                </div>
                <ErrorMsg error={errorMessage} />
                <SuccessMsg msg={okMessage}/>
                <div className="col-md-4">
                    <div className="card">
                        <form onSubmit={onSubmit}>
                            <div className="card-body">
                                <div className="mb-3">
                                    <InputRut name="rut" register={register} required={true} error={errors.rut?.message?.toString()} placeholder='Rut' readonly={false} value={(user?.rut ?? "") + (user?.dv ?? "")} />
                                </div>
                                <div className="mb-3">
                                    <InputGeneric name="name" register={register} error={errors.name?.message?.toString()} maxlength={20} placeholder="Nombre" value={user?.name ?? ""} required={true} onchangeFunc={handleOnChageName}/>
                                </div>
                                <div className="mb-3">
                                    <InputGeneric name="lastName" register={register} error={errors.lastName?.message?.toString()} maxlength={20} placeholder="Apellido" value={user?.last_name ?? ""} required={false} onchangeFunc={handleOnChageLastName}/>
                                </div>
                                <div className="mb-3">
                                    <InputEmail name="email" register={register} required={true} error={errors.email?.message?.toString()} placeholder='Correo electrónico' readonly={false} value={user?.email ?? ""} onchangeFunc={handleOnChageEmail}/>
                                </div>
                                <div className="mb-3">
                                    <InputPasword name="password" register={register} required={isNew} error={errors.password?.message?.toString()} placeholder='Ingrese su contraseña' minlength={6} maxlength={12}/>
                                </div>
                                <div className="mb-3">
                                    <InputPaswordConfirm name="confirm" register={register} required={isNew} error={errors.confirm?.message?.toString()} placeholder="Repita su contraseña" stringData={watch("password")} minlength={6} maxlength={12} />
                                </div>
                                <div className="mb-3">
                                    <InputDate name="birthDate" register={register} error={errors.birthDate?.message?.toString()} placeholder='Fecha Nacimiento'  value={user.birth_date ?? ""} id={'birth'} onchangeFunc={handleOnChageBirth}/>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <BackButton />
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};