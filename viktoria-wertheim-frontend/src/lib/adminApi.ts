import { AuthService } from './auth';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface CreateMemberData {
  // User-Daten
  username: string;
  email: string;
  password: string;
  // Mitglied-Daten
  vorname: string;
  nachname: string;
  telefon?: string;
  geburtsdatum?: string;
  mitgliedstyp: 'spieler' | 'trainer' | 'fan' | 'familie' | 'ehrenmitglied' | 'funktionaer';
  benutzerrolle?: 'mitglied' | 'spieler' | 'trainer' | 'admin' | 'vorstand';
  mitgliedsnummer?: string;
  beitrittsdatum?: string;
  adresse?: {
    strasse: string;
    hausnummer: string;
    plz: string;
    ort: string;
    land: string;
  };
  notfallkontakt?: {
    name: string;
    telefon: string;
    beziehung: string;
  };
  bemerkungen?: string;
}

interface MemberWithUser {
  id: number;
  mitgliedsnummer: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string;
  geburtsdatum?: string;
  mitgliedstyp: string;
  benutzerrolle: string;
  mitgliedsstatus: string;
  beitrittsdatum: string;
  adresse?: any;
  notfallkontakt?: any;
  user?: {
    id: number;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    role: {
      id: number;
      name: string;
      type: string;
    };
  };
}

export const adminApi = {
  // Erstelle neues Mitglied mit User-Account
  async createMemberWithUser(data: CreateMemberData) {
    const token = AuthService.getToken();
    
    const response = await fetch(`${API_URL}/api/mitglieds/createMemberWithUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Fehler beim Erstellen des Mitglieds');
    }

    return response.json();
  },

  // Hole alle Mitglieder mit User-Informationen
  async getAllMembersWithUsers(): Promise<{ success: boolean; members: MemberWithUser[] }> {
    const token = AuthService.getToken();
    
    const response = await fetch(`${API_URL}/api/mitglieds/getAllMembersWithUsers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Mitglieder');
    }

    return response.json();
  },

  // Lösche Mitglied mit User-Account
  async deleteMemberWithUser(id: number) {
    const token = AuthService.getToken();
    
    const response = await fetch(`${API_URL}/api/mitglieds/${id}/deleteMemberWithUser`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Fehler beim Löschen des Mitglieds');
    }

    return response.json();
  },
};

export type { CreateMemberData, MemberWithUser }; 