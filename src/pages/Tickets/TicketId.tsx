import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header.tsx";
import useFetch from "../../hooks/useFetch.ts";
import format from "date-fns/format";
import axios from "axios";
import ApiUrl from "../../constants/apiUrl.ts";
import { useEffect, useState } from "react";
import useTicket from "../../hooks/ticket/useTicket.tsx";

export default function TicketId() {
  const token = localStorage.getItem("authToken");
  const { ticketId } = useParams();
  const { getTicket, getTicketMessages } = useTicket();
  const ticket = getTicket(ticketId);
  const oneTicketMessages = getTicketMessages(ticketId);
  const { id: userId } = JSON.parse(localStorage.getItem("user"));
  const sendMessage = axios.create({ baseURL: ApiUrl });
  const [updatedTicket, setUpdatedTicket] = useState(ticket);
  const navigate = useNavigate();

  useEffect(() => {}, [updatedTicket]);

  async function handleSendingMessage(e) {
    e.preventDefault();
    const content = e.target.content.value;
    const bodyMessage = {
      content,
      studentId: ticket?.studentId,
      ticketId: ticket?.id,
      createdBy: userId,
      adminId: ticket.adminId,
    };
    try {
      sendMessage
        .post(`/message`, bodyMessage, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUpdatedTicket(response.data);
          navigate(0);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {}
  }
  return (
    <>
      <Header />
      <div className="tickets-title">
        <p>Informações do Ticket</p>
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
          <tr>
            <td>{ticketId}</td>
            <td>{ticket?.createdAt}</td>
            <td>{ticket?.subject}</td>
            <td>{ticket?.description}</td>
            <td>{ticket?.status}</td>
            <td>{ticket?.type}</td>
            <td className="text-center">
              <a className="view-ticket" href={`/tickets/edit/${ticket?.id}`}>
                Editar
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 className="message-title">Messages History</h3>
      {oneTicketMessages?.map((singleMessage, index) => (
        <div
          className="message-container"
          key={`${singleMessage?.id} - ${index}`}
        >
          <div
            className={`message-${
              singleMessage.createdByAdmin ? "admin" : "student"
            }`}
          >
            <div className="message-header">
              <p className="message-created-at">
                Criado em:{" "}
                {format(
                  new Date(singleMessage?.createdAt),
                  "dd/MM/yyyy - hh:mm",
                )}
              </p>
            </div>
            <div className="message-meta">
              <p className="message-author">
                Autor: {singleMessage?.createdBy?.name}
              </p>
              <p className="message-email">
                E-mail: {singleMessage?.createdBy?.email}
              </p>
            </div>

            <div className="message-body">
              <p>{singleMessage?.content} </p>
            </div>
          </div>
        </div>
      ))}
      {Boolean(ticket?.status !== "closed") && (
        <form onSubmit={handleSendingMessage}>
          <div className="tickets-title">
            <p>Send Message:</p>
          </div>
          <div className="form-group">
            <label htmlFor="content">Conteúdo: </label>
            <input
              type="text"
              className="form-control"
              id="content"
              name="content"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </form>
      )}
    </>
  );
}
