import { makeAutoObservable, runInAction  } from 'mobx';
import agent from '../api/agent';
import {Status } from '../models/Status';
import {v4 as uuid} from 'uuid';

export default class StatusStore {
 
    statusRegistry = new Map<string, Status>();
    selectedStatus : Status | undefined = undefined ;
    editMode = false;
    loading = false;
    loadingInitial = false;

    setSubmiting = (state: boolean) => {
        this.editMode = state;
    }

    constructor(){
        makeAutoObservable(this)
    }

    get status() {
        console.log(this.statusRegistry.values())
        return Array.from(this.statusRegistry.values());
    }

    loadStatus = async () => {
     
        this.setLoadingInitial(true)
    try{
        var status = await agent.Staties.list() ;
        
        status.forEach(statu =>{
            this.statusRegistry.set(statu.id, statu);
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

    selectStatus = (id : string) => {
        this.selectedStatus = this.statusRegistry.get(id);
      
   }
   canselSelectedStatus = () => {
        this.selectedStatus = undefined ;
      
   }


   createStatus = async (status : Status ) => {

    this.loading = true ;
    status.id = uuid();
    try {
        await agent.Staties.create(status);
        runInAction(()=>{
            this.statusRegistry.set(status.id, status);
            this.loading = false ; 
        })
    } catch (error) {
        runInAction(()=>{
           
            this.loading = false ; 
        })
    }
   }

   updateStatus = async (status : Status ) => {

    this.loading = true ;
    
    try {
        await agent.Staties.update(status);
        runInAction(()=>{
            this.statusRegistry.set(status.id, status);
            this.loading = false ; 
        })
    } catch (error) {
        runInAction(()=>{
           
            this.loading = false ; 
        })
    }
   }

   deleteStatus = async (id: string) => {
    this.loading = true;
    try {
        await agent.Staties.delete(id);
        runInAction(() => {
            this.statusRegistry.delete(id);
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