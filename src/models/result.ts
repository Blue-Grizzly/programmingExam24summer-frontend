import athlete from "./athlete";
import discipline from "./discipline";

export default interface result {
    id: number;
    resultType: string;
    resultValue: string;
    date: string;
    athlete?: athlete;
    discipline?: discipline;
}