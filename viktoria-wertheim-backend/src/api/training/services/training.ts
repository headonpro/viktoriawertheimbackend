/**
 * training service
 */

export default {
  
  // Service-Methoden für Training-spezifische Geschäftslogik
  
  async validateTrainingData(data: any) {
    const errors: string[] = [];

    // Titel validieren
    if (!data.titel || data.titel.trim().length < 3) {
      errors.push('Training-Titel muss mindestens 3 Zeichen lang sein');
    }

    // Datum validieren
    if (!data.datum) {
      errors.push('Datum ist erforderlich');
    } else {
      const trainingDate = new Date(data.datum);
      const now = new Date();
      
      if (trainingDate < now && data.status === 'geplant') {
        errors.push('Training kann nicht in der Vergangenheit geplant werden');
      }
    }

    // Dauer validieren
    if (data.dauer && (data.dauer < 15 || data.dauer > 180)) {
      errors.push('Training-Dauer muss zwischen 15 und 180 Minuten liegen');
    }

    // Mannschaft validieren
    if (!data.mannschaft) {
      errors.push('Mannschaft ist erforderlich');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  async getTrainingStatistics(teamId?: number, trainerId?: number, dateRange?: { start: string, end: string }) {
    try {
      let whereClause: any = {};

      if (teamId) whereClause.mannschaft = teamId;
      if (trainerId) whereClause.trainer = trainerId;
      
      if (dateRange) {
        whereClause.datum = {
          $gte: dateRange.start,
          $lte: dateRange.end
        };
      }

      const [
        totalTrainings,
        completedTrainings,
        cancelledTrainings,
        upcomingTrainings
      ] = await Promise.all([
        strapi.db.query('api::training.training').count({ where: whereClause }),
        strapi.db.query('api::training.training').count({ 
          where: { ...whereClause, status: 'abgeschlossen' } 
        }),
        strapi.db.query('api::training.training').count({ 
          where: { ...whereClause, status: 'abgesagt' } 
        }),
        strapi.db.query('api::training.training').count({ 
          where: { ...whereClause, status: 'geplant', datum: { $gte: new Date().toISOString() } } 
        })
      ]);

      return {
        total: totalTrainings,
        completed: completedTrainings,
        cancelled: cancelledTrainings,
        upcoming: upcomingTrainings,
        completionRate: totalTrainings > 0 ? ((completedTrainings / totalTrainings) * 100).toFixed(1) : 0,
        cancellationRate: totalTrainings > 0 ? ((cancelledTrainings / totalTrainings) * 100).toFixed(1) : 0
      };
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Training-Statistiken: ${error.message}`);
    }
  },

  async calculateAttendanceRate(playerId: number, teamId?: number, dateRange?: { start: string, end: string }) {
    try {
      let whereClause: any = {};

      if (teamId) whereClause.mannschaft = teamId;
      if (dateRange) {
        whereClause.datum = {
          $gte: dateRange.start,
          $lte: dateRange.end
        };
      }

      const [
        totalTrainings,
        attendedTrainings
      ] = await Promise.all([
        strapi.db.query('api::training.training').count({ 
          where: { ...whereClause, status: 'abgeschlossen' } 
        }),
        strapi.db.query('api::training.training').count({ 
          where: { 
            ...whereClause, 
            status: 'abgeschlossen',
            teilnehmer: playerId
          } 
        })
      ]);

      return {
        total: totalTrainings,
        attended: attendedTrainings,
        attendanceRate: totalTrainings > 0 ? ((attendedTrainings / totalTrainings) * 100).toFixed(1) : 0
      };
    } catch (error) {
      throw new Error(`Fehler beim Berechnen der Anwesenheitsrate: ${error.message}`);
    }
  },

  async scheduleRecurringTraining(trainingTemplate: any, weeks: number = 4) {
    try {
      const validation = await this.validateTrainingData(trainingTemplate);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const startDate = new Date(trainingTemplate.datum);
      const trainings = [];

      for (let i = 0; i < weeks; i++) {
        const trainingDate = new Date(startDate);
        trainingDate.setDate(startDate.getDate() + (i * 7)); // Wöchentlich

        const training = await strapi.db.query('api::training.training').create({
          data: {
            ...trainingTemplate,
            datum: trainingDate.toISOString(),
            titel: `${trainingTemplate.titel} - Woche ${i + 1}`,
            publishedAt: new Date()
          }
        });

        trainings.push(training);
      }

      return {
        success: true,
        count: trainings.length,
        trainings
      };
    } catch (error) {
      throw new Error(`Fehler beim Planen wiederkehrender Trainings: ${error.message}`);
    }
  },

  async getPlayerAttendanceHistory(playerId: number, limit: number = 10) {
    try {
      const attendedTrainings = await strapi.db.query('api::training.training').findMany({
        where: {
          teilnehmer: playerId,
          status: 'abgeschlossen'
        },
        populate: {
          mannschaft: true,
          trainer: {
            populate: ['profilfoto']
          }
        },
        orderBy: { datum: 'desc' },
        limit
      });

      const missedTrainings = await strapi.db.query('api::training.training').findMany({
        where: {
          abwesende: playerId,
          status: 'abgeschlossen'
        },
        populate: {
          mannschaft: true,
          trainer: {
            populate: ['profilfoto']
          }
        },
        orderBy: { datum: 'desc' },
        limit
      });

      return {
        attended: attendedTrainings,
        missed: missedTrainings,
        recentAttendanceRate: await this.calculateAttendanceRate(playerId, undefined, {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
          end: new Date().toISOString()
        })
      };
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Anwesenheitshistorie: ${error.message}`);
    }
  }

}; 