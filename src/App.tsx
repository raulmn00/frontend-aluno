import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { RequireAuth } from "./contexts/auth/RequireAuth.tsx";
import Login from "./pages/Login.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import MyTickets from "./pages/Tickets/MyTickets.tsx";
import CreateTicket from "./pages/Tickets/CreateTicket.tsx";
import TicketId from "./pages/Tickets/TicketId.tsx";
import UpdateTicket from "./pages/Tickets/UpdateTicket.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route
            path="/tickets"
            element={
              <RequireAuth>
                <MyTickets />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="tickets/:ticketId"
            element={
              <RequireAuth>
                <TicketId />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="tickets/edit/:ticketId"
            element={
              <RequireAuth>
                <UpdateTicket />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/create-ticket"
            element={
              <RequireAuth>
                <CreateTicket />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
