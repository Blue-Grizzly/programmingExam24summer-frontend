import { useAuth } from "../security/AuthProvider";

export default function Buttons({ onSelected }: { onSelected: (selected: string) => void }) {
    const auth = useAuth()

        return (
          <>
            <button className="btn-w100" onClick={() => onSelected("welcome")}>
                Home
            </button>
            <button className="btn-w100" onClick={() => onSelected(auth.isLoggedIn() ? "logout" : "login")}>
                {auth.isLoggedIn() ? "Logout" : "Login"}
            </button>
            <button className="btn-w100" onClick={() => onSelected("athletes")}>
                Athletes
            </button>
            {auth.isLoggedInAs(["ADMIN"]) && (
            <button className="btn-w100" onClick={() => onSelected("athletesForm")}>
                Add/Edit Athlete
            </button>
            )}
            <button className="btn-w100" onClick={() => onSelected("results")}>
                Results
            </button>
            {auth.isLoggedInAs(["ADMIN"]) && (
            <button className="btn-w100" onClick={() => onSelected("resultsForm")}>
                Add/Edit result
            </button>
            )}
            <button className="btn-w100" onClick={() => onSelected("disciplines")}>
                Disciplines
            </button>
            {auth.isLoggedInAs(["ADMIN"]) && (
            <button className="btn-w100" onClick={() => onSelected("disciplinesForm")}>
                Add/Edit discipline
            </button>
            )}
          </>
        );

}