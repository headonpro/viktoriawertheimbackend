export interface NewsArtikel {
  id: number;
  attributes: {
    titel: string;
    inhalt: string;
    datum: string;
    titelbild?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
        };
      };
    };
    kategory?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Kategorie {
  id: number;
  attributes: {
    name: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Spieler {
  id: number;
  attributes: {
    vorname: string;
    nachname: string;
    position: 'Torwart' | 'Abwehr' | 'Mittelfeld' | 'Sturm';
    rueckennummer?: number;
    tore: number;
    spiele: number;
    foto?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
        };
      };
    };
    mannschaft?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Mannschaft {
  id: number;
  attributes: {
    name: string;
    trainer?: string;
    liga?: string;
    teamfoto?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
        };
      };
    };
    spielers?: {
      data: Spieler[];
    };
    spiele?: {
      data: Spiel[];
    };
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Spiel {
  id: number;
  attributes: {
    datum: string;
    heimmannschaft: string;
    auswaertsmannschaft: string;
    toreHeim?: number;
    toreAuswaerts?: number;
    spielort?: string;
    liga?: string;
    isHeimspiel: boolean;
    status: 'geplant' | 'live' | 'beendet' | 'abgesagt';
    mannschaft?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
} 