import { useState } from "react";
import RestService from "../services/RestService";
import discipline from "../models/discipline";

type DisciplinesFormProps = {
    discipline?: any;
    setEntityToUpdate: (entity: object) => void;
    setSelectedView: (view: string) => void;
    }

export default function DisciplinesForm({discipline, setEntityToUpdate, setSelectedView}: DisciplinesFormProps){
    const emptyDiscipline: discipline = {name: "", resultType: ""};
    const [formData, setFormData] = useState<discipline>(discipline || emptyDiscipline);
  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await RestService.create('disciplines',formData);
      if(res){
        alert("Sucess!")
        setFormData(emptyDiscipline);
        setEntityToUpdate(emptyDiscipline);
        setSelectedView("disciplines");
      }else{
        alert("Something went wrong, please try again")
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

  
    return (
      <>
        <h2>Create or update Discipline</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id"></input>
          <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required></input>
          </div>
          <div className="form-group">
          <label htmlFor="club">Result Type:</label>
          <input type="text" name="resultType" id="resultType" value={formData.resultType} onChange={handleChange} required></input>
          </div>
          <button type="submit" className="form-btn">Add/Update Discipline</button>
        </form>
      </>
    );
}