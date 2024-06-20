import { useEffect, useState } from "react";
import result from "../models/result";
import { useAuth } from "../security/AuthProvider";
import RestService from "../services/RestService";

type ResultTableProps = {
    handleUpdate: (entity: Object, type:string) => void;
    handleDelete: (entity: any, entityType:string) => void;
}

export default function ResultTable({handleUpdate, handleDelete}: ResultTableProps){
    const [resultsLocal, setResultsLocal] = useState<result[]>([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    const fetchResults = async () => {
    setResultsLocal( await RestService.getAll("results"));
    setLoading(false);
    }

  useEffect(() => {
    fetchResults();
  }, []);




    return(
        <>
        <h2>Results</h2>

        <table>
            <thead>
            <tr>
                <th>Discipline</th>
                <th>Athlete</th>
                <th>Scoring Format</th>
                <th>Result</th>
                <th>Date</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>

            </thead>

            <tbody>
            {loading && <tr><td>Loading...</td></tr>}
            {!loading &&
            resultsLocal.map((result) => (
                <tr key={result.id}>
                    <td>{result.discipline.name}</td>
                    <td>{result.athlete.name}</td>
                    <td>{result.resultType}</td>
                    <td>{result.resultValue}</td>
                    <td>{result.date}</td>
                    <td>
                        <button onClick={() => handleUpdate(result, "results")}>Update</button>
                    </td>
                    <td>
                        <button onClick={() => handleDelete(result, "results")}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </>
    )

}