import { useAuth } from "./AuthProvider";


export default function Logout({setSelectedView}: {setSelectedView: (view: string) => void}){
  const auth = useAuth();
  auth.signOut()
  setSelectedView("login")
  return (
    <div>
    </div>
    );
}
