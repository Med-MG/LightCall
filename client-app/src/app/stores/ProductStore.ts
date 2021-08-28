import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import { Product } from "../models/Product";
export default class ProductStore{
    productRegistery = new Map<string , Product>();
    product : Product | null = null;
    loadingInitial = false;
    loading = false;
    productSelected : Product | undefined = undefined;
    uploading = false;

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

    creatProduct = async (product: Product, file: Blob ) =>{
        this.loading = true ;
        product.id = uuid();
        
        product.file = file;
        console.log(product.file);
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

    // uploadPhoto = async (file: Blob) =>{
    //     this.uploading = true;
    //     try {
    //         const response = await agent.Products.uploadPhoto(file);
    //         const photo = response.data;
    //         console.log(photo)
    //         runInAction(() =>{
    //             if(this.product){
    //                 this.product.photos?.push(photo)
    //             }
    //         })
    //         this.uploading = false;
    //     } catch(error){
    //         console.log(error);
    //         runInAction(()=> this.uploading = false);
    //     }
    // }
}