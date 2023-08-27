export interface Prodotto {
  id: string;
  nome: string;
  marca: string;
  categoria: string;
  descrizione: string;
  immagine: string;
  dual_Sim: boolean;
  _5G: boolean;
  nFC: boolean;
  prezzo: string;
  sconto?: string;
  percentuale?: string;
}
