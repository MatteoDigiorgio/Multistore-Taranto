export interface Prodotto {
  id: string;
  nome: string;
  marca: string;
  categoria: string;
  descrizione: string;
  immagine: string;
  dual_sim: boolean;
  five_g: boolean;
  nfc: boolean;
  prezzo: string;
  sconto?: string;
  percentuale?: string;
}
