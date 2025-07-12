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
    kategorie?: {
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
    ligazugehoerigkeit?: string;
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
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
} 