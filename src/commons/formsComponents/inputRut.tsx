import { ChangeEvent, useEffect, useState } from "react";
import { inputProps } from "./interfaceInput";

export const InputRut = (props:inputProps) => {

  const [valueRut,setValueRut] = useState<string|number|readonly string[]|undefined>(props.value);

  const formatRut = (value:any) => {

      
      if(value!=undefined && value!=null && value!=""){

          const aux = (value).replaceAll(".","").replace("-","").replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
          setValueRut(aux);

      }
  }

  const Fn = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut : function (rutCompleto:string) {
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
        return false;
      const tmp 	= rutCompleto.split('-');
      const rut 	= tmp[0];
      let digv	= tmp[1]; 
      if ( digv == 'K' ) digv = 'k' ;
      return (Fn.dv(+rut) == digv );
    },
    dv : function(T:number){
      let M=0,S=1;
      for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
      return S?S-1:'k';
    }
  }

  const isEven = async (valueRut: string) => {

    
    let rutSinPuntos = valueRut.replace(/\./g, '');
    
    if(!rutSinPuntos.includes("-")){

      const parteInicial = rutSinPuntos.slice(0, -1); // Todo excepto el último carácter
      const ultimoCaracter = rutSinPuntos.slice(-1); // Último carácter
      rutSinPuntos = `${parteInicial}-${ultimoCaracter}`;

    }
    return Fn.validaRut(rutSinPuntos) || "Ingresa un rut válido";
        
  };

  const inputChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValueRut(event.target.value);
    
  }

  useEffect(() => {
    formatRut(props.value);
  }, [props.value]);
  
   return (<>

    <input
          id={props.id}
          type="text"
          className={(props.newClass?props.newClass:"form-control")+(props.error?' error':'')}
          placeholder={props.placeholder}
          maxLength={15}
          readOnly={props.readonly}
          value={valueRut}
          
          {...props.register(props.name,
            {
              required:{
                value: true, 
                message:"Este campo es requerido."
              },
              validate: (event)=>isEven(event),
              onChange:(event)=>{inputChangedHandler(event);},
              onBlur:(event)=>formatRut(event.target.value)
             
            })
          }
        
        />
    
    
        {
           props.error && <div className='mt-1 error-msg'>{props.error}</div>
        }
  </>)
}