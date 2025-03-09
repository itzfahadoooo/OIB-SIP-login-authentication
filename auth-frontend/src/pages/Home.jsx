import { Link } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Auth System</h1>


      <div className="auth-links">
        
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Home;
