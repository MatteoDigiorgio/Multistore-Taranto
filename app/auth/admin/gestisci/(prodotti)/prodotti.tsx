import { Prodotto } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Prodotti({ prodotti }: { prodotti: Array<Prodotto> | undefined }) {
  return (
    <>
      {prodotti?.map((product) => (
        <div key={product.id} className="border-[1px]">
          <Link
            href={`/auth/admin/gestisci/${product.id}`}
            className="flex flex-row items-center h-16 justify-between mx-6 my-4 hover:bg-gray-300 hover:rounded-xl hover:cursor-pointer"
          >
            <div className="h-16 w-16 bg-white rounded-xl shadow-lg shrink-0">
              <Image
                src={product.immagine}
                alt="Prodotto"
                className="h-16 p-2 aspect-auto object-contain bg-white rounded-xl "
                width={64}
                height={64}
                unoptimized={true}
              />
            </div>
            <div className="items-center">
              <p className="mx-2 line-clamp-2 justify-center text-center">
                {product.nome}
              </p>
            </div>
            <div className="items-center shrink-0">
              <p className="shrink-0 italic font-bold text-xs">
                {product.prezzo} €
              </p>
              {product.sconto && (
                <p className="shrink-0 italic font-light text-xs">
                  {product.sconto} €
                </p>
              )}
              {product.percentuale && (
                <p className="shrink-0 italic font-light text-xs">
                  - {product.percentuale} %
                </p>
              )}
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Prodotti;
