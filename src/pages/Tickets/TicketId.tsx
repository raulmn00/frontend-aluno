import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header.tsx";
import format from "date-fns/format";
import axios from "axios";
import ApiUrl from "../../constants/apiUrl.ts";
import { useEffect, useState } from "react";
import useTicket from "../../hooks/ticket/useTicket.tsx";
import { toast } from "react-toastify";
import { Message } from "../../types/models/models.ts";

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

  const growers = document.querySelectorAll(".grow-wrap");

  growers?.forEach((grower) => {
    const textarea = grower.querySelector("textarea");
    textarea?.addEventListener("input", () => {
      grower.dataset.replicatedValue = textarea.value;
    });
  });

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
    sendMessage
      .post(`/message`, bodyMessage, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUpdatedTicket(response.data);
        toast.success("Mensagem enviada com sucesso.", { autoClose: 1000 });
        setInterval(() => navigate(0), 1000);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <h3 className="message-title">Histórico de Mensagens</h3>
      {oneTicketMessages.map((singleMessage: Message, index) => (
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
                  new Date(singleMessage.createdAt),
                  "dd/MM/yyyy - hh:mm",
                )}
              </p>
            </div>
            <div className="message-meta">
              <p>
                Mensagem do{" "}
                {singleMessage?.createdByAdmin ? "Administrador" : "Estudante"}
              </p>
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
            <p>Enviar mensagem:</p>
          </div>
          <div className="form-group">
            <label htmlFor="content">Conteúdo: </label>
            <div className="grow-wrap">
              <textarea
                name="content"
                id="content"
                onInput={() =>
                  "this.parentNode.dataset.replicatedValue = this.value"
                }
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </form>
      )}
    </>
  );
}
