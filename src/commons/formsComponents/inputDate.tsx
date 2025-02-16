
import { inputProps } from "./interfaceInput";

export const InputDate = (props:inputProps) => {

  let requiredField:boolean = false;
 
  if(props.required)
    requiredField=true;

  return (
      <>
        {<input
          id={props.id}
          type="date"
          className={(props.newClass?props.newClass:"form-control")+(props.error?' error':'')}
          placeholder={props.placeholder}
          readOnly={props.readonly}
          value={props.value}
          //required={props.required}
          {...props.register(props.name,
            {
              required:{
                value: requiredField, 
                message:"Este campo es requerido."
              },
            })
          }
          /*onChange={(e) => {
            console.log('entra', e.target.value);
          }}*/
         onChange={props.onchangeFunc}
            
        />}
        {
           props.error && <div className='mt-1 text-error'>{props.error}</div>
        }
      </>
  )
}