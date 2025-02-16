
import { inputProps } from "./interfaceInput";

export const InputNumber = (props:inputProps) => {

  let requiredField:boolean = false;
  let minLength:number = 0;
  let maxLength:number = 1000;

  //console.log('minLength ', props.minlength);

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
          className={(props.newClass?props.newClass:"form-control")+(props.error?' error':'')}
          placeholder={props.placeholder}
          maxLength={maxLength}
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
              /*validate: {
                always: (value) =>
                  value === 1 || "This should almost always trigger"
              },*/
            })
          }
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
           {props.error && <div className='mt-1 text-error'>{props.error}</div>
        }
      </>
  )
}