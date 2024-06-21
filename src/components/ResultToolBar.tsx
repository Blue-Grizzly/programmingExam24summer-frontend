import { useEffect, useState } from "react";
import RestService from "../services/RestService";
import discipline from "../models/discipline";

type ResultToolbarProps = {
    setFilter: (filter: string) => void;
    changeDir: () => void;
    dir: string;
}

// should be generalised to be used in both Athlete and Result but it's 2am so I'm just going to copy and paste
export default function ResultToolbar({setFilter, changeDir, dir}: ResultToolbarProps){
    const [disciplines, setDisciplines] = useState<discipline[]>([]);
    
    const fetchDisciplines = async () => {
        setDisciplines(await RestService.getAll("disciplines"));
    }

    useEffect(() => {
        fetchDisciplines();
    }, []);

    const handleChangeFilter = (e)=>{
        e.preventDefault();
        setFilter(e.target.value);
    }

    return(
        <div className="toolbar">
            <label htmlFor="filterByAge">Group:</label>
            <select name="filterByAge" onChange={handleChangeFilter}>
                <option value="all">All</option>
                <option value="age.Senior">Senior</option>
                <option value="age.Adult">Adult</option>
                <option value="age.Junior">Junior</option>
                <option value="age.Kids">Kids</option>
            </select>
     
            <label htmlFor="filterByGender">Gender:</label>
            <select name="filterByGender" onChange={handleChangeFilter}>
                <option value="all">All</option>
                <option value="gender.Male">Male</option>
                <option value="gender.Female">Female</option>
                <option value="gender.Other">Other</option>
            </select>
 
            <label htmlFor="filterByDiscipline">Discipline:</label>
            <select name="filterByDiscipline" onChange={handleChangeFilter}>
                <option value="all">All</option>
                {disciplines.map((discipline:discipline) => (
                    <option key={discipline.id} value={"discipline."+discipline.name}>{discipline.name}</option>
                ))}
            </select>
            <label>Sort</label>
            <button onClick={changeDir} className="form-btn">{dir == "ASC"? "ASC": "DESC"}</button>
            
        </div>
    )
}