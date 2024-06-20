//import { useAuth } from "./_Authprovider";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AuthStatus() {
  const auth = useAuth();

  return (
    <li>
       {auth.isLoggedIn() ? <Link to="/logout">Logout (logged in as {auth.username})</Link> : <Link to="/login">Login</Link>}
    </li>
  );
  
}
