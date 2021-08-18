import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { history } from "../..";
import { User, UserFormValues } from "../models/User";
import { store } from "./Store";
import { ProfileFormValues } from './../models/User';
import { toast } from 'react-toastify';

export default class UserStore {
    
    user: User | null = null;
    loading = false;
    lodingInitiale = false;
    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        // console.log(this.user);
        // console.log(!!this.user);
        return !!this.user;
        
    }

    

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            });
            
             if(store.commonStore.isRoles(["Operator"]) ){
                 
             }
            history.push('/'); //redirect user to dashboard after succefull login
            
        } catch (error) {
            throw error;
        }
    }


    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');

        this.user = null;
        history.push('/');
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            
            history.push('/dashboard');
            
            
        } catch (error) {
            throw error;
        }
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current()
            runInAction(() => {
                this.user = user;
                // console.log(!!this.user + " in getuser");
            });
        } catch (error) {
            console.log(error);
            
        }
    }

    updateProfile = async (profile: ProfileFormValues) => {
        this.loading = true;
        try {
            await agent.Account.updateProfile(profile);
            runInAction(() => {
                 this.getUser();
                 toast.success('profile updated successfully')
            })
        } catch (error) {
            throw error;
        }
    }

}