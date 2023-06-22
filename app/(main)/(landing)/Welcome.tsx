import React from "react";
import Link from "next/link";

function Welcome() {
  return (
    <div className="flex flex-col w-full gap-8 p-8 md:p-24 bg-[#009473] -translate-y-[0.5px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-4">
        <h1 className="flex whitespace-pre justify-center items-start text-white font-bold text-2xl md:text-4xl text-center">
          Benvenuto in {"\n"}Multistore Taranto!
        </h1>
        <h2 className="justify-center items-center text-white text-justify text-sm md:text-xl">
          Scopri le più recenti novità nel campo della tecnologia e i servizi
          offerti comodamente da casa tua. Siamo il tuo negozio locale ricco di
          prodotti informatici di qualità, smartphone, televisori, dispositivi
          audio e molto altro ancora! Nonostante non sia possibile effettuare
          acquisti online, rimarrai colpito dalla vasta gamma di prodotti
          disponibili nel nostro negozio fisico.
        </h2>
      </div>
      <Link
        href={"/prodotti"}
        className="mx-auto px-5 py-2 rounded-full bg-[#2DAAE1] text-white font-semibold text-sm md:text-lg shadow-md"
      >
        Visita il Catalogo
      </Link>
    </div>
  );
}

export default Welcome;
