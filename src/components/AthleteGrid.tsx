import { useEffect, useState } from "react";
import athlete from "../models/athlete";
import RestService from "../services/RestService";
import { useAuth } from "../security/AuthProvider";
import Toolbar from "./AthleteToolbar";

type AthleteGridProps = {
    handleUpdate: (entity: Object, type:string) => void;
    handleDelete: (entity: any, entityType:string) => void;
    calcAgeGroup: (birthDate: string) => string;
    handleSelectAthlete: (athlete: athlete) => void;
    calcAge: (birthDate: string) => number;
    setEntityToUpdate: (entity: Object) => void;
}

export default function AthleteGrid({handleUpdate, handleDelete, calcAgeGroup, handleSelectAthlete, calcAge, setEntityToUpdate}: AthleteGridProps) {
    const [athletesLocal, setAthletesLocal] = useState<athlete[]>([]);
    const [filteredAthletes, setFilteredAthletes] = useState<athlete[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    const auth = useAuth();

    const fetchAthletes = async () => {
    setAthletesLocal( await RestService.getAll("athletes"));
    setLoading(false);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        const filtered = athletesLocal.filter((athlete) => athlete.name.toLowerCase().includes(search.toLowerCase()));
        setFilteredAthletes(filtered);
    }

    const clubs = [... new Set(athletesLocal.map((athlete) => athlete.club))];

    useEffect(() => {
        fetchAthletes();
        setEntityToUpdate({});
      }, []);

    useEffect(() => {
        if(filter === "all"){
            setFilteredAthletes(athletesLocal);
        } else if(filter.split(".")[0] === "age"){
            const filtered = athletesLocal.filter((athlete) => calcAgeGroup(athlete.birthDate) === filter.split(".")[1]);
            setFilteredAthletes([...sortAthletes(filtered)]);
        } else if(filter.split(".")[0] === "gender"){
            const filtered = athletesLocal.filter((athlete) => athlete.gender === filter.split(".")[1]);
            setFilteredAthletes([...sortAthletes(filtered)]);
        } else if(filter.split(".")[0] === "club"){
            const filtered = athletesLocal.filter((athlete) => athlete.club === filter.split(".")[1]);
            setFilteredAthletes([...sortAthletes(filtered)]);
        } else if (filter.split(".")[0] === "discipline"){
            const filtered = athletesLocal.filter((athlete) => athlete.disciplines.map((discipline) => discipline.name).includes(filter.split(".")[1]));
            setFilteredAthletes([...sortAthletes(filtered)]);
        } else{
          setFilteredAthletes([...sortAthletes(athletesLocal)]);
        }
  }, [filter, athletesLocal, sort]);

  const sortAthletes = (athletes: athlete[]) => {
    if(sort === "name"){
      return athletes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "age"){
      return athletes.sort((a, b) => calcAge(a.birthDate) - calcAge(b.birthDate));
    } else if (sort === "club"){
      return athletes.sort((a, b) => a.club.localeCompare(b.club));
    }
    return athletes;
  }


  return (
    <> 
        <h2>Athletes</h2>
        <Toolbar setFilter={setFilter} setSort={setSort} handleSearch={handleSearch} clubs={clubs}/>
        <p>{loading? "loading..." : ""}</p>
        {!loading &&
        <div className="grid-container">
          {filteredAthletes.map((athlete) => (
            <div className="grid-item" key={athlete.id} >
              <div onClick={()=>handleSelectAthlete(athlete)}>
                <p>{athlete.name}</p>
                <p>{calcAgeGroup(athlete.birthDate)}</p>
                <p>{athlete.club}</p>
              </div>

              {auth.isLoggedInAs(["ADMIN"]) &&(
              <div>
                <button onClick={() => handleUpdate(athlete, "athletes")}>Update</button>
                <button onClick={() => handleDelete(athlete, "athletes")}>Delete</button>
              </div>
          )}
            </div>
            ))}
        </div>

}
    </>
  )
}