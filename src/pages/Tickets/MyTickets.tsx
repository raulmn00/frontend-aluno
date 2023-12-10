import Header from "../../components/Header.tsx";
import appUrl from "../../constants/appUrl.ts";
import { useEffect, useState } from "react";
import useTicket from "../../hooks/ticket/useTicket.tsx";
import axios from "axios";
import ApiUrl from "../../constants/apiUrl.ts";

export default function MyTickets() {
  const { id: userId } = JSON.parse(localStorage.getItem("user"));
  const { getTickets } = useTicket();
  const tickets = getTickets(userId);
  const [listTickets, setListTickets] = useState(tickets);
  const [searchTicket, setSearchTicket] = useState("");

  async function handleSubmitSearch(e) {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    const params = {
      subject: searchTicket,
      status: searchTicket,
      description: searchTicket,
      type: searchTicket,
    };

    const request = axios.create({ baseURL: ApiUrl });

    request
      .get(`/student/${userId}/ticket/search`, {
        params,
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setListTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleChangeSearch(e) {
    setSearchTicket(e.target.value);
  }

  async function handleResetSearch() {
    setSearchTicket("");
  }

  useEffect(() => {
    setListTickets([...tickets]);
  }, [tickets, setSearchTicket]);
  return (
    <>
      {Boolean(window.location.href === `${appUrl}/tickets`) && <Header />}

      <div className="container-form-search">
        <p className="search-title">Pesquisar Tickets</p>
        <form onSubmit={handleSubmitSearch} className="form-search">
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTicket}
            onChange={handleChangeSearch}
            className="input-search"
          />
          <div className="container-buttons-search">
            <button type="submit" className="button-search">
              Pesquisar
            </button>
            <button className="button-clean-search" onClick={handleResetSearch}>
              Limpar
            </button>
          </div>
        </form>
      </div>

      <div className="container-table">
        <div className="tickets-title">
          <p>Tickets</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Criação</th>
              <th>Assunto</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listTickets?.map((ticket, index) => (
              <tr key={`${ticket?.id} - ${index}`}>
                <td>{ticket?.id}</td>
                <td>{ticket?.createdAt}</td>
                <td>{ticket?.subject}</td>
                <td>{ticket?.description}</td>
                <td>{ticket?.status}</td>
                <td>{ticket?.type}</td>
                <td className="text-center">
                  <a className="view-ticket" href={`/tickets/${ticket?.id}`}>
                    Visualizar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Boolean(listTickets?.length == 0) && (
        <div className="tickets-title mt-10">
          <p>Nenhum ticket encontrado.</p>
        </div>
      )}
    </>
  );
}
