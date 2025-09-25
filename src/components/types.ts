export type Foto = {
  url: string;
};

export type Colla = {
  nom: string;
  id: number;
};

export type TipusCastell = { nomCurt: string; nomLlarg: string };

export type Castell = {
  nom: string;
  resultat: string;
  id: number;
  actuacioId: number;
  collaId: number;
  tipusId: number;
  tipusCastell: TipusCastell;
};

export type Ciutat = {
  nom: string;
  coords: null;
  id: number;
};

export type ActuacioT = {
  id: number;
  data: string;
  nom: string;
  dataHora: string | null;
  ciutat: Ciutat;
  lloc: string | null;
  castells: Castell[];
  temporadaId: number;
  colles: Colla[];
  colles2: Colla[];
  fotos: Foto[];
};

export type TemporadaT = { actuacions: ActuacioT[]; year: number; id: number };
