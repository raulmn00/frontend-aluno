import { useNavigate, useParams } from "react-router-dom";
import useTicket from "../../hooks/ticket/useTicket.tsx";
import Header from "../../components/Header.tsx";
import format from "date-fns/format";
import EditTicket from "../../components/EditTicket.tsx";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import ApiUrl from "../../constants/apiUrl.ts";
import { toast } from "react-toastify";

export default function UpdateTicket() {
  const { ticketId } = useParams();
  const { getTicket } = useTicket();
  const ticket = getTicket(ticketId);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  function handleDeleteTicket(e, ticketId: string | undefined) {
    e.preventDefault();
    const request = axios.create({ baseURL: ApiUrl });
    const token = localStorage.getItem("authToken");
    request
      .delete(`/ticket/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Ticket excluido com sucesso.", { autoClose: 1000 });
        setInterval(() => navigate("/tickets"), 1000);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    closeModal();
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ticketId}</td>
            <td>
              {ticket?.createdAt
                ? format(new Date(ticket.createdAt).getTime(), "dd/MM/yyyy")
                : ""}
            </td>
            <td>{ticket?.subject}</td>
            <td>{ticket?.description}</td>
            <td>{ticket?.status}</td>
            <td className="text-center">
              <button onClick={openModal} className="delete-button">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>AVISO!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você está prestes a excluir um ticket. Essa ação é irreversível. Tem
          certeza que deseja continuar?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Não
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleDeleteTicket(e, ticketId);
            }}
          >
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
      <EditTicket />
    </>
  );
}
