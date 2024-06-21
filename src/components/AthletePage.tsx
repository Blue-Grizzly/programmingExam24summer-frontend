import { useEffect, useState } from "react";
import athlete from "../models/athlete";
import RestService from "../services/RestService";
import { useAuth } from "../security/AuthProvider";

type AthletePageProps = {
    athlete: athlete;
    calcAge: (birthDate: string) => number;
    calcAgeGroup: (birthDate: string) => string;
    setSelectedView: (selected: string) => void;
    handleUpdate: (entity: Object, type:string) => void;
    handleDelete: (entity: any, entityType:string) => void;
    setEntityToUpdate: (entity: object) => void;
}

export default function AthletePage({athlete, calcAge, calcAgeGroup, setSelectedView, handleDelete, handleUpdate, setEntityToUpdate}: AthletePageProps){
    const [resultsLocal, setResultsLocal] = useState([]);
    const auth = useAuth();

    const getResults = async () => {
        const res = await RestService.getAll("results");
        const filtered = res.filter((result) => result.athlete.id === athlete.id);
        setResultsLocal(filtered);
    }
    useEffect(() => {
        getResults();
        setEntityToUpdate({});
    }, []);


    return(
        <div>
            <h1>{athlete.name}</h1>
            <p>Club: {athlete.club}</p>
            <p>Age Group: {calcAgeGroup(athlete.birthDate)} ({calcAge(athlete.birthDate)})</p>
            {athlete.disciplines && athlete.disciplines.map((disciplin) => (
                <p key={disciplin.id}>{disciplin.name}</p>
            ))}
            {resultsLocal && 
                <table>
                    <thead>
                        <tr>
                            <th>Discipline</th>
                            <th>Result</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultsLocal.map((result) => (
                            <tr key={result.id}>
                                <td>{result.discipline.name}</td>
                                <td>{result.resultValue}</td>
                                <td>{result.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {auth.isLoggedInAs(["ADMIN"]) && (
            <div>
                <button onClick={()=> handleUpdate(athlete, "athletes")}>Update</button>
                <button onClick={()=> handleDelete(athlete, "athletes")}>Delete</button>
            </div>
            )}
                <button onClick={()=> setSelectedView("athletes")}>Back to athletes</button>  
        </div>
    )
}