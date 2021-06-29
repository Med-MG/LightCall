import { makeAutoObservable } from 'mobx';


export default class ProfileStore {


    constructor(){
        makeAutoObservable(this);

    }

    
}