
import { useState } from "react";
import { inputProps } from "./interfaceInput";

export const InputPaswordLogin = (props:inputProps) => {

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
      {...props.register(props.name,
        {
          required:{
            value: requiredField, 
            message:"Este campo es requerido."
          }         
        })
      }
    />
    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleClick}>
    {typeInput=="text" ? <i className="bi bi-eye-fill"></i>:<i className="bi bi-eye-slash-fill"></i>}
    </button>
   
  </div>
   {
    props.error && <div className='mt-1 error-msg'>{props.error}</div>
  }
  </>
  )
}