import { makeAutoObservable, runInAction  } from 'mobx';
import agent from '../api/agent';
import {Status } from '../models/Status';
import {v4 as uuid} from 'uuid';
import { WhatTemp } from '../models/WhatTemp';

export default class WhatTempStore {
 
    TemplateRegistry = new Map<string, WhatTemp>();
    selectedTemplate : WhatTemp | undefined = undefined ;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get Templates() {
        console.log(this.TemplateRegistry.values())
        return Array.from(this.TemplateRegistry.values());
    }

    loadTemplate = async () => {
     
        this.setLoadingInitial(true)
    try{
        var tamplates = await agent.WhatTemps.list() ;
        
        tamplates.forEach(tamplate =>{
            this.TemplateRegistry.set(tamplate.id, tamplate);
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

    selectTemplate = (id : string) => {
        this.selectedTemplate = this.TemplateRegistry.get(id);
      
   }
   canselSelectedTemplate = () => {
        this.selectedTemplate = undefined ;
      
   }


   createTemplate = async (template : WhatTemp ) => {

    this.loading = true ;
    template.id = uuid();
    try {
        await agent.WhatTemps.create(template);
        runInAction(()=>{
            this.TemplateRegistry.set(template.id, template);
            this.loading = false ; 
        })
    } catch (error) {
        runInAction(()=>{
           
            this.loading = false ; 
        })
    }
   }

   updateTemplate = async (template : WhatTemp ) => {

    this.loading = true ;
    
    try {
        await agent.WhatTemps.update(template);
        runInAction(()=>{
            this.TemplateRegistry.set(template.id, template);
            this.loading = false ; 
        })
    } catch (error) {
        runInAction(()=>{
           
            this.loading = false ; 
        })
    }
   }

   deleteTemplate = async (id: string) => {
    this.loading = true;
    try {
        await agent.WhatTemps.delete(id);
        runInAction(() => {
            this.TemplateRegistry.delete(id);
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