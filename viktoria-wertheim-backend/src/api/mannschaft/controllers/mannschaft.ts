/**
 * mannschaft controller
 */

export default {
  
  // Alle Mannschaften mit Trainer-Informationen abrufen
  async findWithTrainers(ctx) {
    try {
      const mannschaften = await strapi.db.query('api::mannschaft.mannschaft').findMany({
        populate: {
          trainer: {
            populate: ['profilfoto']
          },
          kontaktperson: {
            populate: ['profilfoto']
          },
          teamfoto: true
        },
        orderBy: { altersklasse: 'asc', name: 'asc' }
      });

      ctx.body = {
        success: true,
        data: mannschaften
      };
    } catch (error) {
      console.error('Fehler beim Abrufen der Mannschaften:', error);
      ctx.internalServerError('Fehler beim Abrufen der Mannschaften');
    }
  },

  // Einzelne Mannschaft mit allen Details
  async findOneWithDetails(ctx) {
    try {
      const { id } = ctx.params;

      const mannschaft = await strapi.db.query('api::mannschaft.mannschaft').findOne({
        where: { id },
        populate: {
          trainer: {
            populate: ['profilfoto', 'adresse', 'notfallkontakt']
          },
          kontaktperson: {
            populate: ['profilfoto', 'adresse', 'notfallkontakt']
          },
          teamfoto: true
        }
      });

      if (!mannschaft) {
        return ctx.notFound('Mannschaft nicht gefunden');
      }

      ctx.body = {
        success: true,
        data: mannschaft
      };
    } catch (error) {
      console.error('Fehler beim Abrufen der Mannschaft:', error);
      ctx.internalServerError('Fehler beim Abrufen der Mannschaft');
    }
  },

  // Mannschaften nach Altersklasse
  async findByAgeGroup(ctx) {
    try {
      const { altersklasse } = ctx.params;

      const mannschaften = await strapi.db.query('api::mannschaft.mannschaft').findMany({
        where: { altersklasse },
        populate: {
          trainer: {
            populate: ['profilfoto']
          },
          teamfoto: true
        },
        orderBy: { name: 'asc' }
      });

      ctx.body = {
        success: true,
        data: mannschaften,
        count: mannschaften.length
      };
    } catch (error) {
      console.error('Fehler beim Abrufen der Mannschaften nach Altersklasse:', error);
      ctx.internalServerError('Fehler beim Abrufen der Mannschaften');
    }
  },

  // Aktive Mannschaften abrufen
  async findActive(ctx) {
    try {
      const mannschaften = await strapi.db.query('api::mannschaft.mannschaft').findMany({
        where: { status: 'aktiv' },
        populate: {
          trainer: {
            populate: ['profilfoto']
          },
          teamfoto: true
        },
        orderBy: { altersklasse: 'asc', name: 'asc' }
      });

      ctx.body = {
        success: true,
        data: mannschaften,
        count: mannschaften.length
      };
    } catch (error) {
      console.error('Fehler beim Abrufen der aktiven Mannschaften:', error);
      ctx.internalServerError('Fehler beim Abrufen der aktiven Mannschaften');
    }
  }

}; 