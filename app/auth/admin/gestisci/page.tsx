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
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

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

  const handleChange = (e: {
    target: { value: React.SetStateAction<string>; name: string };
  }) => {
    if (e.target.name === 'search') {
      setInput(e.target.value);
    } else if (e.target.name === 'Categoria') {
      dispatch(update(e.target.value.toString()));
      setInput('');
    }
  };
  return (
    <div className='relative m-auto flex flex-col gap-4 px-6'>
      <form
        onSubmit={handleSubmit}
        className='mb-7 mx-auto w-full gap-8 flex flex-col sm:flex-row'
      >
        <input
          ref={inputRef}
          type='text'
          name='search'
          placeholder='Cerca prodotto...'
          className='flex bg-gray-200 py-2 px-4 drop-shadow-lg w-full rounded-lg ring-2 ring-green-300 ring-offset-4 ring-offset-slate-50 focus:ring-0 focus:outline-green-500 placeholder:italic border-0'
          value={input}
          onChange={handleChange}
        />
        <div className='relative flex flex-row w-full md:w-1/2 items-center justify-center'>
          <label
            htmlFor='Categoria'
            className='absolute z-50 -top-2 inline-block bg-gray-50 px-1 text-xs font-medium text-gray-900'
          >
            Filtra Prodotti
          </label>
          <select
            required
            defaultValue=''
            id='grouped-native-select'
            name='Categoria'
            onChange={handleChange}
            autoComplete='country-name'
            className='relative block w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          >
            <option aria-label='None' value='' />
            {/* Elettrodomestici */}
            <option value={'Elettrodomestici'} className='bg-green-200'>
              Elettrodomestici
            </option>
            <option value={'Elettrodomestici/Frigoriferi'} className='italic'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Frigoriferi
            </option>
            <option value={'Elettrodomestici/Congelatori'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Congelatori
            </option>
            <option value={'Elettrodomestici/Lavatrici'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lavatrici
            </option>
            <option value={'Elettrodomestici/Asciugatrici'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Asciugatrici
            </option>
            <option value={'Elettrodomestici/Lavastoviglie'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lavastoviglie
            </option>
            <option value={'Elettrodomestici/Forni'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forni
            </option>
            <option value={'Elettrodomestici/Climatizzatori'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climatizzatori
            </option>
            <option value={'Elettrodomestici/Ventilatori'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ventilatori
            </option>
            <option value={'Elettrodomestici/Stufe'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stufe
            </option>
            <option value={'Elettrodomestici/Asciugatrici'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Asciugatrici
            </option>

            {/* Telefonia */}
            <option value={'Telefonia'}>Telefonia</option>
            <option value={'Telefonia/Smartphone e Cellulari'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Smartphone e Cellulari
            </option>
            <option value={'Cordless'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cordless
            </option>
            <option value={'Cordless/Accessori Telefonia'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessori Telefonia
            </option>

            {/* Televisori */}
            <option value={'Televisori'}>Televisori</option>
            <option value={'Televisori/Televisori'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Televisori
            </option>
            <option value={'Televisori/DVD e Blu-ray'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DVD e Blu-ray
            </option>
            <option value={'Televisori/Accessori Televisori'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessori Televisori
            </option>

            {/* Informatica */}
            <option value={'Informatica'}>Informatica</option>
            <option value={'Informatica/Notebook'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Notebook
            </option>
            <option value={'Informatica/Tablet'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tablet
            </option>
            <option value={'Informatica/Accessori Informatica'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessori Informatica
            </option>

            {/* Console e Videogiochi */}
            <option value={'Console e Videogiochi'}>Console</option>
            <option value={'Console e Videogiochi/Console'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console
            </option>
            <option value={'Console e Videogiochi/Videogiochi'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Videogiochi
            </option>

            {/* Monopattini */}
            <option value={'Monopattini'}>Monopattini</option>
          </select>
        </div>
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
