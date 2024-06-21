import { useEffect, useState } from "react";
import result from "../models/result";
import { useAuth } from "../security/AuthProvider";
import RestService from "../services/RestService";
import ResultToolbar from "./ResultToolBar";

type ResultTableProps = {
    handleUpdate: (entity: Object, type:string) => void;
    handleDelete: (entity: any, entityType:string) => void;
    setEntityToUpdate: (entity: Object) => void;
    calcAgeGroup: (birthDate: string) => string;
}

export default function ResultTable({handleUpdate, handleDelete, setEntityToUpdate, calcAgeGroup}: ResultTableProps){
    const [resultsLocal, setResultsLocal] = useState<result[]>([]);
    const [filteredResults, setFilteredResults] = useState<result[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [dir, setDir] = useState("ASC");
    const auth = useAuth();

    const fetchResults = async () => {
    setResultsLocal( await RestService.getAll("results"));
    setLoading(false);
    }

  useEffect(() => {
    fetchResults();
    setEntityToUpdate({});
  }, []);

  const sortResults = (results: result[]) => {
    if(dir === "ASC"){
        return results.sort((a,b)=>{return a.resultValue.localeCompare(b.resultValue)});
    }else return results.sort((a,b)=>{return b.resultValue.localeCompare(a.resultValue)});
  }

  const changeDir = () => {
    setDir(dir === "ASC"? "DESC" : "ASC");
  }

    useEffect(() => {
        if(filter.split(".")[0] === "discipline"){
            const filtered = resultsLocal.filter((result) => result.discipline.name === filter.split(".")[1]);
            setFilteredResults(sortResults([...filtered]));
        } else if(filter.split(".")[0] === "gender"){
            const filtered = resultsLocal.filter((result) => result.athlete.name === filter.split(".")[1]);
            setFilteredResults(sortResults([...filtered]));
        } else if(filter.split(".")[0] === "age"){
            const filtered = resultsLocal.filter((result) => calcAgeGroup(result.athlete.birthDate) === filter.split(".")[1]);
            setFilteredResults(sortResults([...filtered]));
        } else{
          setFilteredResults(sortResults([...resultsLocal]));
        }
    }, [filter, resultsLocal, dir]);


    return(
        <>
        <h2>Results</h2>
        <ResultToolbar setFilter={setFilter} changeDir={changeDir} dir={dir}/>
        <table>
            <thead>
            <tr>
                <th>Discipline</th>
                <th>Athlete</th>
                <th>Scoring Format</th>
                <th onClick={changeDir} style={{cursor:"pointer"}}>Result</th>
                <th>Date</th>
                {auth.isLoggedInAs(["ADMIN"]) && (
                <th>Update</th>
                )}
                {auth.isLoggedInAs(["ADMIN"]) && (
                <th>Delete</th>
                )}
            </tr>

            </thead>

            <tbody>
            {loading && <tr><td>Loading...</td></tr>}
            {!loading &&
            filteredResults.map((result) => (
                <tr key={result.id}>
                    <td>{result.discipline.name}</td>
                    <td>{result.athlete.name}</td>
                    <td>{result.resultType}</td>
                    <td>{result.resultValue}</td>
                    <td>{result.date}</td>
                    {auth.isLoggedInAs(["ADMIN"]) && (
                    <td>
                        <button onClick={() => handleUpdate(result, "results")}>Update</button>
                    </td>
                    )}
                    {auth.isLoggedInAs(["ADMIN"]) && (
                    <td>
                        <button onClick={() => handleDelete(result, "results")}>Delete</button>
                    </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
        </>
    )

}