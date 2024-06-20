import { useEffect, useState } from "react";
import RestService from "../services/RestService";
import athlete from "../models/athlete";
import discipline from "../models/discipline";

type ResultsFormProps = {
    result?: any;
    setSelectedView: (selected: string) => void;
    setEntityToUpdate: (entity: object) => void;
}

export default function ResultsForm({result, setSelectedView, setEntityToUpdate}: ResultsFormProps){
    const emptyResult = {resultValue: "", date: "", resultType:"", disciplineId: 0, athleteId: 0};
    const resultDto = result.id? {id: result.id, resultValue: result.resultValue, date: result.date, resultType:result.resultType, disciplineId: Number(result.discipline.id), athleteId: Number(result.athlete.id)} : null;
    const [formData, setFormData] = useState(result.id? [resultDto]: [emptyResult]);
    const [localDisciplines, setLocalDisciplines] = useState([]);
    const [localAthletes, setLocalAthletes] = useState([]);
    const [multiResult, setMultiResult] = useState(false);
    const [resultCount, setResultCount] = useState(1);

    const handleSubmitOne = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const res = await RestService.create("results", formData[0]);
        if(res){
          alert("Sucess!")
          setFormData(emptyResult);
          setEntityToUpdate(emptyResult);
          setSelectedView("results");
        }else{
          alert("Something went wrong, please try again")
        }
    }

    const handleSubmitMany = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let res;
        formData.forEach(async (result) => {
            res = await RestService.create("results", result);
        });
        if(!res){
          alert("Sucess!")
          setFormData(emptyResult);
          setEntityToUpdate(emptyResult);
          setSelectedView("results");
        }else {
            alert("Something went wrong, please try again");
        }
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, i: number) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const updatedFormData = [...prevFormData];
            updatedFormData[i] = {
                ...updatedFormData[i], 
                [name]: value, 
            };
            return updatedFormData;
        });
    };

    const fetchDisciplines = async () => {
        setLocalDisciplines(await RestService.getAll("disciplines"));
    }

    const fetchAthletes = async () => {
        setLocalAthletes(await RestService.getAll("athletes"));
    }

    useEffect(() => {
        fetchDisciplines();
        fetchAthletes();
    }, []);

    const populateForm = (): JSX.Element => {
        const formElements = [];
        for(let i = 0; i < resultCount; i++){
            formData.push(emptyResult);
            formElements.push(
                <tr key={i}>
                    <td>
                        <select name={"disciplineId"} id={"disciplineId"} value={formData[i].disciplineId} onChange={(event)=>handleChange(event,i)} required>
                            <option value="">Select a discipline</option>
                            {localDisciplines.map((discipline) => (
                                <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select name={"athleteId"} id={"athleteId"} value={formData[i].athleteId} onChange={(event)=>handleChange(event,i)} required>
                            <option value="">Select an athlete</option>
                            {localAthletes.map((athlete) => (
                                <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <input type="text" name={"resultValue"} id={"resultValue"} value={formData[i].resultValue} onChange={(event)=>handleChange(event,i)} required></input>
                    </td>
                    <td>
                        <select name="resultType" id="resultType" onChange={(event)=>handleChange(event,i)} required>
                            <option value="">Select a result type</option>
                            <option value="time">Time</option>
                            <option value="distance">Distance</option>
                            <option value="points">Points</option>
                        </select>
                    </td>
                    <td>
                        <input type="date" name="date" id="date" value={formData[i].date} onChange={(event)=>handleChange(event,i)} required></input>
                    </td>
                </tr>
            );
        }
        return <>{formElements}</>;
    }

    const expandForm = () => {
        setResultCount(resultCount + 1);
    }

    return(
        <> 
            <h2>Create or update Result</h2>
            <button onClick={()=>setMultiResult(!multiResult)} className="form-btn">{multiResult? "Switch to Single Result" : "Switch to Multiple Results"}</button>
            {!multiResult && 
                <form onSubmit={handleSubmitOne}>
                    <input type="hidden" name="id"></input>
                    <div className="form-group">
                        <label htmlFor="resultValue">Result:</label>
                        <input type="text" name="resultValue" id="resultValue" value={formData[0].resultValue} onChange={(event)=>handleChange(event,0)} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input type="date" name="date" id="date" value={formData[0].date} onChange={(event)=>handleChange(event,0)} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="disciplineId">Discipline:</label>
                        <select name="disciplineId" id="disciplineId" value={formData[0].disciplineId} onChange={(event)=>handleChange(event,0)} required>
                            <option value="">Select a discipline</option>
                            {localDisciplines.map((discipline:discipline) => (
                                <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="athleteId">Athlete:</label>
                        <select name="athleteId" id="athleteId" value={formData[0].athleteId} onChange={(event)=>handleChange(event,0)} required>
                            <option value="">Select an athlete</option>
                            {localAthletes.map((athlete:athlete) => (
                                <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="resultType">Result Type:</label>
                    <select name="resultType" id="resultType" value={formData[0].resultType} onChange={(event)=>handleChange(event,0)} required>
                            <option value="">Select a result type</option>
                            <option value="time">Time</option>
                            <option value="distance">Distance</option>
                            <option value="points">Points</option>
                        </select>
                    </div>
                    <button type="submit" className="form-btn">Add/Update Result</button>
                </form>
            } 
            {multiResult &&
                <form onSubmit={handleSubmitMany}>
                    <table>
                        <thead>
                            <tr>
                                <th>Discipline</th>
                                <th>Athlete</th>
                                <th>Result</th>
                                <th>Result Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {populateForm()}
                            <tr>
                                <td > <button onClick={expandForm} style={{marginTop:"20px"}} className="form-btn">Add Row </button></td>
                                <td> <button type="submit" style={{marginTop:"20px"}} className="form-btn">Submit</button></td>
                            </tr>
                        </tbody>
                       
                    </table>
                </form>
            }          
        </>
    )
}