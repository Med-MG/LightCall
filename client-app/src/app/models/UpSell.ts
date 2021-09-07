import { Product } from "./Product";
import { Project } from "./Project";

export interface UpSell {
    id: string;
    status: boolean ;
    name : string;
    project_id: string;
    project?: Project;
    Products_ids: Product[];
}