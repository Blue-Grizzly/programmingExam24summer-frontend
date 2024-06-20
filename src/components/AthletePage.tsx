import { useEffect, useState } from "react";
import athlete from "../models/athlete";
import RestService from "../services/RestService";

type AthletePageProps = {
    athlete: athlete;
    calcAge: (birthDate: string) => number;
    calcAgeGroup: (birthDate: string) => string;
    setSelectedView: (selected: string) => void;
    handleUpdate: (entity: Object, type:string) => void;
    handleDelete: (entity: any, entityType:string) => void;

}

export default function AthletePage({athlete, calcAge, calcAgeGroup, setSelectedView, handleDelete, handleUpdate}: AthletePageProps){
    const [resultsLocal, setResultsLocal] = useState([]);

    const getResults = async () => {
        const res = await RestService.getAll("results");
        const filtered = res.filter((result) => result.athlete.id === athlete.id);
        setResultsLocal(filtered);
    }
    useEffect(() => {
        getResults();
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
            <div>
                <button onClick={()=> handleUpdate(athlete, "athletes")}>Update</button>
                <button onClick={()=> handleDelete(athlete, "athletes")}>Delete</button>
                <button onClick={()=> setSelectedView("athletes")}>Back to athletes</button>
            </div>    
        </div>
    )
}