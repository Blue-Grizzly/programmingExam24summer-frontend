import discipline from "./discipline";
import result from "./result";

export default interface athlete {
    id?: number;
    name: string;
    birthDate: string;
    gender: string;
    club: string;
    results?: result[];
    disciplines?: discipline[];
}