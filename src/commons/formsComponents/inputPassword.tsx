
import { useState } from "react";
import { inputProps } from "./interfaceInput";

export const InputPasword = (props:inputProps) => {

  let requiredField:boolean = false;
  const [typeInput,setTypeInput] = useState("password");
  
  const handleClick = () => {

    if(typeInput=='password')
      setTypeInput("text");
    else
      setTypeInput("password");
  }

  if(props.required)
    requiredField=true;

  return (<>
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
  </>
  )
}