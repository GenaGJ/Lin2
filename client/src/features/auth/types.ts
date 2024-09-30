

export type User = {
    id:number;
    name:string;
    password:string

}

export type AuthState = {
    auth:User|undefined;
    error: string|undefined;
    
}


export type UserSignIn = Omit<User,'id'>