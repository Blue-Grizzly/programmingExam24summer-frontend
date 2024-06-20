import { useEffect, useState } from "react";
import RestService from "../services/RestService";
import discipline from "../models/discipline";

type ToolbarProps = {
    setFilter: (filter: string) => void;
    setSort: (sort: string) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clubs: string[];
}

export default function Toolbar({setFilter, setSort, handleSearch, clubs}: ToolbarProps){
    const [disciplines, setDisciplines] = useState<discipline[]>([]);
    
    const fetchDisciplines = async () => {
        setDisciplines( await RestService.getAll("disciplines"));
    }

    useEffect(() => {
        fetchDisciplines();
    }, []);

    const handleChangeFilter = (e)=>{
        e.preventDefault();
        setFilter(e.target.value);
    }

    const handleChangeSort = (e)=>{
        e.preventDefault();
        setSort(e.target.value);
    }

    return(
        <div className="toolbar">
            <input placeholder="Search" onChange={handleSearch}></input>
            <label htmlFor="sortBy">Sort by:</label>
            <select name="sortBy" onChange={handleChangeSort}>
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="club">Club</option>
            </select>
            <label htmlFor="filterBy">Filter by Group:</label>
            <select name="filterByMisc" onChange={handleChangeFilter}>
                <option value="all">All</option>
                <option value="age.Senior">Senior</option>
                <option value="age.Adult">Adult</option>
                <option value="age.Junior">Junior</option>
                <option value="age.Kids">Kids</option>
            </select>
            <label htmlFor="filterByGender">Filter by Gender</label>
            <select name="filterByGender" onChange={handleChangeFilter}>
                <option value="all">All</option>
                <option value="gender.Male">Male</option>
                <option value="gender.Female">Female</option>
                <option value="gender.Other">Other</option>
            </select>
            <label htmlFor="filterByDiscipline">Filter by discipline:</label>
            <select name="filterByDiscipline" onChange={handleChangeFilter}>
                <option value="all">All</option>
                {disciplines.map((discipline:discipline) => (
                    <option key={discipline.id} value={"discipline."+discipline.id}>{discipline.name}</option>
                ))}
            </select>
            <label htmlFor="filterByClub">Filter by Club:</label>
            <select name="filterByClub" onChange={handleChangeFilter}>
                <option value="all">All</option>
                    {clubs.map((club) => (
                        <option key={club} value={"club."+club}>{club}</option>
                    ))}
            </select>
        </div>
    )
}