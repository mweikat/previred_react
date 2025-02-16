import { useEffect, useState } from "react";
import { UserLayout } from "../userLayout";
import UserService from "../../services/userService";
import UserModel from "../../models/userModel";
import { UserTable } from "./UserTable";
import { ErrorMsg } from "../../commons/msg/errorMsg";
import { Link } from "react-router-dom";
import './userList.css';
import { SearchInput } from "../../commons/searchInput/searchInput";


export const  UserList = () => {

    const [users,setUsers] = useState<UserModel[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserModel[]>([]); 
    const [showModal, setShowModal] = useState(false); 
    const [userToDelete, setUserToDelete] = useState({} as UserModel);
    const [errorMessage,setErrorMessage] = useState("");

    useEffect( () => {

         (async () => {
            if(users.length==0){
                //console.log('lista usuarios');
                const data = await UserService.getAllUsers();
                setUsers(data);
                setFilteredUsers(data);
            }
        })();

    },[]);

    const deleteUserImpl = async () =>{

        //console.log('elimina usuario: ', userToDelete);
        await UserService.deleteUser(userToDelete.id).then(()=>{
            setUsers(users.filter(user => user.id !== userToDelete.id));
            setFilteredUsers(filteredUsers.filter(user => user.id !== userToDelete.id)); 
            setErrorMessage("");
            setShowModal(false);
        }).catch((err: any)=>{
            //console.log("error: ",err.response.data.message);
            setErrorMessage(err.response.data.message);
            setShowModal(false);
        });
    }

    const deleteUser = async (userToDelete: UserModel) => {
        setUserToDelete(userToDelete);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false); // Oculta el modal
        setUserToDelete({} as UserModel); // Limpia el usuario a eliminar
    };

    const handleSearch = (searchText: string) => {
        if (searchText.length >= 3) {
            const filtered = users.filter(user =>
                (user.name?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
                (user.last_name?.toLowerCase() || "").includes(searchText.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users); // Si no hay texto de búsqueda, muestra todos los usuarios
        }
    };


    return (
      <UserLayout>
          <div>
            <div className="text-center mb-4">
                <h4>Lista de Usuario</h4>
            </div>
            <div className="row mb-4">
                <div className="col-8">
                    <SearchInput onSearch={handleSearch} />
                </div>
                <div className="col-4 text-end">
                    <Link to={`/user/new`}>
                        <button className="btn btn-success"><i className="bi bi-person-add"></i> Nuevo</button>
                    </Link>
                </div>
                
            </div>
            <ErrorMsg error={errorMessage}></ErrorMsg>
            <UserTable users={filteredUsers} deleteUser={deleteUser}/>

            {showModal && (
                    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"><i className="bi bi-exclamation-circle"></i> Confirmación Eiminar</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p><b>Se eliminará el registro:</b></p>
                                <p className="text-center text-success">
                                    {userToDelete.rut}-{userToDelete.dv} {userToDelete.name} {userToDelete.last_name}
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-danger" onClick={deleteUserImpl}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
          </div>

      </UserLayout>
    );
  }
  