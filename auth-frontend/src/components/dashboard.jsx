import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/dashboard", { withCredentials: true })
      .then(response => setMessage(response.data.message))
      .catch(() => navigate("/login"));
  }, []);

  const handleLogout = async () => {
    await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
    navigate("/login");
  };

  return (
    <div>
      <h2>{message}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
