import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTicket from "../hooks/ticket/useTicket.tsx";
import axios from "axios";
import { TicketStatus } from "../types/models/models.ts";
import { toast } from "react-toastify";
import ApiUrl from "../constants/apiUrl.ts";

export default function EditTicket() {
  const { ticketId } = useParams();
  const { getTicket } = useTicket();
  const ticket = getTicket(ticketId);
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState(ticket?.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (ticket) {
      setSubject(ticket.subject);
      setDescription(ticket.description);
      setStatus(ticket.status);
    }
  }, [ticket]);
  async function handleEditTicket(e) {
    e.preventDefault();
    const payload = { description, subject, status };
    const api = axios.create({ baseURL: ApiUrl });
    const token = localStorage.getItem("authToken");
    api
      .patch(`/ticket/${ticketId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Ticket editado com sucesso.", { autoClose: 1000 });
        setInterval(() => navigate(`/tickets/${ticketId}`), 1500);
      })
      .catch((error) => {
        console.log("useTicket -> updateTicket", error);
      });
  }

  return (
    <>
      <div className="ticket-form-container">
        <form onSubmit={handleEditTicket}>
          <div className="form-group">
            <label htmlFor="assunto">Assunto</label>
            <input
              type="text"
              id="assunto"
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              className="status-select form-control"
              value={status}
              onChange={(e) => {
                if (e.target.value == "open") {
                  setStatus(TicketStatus.open);
                }
                if (e.target.value == "closed") {
                  setStatus(TicketStatus.closed);
                }
                if (e.target.value == "pending") {
                  setStatus(TicketStatus.pending);
                }
              }}
            >
              <option value="open">Aberto</option>
              <option value="closed">Encerrado</option>
              <option value="pending">Em atendimento</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
