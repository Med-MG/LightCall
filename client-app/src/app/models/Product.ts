import { Project } from "./Project";

export interface Product {
    id: string;
    name: string
    description: string;
    quantity: string;
    ProjectId:  string  ;
    project? : Project
}