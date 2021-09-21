import { makeAutoObservable, runInAction  } from 'mobx';
import agent from '../api/agent';
import {Sms } from '../models/Sms';
import {v4 as uuid} from 'uuid';
import { Status } from '../models/Status';
import { Project } from '../models/Project';

export default class SmsStore {
 
    smsRegistry = new Map<string, Sms>();
    selectedSms : Sms | undefined = undefined ;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    

    constructor(){
        makeAutoObservable(this)
    }

    get smss() {
        console.log(this.smsRegistry.values())
        return Array.from(this.smsRegistry.values());
    }

    loadSms = async () => {
     
        this.setLoadingInitial(true)
    try{
        var sms = await agent.Smss.list() ;
        
        sms.forEach(sms =>{
            this.smsRegistry.set(sms.id, sms);
        })
        this.setLoadingInitial(false)
        
    }catch(error){
        console.log(error)
        this.setLoadingInitial(false)
    }

    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectSms = (id : string) => {
        this.selectedSms = this.smsRegistry.get(id);
      
   }
   canselSelectedSms = () => {
        this.selectedSms = undefined ;
      
   }


   createSms = async (sms : Sms , status : Status , project : Project ) => {

    this.loading = true ;
    sms.id = uuid();
    try {
        await agent.Smss.create(sms);
        runInAction(()=>{
            
            sms.status = status;
            sms.project = project ;
            this.smsRegistry.set(sms.id, sms);
            this.loading = false ; 
        })
    } catch (error) {
        runInAction(()=>{
           
            this.loading = false ; 
        })
    }
   }

   updateSms = async (sms : Sms , status : Status , project : Project) => {

    this.loading = true ;
    
    try {
        await agent.Smss.update(sms);
        runInAction(()=>{
            sms.status = status;
            sms.project = project ;
            this.smsRegistry.set(sms.id, sms);
            this.loading = false ; 
        })
    } catch (error) {
        runInAction(()=>{
           
            this.loading = false ; 
        })
    }
   }

   deleteSms = async (id: string) => {
    this.loading = true;
    try {
        await agent.Smss.delete(id);
        runInAction(() => {
            this.smsRegistry.delete(id);
            this.loading = false;
        })

    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false
        })
    }
}

}