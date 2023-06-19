import React from "react";
import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import GoogleMaps from "./(landing)/GoogleMaps";
import Logo from "./(landing)/Logo";

export default function Home(): ReactElement {
  return (
    <>
      <div className="bg-white flex justify-center flex-grow z-0">
        <main className="w-full">
          <div className="flex flex-col w-full">
            <div className="z-10 flex pt-2 justify-center items-center xs:gap-12 font-mono text-gray-400 font-thin text-sm md:text-base cursor-pointer text-center">
              <button>La Nostra Storia</button>
              <button>Prodotti & Servizi</button>
              <button>Dove Trovarci</button>
            </div>
            <div className="relative w-full">
              <Logo />
              <div className="w-full">
                <Image
                  src={"/waves_bottom.svg"}
                  alt=""
                  className={`w-full aspect-video`}
                  width={128}
                  height={80}
                  loading="eager"
                  priority={true}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-8 p-8 md:p-24 bg-[#009473] -translate-y-[0.5px] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <h1 className="flex whitespace-pre justify-center items-start text-white font-bold text-2xl md:text-4xl text-center">
                  Benvenuto in {"\n"}Multistore Taranto!
                </h1>
                <h2 className="justify-center items-center text-white text-justify text-sm md:text-xl">
                  Scopri le più recenti novità nel campo della tecnologia e i
                  servizi offerti comodamente da casa tua. Siamo il tuo negozio
                  locale ricco di prodotti informatici di qualità, smartphone,
                  televisori, dispositivi audio e molto altro ancora! Nonostante
                  non sia possibile effettuare acquisti online, rimarrai colpito
                  dalla vasta gamma di prodotti disponibili nel nostro negozio
                  fisico.
                </h2>
              </div>
              <Link
                href={"/prodotti"}
                className="mx-auto px-5 py-2 rounded-full bg-[#2DAAE1] text-white font-semibold text-sm md:text-lg shadow-md"
              >
                Visita il Catalogo
              </Link>
            </div>
            <Image
              src={"/waves_top.svg"}
              alt=""
              className={`w-full -translate-y-[1px] overflow-hidden border-0`}
              width={128}
              height={80}
              loading="eager"
              priority={true}
            />
            <div className="flex flex-col w-full gap-8 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
                <h1 className="flex whitespace-pre justify-center md:justify-end items-start font-bold text-2xl md:text-4xl text-center">
                  Dove Siamo 📍
                </h1>
                <h2 className="flex justify-center md:justify-start items-center text-center text-sm md:text-xl whitespace-pre">
                  Ci puoi trovare in{"\n"}Viale Liguria, 40/A, 74121 Taranto TA
                </h2>
              </div>
            </div>
            <div className="h-80 m-4">
              <GoogleMaps />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
