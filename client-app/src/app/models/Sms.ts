import { Project } from "./Project";
import { Status } from "./Status";

export interface Sms {
    id: string ;
    smsName: string;
    message: string;
    isActive: boolean;
    project: Project | string;
    status: Status | string;
}