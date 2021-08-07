import { makeAutoObservable, reaction } from "mobx";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { ServerError } from './../models/ServerError';

export default class CommonStore  {
   error: ServerError | null = null;
   token: string | null = window.localStorage.getItem('jwt');
   appLoaded = false;

    constructor(){
        makeAutoObservable(this);


        reaction(
            () => this.token,
            token => {
                if(token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }


    setToken = (token: string | null) => {
        this.token = token;
    }

    setApploaded = () => {
        this.appLoaded = true;
    }


    //Check if one of these roles is in the token
    isRoles = (RoleList: string[]) => {
        var roles = this.TokenRoles();
        // return true if one of incoming roles exists in token roles & false otherwise
        // console.log(RoleList.some(r => roles?.includes(r)));
        
        return RoleList.some(r => roles?.includes(r)); 
    }

    //Decode the Token And return an Array of Roles

    TokenRoles = () => {
        let Roles: string | string[] | undefined
        if(this.token == null){
            Roles = "none"
        }else {
            var Decoded = jwt_decode<JwtPayload>(this.token || '') || null;
            
            
            Roles = Decoded.role;
            // console.log("teeet"+ Roles);
            // console.log(Roles);
            
        }
        return Roles
    }

    

}
