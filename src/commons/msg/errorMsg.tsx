import { useEffect, useState } from "react"

interface ErrorProps{
    error: string;
}

export const ErrorMsg = ({error}:ErrorProps) =>{

    const [authError,setAuthError] = useState('');
    
    useEffect(()=>{
        setAuthError(error);
    },[error])
    

    return (<>
        {authError!=""?<div className="alert alert-danger" role="alert">{authError}</div>:""}
        </>
        );
    
};