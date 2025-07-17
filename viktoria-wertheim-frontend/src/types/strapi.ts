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
    position: 'torwart' | 'abwehr' | 'mittelfeld' | 'sturm';
    rueckennummer?: number;
    tore_saison: number;
    spiele_saison: number;
    gelbe_karten?: number;
    rote_karten?: number;
    status?: 'aktiv' | 'verletzt' | 'gesperrt' | 'pausiert' | 'inaktiv';
    hauptposition?: string;
    assists?: number;
    einsatzminuten?: number;
    spielerfoto?: {
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
    mitglied?: {
      data: {
        id: number;
        attributes: {
          vorname: string;
          nachname: string;
          email: string;
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
    heimmannschaft?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    auswaertsmannschaft?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    tore_heim?: number;
    tore_auswaerts?: number;
    spielort?: string;
    liga?: string;
    spieltag?: number;
    saison?: string;
    status: 'geplant' | 'live' | 'beendet' | 'abgesagt' | 'verschoben';
    spielbericht?: string;
    zuschauer?: number;
    wetter?: 'sonnig' | 'bewoelkt' | 'regen' | 'schnee' | 'wind';
    schiedsrichter?: string;
    bemerkungen?: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
} 