import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import { Product } from "../models/Product";
export default class ProductStore{
    productRegistery = new Map<string , Product>();
    loadingInitial = false;
    loading = false;
    productSelected : Product | undefined = undefined;

    constructor(){
        makeAutoObservable(this);
    }

    get products() {
        
        return Array.from(this.productRegistery.values());
    }

    selectProduct = (id: string) =>{
        this.productSelected = this.productRegistery.get(id)
    }

    loadProducts = async () =>{
        this.setLoadingInitial(true);
        console.log("kfkfkkf");
        try{
            var products = await agent.Products.list();
            console.log("kfkfkkf");
            products.forEach(product =>{
                console.log(product);
                this.productRegistery.set(product.id, product);
            })
            this.setLoadingInitial(false)
        }catch(error){
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    creatProduct = async (product: Product) =>{
        this.loading = true ;
        product.id = uuid();
        try{
            await agent.Products.create(product);
            runInAction(()=>{
                this.productRegistery.set(product.id, product);
                this.loading = false ; 
            })
        }catch(error){
            runInAction(()=>{
                this.loading = false ; 
            })
        }
    }

    updateProduct = async (product: Product) =>{
        this.loading = true ;
        try{
            await agent.Products.update(product);
            runInAction(()=>{
                this.productRegistery.set(product.id, product);
                this.loading = false ; 
            })
        }catch (error) {
            runInAction(()=>{
                this.loading = false ; 
            })
        }
    }

    deleteProduct = async (id: string) =>{
        this.loading = true;
        try{
            await agent.Products.delete(id);
            runInAction(() => {
                this.productRegistery.delete(id);
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