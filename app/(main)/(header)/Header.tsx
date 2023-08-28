'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Menu from './Menu';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { HomeIcon } from '@heroicons/react/24/outline';
import { update } from '../../../slices/searchSlice';
import { update as googleUpdate } from '@/slices/googleSlice';

export const MultistoreLogo = () => {
  return (
    <div className='flex justify-center items-center mx-4 mt-4 md:w-1/6 md:mt-0 sm:flex-grow-0 md:justify-start'>
      <Link title='Home' passHref href='/'>
        <Image
          alt='Multistore Taranto Logo'
          src='/multistore_logo.png'
          width={120}
          height={50}
          className='object-contain cursor-pointer'
          unoptimized={true}
        />
      </Link>
    </div>
  );
};

export const SearchBar = () => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = input.replace(/\s+/g, ' ').trim();
    dispatch(update(trimmedValue));
    setInput('');
    router.push('/prodotti');
    if (inputRef.current) {
      inputRef.current.blur(); // Hide the keyboard
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-grow md:w-4/6 items-center text-xs mx-6 rounded-full h-10 cursor-pointer shadow-md ${styles.searchbar}`}
    >
      <input
        ref={inputRef}
        className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-full text-base focus:outline-none px-4 placeholder:italic placeholder:text-slate-400 border-0 focus:ring-0'
        type='text'
        name='search'
        placeholder='Cerca Prodotto, Modello, Brand'
        value={input}
        onChange={handleChange}
      />
      <button
        className='flex-none h-10 px-4 py-2 bg-white rounded-r-full'
        onClick={() => handleSubmit}
      >
        <MagnifyingGlassIcon
          width={20}
          height={20}
          className='stroke-multistore_blue-light stroke-[2px]'
        />
      </button>
    </form>
  );
};

function Header({ data }: { data: {} }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  dispatch(googleUpdate(data));
  return (
    <header className='z-50 fixed w-full'>
      {/* Top nav */}
      <div className='grid grid-rows-2 grid-flow-col gap-4 items-center mx-1 h-32 bg-[#F9F9F9] md:flex md:flex-row md:h-20 md:px-5 shadow-lg z-50'>
        <MultistoreLogo />
        <SearchBar />
        <Link
          href={'/prodotti'}
          className={` ${
            pathname === '/prodotti'
              ? 'hidden'
              : 'absolute left-7 top-[30px] md:relative md:flex md:flex-col md:gap-[2px] md:top-0 md:left-0 cursor-pointer'
          } ${styles.home}`}
        >
          <HomeIcon height={24} />
          <p className='hidden md:flex font-mono text-xs font-thin'>Catalogo</p>
        </Link>
        <div className='absolute right-7 top-7 md:relative md:flex md:justify-end md:w-1/6 md:top-0 md:right-0 md:items-center md:order-last'>
          <Menu />
        </div>
      </div>
    </header>
  );
}

export default Header;
