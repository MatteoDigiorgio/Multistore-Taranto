'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Prodotto } from '@/types';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getProduct } from '@/pages/api/auth/getProducts';
import styles from './Prodotto.module.css';
import Link from 'next/link';
import db, { storage } from '@/firebase';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import Image from 'next/image';
import { Switch } from '@headlessui/react';
import { optionalInputs } from '../../../../../global_data';
import { ref, uploadBytes } from 'firebase/storage';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Field = ({
  productKey,
  value,
  handleChange,
}: {
  productKey: string;
  value: any;
  handleChange: any;
}) => {
  productKey = productKey.charAt(0).toUpperCase() + productKey.slice(1);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.setCustomValidity(
        value === '' && productKey !== 'Sconto' && productKey !== 'Percentuale'
          ? 'Campo necessario!'
          : ''
      );
    }
    if (productKey === 'Prezzo' || productKey === 'Sconto') {
      if (inputRef.current !== null && value !== '') {
        const pattern = /^[0-9]+,[0-9]+$/;
        const inputValue = inputRef.current.value;

        inputRef.current.setCustomValidity(
          !pattern.test(inputValue) ? 'Deve seguire il formato 123,45' : ''
        );
      }
    }
  }, [value, productKey]);

  return (
    <>
      {productKey !== 'Prezzo' &&
      productKey !== 'Sconto' &&
      productKey !== 'Percentuale' ? (
        productKey === 'Nome' ||
        productKey === 'Marca' ||
        productKey === 'Descrizione' ? (
          // Required field
          <div className='flex flex-row w-full items-center justify-center'>
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
                value={value}
                onChange={handleChange}
                id={productKey}
                className='block w-[70%] rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder=''
              />
            </div>
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
              name={productKey}
              onChange={handleChange}
              id={productKey}
              value={value}
              className='block w-[70%] rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder=''
            />
          </div>
        )
      ) : (
        <div className='flex flex-row w-full items-center justify-center'>
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
                id={
                  productKey === 'Prezzo'
                    ? 'Prezzo di listino'
                    : productKey === 'Sconto'
                    ? 'Prezzo scontato'
                    : 'Percentuale sconto'
                }
                className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder={`${
                  productKey === 'Prezzo' || productKey === 'Sconto'
                    ? '0.00'
                    : '0'
                }`}
                value={value}
                aria-describedby='price-currency'
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function Product({ params }: any) {
  interface Product {
    [key: string]: string | boolean;
  }
  const [initialProdotto, setInitialProdotto] = useState<Product>();
  const [prodotto, setProdotto] = useState<Prodotto>();

  const [image, setImage] = useState();
  const [immaginiUrl, setImmaginiUrl] = useState();
  const [isDualSim, setIsDualSim] = useState(
    prodotto?.dual_sim ? prodotto?.dual_sim : false
  );
  const [isSecondHand, setIsSecondHand] = useState(
    prodotto?.usato ? prodotto?.usato : false
  );
  const [isRefurbished, setIsRefurbished] = useState(
    prodotto?.ricondizionato ? prodotto?.ricondizionato : false
  );
  const [is5G, setIs5G] = useState(prodotto?.five_g ? prodotto?.five_g : false);
  const [isNFC, setIsNFC] = useState(prodotto?.nfc ? prodotto?.nfc : false);

  const excludeKeys = [
    'nome',
    'marca',
    'categoria',
    'descrizione',
    'immagini',
    'prezzo',
    'sconto',
    'percentuale',
  ];

  const router = useRouter();

  useEffect(() => {
    async function fetchData(params: any) {
      const prodottiData = await getProduct(params.id);
      prodottiData ? setImmaginiUrl(prodottiData.immaginiUrl) : null;
      delete prodottiData.immaginiUrl;
      prodottiData ? setProdotto(prodottiData) : null;
      prodottiData ? setInitialProdotto(prodottiData) : null;
      prodottiData ? setIsSecondHand(prodottiData.secondHand) : null;
      prodottiData ? setIsRefurbished(prodottiData.ricondizionato) : null;
      prodottiData ? setIs5G(prodottiData.five_g) : null;
      prodottiData ? setIsNFC(prodottiData.nfc) : null;
      prodottiData ? setIsDualSim(prodottiData.dual_sim) : null;
    }
    fetchData(params);
  }, []);

  useEffect(() => {
    setProdotto((prevState: any) => ({
      ...prevState,
      dual_sim: isDualSim,
    }));
  }, [isDualSim]);

  useEffect(() => {
    setProdotto((prevState: any) => ({
      ...prevState,
      five_g: is5G,
    }));
  }, [is5G]);

  useEffect(() => {
    setProdotto((prevState: any) => ({
      ...prevState,
      nfc: isNFC,
    }));
  }, [isNFC]);

  useEffect(() => {
    setProdotto((prevState: any) => ({
      ...prevState,
      usato: isSecondHand,
    }));
  }, [isSecondHand]);

  useEffect(() => {
    setProdotto((prevState: any) => ({
      ...prevState,
      ricondizionato: isRefurbished,
    }));
  }, [isRefurbished]);

  const handleChange = (e: any) => {
    if (
      e.target.name === 'Prezzo' &&
      prodotto?.percentuale !== null &&
      prodotto?.percentuale !== undefined
    ) {
      setProdotto((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.value.replace(/\n/g, ''),
        ['sconto']: Math.round(
          Number(e.target.value.replace(',', '.')) -
            (Number(e.target.value.replace(',', '.')) *
              Number(prodotto?.percentuale?.replace(',', '.'))) /
              100
        ).toString(),
      }));
    } else if (
      e.target.name === 'Prezzo' &&
      prodotto?.sconto !== null &&
      prodotto?.sconto !== undefined
    ) {
      setProdotto((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.value.replace(/\n/g, ''),
        ['percentuale']: Math.round(
          ((Number(e.target.value.replace(',', '.')) -
            Number(prodotto?.sconto?.replace(',', '.'))) /
            Number(e.target.value.replace(',', '.'))) *
            100
        ).toString(),
      }));
    } else if (e.target.name === 'Sconto' && prodotto?.prezzo !== null) {
      setProdotto((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.value.replace(/\n/g, ''),
        ['percentuale']: Math.round(
          ((Number(prodotto?.prezzo?.replace(',', '.')) -
            Number(e.target.value.replace(',', '.'))) /
            Number(prodotto?.prezzo?.replace(',', '.'))) *
            100
        ).toString(),
      }));
    } else if (e.target.name === 'Percentuale' && prodotto?.prezzo !== null) {
      setProdotto((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.value.replace(/\n/g, ''),
        ['sconto']: Math.round(
          Number(prodotto?.prezzo?.replace(',', '.')) -
            (Number(prodotto?.prezzo?.replace(',', '.')) *
              Number(e.target.value.replace(',', '.'))) /
              100
        ).toString(),
      }));
    } else {
      setProdotto((prevState: any) => ({
        ...prevState,
        [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
          e.target.type === 'file'
            ? e.target.files[0].name
            : e.target.value.replace(/\n/g, ''),
      }));
    }
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      // setImmaginiUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDeleteProduct = async (e: any) => {
    setMessage('Prodotto eliminato.');
    setSeverity('success');
    setOpen(true);
    e.preventDefault();
    await deleteDoc(doc(db, 'prodotti', `${params.id}`));
    setTimeout(() => {
      router.push('/auth/admin/gestisci');
    }, 1000);
  };

  const handleEditProduct = async (e: any) => {
    e.preventDefault();
    const hasChanged =
      JSON.stringify(prodotto) !== JSON.stringify(initialProdotto);

    if (hasChanged) {
      setMessage('Prodotto modificato');
      setSeverity('success');
      setOpen(true);
      if (prodotto) {
        const imgref = ref(storage, `immagini/${prodotto?.immagini}`);

        image && (await uploadBytes(imgref, image));
        let adjustedInputs: any = Object.fromEntries(
          Object.entries(prodotto)
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

        await setDoc(doc(db, 'prodotti', `${params.id}`), adjustedInputs);
        setTimeout(() => {
          router.push('/auth/admin/gestisci');
        }, 1000);
      }
    } else {
      setMessage('Nessuna modifica');
      setSeverity('warning');
      setOpen(true);
    }
  };

  // Snackbar
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [message, setMessage] = useState('');

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <div className='relative m-auto flex flex-col'>
      <form onSubmit={handleEditProduct}>
        <Link
          key={'Back'}
          href='/auth/admin/gestisci'
          className='flex absolute left-4 top-4 p-1 items-center drop-shadow-lg rounded-full text-black hover:bg-gray-300 hover:shadow-lg '
        >
          <ArrowBackIcon />
        </Link>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto p-4 items-center justify-center bg-white h-[28rem] w-80 content-start md:w-full md:h-2/3 rounded-3xl shadow-lg bg-clip-padding bg-opacity-60 border border-gray-200 overflow-y-scroll ${styles.card}`}
        >
          {prodotto?.immagini?.map((imageName, index) => (
            <>
              <div
                key={index}
                className='flex flex-col w-full items-center justify-center'
              >
                <Image
                  key={'Image'}
                  src={immaginiUrl ? immaginiUrl[index] : ''}
                  alt={imageName}
                  className='w-40 max-h-40 p-2 aspect-auto object-contain bg-white rounded-xl'
                  width={64}
                  height={64}
                  unoptimized={true}
                />
                {index === 0 ? (
                  <p>Prima Immagine</p>
                ) : index === 1 ? (
                  <p>Seconda Immagine</p>
                ) : index === 2 ? (
                  <p>Terza Immagine</p>
                ) : null}
                <label
                  className={`flex flex-row items-center gap-1 p-2 px-4 my-4 rounded-xl ring-2 ring-gray-400 bg-gray-200 shadow-lg hover:ring-2 hover:ring-black hover:bg-yellow-400 cursor-pointer text-sm ${styles.drop_container}`}
                >
                  <span className={styles.drop_title}>Cambia Immagine</span>
                  <input
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
                </label>
              </div>
            </>
          ))}

          <div className='hidden md:flex lg:col-span-2'>
            <Field
              key={'Descrizione'}
              productKey='Descrizione'
              value={
                typeof prodotto?.descrizione === 'string'
                  ? prodotto.descrizione
                  : ''
              }
              handleChange={handleChange}
            />
          </div>

          <Field
            key={'Nome'}
            productKey='Nome'
            value={typeof prodotto?.nome === 'string' ? prodotto.nome : ''}
            handleChange={handleChange}
          />
          <Field
            key={'Marca'}
            productKey='Marca'
            value={typeof prodotto?.marca === 'string' ? prodotto.marca : ''}
            handleChange={handleChange}
          />

          <div className='relative flex flex-row w-full items-center justify-center py-4'>
            <label
              htmlFor='Categoria'
              className='absolute z-50 top-2 inline-block bg-white px-1 text-xs font-medium text-gray-900'
            >
              Categoria
            </label>
            <select
              required
              value={prodotto?.categoria}
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

          <div className='md:hidden'>
            <Field
              key={'Descrizione'}
              productKey='Descrizione'
              value={
                typeof prodotto?.descrizione === 'string'
                  ? prodotto.descrizione
                  : ''
              }
              handleChange={handleChange}
            />
          </div>

          {/* Switches */}
          <div className='flex flex-row items-center justify-center py-4'>
            <div className='flex flex-wrap max-w-[200px] items-center justify-center gap-3'>
              <Switch.Group as='div' className='flex flex-col items-center'>
                <Switch
                  checked={isSecondHand}
                  onChange={setIsSecondHand}
                  name='usato'
                  className={classNames(
                    isSecondHand ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span className='sr-only'>Use setting</span>
                  <span
                    className={classNames(
                      isSecondHand ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={classNames(
                        isSecondHand
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
                        isSecondHand
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
                    Usato
                  </span>
                </Switch.Label>
              </Switch.Group>

              <Switch.Group as='div' className='flex flex-col items-center'>
                <Switch
                  checked={isRefurbished}
                  onChange={setIsRefurbished}
                  name='usato'
                  className={classNames(
                    isRefurbished ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span className='sr-only'>Use setting</span>
                  <span
                    className={classNames(
                      isRefurbished ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={classNames(
                        isRefurbished
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
                        isRefurbished
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
                    Ricondizionato
                  </span>
                </Switch.Label>
              </Switch.Group>

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

          {initialProdotto && (
            <>
              {Object.entries(initialProdotto).map(([key, value]) => (
                <>
                  <React.Fragment key={key}>
                    {!excludeKeys.includes(key) && typeof value === 'string' ? (
                      <>
                        <Field
                          productKey={key}
                          handleChange={handleChange}
                          value={
                            prodotto && prodotto[key as keyof typeof prodotto]
                          }
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                </>
              ))}
              {optionalInputs.map((key) => (
                <>
                  <React.Fragment key={key.toLowerCase()}>
                    {!initialProdotto.hasOwnProperty(key.toLowerCase()) && (
                      <Field
                        productKey={key.toLowerCase()}
                        handleChange={handleChange}
                        value={undefined}
                      />
                    )}
                  </React.Fragment>
                </>
              ))}
            </>
          )}

          <Field
            key={'Prezzo'}
            productKey='Prezzo'
            value={typeof prodotto?.prezzo === 'string' ? prodotto.prezzo : ''}
            handleChange={handleChange}
          />

          <Field
            key={'Sconto'}
            productKey='Sconto'
            value={typeof prodotto?.sconto === 'string' ? prodotto.sconto : ''}
            handleChange={handleChange}
          />

          <Field
            key={'Percentuale'}
            productKey='Percentuale'
            value={
              typeof prodotto?.percentuale === 'string'
                ? prodotto.percentuale
                : ''
            }
            handleChange={handleChange}
          />
        </div>

        <div
          key={'Buttons'}
          className='flex flex-row mt-4 items-center justify-center gap-2'
        >
          <div>
            <button
              type='button'
              onClick={handleDeleteProduct}
              className='flex mx-auto p-4 items-center drop-shadow-lg text-white bg-red-400 rounded-full ring-2 ring-red-500 shadow-lg hover:ring-2 hover:ring-red-700 hover:bg-red-500'
            >
              <ClearIcon key={'Delete'} />
            </button>
            <p className='font-light w-20 text-center mt-2'>
              Cancella prodotto
            </p>
          </div>
          <div key={'Update'}>
            <button
              type='submit'
              className='flex mx-auto p-4 items-center drop-shadow-lg text-white bg-yellow-400 rounded-full ring-2 ring-yellow-500 shadow-lg hover:ring-2 hover:ring-yellow-700 hover:bg-yellow-500'
            >
              <SendIcon key={'Update'} />
            </button>
            <p className='font-light w-20 text-center mt-2'>
              Aggiorna prodotto
            </p>
          </div>
        </div>
      </form>

      {/* Snackbar for delete */}
      <Snackbar
        key={'Snackbar'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Product;
