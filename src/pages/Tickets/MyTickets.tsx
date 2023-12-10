import Header from "../../components/Header.tsx";
import appUrl from "../../constants/appUrl.ts";
import { useEffect, useState } from "react";
import useTicket from "../../hooks/ticket/useTicket.tsx";

export default function MyTickets() {
  const { id: userId } = JSON.parse(localStorage.getItem("user"));
  const { getTickets } = useTicket();
  const tickets = getTickets(userId);
  const [listTickets, setListTickets] = useState(tickets);

  useEffect(() => {
    setListTickets([...tickets]);
  }, [tickets]);
  return (
    <>
      {Boolean(window.location.href === `${appUrl}/tickets`) && <Header />}
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
      {Boolean(listTickets?.length == 0) && (
        <div className="tickets-title mt-10">
          <p>Nenhum ticket encontrado.</p>
        </div>
      )}
    </>
  );
}
