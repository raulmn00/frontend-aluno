import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { RequireAuth } from "./contexts/auth/RequireAuth.tsx";
import Login from "./pages/Login.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import MyTickets from "./pages/Tickets/MyTickets.tsx";
import CreateTicket from "./pages/Tickets/CreateTicket.tsx";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          ></Route>
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
