import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthProvider";
import RestService from "../services/RestService";
import discipline from "../models/discipline";

type DisciplineTableProps = {
    handleUpdate: (entity: Object, type:string) => void;
    handleDelete: (entity: any, entityType:string) => void;
    setEntityToUpdate: (entity: Object) => void;
}

export default function DisciplineTable({handleUpdate, handleDelete, setEntityToUpdate}: DisciplineTableProps){
    const [disciplinesLocal, setDisciplinesLocal] = useState<discipline[]>([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    const fetchDisciplines = async () => {
    setDisciplinesLocal( await RestService.getAll("disciplines"));
    setLoading(false);
    }

  useEffect(() => {
    fetchDisciplines();
    setEntityToUpdate({});
  }, []);




    return(
        <>
        <h2>Disciplines</h2>

        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Scoring</th>
                {auth.isLoggedInAs(["ADMIN"]) && <th>Update</th>}
                {auth.isLoggedInAs(["ADMIN"]) && <th>Delete</th>}
            </tr>
            
            </thead>

            <tbody>
            {loading && <tr><td>Loading...</td></tr>}
            {!loading &&
            disciplinesLocal.map((discipline) => (
                <tr key={discipline.id}>
                    <td>{discipline.name}</td>
                    <td>{discipline.resultType}</td>
                    {auth.isLoggedInAs(["ADMIN"]) && (
                    <td>
                        <button onClick={() => handleUpdate(discipline, "disciplines")}>Update</button>
                    </td>
                    )}  
                    {auth.isLoggedInAs(["ADMIN"]) && ( 
                    <td>
                        <button onClick={() => handleDelete(discipline, "disciplines")}>Delete</button>
                    </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
        </>
    )

}