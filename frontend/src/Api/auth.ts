import axios from "./axios";

// Definir la interfaz correctamente
export interface UserLogin {
  email: string;
  password: string;
}

// Usar la interfaz como tipo en el parámetro
export const login = async (user: UserLogin) => {
  return await axios.post("/user/login", user).catch((err) => {
    // console.log(err);
    throw err;
  });
};
