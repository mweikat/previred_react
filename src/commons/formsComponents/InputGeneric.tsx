
import { inputProps } from "./interfaceInput";

export const InputGeneric = (props:inputProps) => {

  let requiredField:boolean = false;
  let minLength:number = 0;
  let maxLength:number = import.meta.env.VITE_MAX_LENGTH_FIELD;

  if(props.required)
    requiredField=true;

  if(props.minlength!=0 && props.minlength!= undefined)
    minLength = props.minlength;

  if(props.maxlength!= undefined)
    maxLength = props.maxlength;

  return (
      <>
        <input
          id={props.id}
          type="text"
          className="form-control"
          placeholder={props.placeholder}
          maxLength={props.maxlength}
          readOnly={props.readonly}
          value={props.value}
          {...props.register(props.name,
            {
              required:{
                value: requiredField, 
                message:"Este campo es requerido."
              },
              minLength:{
                value: minLength,
                message:`El largo no debe ser menor a ${minLength} caracteres.`
              },
              maxLength:{
                value:maxLength,
                message:`El largo no debe ser mayor a ${maxLength} caracteres.`
              },
            })
          }
          onChange={props.onchangeFunc}
        />
        {
           props.error && <div className='mt-1 error-msg'>{props.error}</div>
        }
      </>
  )
}