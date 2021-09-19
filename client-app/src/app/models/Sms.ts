import { Project } from "./Project";
import { Status } from "./Status";

export interface Sms {
    id: string ;
    SmsName: string;
    Message: string;
    IsActive: boolean;
    project: Project | string;
    status: Status | string;
}