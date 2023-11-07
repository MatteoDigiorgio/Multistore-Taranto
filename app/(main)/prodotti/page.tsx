'use client';
import React, { useEffect, useState } from 'react';
import Products from './(products)/Products';
import { Prodotto } from '@/types';
import { getFilterProducts, getProducts } from '@/pages/api/auth/getProducts';
import MyLoading from '../MyLoading';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '@/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Lottie from 'lottie-react';
import Product404 from '../../../public/Product404.json';
import { clear, selectSearchValue } from '../../../slices/searchSlice';

function ProductsPage() {
  const inputValue = useSelector(selectSearchValue);
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Prodotto[]>();

  useEffect(() => {
    async function fetchData() {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          signInAnonymously(auth);
        }
        if (user) {
          if (inputValue !== '') {
            const productsFilterData = await getFilterProducts(inputValue);
            setProducts(productsFilterData);
          } else {
            const productsData = await getProducts();
            setProducts(productsData);
          }
        }
      });
    }
    fetchData();
  }, [inputValue]);
  console.log(products);
  return (
    <>
      <div className="fixed bg-[url('/waves_bottom.svg')] bg-cover h-screen w-screen z-0"></div>
      <div className='flex justify-center flex-grow z-10'>
        <div className='mx-auto'>
          {products ? (
            <>
              {inputValue && (
                <div className='mt-40 md:mt-28 w-full flex justify-center'>
                  <h1
                    onClick={() => dispatch(clear())}
                    className='flex items-center pl-4 pr-2 p-2 gap-1 rounded-full bg-zinc-300 border border-gray-400 font-medium text-xl cursor-pointer'
                  >
                    {inputValue}
                    <XMarkIcon height={24} />
                  </h1>
                </div>
              )}
              <div
                className={`grid  ${
                  products.length === 1 ? 'grid-cols-1' : ''
                } grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-8 sm:gap-y-6 mx-4 mb-4 ${
                  inputValue ? 'mt-10' : 'mt-40 md:mt-28'
                } ${products.length === 0 && 'mt-0'}`}
              >
                <Products products={products} />
              </div>
              {products.length === 0 && inputValue && (
                <div className='flex flex-col justify-center items-center mx-10 -mt-20 -z-10'>
                  <Lottie
                    animationData={Product404}
                    className='flex w-full sm:w-1/2 lg:w-1/3 -z-10'
                  />
                  <p className='text-base font-mono font-light text-center md:mx-40 md:text-lg xl:mx-80'>
                    La ricerca del prodotto non è andata a buon fine in quanto
                    non è attualmente disponibile presso il nostro negozio. Ci
                    scusiamo per l&apos;inconveniente. Tuttavia, potrebbe
                    essersi verificato un errore nella digitazione del nome del
                    prodotto.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className='flex justify-center items-center h-screen'>
              <MyLoading />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
