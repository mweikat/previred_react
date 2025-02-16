
import { useEffect, useState } from "react";
import { inputProps } from "./interfaceInput";

export const InputPaswordConfirm = (props:inputProps) => {

  let requiredField:boolean = false;
  const [typeInput,setTypeInput] = useState("password");
  
  const [pwdLength,setPwdLength] = useState(false);
  const [pwdDigit,setPwdDigit] = useState(false);
  const [pwdMinus,setPwdMinus] = useState(false);
  const [pwdMayus,setPwdMayus] = useState(false);
  
  

  useEffect(() =>{
      
      if(props.stringData!=undefined){
        
        if(props.stringData.length>=6&&props.stringData.length<=12)
          setPwdLength(true);
        else
          setPwdLength(false);

        if(props.stringData.match(/\d+/g))
          setPwdDigit(true);
        else
          setPwdDigit(false);

        if(props.stringData.match(/[a-z]/g))
          setPwdMinus(true);
        else
          setPwdMinus(false);

        if(props.stringData.match(/[A-Z]/g))
          setPwdMayus(true);
        else
          setPwdMayus(false);
      }

    },[props.stringData]);

  //console.log(props.stringData);

  const handleClick = () => {

    if(typeInput=='password')
      setTypeInput("text");
    else
      setTypeInput("password");
  }

  if(props.required)
    requiredField=true;

  return (
    <>
    <div className="input-group">
    <input
      id={props.id}
      type={typeInput}
      className="form-control"
      placeholder={props.placeholder}
      minLength={props.minlength}
      maxLength={props.maxlength}
      {...props.register(props.name,
        {
          required:{
            value: requiredField, 
            message:"Este campo es requerido."
          },
          minLength:{
            value: 6,
            message:"El largo no debe ser menor a 6 caracteres."
          },
          maxLength:{
            value:12,
            message:"El largo no debe ser mayor a 12 caracteres."
          },
          pattern:{
            value:/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,12}$/,
            message:"La contraseña no cumple con el formato requerido."
          },
          validate:(value) => {
            
            if(value==props.stringData)
                return true;
            return "Las contraseñas no coinciden";
          }
        })
      }
    />
      <button className="btn btn-outline-secondary" type="button" onClick={handleClick}>
        {typeInput=="text" ? <i className="bi bi-eye-fill"></i>:<i className="bi bi-eye-slash-fill"></i>}
      </button>
    </div>
    {
      props.error && <div className='mt-1 error-msg'>{props.error}</div>
    }
    <div className="mt-4 alert alert-warning small" role="alert">
        
            <ul className="no-bullets">
                <li>{pwdLength?<i className="bi bi-check-circle-fill"></i>:<i className="bi bi-exclamation-circle"></i>} La contraseña debe tener al entre 6 y 12 caracteres.</li>
                <li>{pwdDigit?<i className="bi bi-check-circle-fill"></i>:<i className="bi bi-exclamation-circle"></i>} Al menos un dígito.</li>
                <li>{pwdMinus?<i className="bi bi-check-circle-fill"></i>:<i className="bi bi-exclamation-circle"></i>} Al menos una minúscula.</li>
                <li>{pwdMayus?<i className="bi bi-check-circle-fill"></i>:<i className="bi bi-exclamation-circle"></i>} Al menos una mayúscula.</li>
                {/*<li>NO puede tener otros símbolos.</li>*/}
            </ul>
        
        
    </div>
  </>
  )
}