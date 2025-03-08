import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Auth System</h1>
      <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
