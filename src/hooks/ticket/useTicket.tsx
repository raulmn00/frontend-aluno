import { useEffect, useState } from "react";
import ApiUrl from "../../constants/apiUrl.ts";
import axios from "axios";
import { toast } from "react-toastify";

const useTicket = () => {
  const getTickets = (studentId: string | undefined) => {
    const [data, setData] = useState([]);
    const api = axios.create({ baseURL: ApiUrl });
    const token = localStorage.getItem("authToken");

    useEffect(() => {
      api
        .get(`/student/ticket/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log("useTicket -> getTickets", err);
        });
    }, [studentId]);

    return data;
  };

  const getTicket = (ticketId: string | undefined) => {
    const [data, setData] = useState();
    const api = axios.create({ baseURL: ApiUrl });
    const token = localStorage.getItem("authToken");

    useEffect(() => {
      api
        .get(`/ticket/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          toast.error("Não foi possível encontrar o seu ticket.");
          console.log("useTicket -> getTicket", err);
        });
    }, [ticketId]);

    return data;
  };

  const getTicketMessages = (ticketId: string | undefined) => {
    const [data, setData] = useState([]);
    const api = axios.create({ baseURL: ApiUrl });
    const token = localStorage.getItem("authToken");

    useEffect(() => {
      api
        .get(`/message/ticketMessages/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log("useTicket -> getTicketMessages", err);
        });
    }, [ticketId]);

    return data;
  };

  return { getTickets, getTicket, getTicketMessages };
};

export default useTicket;
