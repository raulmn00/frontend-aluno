import Header from "../../components/Header.tsx";
import appUrl from "../../constants/appUrl.ts";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.ts";

export default function MyTickets() {
  const token = localStorage.getItem("authToken");
  const { id: userId } = JSON.parse(localStorage.getItem("user"));
  const tickets = useFetch(`/student/ticket/${userId}`, token);
  const [listTickets, setListTickets] = useState(tickets);

  useEffect(() => {
    setListTickets([...tickets]);
  }, [tickets]);
  return (
    <>
      {Boolean(window.location.href === `${appUrl}/tickets`) && <Header />}
      <div className="tickets-title">
        <p>All Tickets</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Created At</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {listTickets?.map((ticket, index) => (
            <tr key={`${ticket?.id} - ${index}`}>
              <td>{ticket.id}</td>
              <td>{ticket.createdAt}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.type}</td>
              <td className="text-center">
                <a className="view-ticket" href={`/tickets/${ticket.id}`}>
                  Visualizar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Boolean(listTickets.length == 0) && (
        <div className="tickets-title mt-10">
          <p>No tickets founded.</p>
        </div>
      )}
    </>
  );
}
