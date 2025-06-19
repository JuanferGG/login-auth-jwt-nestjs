import axios from './axios'

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    image: string;
    createdAt: string; // o Date, si lo parseas
    updatedAt: string; // o Date
    __v: number;
  }

export const getUsers = async () => {
    return await axios
      .get('/user/getUsers')
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      })
}