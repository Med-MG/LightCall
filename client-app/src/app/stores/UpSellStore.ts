import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { UpSell } from "../models/UpSell";
import {v4 as uuid} from 'uuid';
import { string } from "yup/lib/locale";


export default class UpSellStore{
    upselltRegistery = new Map<string , UpSell>();
    loading = false;
    loadingInitial = false;
    upsellSelected : UpSell | undefined = undefined;

    constructor(){
        makeAutoObservable(this);
    }

    get Upsells() {
        return Array.from(this.upselltRegistery.values());
    }

    selectUpsell = (id: string) =>{
        this.upsellSelected = this.upselltRegistery.get(id)
    }

    loadUpSell = async () =>{
        this.setLoadingInitial(true);
        try{
            var upsellls = await agent.Upsell.list();
            console.log(upsellls)
            console.log("kfkfkkf");
            
            upsellls.forEach(upsell =>{
                this.upselltRegistery.set(upsell.id, upsell);
            })
            
            
            this.setLoadingInitial(false)
        }catch(error){
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    createUpSell = async (upsell : UpSell)=>{
        this.loading = true ;
        upsell.id = uuid();
        console.log(upsell)
        try{
            await agent.Upsell.create(upsell);
            runInAction(()=>{
                this.upselltRegistery.set(upsell.id, upsell);
                console.log('teees3');
                this.loading = false ; 
            })
        }catch(error){
            console.log('fffff')
            runInAction(()=>{
                this.loading = false ; 
            })
        }
    }

    updateUsell = async (upsell : UpSell) =>{
        this.loading = true ;
        try{
            await agent.Upsell.update(upsell);
            runInAction(()=>{
                this.upselltRegistery.set(upsell.id, upsell);
                this.loading = false ; 
            })
        }catch (error) {
            runInAction(()=>{
                this.loading = false ; 
            })
        }
    }

    deleteUpsell = async (id: string) =>{
        this.loading = true;
        try{
            await agent.Upsell.delete(id);
            runInAction(() => {
                this.upselltRegistery.delete(id);
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false
            })
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}

