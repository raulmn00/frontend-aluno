import appUrl from "../../constants/appUrl.ts";
import Header from "../../components/Header.tsx";
import { useState } from "react";
import axios from "axios";
import ApiUrl from "../../constants/apiUrl.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateTicket() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const createTicket = axios.create({ baseURL: ApiUrl });
  const token = localStorage.getItem("authToken");
  const { id: studentId } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { subject, description, studentId, type };

    try {
      createTicket
        .post("/ticket", payload, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success("Ticket created.", { autoClose: 1000 });
          navigate(0);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  }
  return (
    <>
      {Boolean(window.location.href === `${appUrl}/create-ticket`) && (
        <Header />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            className="form-control"
            name="subject"
            placeholder="Subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            name="type"
            id="type"
            onChange={(event) => setType(event.target.value)}
          >
            <option value="termination">Termination</option>
            <option value="questions">Questions</option>
            <option value="platform-problems">Platform Problems</option>
            <option value="suggestions">Suggestions</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </>
  );
}
