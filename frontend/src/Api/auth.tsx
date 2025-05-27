/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios";

// Definir la interfaz correctamente
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
}

// Usar la interfaz como tipo en el parámetro
export const login = async (user: UserLogin) => {
  return await axios.post("/user/login", user).catch((err) => {
    // console.log(err);
    throw err;
  });
};

export const register = async (user : FormData ) => {
  return await axios.post("/user/RegisterUser", user, { 
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  .then((res) => {
    // console.log(res);
    return res
  })
  .catch((err) => {
    // console.log(err);
    throw err;
  })
}

export const logout = async () => {
  return await axios
    .post("/user/logout")
    .then((res) => {
      // console.log(res);
      return res
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};
