import { useNavigate } from "react-router-dom";
import FormAddUser from "../features/servers/FormAddServer";
import type { User, UserSignIn, } from "../features/auth/types";
 import type{ Server, ServerId, ServerWhisOutId } from "../features/servers/types";




export const fetchLoadServers = async (): Promise<Server[]> => {
  
    const res = await fetch('/api/servers');
  
    const data: { servers: Server[] } = (await res.json()) as { servers: Server[] };
   
    return data.servers
  
  };
export const fetchCheckUser = async (): Promise<User> =>{
    const res = await fetch('/api/auth/check')
    
     const data:{user:User} = (await res.json()) as {user:User}
   
    
      
     
    return data.user
  }


  export const fetchAddServer = async (server:ServerWhisOutId): Promise<Server> => {
    
    const res = await fetch('/api/servers', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(server),
    });

    const data: { server: Server } = (await res.json()) as { server: Server };
    
    return data.server
 

   
  };


  
  export const fetchUppdateServer = async (server:Server): Promise<void> => {

    const res = await fetch(`/api/servers/${server.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(server),
    });
    // const data: { server: Server } = (await res.json()) as { server: Server };
    const data:{success:boolean;message:string } = (await res.json()) as {success:boolean;message:string}
    if (data.success !== true) {
      throw new Error(data.message)
      }
      window.location.assign('/');
      
  };



 export const fetchRemoveServer = async (id: ServerId): Promise<ServerId> => {
    const res = await fetch(`/api/servers/${id}`, {
      method: 'DELETE',
    });
    const data: { message: string; serverId: ServerId } = (await res.json()) as {
      message: string;
      serverId: ServerId;
    };
    if (data.message !== 'seccess') {
    throw new Error(data.message)
    }
    return data.serverId
  };


  export const fetchSignIn = async(user:UserSignIn): Promise<User> => {
  
   
    const res = await fetch('/api/auth/signIn', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
     
    if (res.status >= 400) {
      const data:{message:string} = (await res.json())as{message:string}
      throw new Error(data.message)
    }
    const data: { message: string; user:User } = (await res.json()) as {
      message: string;
      user:User
    };
    window.location.assign('/')
    return data.user
   
  };




  export const fetchLogOut = async(): Promise<void> =>{
    const res = await fetch('/api/auth/logout')
    const data:{message:string} = (await res.json())as{message:string}
    if(data.message !== 'success'){
      
        throw new Error(data.message);
    }
}