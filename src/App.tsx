import "./App.css";
import { useState } from "react";
import Buttons from "./components/Buttons";
import athlete from "./models/athlete";
import AthleteGrid from "./components/AthleteGrid";
import AthletePage from "./components/AthletePage";
import AthleteForm from "./components/AthleteForm";
import RestService from "./services/RestService";
import ConfirmDelete from "./components/ConfirmDelete";
import ResultTable from "./components/ResultTable";
import DisciplineTable from "./components/DisciplineTable";
import DisciplinesForm from "./components/DisciplinesForm";
import ResultsForm from "./components/ResultsForm";
import Login from "./security/Login";

export default function App() {
    const [selectedView, setSelectedView] = useState<string>("welcome");
    const [selectedAthlete, setSelectedAthlete] = useState<athlete>();
    const [entityToUpdate, setEntityToUpdate] = useState({});
    const [entityToDelete, setEntityToDelete] = useState({});
    const [entityType, setEntityType] = useState<string>("welcome");


    const onSelected = (selected: string) =>{
      setSelectedView(selected);
    }

    const handleDelete = (entity: object, entityType) => {
      setEntityType(entityType);
      setEntityToDelete(entity);
      setSelectedView("confirmDelete");
    }

    const handleUpdate = (entity: object, type:string) => {
      setEntityToUpdate(entity);
      setSelectedView(`${type}Form`);
    } 

    const calcAge = (birthDate: string) => {
      const now = new Date();
      const birth = new Date(birthDate);
      return now.getFullYear() - birth.getFullYear();
    }

    const calcAgeGroup = (birthDate: string) => {
      const age = calcAge(birthDate);
      if (age < 10){
        return "Kids";
      }else if(age < 23){
        return "Junior";
      }else if (age < 41){
        return "Adult";
      } else {
        return "Senior";
      }
    }

    const handleSelectAthlete = (athlete: athlete) => {
      setSelectedAthlete(athlete);
      setSelectedView("athletePage");    
    }

    const confirmDeleteEntity = async () => {
      const res = await RestService.delete(entityType, entityToDelete.id);
      if(res){
        alert("Sucess!")
        setSelectedView(entityType);
      }else{
        alert("Something went wrong, please try again")
      }
    }

    const handleCancelDelete = () => {
      setEntityToDelete({});
      setSelectedView(entityType);
    }


  return (
        <>
          <div className="outer-div-style">
            <div className="header-style">
              <h2>AthleticOS</h2>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1, padding: 10 }}>
                <Buttons onSelected={onSelected} />
              </div>
              <div className="exercise-style">
                {selectedView == "welcome" ? <><p>Welcome!</p></>: null}
                {selectedView == "athletes" ? <AthleteGrid handleDelete={handleDelete} handleUpdate={handleUpdate} calcAgeGroup={calcAgeGroup} handleSelectAthlete={handleSelectAthlete} calcAge={calcAge}/> : null}
                {selectedView == "athletePage" ? <AthletePage athlete={selectedAthlete} calcAge={calcAge} calcAgeGroup={calcAgeGroup} setSelectedView={setSelectedView} handleDelete={handleDelete} handleUpdate={handleUpdate}/> : null}
                {selectedView == "athletesForm" ? <AthleteForm athlete={entityToUpdate} setSelectedView={setSelectedView} setEntityToUpdate={setEntityToUpdate}/> : null}
                {selectedView == "results" ? <ResultTable handleDelete={handleDelete} handleUpdate={handleUpdate}/> : null}
                {selectedView == "resultsForm" ? <ResultsForm result={entityToUpdate} setSelectedView={setSelectedView} setEntityToUpdate={setEntityToUpdate} /> : null}
                {selectedView == "disciplines" ? <DisciplineTable handleDelete={handleDelete} handleUpdate={handleUpdate}/> : null}
                {selectedView == "disciplinesForm" ? <DisciplinesForm discipline={entityToUpdate} setSelectedView={setSelectedView} setEntityToUpdate={setEntityToUpdate} /> : null}
                {selectedView == "confirmDelete" ? <ConfirmDelete entity={entityToDelete} confirmDeleteEntity={confirmDeleteEntity} handleCancelDelete={handleCancelDelete}/> : null}
                {selectedView == "login" ? <Login/> : null}
              </div>
            </div>
          </div>
        </>
      );
}