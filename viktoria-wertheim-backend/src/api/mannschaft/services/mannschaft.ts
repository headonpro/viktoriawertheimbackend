/**
 * mannschaft service
 */

export default {
  
  // Service-Methoden für Mannschaft-spezifische Geschäftslogik
  
  async getTeamStatistics(teamId: number) {
    // Placeholder für Team-Statistiken
    // Wird später implementiert wenn Spieler und Spiele Content Types existieren
    try {
      const team = await strapi.db.query('api::mannschaft.mannschaft').findOne({
        where: { id: teamId },
        populate: {
          trainer: true,
          teamfoto: true
        }
      });

      return {
        team,
        // Später: Spiele, Punkte, Tore, etc.
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0
      };
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Team-Statistiken: ${error.message}`);
    }
  },

  async validateTeamData(data: any) {
    const errors: string[] = [];

    // Name validieren
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Team-Name muss mindestens 2 Zeichen lang sein');
    }

    // Gründungsjahr validieren
    if (data.gruendungsjahr) {
      const currentYear = new Date().getFullYear();
      if (data.gruendungsjahr < 1900 || data.gruendungsjahr > currentYear) {
        errors.push(`Gründungsjahr muss zwischen 1900 und ${currentYear} liegen`);
      }
    }

    // Altersklasse validieren
    const validAgeGroups = ['senioren', 'a-jugend', 'b-jugend', 'c-jugend', 'd-jugend', 'e-jugend', 'f-jugend', 'bambini'];
    if (data.altersklasse && !validAgeGroups.includes(data.altersklasse)) {
      errors.push('Ungültige Altersklasse angegeben');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  async findTeamsByTrainer(trainerId: number) {
    try {
      const teams = await strapi.db.query('api::mannschaft.mannschaft').findMany({
        where: { trainer: trainerId },
        populate: {
          teamfoto: true,
          kontaktperson: true
        },
        orderBy: { name: 'asc' }
      });

      return teams;
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Teams des Trainers: ${error.message}`);
    }
  }

}; 