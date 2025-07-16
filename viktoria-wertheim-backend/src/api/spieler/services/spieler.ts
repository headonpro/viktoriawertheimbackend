/**
 * spieler service
 */

export default {
  
  // Service-Methoden für Spieler-spezifische Geschäftslogik
  
  async updatePlayerStats(playerId: number, statsUpdate: any) {
    try {
      const updatedPlayer = await strapi.db.query('api::spieler.spieler').update({
        where: { id: playerId },
        data: statsUpdate
      });

      return updatedPlayer;
    } catch (error) {
      throw new Error(`Fehler beim Aktualisieren der Spielerstatistiken: ${error.message}`);
    }
  },

  async validatePlayerData(data: any) {
    const errors: string[] = [];

    // Rückennummer validieren
    if (data.rueckennummer) {
      if (data.rueckennummer < 1 || data.rueckennummer > 99) {
        errors.push('Rückennummer muss zwischen 1 und 99 liegen');
      }

      // Prüfe ob Rückennummer in der Mannschaft bereits vergeben ist
      if (data.mannschaft) {
        const existingPlayer = await strapi.db.query('api::spieler.spieler').findOne({
          where: {
            rueckennummer: data.rueckennummer,
            mannschaft: data.mannschaft,
            id: { $ne: data.id } // Exclude current player if updating
          }
        });

        if (existingPlayer) {
          errors.push('Rückennummer ist bereits in dieser Mannschaft vergeben');
        }
      }
    }

    // Position validieren
    const validPositions = ['torwart', 'abwehr', 'mittelfeld', 'sturm'];
    if (data.position && !validPositions.includes(data.position)) {
      errors.push('Ungültige Position angegeben');
    }

    // Statistiken validieren
    if (data.tore_saison && data.tore_saison < 0) {
      errors.push('Tore können nicht negativ sein');
    }

    if (data.spiele_saison && data.spiele_saison < 0) {
      errors.push('Spiele können nicht negativ sein');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  async getPlayerSeasonStats(playerId: number, saison?: string) {
    try {
      const player = await strapi.db.query('api::spieler.spieler').findOne({
        where: { id: playerId },
        populate: {
          mitglied: true,
          mannschaft: true
        }
      });

      if (!player) {
        throw new Error('Spieler nicht gefunden');
      }

      // Hier würden später Spiel-spezifische Statistiken berechnet
      // Derzeit verwenden wir die direkten Felder
      return {
        playerId,
        saison: saison || '2024/25',
        stats: {
          spiele: player.spiele_saison,
          tore: player.tore_saison,
          assists: player.assists,
          gelbeKarten: player.gelbe_karten,
          roteKarten: player.rote_karten,
          einsatzminuten: player.einsatzminuten,
          durchschnittToreProSpiel: player.spiele_saison > 0 ? 
            (player.tore_saison / player.spiele_saison).toFixed(2) : 0,
          durchschnittMinutenProSpiel: player.spiele_saison > 0 ? 
            Math.round(player.einsatzminuten / player.spiele_saison) : 0
        },
        player
      };
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Saison-Statistiken: ${error.message}`);
    }
  },

  async findPlayersByMember(memberId: number) {
    try {
      const players = await strapi.db.query('api::spieler.spieler').findMany({
        where: { mitglied: memberId },
        populate: {
          mannschaft: {
            populate: ['teamfoto', 'trainer']
          },
          spielerfoto: true
        }
      });

      return players;
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Spielerdaten: ${error.message}`);
    }
  },

  async assignPlayerToTeam(playerId: number, teamId: number, rueckennummer?: number) {
    try {
      const updateData: any = { mannschaft: teamId };
      
      if (rueckennummer) {
        // Validate jersey number is available
        const validation = await this.validatePlayerData({
          rueckennummer,
          mannschaft: teamId,
          id: playerId
        });

        if (!validation.isValid) {
          throw new Error(validation.errors.join(', '));
        }

        updateData.rueckennummer = rueckennummer;
      }

      const updatedPlayer = await strapi.db.query('api::spieler.spieler').update({
        where: { id: playerId },
        data: updateData,
        populate: {
          mitglied: true,
          mannschaft: true
        }
      });

      return updatedPlayer;
    } catch (error) {
      throw new Error(`Fehler beim Zuweisen des Spielers zur Mannschaft: ${error.message}`);
    }
  }

}; 