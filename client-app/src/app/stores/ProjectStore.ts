import { makeAutoObservable, runInAction  } from 'mobx';
import agent from '../api/agent';

import { Project } from '../models/Project';

export default class ProjectStore {


    projectsRegistry = new Map<string,Project >();
    selectedProject : Project | undefined = undefined ;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get projects() {

        return Array.from(this.projectsRegistry.values());

    }

    loadProjects = async () => {
     
        this.setLoadingInitial(true)
    try{
        var projects = await agent.Projects.list() ;
       
        console.log(projects);
        
        projects.forEach(project =>{
            this.projectsRegistry.set(project.id, project);
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

    selectProject = (id : string) => {
        this.selectedProject = this.projectsRegistry.get(id);
      
   }
   canselSelectedStatus = () => {
    this.selectedProject = undefined ;
      
   }


   createProject = async (project : Project ) => {

    this.loading = true ;
    // project.id = uuid();
    try {
        await agent.Projects.create(project);
        runInAction(()=>{
            this.projectsRegistry.set(project.id, project);
            this.loading = false ; 
        })
    } catch (error) {
        runInAction(()=>{
           
            this.loading = false ; 
        })
    }
   }

   updateProject = async (project : Project ) => {

    this.loading = true ;
    
    try {
        await agent.Projects.update(project);
        runInAction(()=>{
            this.projectsRegistry.set(project.id, project);
            this.loading = false ; 
        })
    } catch (error) {
        runInAction(()=>{
           
            this.loading = false ; 
        })
    }
   }

   deleteProject = async (id: string) => {
    this.loading = true;
    try {
        await agent.Projects.delete(id);
        runInAction(() => {
            this.projectsRegistry.delete(id);
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