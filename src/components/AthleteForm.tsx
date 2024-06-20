import { useEffect, useState } from "react";
import RestService from "../services/RestService";
import athlete from "../models/athlete";
import discipline from "../models/discipline";

type AthleteFormProps = {
    athlete?: any;
    setEntityToUpdate: (entity: object) => void;
    setSelectedView: (view: string) => void;
    }

export default function AthleteForm({athlete, setEntityToUpdate, setSelectedView}: AthleteFormProps){
    const emptyAthlete: athlete = {name: "", club: "", birthDate: "", gender: "", disciplines: []};
    const [formData, setFormData] = useState<athlete>(athlete.id? athlete : emptyAthlete);
    const [disciplines, setDisciplines] = useState([]);
  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await RestService.create('athletes',formData);
      if(res){
        alert("Sucess!")
        setFormData(emptyAthlete);
        setEntityToUpdate(emptyAthlete);
        setSelectedView("athletes");
      }else{
        alert("Something went wrong, please try again")
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

    const handleCheckBox = (discipline: discipline) => {
        if(formData.disciplines.includes(discipline)){
            setFormData((prevFormData) => ({
                ...prevFormData,
                disciplines: prevFormData.disciplines.filter((discipline) => discipline !== discipline)
            }))
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                disciplines: [...prevFormData.disciplines, discipline]
            }))
        }
    }

    const fetchDisciplines = async () => {
        setDisciplines( await RestService.getAll("disciplines"));
    }

    useEffect(() => {
        fetchDisciplines();        
    }, []);
  
    return (
      <>
        <h2>Create or update Athlete</h2>
        <form onSubmit={handleSubmit} className="athlete-form">
          <input type="hidden" name="id"></input>
          <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required></input>
          </div>
          <div className="form-group">
          <label htmlFor="club">Club:</label>
          <input type="text" name="club" id="club" value={formData.club} onChange={handleChange} required></input>
          </div>
          <div className="form-group">
          <label htmlFor="birthDate">Birth Date:</label>
          <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} required></input>
          </div>
          <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
          </select>
          </div>
          <div className="form-group">
          <label htmlFor="discipline">Discipline:</label>
          {disciplines.map((discipline:discipline) => (
            <label key={discipline.id}>{discipline.name}<input type="checkbox" onChange={()=>handleCheckBox(discipline)}></input></label>
            ))}
          </div>
          <button type="submit" className="form-btn">Add/Update Athlete</button>
        </form>
      </>
    );
}