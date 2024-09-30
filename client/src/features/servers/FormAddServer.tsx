/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from 'react';
import type { Server } from './types';
// import { appContext } from '../../context';
import { useAppDispatch } from '../../redux/store';
import { addServer } from './serversSlice';

const FormAddUser = (): JSX.Element => {
  const [address,setAddress] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [chronicles, setChronicles] = useState('');
  const [customChronicles, setCustomChronicles] = useState('');
  const [desc, setDesc] = useState('');
  const [openAt, setOpenAt] = useState('');
  const [destroyAt, setDestroyAt] = useState('');

  // const { dispatch   } = useContext(appContext);

  const dispatch = useAppDispatch();

 const resetForm = ():void => {
        setAddress('');
        setName('');
        setRating('');
        setChronicles('');
        setCustomChronicles('');
        setDesc('');
        setOpenAt('');
        setDestroyAt('');
      };

  return (
    <form
    onSubmit={(e) => {
      e.preventDefault();
      // Если chronicles равно 'custom', но customChronicles пусто, предотвратить отправку формы
      if (chronicles === 'custom' && !customChronicles.trim()) {
        console.log('Пожалуйста, введите значение для chronicles');
        return;
      }
      
      // Если chronicles не равно 'custom', отправить значение chronicles
      dispatch(addServer({ address,name, desc, rating, chronicles: customChronicles || chronicles, openAt, destroyAt })).unwrap().then(resetForm).catch(console.log);
    }}
    >
      {' '}
      <h2>
        {' '}
        address
        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
      </h2>
      <h2>
        {' '}
        name
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
      </h2>
      <h2>
        {' '}
        desc
        <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text" />
      </h2>
      <h2>
        {' '}
        rating
        <input value={rating} onChange={(e) => setRating(e.target.value)} type="text" />
      </h2>
      <h2>
        {' '}
        chronicles
        <select
          className="paci"
          value={chronicles}
          onChange={({ target: { value } }) => {
            setChronicles(value);
            // Если выбрано 'custom', очищаем customChronicles
            if (value !== 'custom') {
              setCustomChronicles('');
            }
          }}
        >
          <option>Interlude</option>
          <option>High Five</option>
          <option>Essence</option>
          <option>Interlude+</option>
          <option>Classic</option>
          <option>C4</option>
          <option>Final</option>
          <option>GoD</option>
          <option>C5</option>
          <option>Freya</option>
          <option>Ertheia</option>
          <option>Helios</option>
          <option value="custom">Другое...</option>
        </select>
        {chronicles === 'custom' && (
          <input
            type="text"
            value={customChronicles}
            onChange={(e) => setCustomChronicles(e.target.value)}
            placeholder="Введите свое значение"
          />
        )}
      </h2>
      <h2>
        {' '}
        openAt
        <input value={openAt} onChange={(e) => setOpenAt(e.target.value)} type="date" />
      </h2>
      <h2>
        {' '}
        destroyAt
        <input value={destroyAt} onChange={(e) => setDestroyAt(e.target.value)} type="date" />
      </h2>
     
      <button type="submit">Добавить</button>
    </form>
  );
};

export default FormAddUser;
