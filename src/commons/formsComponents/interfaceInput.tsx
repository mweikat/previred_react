import { FieldValues, UseFormRegister } from "react-hook-form";

export interface inputProps{
    id?:string,
    placeholder?:string,
    required?:boolean,
    name:string,
    register: UseFormRegister<FieldValues>,
    error?: string,
    maxlength?:number,
    minlength?:number
    stringData?:string,
    readonly?:boolean,
    value?:string | number | readonly string[] | undefined
    newClass?:string
    onchangeFunc?:(e:any)=>{}
}