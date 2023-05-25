import { Prodotto } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Prodotti({ prodotti }: { prodotti: Array<Prodotto> | undefined }) {
  return (
    <>
      {prodotti?.map((product) => (
        <>
          <Link
            href={`/auth/admin/gestisci/${product.id}`}
            className="flex flex-row items-center h-16 justify-between mx-8 my-4 hover:bg-gray-300 hover:rounded-lg hover:cursor-pointer"
          >
            <Image
              src={product.immagine}
              alt="Prodotto"
              className="h-16 w-16 rounded-full mb-1 shadow-lg shrink-0"
              width={64}
              height={64}
            />
            <div className="items-center">
              <p className="mx-2 line-clamp-2 justify-center text-center">
                {product.nome}
              </p>
            </div>
            <p className="shrink-0 italic font-bold text-xs">
              {product.prezzo} €
            </p>
          </Link>
        </>
      ))}
    </>
  );
}

export default Prodotti;
