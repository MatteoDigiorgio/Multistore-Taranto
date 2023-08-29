'use client';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import { getProducts } from '@/pages/api/auth/getProducts';
import { Prodotto } from '@/types';
import Prodotti from './(prodotti)/prodotti';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { update } from '../../../../slices/searchSlice';

function Gestisci() {
  const [prodotti, setProdotti] = useState<Prodotto[]>();

  useEffect(() => {
    async function fetchData() {
      const prodottiData = await getProducts();
      setProdotti(prodottiData);
    }
    fetchData();
  }, []);

  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = input.replace(/\s+/g, ' ').trim();
    dispatch(update(trimmedValue));
    setInput('');
    if (inputRef.current) {
      inputRef.current.blur(); // Hide the keyboard
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className='relative m-auto flex flex-col gap-4 px-6'>
      <form onSubmit={handleSubmit} className='mb-2 mx-auto w-full md:w-1/2'>
        <input
          ref={inputRef}
          type='text'
          name='search'
          placeholder='Cerca prodotto...'
          className='bg-gray-200 py-2 px-4 drop-shadow-lg w-full rounded-lg ring-2 ring-green-300 ring-offset-4 ring-offset-slate-50 focus:ring-0 focus:outline-green-500 placeholder:italic border-0'
          value={input}
          onChange={handleChange}
        />
      </form>

      <div className='relative w-full flex flex-col'>
        <Prodotti prodotti={prodotti} />
      </div>

      <div className='flex flex-col items-center gap-2'>
        <Link
          href='/auth/admin/gestisci/aggiungi'
          className='flex mx-auto p-4 items-center drop-shadow-lg text-white bg-green-400 rounded-full ring-2 ring-green-500 shadow-lg hover:ring-2 hover:ring-green-700 hover:bg-green-500'
        >
          <AddIcon />
        </Link>
        <p className='font-light'>Aggiungi prodotto</p>
      </div>
    </div>
  );
}

export default Gestisci;
