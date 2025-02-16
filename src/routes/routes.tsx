import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { UserList } from "../users/userList/userList";
import { UserForm } from "../users/userForm/userForm";


const router = createBrowserRouter([

    {
        path:"/",
        element:<UserList/>,
    },
    {
      path:"/user/edit/:id",
      element:<UserForm/>,
    },
    {
      path:"/user/new",
      element:<UserForm/>,
    },
    
]);

export const Routes = () =>{
    return (<RouterProvider router={router}/>)
}
