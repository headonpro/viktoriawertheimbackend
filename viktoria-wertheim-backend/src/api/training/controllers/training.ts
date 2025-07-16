/**
 * training controller
 */

export default {
  
  // Training erstellen (speziell für Trainer)
  async createTraining(ctx) {
    try {
      const trainingData = ctx.request.body;
      
      // Validiere Eingabedaten
      if (!trainingData.titel || !trainingData.datum || !trainingData.mannschaft) {
        return ctx.badRequest('Titel, Datum und Mannschaft sind erforderlich');
      }

      const newTraining = await strapi.db.query('api::training.training').create({
        data: {
          ...trainingData,
          publishedAt: new Date()
        },
        populate: {
          trainer: {
            populate: ['profilfoto']
          },
          mannschaft: true,
          teilnehmer: {
            populate: ['mitglied']
          }
        }
      });

      ctx.body = {
        success: true,
        message: 'Training erfolgreich erstellt',
        data: newTraining
      };
    } catch (error) {
      console.error('Fehler beim Erstellen des Trainings:', error);
      ctx.internalServerError('Fehler beim Erstellen des Trainings');
    }
  },

  // Trainings für eine Mannschaft abrufen
  async findByTeam(ctx) {
    try {
      const { teamId } = ctx.params;
      const { status, limit = 20, startDate, endDate } = ctx.query;

      let whereClause: any = { mannschaft: teamId };

      if (status) {
        whereClause.status = status;
      }

      if (startDate || endDate) {
        whereClause.datum = {};
        if (startDate) whereClause.datum.$gte = startDate;
        if (endDate) whereClause.datum.$lte = endDate;
      }

      const trainings = await strapi.db.query('api::training.training').findMany({
        where: whereClause,
        populate: {
          trainer: {
            populate: ['profilfoto']
          },
          mannschaft: true,
          teilnehmer: {
            populate: ['mitglied']
          },
          abwesende: {
            populate: ['mitglied']
          }
        },
        orderBy: { datum: 'desc' },
        limit: parseInt(limit)
      });

      ctx.body = {
        success: true,
        data: trainings,
        count: trainings.length
      };
    } catch (error) {
      console.error('Fehler beim Abrufen der Mannschafts-Trainings:', error);
      ctx.internalServerError('Fehler beim Abrufen der Trainings');
    }
  },

  // Kommende Trainings
  async getUpcoming(ctx) {
    try {
      const { teamId, trainerId, limit = 10 } = ctx.query;
      const now = new Date().toISOString();

      let whereClause: any = {
        datum: { $gte: now },
        status: { $in: ['geplant', 'laufend'] }
      };

      if (teamId) whereClause.mannschaft = teamId;
      if (trainerId) whereClause.trainer = trainerId;

      const upcomingTrainings = await strapi.db.query('api::training.training').findMany({
        where: whereClause,
        populate: {
          trainer: {
            populate: ['profilfoto']
          },
          mannschaft: true,
          teilnehmer: {
            populate: ['mitglied']
          }
        },
        orderBy: { datum: 'asc' },
        limit: parseInt(limit)
      });

      ctx.body = {
        success: true,
        data: upcomingTrainings,
        count: upcomingTrainings.length
      };
    } catch (error) {
      console.error('Fehler beim Abrufen der kommenden Trainings:', error);
      ctx.internalServerError('Fehler beim Abrufen der kommenden Trainings');
    }
  },

  // Training-Teilnahme verwalten
  async updateAttendance(ctx) {
    try {
      const { id } = ctx.params;
      const { teilnehmer, abwesende } = ctx.request.body;

      const updatedTraining = await strapi.db.query('api::training.training').update({
        where: { id },
        data: {
          teilnehmer,
          abwesende
        },
        populate: {
          teilnehmer: {
            populate: ['mitglied']
          },
          abwesende: {
            populate: ['mitglied']
          }
        }
      });

      ctx.body = {
        success: true,
        message: 'Teilnahme erfolgreich aktualisiert',
        data: updatedTraining
      };
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Teilnahme:', error);
      ctx.internalServerError('Fehler beim Aktualisieren der Teilnahme');
    }
  },

  // Training abschließen
  async completeTraining(ctx) {
    try {
      const { id } = ctx.params;
      const { notizen, bewertung, verletzungen } = ctx.request.body;

      const completedTraining = await strapi.db.query('api::training.training').update({
        where: { id },
        data: {
          status: 'abgeschlossen',
          notizen,
          bewertung,
          verletzungen
        }
      });

      ctx.body = {
        success: true,
        message: 'Training erfolgreich abgeschlossen',
        data: completedTraining
      };
    } catch (error) {
      console.error('Fehler beim Abschließen des Trainings:', error);
      ctx.internalServerError('Fehler beim Abschließen des Trainings');
    }
  },

  // Trainings nach Trainer
  async findByTrainer(ctx) {
    try {
      const { trainerId } = ctx.params;
      const { status, limit = 20 } = ctx.query;

      let whereClause: any = { trainer: trainerId };
      if (status) whereClause.status = status;

      const trainings = await strapi.db.query('api::training.training').findMany({
        where: whereClause,
        populate: {
          mannschaft: true,
          teilnehmer: {
            populate: ['mitglied']
          }
        },
        orderBy: { datum: 'desc' },
        limit: parseInt(limit)
      });

      ctx.body = {
        success: true,
        data: trainings,
        count: trainings.length
      };
    } catch (error) {
      console.error('Fehler beim Abrufen der Trainer-Trainings:', error);
      ctx.internalServerError('Fehler beim Abrufen der Trainings');
    }
  }

}; 