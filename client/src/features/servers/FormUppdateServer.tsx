/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { Server } from './types';
// import { appContext } from '../../context';
import { type RootState, useAppDispatch } from '../../redux/store';
import { addServer, uppdateServer } from './serversSlice';

const FormUppdateServer = (): JSX.Element => {

    const { serverId } = useParams();


    const servers = useSelector((store: RootState) => store.servers.servers);
    
    const currentServer = serverId && servers.find((server): server is Server => server.id === +serverId) 
    

    
  const [address,setAddress] = useState('')
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [chronicles, setChronicles] = useState('');
  const [desc, setDesc] = useState('');
  const [openAt, setOpenAt] = useState('');
  const [destroyAt, setDestroyAt] = useState('');


  // const { dispatch   } = useContext(appContext);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentServer) {
      setAddress(currentServer.address)
      setName(currentServer.name);
      setRating(currentServer.rating);
      setChronicles(currentServer.chronicles);
      setDesc(currentServer.desc);
      setOpenAt(currentServer.openAt.toString().slice(0,10));
      setDestroyAt(currentServer.destroyAt.slice(0,10));
     
    }
  }, [currentServer]);
  

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (serverId)
        dispatch(uppdateServer({id: +serverId,address, name, desc, rating, chronicles, openAt , destroyAt })).catch(
          console.log,
        );
        
      }}> 
     
    
    
      <h2> address
      <input value={address} onChange={(e) => setAddress(e.target.value) } type="text" />
      </h2>
      <h2> name
      <input value={name} onChange={(e) => setName(e.target.value) } type="text" />
      </h2>
      <h2> desc
      <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text" />
      </h2>
      <h2> rating
      <input value={rating} onChange={(e) => setRating(e.target.value)} type="text" />
      </h2>
      <h2> chronicles
      <input value={chronicles} onChange={(e) => setChronicles(e.target.value)} type="text" />
      </h2>
      <h2> openAt
      <input value={openAt} onChange={(e) => setOpenAt(e.target.value)} type="date" />
      </h2>
      <h2> destroyAt
      <input value={ destroyAt} onChange={(e) => setDestroyAt(e.target.value)} type="date" />
      </h2>

      <button type="submit">Изменить</button>
      
    </form>
  );
  
};

export default FormUppdateServer;
