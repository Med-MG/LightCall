import { Product } from "./Product";
import { Project } from "./Project";

export interface OrderSheet {
    SpreadsheetId: string;
    sheet: string;
    project_id : string;
    project?: Project;
    product_ids: Product[];
}