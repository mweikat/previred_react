import http from '../commons/axios/publicAxios'
import UserModel from "../models/userModel";

class UserService {

    version = import.meta.env.VITE_API_V1;

    async getUserInfo(){

        const user = await http.get<UserModel>(`${this.version}/user`).then((response) => {
            return response.data;
        });
    
        return user;
    }

    async getAllUsers(){

        const users = await http.get<UserModel[]>(`${this.version}/users`).then((response) => {
            return response.data;
        });

        return users;

    }

    async deleteUser(userId:String){
        await http.delete<void>(`${this.version}/user/${userId}`).then(() => {
            //console.log("elimina: ", response.data);
        });
    }

    async getUserById(userId:String){

        const user = await http.get<UserModel>(`${this.version}/user/${userId}`).then((response) => {
            return response.data;
        });
    
        return user;
    }

    async updateUser(user:UserModel){

        await http.put<UserModel>(`${this.version}/user/${user.id}`,user);
    }

    async createUser(user:UserModel){

        await http.post<UserModel>(`${this.version}/user`,user);
    }

}

export default new UserService();