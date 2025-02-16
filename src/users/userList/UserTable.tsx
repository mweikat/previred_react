import { Link } from "react-router-dom";
import UserModel from "../../models/userModel";

interface UserTableProps {
    users: UserModel[],
    deleteUser: (user: UserModel) => void
}

export const UserTable: React.FC<UserTableProps> = ({users,deleteUser}:UserTableProps) => {

    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              
              <th>Nombre</th>
              <th>Apellido</th>
              <th>RUT</th>
              <th>DV</th>
              <th>Fecha de Nacimiento</th>
              <th>Email</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td><Link to={`/user/edit/${user.id}`} className="text-primary">{user.name}</Link></td>
                <td>{user.last_name}</td>
                <td>{user.rut}</td>
                <td>{user.dv}</td>
                <td>{new Date(user.birth_date).toLocaleDateString()}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/user/edit/${user.id}`} className="text-primary"><button className="btn btn-warning"><i className="bi bi-pencil-square"></i></button></Link>&nbsp;
                  <button className="btn btn-danger" onClick={() => deleteUser(user)}><i className="bi bi-trash"></i></button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
