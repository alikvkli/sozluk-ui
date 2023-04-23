import { LoginResponse } from "@/types/api";
import axios from "axios";
import React, { FormEvent } from "react";

export default function Login() {
  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = new FormData();
    params.append("email", e.currentTarget.email.value)
    params.append("password", e.currentTarget.password.value)
    try {
      const response = await axios.post<LoginResponse>("http://localhost:8000/api/login", params);
      console.log(response.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleAuth}>
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">giriş yap </button>
      </form>
    </>
  );
}
