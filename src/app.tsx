import { useEffect, useState } from 'react';
import Loader from "./commons/loader/loader";
import { Routes } from './routes/routes';


function App() {

  const [loading, setloading] = useState(false);

  useEffect(()=>{
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);

  },[])

  return (<>
    {loading?<Loader/>:<Routes/>}
    </>
  )
}

export default App
