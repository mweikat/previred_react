import { useEffect, useState } from "react"

interface SuccessProps{
    msg: string;
}

export const SuccessMsg = ({msg}:SuccessProps) =>{

    const [authMsg,setAuthMsg] = useState('');
    
    useEffect(()=>{
        setAuthMsg(msg);
    },[msg])
    

    return (<>
        {authMsg!=""?<div className="alert alert-success">{authMsg}</div>:""}
        </>
        );
    
};