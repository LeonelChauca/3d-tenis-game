import { useState } from "react";
import axios from "axios";

axios.create({
  baseURL: "http://localhost:8080",
});

function useLogin() {
  const [loadingGet, setLoadinGet] = useState(false);
  const [loadingRegister, setLoadinRegister] = useState(false);
  const login = async (dato) => {
    try {
      setLoadinGet(true);
      const response = await axios.get("/auth/login", dato);
      const data = response.data;
      console.log(response.fata);
      setLoadinGet(false);
      return data;
    } catch (err) {
      console.log(err);
      setLoadinGet(false);
    }
  };

  const registerUser = async (dato) => {
    try {
      setLoadinRegister(true);
      const response = await axios.post("/register", dato);
      const data = response.data;
      setLoadinRegister(false);
      return data;
    } catch (err) {
      console.log(err);
      setLoadinRegister(false);
    }
  };

  return { loadingGet, loadingRegister, login, registerUser };
}

export default useLogin;
