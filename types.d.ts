export interface Prodotto {
  id: string;
  nome: string | null;
  marca: string | null;
  categoria: string | null;
  descrizione: string | null;
  immagine: string | null;
  dual_Sim: boolean;
  _5G: boolean;
  nFC: boolean;
  prezzo: string | null;
  sconto?: string | null;
  percentuale?: string | null;
}
