'use client';
import React, { useEffect, useRef, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import styles from './Aggiungi.module.css';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import db from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { storage } from '../../../../../firebase';
import { Prodotto } from '@/types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Image from 'next/image';
import { Switch } from '@headlessui/react';
import { optionalInputs } from '../../../../../global_data';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Field = ({
  productKey,
  handleChange,
  inputs,
}: {
  productKey: string;
  handleChange: any;
  inputs: any;
}) => {
  let productKeyLowerCase =
    productKey.charAt(0).toLowerCase() + productKey.slice(1);
  let value = inputs[productKeyLowerCase] ? inputs[productKeyLowerCase] : '';

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let input = document.querySelector(
      `[name="${productKey}"]`
    ) as HTMLInputElement | null;

    input?.setCustomValidity(
      value === '' || value === undefined || value === null
        ? productKey === 'Sconto' ||
          productKey === 'Percentuale' ||
          productKey === 'Percentuale'
          ? ''
          : 'Campo necessario!'
        : ''
    );

    if (productKey === 'Prezzo' || productKey === 'Sconto') {
      if (
        inputRef.current !== null &&
        value !== '' &&
        value !== null &&
        value !== undefined
      ) {
        const pattern = /^[0-9]+,[0-9]+$/;
        const inputValue = inputRef.current.value;

        inputRef.current.setCustomValidity(
          !pattern.test(inputValue) ? 'Deve seguire il formato 123,45' : ''
        );
      }
    }
  }, [value, productKey, productKeyLowerCase]);
  return (
    <>
      {productKey !== 'Prezzo' &&
      productKey !== 'Sconto' &&
      productKey !== 'Percentuale' ? (
        productKey === 'Nome' ||
        productKey === 'Marca' ||
        productKey === 'Descrizione' ? (
          // Required field
          <div className='relative flex flex-row w-full items-center justify-center py-4'>
            <label
              htmlFor={productKey}
              className='absolute top-2 inline-block bg-white px-1 text-xs font-medium text-gray-900'
            >
              {productKey}
            </label>
            <textarea
              required
              name={productKey}
              onChange={handleChange}
              id={productKey}
              className='block w-[70%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder=''
            />
          </div>
        ) : (
          // Optional field
          <div className='relative flex flex-row w-full items-center justify-center py-4'>
            <label
              htmlFor={productKey}
              className='absolute top-2 bg-white px-1 text-xs font-medium text-gray-900'
            >
              <p className='flex items-start gap-1'>
                {productKey}
                <span
                  className='flex text-[8px] h-2 leading-6 text-gray-500 items-start'
                  id='optional'
                >
                  (Opzionale)
                </span>
              </p>
            </label>

            <textarea
              name={`${productKey}(Opzionale)`}
              onChange={handleChange}
              id={productKey}
              className='block w-[70%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder=''
            />
          </div>
        )
      ) : (
        // Price
        <div className='relative flex flex-row w-full items-center justify-center py-4'>
          <label
            htmlFor={
              productKey === 'Prezzo'
                ? 'Prezzo di listino'
                : productKey === 'Sconto'
                ? 'Prezzo scontato'
                : 'Percentuale sconto'
            }
            className='z-20 absolute top-4 inline-block bg-white px-1 text-xs font-medium text-gray-900'
          >
            <p className='flex items-start gap-1 bg-red'>
              {productKey === 'Prezzo'
                ? 'Prezzo di listino'
                : productKey === 'Sconto'
                ? 'Prezzo scontato'
                : 'Percentuale sconto'}
              <span
                className={`${
                  productKey === 'Prezzo' ? 'hidden' : 'flex'
                } h-2 text-[8px] leading-6 text-gray-500 items-start bg-red z-0`}
                id='optional'
              >
                (Opzionale)
              </span>
            </p>
          </label>
          <div className='relative w-[70%] mt-2 rounded-md shadow-sm'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <span
                className={` ${
                  productKey === 'Prezzo' || productKey === 'Sconto'
                    ? 'flex'
                    : 'hidden'
                } text-gray-500 sm:text-sm`}
              >
                €
              </span>
              <span
                className={` ${
                  productKey === 'Percentuale' ? 'flex' : 'hidden'
                } text-gray-500 sm:text-sm`}
              >
                %
              </span>
            </div>
            <input
              ref={inputRef}
              required={productKey === 'Prezzo' ? true : false}
              type='text'
              name={
                productKey === 'Prezzo'
                  ? 'Prezzo'
                  : productKey === 'Sconto'
                  ? 'Sconto'
                  : 'Percentuale'
              }
              id={productKey}
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder={`${
                productKey === 'Prezzo' || productKey === 'Sconto'
                  ? '0.00'
                  : '0'
              }`}
              value={inputs[productKeyLowerCase]}
              aria-describedby='price-currency'
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

function AddProduct() {
  const [inputs, setInputs] = useState<Prodotto>({
    id: '',
    nome: '',
    marca: '',
    categoria: '',
    descrizione: '',
    immagine: '',
    dual_sim: false,
    five_g: false,
    nfc: false,
    prezzo: '',
    sconto: '',
    percentuale: '',
  });

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const [isDualSim, setIsDualSim] = useState(false);
  const [is5G, setIs5G] = useState(false);
  const [isNFC, setIsNFC] = useState(false);

  let inputRefImage = useRef<HTMLInputElement | null>(null);

  let categoria = inputs?.categoria;
  let immagine = inputs?.immagine;

  useEffect(() => {
    let input = document.querySelector(
      `[name="Categoria"]`
    ) as HTMLInputElement | null;

    input?.setCustomValidity(
      categoria === '' || categoria === undefined || categoria === null
        ? 'Campo necessario!'
        : ''
    );
  }, [categoria]);

  useEffect(() => {
    if (inputRefImage.current !== null) {
      inputRefImage.current.setCustomValidity(
        immagine === '' || immagine === undefined || immagine === null
          ? 'Campo necessario!'
          : ''
      );
    }
  }, [immagine]);

  useEffect(() => {
    setInputs((prevState: any) => ({
      ...prevState,
      dual_sim: isDualSim,
    }));
  }, [isDualSim]);

  useEffect(() => {
    setInputs((prevState: any) => ({
      ...prevState,
      five_g: is5G,
    }));
  }, [is5G]);

  useEffect(() => {
    setInputs((prevState: any) => ({
      ...prevState,
      nFC: isNFC,
    }));
  }, [isNFC]);

  // Snackbar
  const [successOpen, setSuccessOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
  };

  // Inputs handler
  const handleChange = (e: any) => {
    if (e.target.name === 'Prezzo' && inputs?.percentuale !== '') {
      setInputs((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.value.replace(/\n/g, ''),
        ['sconto']: Math.round(
          Number(e.target.value.replace(',', '.')) -
            (Number(e.target.value.replace(',', '.')) *
              Number(inputs?.percentuale?.replace(',', '.'))) /
              100
        ).toString(),
      }));
    } else if (e.target.name === 'Prezzo' && inputs?.sconto !== '') {
      setInputs((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.value.replace(/\n/g, ''),
        ['percentuale']: Math.round(
          ((Number(e.target.value.replace(',', '.')) -
            Number(inputs?.sconto?.replace(',', '.'))) /
            Number(e.target.value.replace(',', '.'))) *
            100
        ).toString(),
      }));
    } else if (e.target.name === 'Sconto' && inputs?.prezzo !== '') {
      setInputs((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.value.replace(/\n/g, ''),
        ['percentuale']: Math.round(
          ((Number(inputs?.prezzo?.replace(',', '.')) -
            Number(e.target.value.replace(',', '.'))) /
            Number(inputs?.prezzo?.replace(',', '.'))) *
            100
        ).toString(),
      }));
    } else if (e.target.name === 'Percentuale' && inputs?.prezzo !== '') {
      setInputs((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.value.replace(/\n/g, ''),
        ['sconto']: Math.round(
          Number(inputs?.prezzo?.replace(',', '.')) -
            (Number(inputs?.prezzo?.replace(',', '.')) *
              Number(e.target.value.replace(',', '.'))) /
              100
        ).toString(),
      }));
    } else {
      setInputs((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.type === 'file'
            ? e.target.files[0].name
            : e.target.value.replace(/\n/g, ''),
      }));
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  // Submit Handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSuccessOpen(true);

    const imgref = ref(storage, `immagini/${inputs?.immagine}`);

    image && (await uploadBytes(imgref, image));
    let adjustedInputs =
      inputs &&
      Object.fromEntries(
        Object.entries(inputs)
          .filter(([_, value]) =>
            typeof value === 'string'
              ? (value as string).trim() !== ''
              : typeof value === 'boolean' && value === true
          )
          .map(([key, value]) => [
            key.startsWith('_') ? key.slice(1) : key,
            typeof value === 'string' ? (value as string).trim() : value,
          ])
      );
    await setDoc(doc(db, 'prodotti', `${uuidv4()}`), adjustedInputs);
    router.push('/auth/admin/gestisci');
  };

  return (
    <div className='relative w-full flex flex-col px-6'>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div
          className={`relative max-w-4xl h-[600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 items-center justify-center bg-white content-start md:w-full md:h-2/3 rounded-3xl shadow-lg bg-clip-padding bg-opacity-60 border border-gray-200 overflow-y-scroll  ${styles.card}`}
        >
          {/* Go back */}
          <Link
            key={'Back'}
            href='/auth/admin/gestisci'
            className='flex absolute left-4 top-4 p-1 items-center drop-shadow-lg rounded-full text-black hover:bg-gray-300 hover:shadow-lg '
          >
            <ArrowBackIcon />
          </Link>
          {/* Image field */}
          {!inputs?.immagine ? (
            <div className='flex flex-row w-full items-center justify-center mb-4 lg:mb-0'>
              <div className='w-3/5'>
                <label className={`flex flex-row ${styles.drop_container}`}>
                  <span className={styles.drop_title}>Carica una foto</span>
                  <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='label'
                  >
                    <input
                      required
                      ref={inputRefImage}
                      accept='image/*'
                      type='file'
                      name='immagine'
                      onChange={handleChange}
                      style={{
                        position: 'absolute',
                        clip: 'rect(1px, 1px, 1px, 1px)',
                        padding: 0,
                        border: 0,
                        height: '1px',
                        width: '1px',
                        overflow: 'hidden',
                      }}
                    />
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
          ) : (
            <>
              {
                <div className='flex flex-row w-full items-center justify-center'>
                  <Image
                    src={imageUrl}
                    alt=''
                    className='rounded-xl mb-1 mt-10 shadow-lg shrink-0'
                    width={128}
                    height={128}
                    unoptimized={true}
                  />
                </div>
              }
            </>
          )}

          {/* Description field */}
          <div className='hidden md:flex lg:col-span-2'>
            <Field
              productKey='Descrizione'
              handleChange={handleChange}
              inputs={inputs}
            />
          </div>

          {/* Name field */}
          <Field
            productKey='Nome'
            handleChange={handleChange}
            inputs={inputs}
          />

          {/* Brand field */}
          <Field
            productKey='Marca'
            handleChange={handleChange}
            inputs={inputs}
          />

          {/* Category field */}
          <div className='relative flex flex-row  items-center justify-center py-4'>
            <label
              htmlFor='Categoria'
              className='absolute z-50 top-2 inline-block bg-white px-1 text-xs font-medium text-gray-900'
            >
              Categoria
            </label>
            <select
              required
              defaultValue=''
              id='grouped-native-select'
              name='Categoria'
              onChange={handleChange}
              autoComplete='country-name'
              className='relative block w-[70%] rounded-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            >
              <option aria-label='None' value='' />
              <optgroup label='Elettrodomestici'>
                <option value={'Elettrodomestici/Frigoriferi'}>
                  Frigoriferi
                </option>
                <option value={'Elettrodomestici/Congelatori'}>
                  Congelatori
                </option>
                <option value={'Elettrodomestici/Lavatrici'}>Lavatrici</option>
                <option value={'Elettrodomestici/Asciugatrici'}>
                  Asciugatrici
                </option>
                <option value={'Elettrodomestici/Lavastoviglie'}>
                  Lavastoviglie
                </option>
                <option value={'Elettrodomestici/Forni'}>Forni</option>
                <option value={'Elettrodomestici/Climatizzatori'}>
                  Climatizzatori
                </option>
                <option value={'Elettrodomestici/Ventilatori'}>
                  Ventilatori
                </option>
                <option value={'Elettrodomestici/Stufe'}>Stufe</option>
                <option value={'Elettrodomestici/Asciugatrici'}>
                  Asciugatrici
                </option>
              </optgroup>
              <optgroup label='Telefonia'>
                <option value={'Telefonia/Smartphone e Cellulari'}>
                  Smartphone e Cellulari
                </option>
                <option value={'Cordless'}>Cordless</option>
                <option value={'Cordless/Accessori Telefonia'}>
                  Accessori Telefonia
                </option>
              </optgroup>
              <optgroup label='Televisori'>
                <option value={'Televisori/Televisori'}>Televisori</option>
                <option value={'Televisori/DVD e Blu-ray'}>
                  DVD e Blu-ray
                </option>
                <option value={'Televisori/Accessori Televisori'}>
                  Accessori Televisori
                </option>
              </optgroup>
              <optgroup label='Informatica'>
                <option value={'Informatica/Notebook'}>Notebook</option>
                <option value={'Informatica/Tablet'}>Tablet</option>
                <option value={'Informatica/Accessori Informatica'}>
                  Accessori Informatica
                </option>
              </optgroup>
              <optgroup label='Console e Videogiochi'>
                <option value={'Console e Videogiochi/Console'}>Console</option>
                <option value={'Console e Videogiochi/Videogiochi'}>
                  Videogiochi
                </option>
              </optgroup>
              <optgroup label='Monopattini'>
                <option value={'Monopattini/Monopattini'}>Monopattini</option>
              </optgroup>
            </select>
          </div>

          {/* Description field */}
          <div className='md:hidden'>
            <Field
              productKey='Descrizione'
              handleChange={handleChange}
              inputs={inputs}
            />
          </div>

          {/* Checkboxes */}
          <div className='flex flex-row w-full items-center justify-center py-4'>
            <div className='flex items-center justify-left gap-3'>
              <Switch.Group as='div' className='flex flex-col items-center'>
                <Switch
                  checked={isDualSim}
                  onChange={setIsDualSim}
                  name='dual_sim'
                  className={classNames(
                    isDualSim ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span className='sr-only'>Use setting</span>
                  <span
                    className={classNames(
                      isDualSim ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={classNames(
                        isDualSim
                          ? 'opacity-0 duration-100 ease-out'
                          : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-gray-400'
                        fill='none'
                        viewBox='0 0 12 12'
                      >
                        <path
                          d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span
                      className={classNames(
                        isDualSim
                          ? 'opacity-100 duration-200 ease-in'
                          : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-indigo-600'
                        fill='currentColor'
                        viewBox='0 0 12 12'
                      >
                        <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                      </svg>
                    </span>
                  </span>
                </Switch>
                <Switch.Label as='p' className='text-sm'>
                  <span className='font-medium text-xs text-gray-900'>
                    Dual Sim
                  </span>
                </Switch.Label>
              </Switch.Group>

              <Switch.Group as='div' className='flex flex-col items-center'>
                <Switch
                  checked={is5G}
                  onChange={setIs5G}
                  name='dual_sim'
                  className={classNames(
                    is5G ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span className='sr-only'>Use setting</span>
                  <span
                    className={classNames(
                      is5G ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={classNames(
                        is5G
                          ? 'opacity-0 duration-100 ease-out'
                          : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-gray-400'
                        fill='none'
                        viewBox='0 0 12 12'
                      >
                        <path
                          d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span
                      className={classNames(
                        is5G
                          ? 'opacity-100 duration-200 ease-in'
                          : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-indigo-600'
                        fill='currentColor'
                        viewBox='0 0 12 12'
                      >
                        <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                      </svg>
                    </span>
                  </span>
                </Switch>
                <Switch.Label as='p' className='text-sm'>
                  <span className='font-medium text-xs text-gray-900'>5G</span>
                </Switch.Label>
              </Switch.Group>

              <Switch.Group as='div' className='flex flex-col items-center'>
                <Switch
                  checked={isNFC}
                  onChange={setIsNFC}
                  name='dual_sim'
                  className={classNames(
                    isNFC ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span className='sr-only'>Use setting</span>
                  <span
                    className={classNames(
                      isNFC ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={classNames(
                        isNFC
                          ? 'opacity-0 duration-100 ease-out'
                          : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-gray-400'
                        fill='none'
                        viewBox='0 0 12 12'
                      >
                        <path
                          d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span
                      className={classNames(
                        isNFC
                          ? 'opacity-100 duration-200 ease-in'
                          : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-indigo-600'
                        fill='currentColor'
                        viewBox='0 0 12 12'
                      >
                        <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                      </svg>
                    </span>
                  </span>
                </Switch>
                <Switch.Label as='p' className='text-sm'>
                  <span className='font-medium text-xs text-gray-900'>NFC</span>
                </Switch.Label>
              </Switch.Group>
            </div>
          </div>

          {/* Optional fields */}
          {optionalInputs.map((key) => (
            <Field
              key={key}
              productKey={key}
              handleChange={handleChange}
              inputs={inputs}
            />
          ))}

          <Field
            productKey='Prezzo'
            handleChange={handleChange}
            inputs={inputs}
          />

          <Field
            productKey='Sconto'
            handleChange={handleChange}
            inputs={inputs}
          />

          <Field
            productKey='Percentuale'
            handleChange={handleChange}
            inputs={inputs}
          />
        </div>

        {/* Add product button */}
        <div className='flex flex-col mt-4 items-center justify-center gap-2'>
          <button
            type='submit'
            className='flex mx-auto p-4 items-center drop-shadow-lg text-white bg-green-400 rounded-full ring-2 ring-green-500 shadow-lg hover:ring-2 hover:ring-green-700 hover:bg-green-500'
          >
            <SendIcon />
          </button>
          <p className='font-light'>Aggiungi prodotto</p>
        </div>
      </form>

      {/* Snackbar for success */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Prodotto aggiunto
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddProduct;
