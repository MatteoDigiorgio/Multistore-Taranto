import React from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import Arrow from "../../../public/Arrow.json";

function Story({ storyRef }: { storyRef: any }) {
  return (
    <div
      ref={storyRef}
      className="flex flex-col w-full max-w-7xl mx-auto gap-8 p-8 -mt-4"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col lg:flex-row items-center">
          <Image
            src={"/clients.png"}
            title="Clients"
            alt="Clients"
            className={`flex w-3/4 -z-10 mx-auto cursor-ev`}
            width={512}
            height={512}
            loading="eager"
            priority={true}
          />
          <div className="relative m-auto flex flex-col bg-white p-7 justify-center items-center rounded-2xl shadow-lg bg-clip-padding bg-opacity-40 border border-gray-200">
            <p className="justify-center items-center text-center text-sm md:text-xl text-gray-700">
              La nostra realtà nasce nel 2013. Siamo un punto di riferimento
              nella città di Taranto per tutti coloro che cercano telefoni,
              lavatrici, televisori, frigoriferi e molti altri elettrodomestici
              di alta qualità. Da noi troverai una vasta selezione di prodotti,
              accuratamente scelti per soddisfare le tue esigenze tecnologiche.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row-reverse gap-4">
          <Lottie
            animationData={Arrow}
            className="flex w-40 -rotate-45 lg:rotate-0 lg:w-64 mx-auto items-start"
          />
          <div className="relative m-auto max-w-xl flex flex-col bg-white p-7 justify-center items-center rounded-2xl shadow-lg bg-clip-padding bg-opacity-40 border border-gray-200">
            <p className="justify-center items-center text-center text-sm md:text-xl">
              Siamo appassionati della tecnologia e ci impegniamo per offrirti
              le ultime novità sul mercato, garantendo prestazioni e
              affidabilità. Presso il Multistore Taranto, la nostra priorità è
              la soddisfazione del cliente. Il nostro team di esperti è a tua
              disposizione per fornirti consulenza personalizzata, guidandoti
              nella scelta dei prodotti più adatti alle tue necessità e al tuo
              stile di vita.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <Image
            src={"/woman_mac.png"}
            title="Woman"
            alt="Woman"
            className={`flex w-3/4 -z-10 mx-auto cursor-ev`}
            width={512}
            height={512}
            loading="eager"
            priority={true}
          />
          <div className="relative m-auto flex flex-col bg-white p-7 justify-center items-center rounded-2xl shadow-lg bg-clip-padding bg-opacity-40 border border-gray-200">
            <p className="justify-center items-center text-center text-sm md:text-xl">
              Ci impegniamo a offrire un&apos;esperienza di acquisto piacevole e
              senza stress, con un ambiente accogliente e cordiale. Siamo
              orgogliosi di fornire un servizio post-vendita affidabile,
              garantendo il supporto necessario anche dopo l&apos;acquisto.
              Scegli il Multistore Taranto per tutte le tue esigenze di
              elettronica. Siamo qui per rendere la tua esperienza di acquisto
              unica e soddisfacente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Story;
