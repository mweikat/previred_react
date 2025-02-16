
import { inputProps } from "./interfaceInput";

export const InputGeneder = (props:inputProps) => {

  let requiredField:boolean = false;

  if(props.required)
    requiredField=true;

  return (
      <>
        <input className={(props.newClass?props.newClass:"input-radio")+(props.error?' error':'')} type="radio" value="masculino" id="masculino"
        {...props.register(props.name,
          {
            required:{
              value: requiredField, 
              message:"Este campo es requerido."
            },
           
          })
        }/>
        <label className="label-text-radio pe-3" htmlFor="masculino">Masculino</label>
        <input className={(props.newClass?props.newClass:"input-radio")+(props.error?' error':'')} type="radio" value="femenino" id="femenino"
        {...props.register(props.name,
          {
            required:{
              value: requiredField, 
              message:"Este campo es requerido."
            },
          })
        }/>
        <label className="label-text-radio" htmlFor="femenino">Femenino</label>
        {
           props.error && <div className='mt-1 text-error'>{props.error}</div>
        }
      </>
  )
}