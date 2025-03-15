import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Dashboard.css";

function Dashboard() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/dashboard`, { withCredentials: true })

      .then((response) => setMessage(response.data.message))

      .catch(() => navigate("/login"));
  }, []);

  const handleLogout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/logout`,
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2>{message}</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
