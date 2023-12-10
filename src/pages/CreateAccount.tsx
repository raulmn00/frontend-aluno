import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ApiUrl from "../constants/apiUrl.ts";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const createStudentRequest = axios.create({ baseURL: ApiUrl });
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { name, email, phone, password };

    createStudentRequest
      .post("/student", payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Estudante criado com sucesso!", { autoClose: 1000 });
        setInterval(() => navigate({ pathname: "/login" }), 1500);
      })
      .catch((error) => {
        error.response.data.message.map((m) => toast.error(m));
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crie sua conta
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="create-account-form">
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Criar conta</button>
        </form>
        <div className="mt-2 text-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Já tem uma conta?
          </h2>
          <button>
            <a href="/login" className="view-ticket">
              Entre aqui!
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
