import { strapi } from './strapi'
import { AuthService } from './auth'

export interface TrainerTeam {
  id: number
  attributes: {
    name: string
    liga?: string
    trainer?: string
    teamfoto?: {
      data: {
        id: number
        attributes: {
          url: string
          alternativeText?: string
        }
      }
    }
    spielers?: {
      data: Array<{
        id: number
        attributes: {
          vorname: string
          nachname: string
          position: string
          rueckennummer?: number
          tore: number
          spiele: number
          foto?: {
            data: {
              attributes: {
                url: string
              }
            }
          }
        }
      }>
    }
    mitglieder?: {
      data: Array<{
        id: number
        attributes: {
          vorname: string
          nachname: string
          mitgliedstyp: string
        }
      }>
    }
  }
}

export interface TrainingSessionFull {
  id: number
  attributes: {
    titel: string
    datum: string
    dauer: number
    ort: string
    beschreibung?: string
    trainingsziel?: string
    uebungen?: any
    status: 'geplant' | 'laufend' | 'abgeschlossen' | 'abgesagt'
    wetter?: string
    notizen?: string
    trainer?: {
      data: {
        id: number
        attributes: {
          vorname: string
          nachname: string
        }
      }
    }
    mannschaft?: {
      data: {
        id: number
        attributes: {
          name: string
        }
      }
    }
    teilnehmer?: {
      data: Array<{
        id: number
        attributes: {
          vorname: string
          nachname: string
          mitgliedstyp: string
        }
      }>
    }
    abwesende?: {
      data: Array<{
        id: number
        attributes: {
          vorname: string
          nachname: string
          mitgliedstyp: string
        }
      }>
    }
  }
}

export interface CreateTrainingData {
  titel: string
  datum: string
  dauer: number
  ort: string
  beschreibung?: string
  trainingsziel?: string
  mannschaft: number
  trainer: number
  status?: 'geplant' | 'laufend' | 'abgeschlossen' | 'abgesagt'
}

export interface UpdateTrainingData {
  titel?: string
  datum?: string
  dauer?: number
  ort?: string
  beschreibung?: string
  trainingsziel?: string
  status?: 'geplant' | 'laufend' | 'abgeschlossen' | 'abgesagt'
  wetter?: string
  notizen?: string
  uebungen?: any
}

export class TrainerApiService {
  
  // Get teams where user is trainer (by member ID)
  static async getTrainerTeams(memberId: number): Promise<TrainerTeam[]> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      const response = await strapi.get('/mannschafts', {
        params: {
          filters: {
            mitglieder: {
              id: {
                $eq: memberId
              }
            }
          },
          populate: {
            teamfoto: true,
            spielers: {
              populate: ['foto']
            },
            mitglieder: true
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data?.data || []
    } catch (error) {
      console.error('Error fetching trainer teams:', error)
      throw error
    }
  }

  // Get training sessions for a team (trainer view)
  static async getTeamTrainingSessions(teamId: number, limit = 20): Promise<TrainingSessionFull[]> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      const response = await strapi.get('/training-sessions', {
        params: {
          filters: {
            mannschaft: {
              id: {
                $eq: teamId
              }
            }
          },
          populate: {
            trainer: true,
            mannschaft: true,
            teilnehmer: true,
            abwesende: true
          },
          sort: ['datum:desc'],
          pagination: {
            limit: limit
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data?.data || []
    } catch (error) {
      console.error('Error fetching team training sessions:', error)
      throw error
    }
  }

  // Create new training session
  static async createTrainingSession(data: CreateTrainingData): Promise<TrainingSessionFull> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      const response = await strapi.post('/training-sessions', {
        data: data
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data.data
    } catch (error) {
      console.error('Error creating training session:', error)
      throw error
    }
  }

  // Update training session
  static async updateTrainingSession(trainingId: number, data: UpdateTrainingData): Promise<TrainingSessionFull> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      const response = await strapi.put(`/training-sessions/${trainingId}`, {
        data: data
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data.data
    } catch (error) {
      console.error('Error updating training session:', error)
      throw error
    }
  }

  // Delete training session
  static async deleteTrainingSession(trainingId: number): Promise<void> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      await strapi.delete(`/training-sessions/${trainingId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error('Error deleting training session:', error)
      throw error
    }
  }

  // Get single training session with full details
  static async getTrainingSession(trainingId: number): Promise<TrainingSessionFull> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      const response = await strapi.get(`/training-sessions/${trainingId}`, {
        params: {
          populate: {
            trainer: true,
            mannschaft: {
              populate: ['mitglieder']
            },
            teilnehmer: true,
            abwesende: true
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching training session:', error)
      throw error
    }
  }

  // Update attendance for training session
  static async updateTrainingAttendance(
    trainingId: number, 
    participantIds: number[], 
    absentIds: number[]
  ): Promise<void> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      await strapi.put(`/training-sessions/${trainingId}`, {
        data: {
          teilnehmer: participantIds,
          abwesende: absentIds
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error('Error updating training attendance:', error)
      throw error
    }
  }

  // Get team statistics
  static async getTeamStatistics(teamId: number): Promise<{
    totalPlayers: number
    totalTrainingSessions: number
    averageAttendance: number
    upcomingTrainings: number
    completedTrainings: number
  }> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      // Get team info
      const teamResponse = await strapi.get(`/mannschafts/${teamId}`, {
        params: {
          populate: {
            spielers: true,
            mitglieder: true
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Get all training sessions
      const trainingsResponse = await strapi.get('/training-sessions', {
        params: {
          filters: {
            mannschaft: {
              id: {
                $eq: teamId
              }
            }
          },
          populate: {
            teilnehmer: true,
            abwesende: true
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const team = teamResponse.data.data
      const trainings = trainingsResponse.data?.data || []

      const totalPlayers = (team.attributes.spielers?.data?.length || 0) + 
                          (team.attributes.mitglieder?.data?.length || 0)
      
      const completedTrainings = trainings.filter((t: any) => t.attributes.status === 'abgeschlossen')
      const upcomingTrainings = trainings.filter((t: any) => 
        t.attributes.status === 'geplant' && new Date(t.attributes.datum) > new Date()
      )

      // Calculate average attendance
      let totalAttendance = 0
      completedTrainings.forEach((training: any) => {
        const participants = training.attributes.teilnehmer?.data?.length || 0
        const absent = training.attributes.abwesende?.data?.length || 0
        const totalInvited = participants + absent
        if (totalInvited > 0) {
          totalAttendance += (participants / totalInvited) * 100
        }
      })

      const averageAttendance = completedTrainings.length > 0 
        ? totalAttendance / completedTrainings.length 
        : 0

      return {
        totalPlayers,
        totalTrainingSessions: trainings.length,
        averageAttendance: Math.round(averageAttendance * 100) / 100,
        upcomingTrainings: upcomingTrainings.length,
        completedTrainings: completedTrainings.length
      }
    } catch (error) {
      console.error('Error fetching team statistics:', error)
      throw error
    }
  }

  // Get player attendance for a specific team
  static async getPlayerAttendanceStats(teamId: number): Promise<Array<{
    playerId: number
    playerName: string
    totalSessions: number
    attended: number
    missed: number
    attendanceRate: number
  }>> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      // Get team members
      const teamResponse = await strapi.get(`/mannschafts/${teamId}`, {
        params: {
          populate: {
            mitglieder: true
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Get completed training sessions
      const trainingsResponse = await strapi.get('/training-sessions', {
        params: {
          filters: {
            mannschaft: {
              id: {
                $eq: teamId
              }
            },
            status: {
              $eq: 'abgeschlossen'
            }
          },
          populate: {
            teilnehmer: true,
            abwesende: true
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const members = teamResponse.data.data.attributes.mitglieder?.data || []
      const trainings = trainingsResponse.data?.data || []

      return members.map((member: any) => {
        let attended = 0
        let missed = 0

        trainings.forEach((training: any) => {
          const participants = training.attributes.teilnehmer?.data || []
          const absent = training.attributes.abwesende?.data || []
          
          const wasPresent = participants.some((p: any) => p.id === member.id)
          const wasAbsent = absent.some((p: any) => p.id === member.id)
          
          if (wasPresent) attended++
          else if (wasAbsent) missed++
        })

        const totalSessions = attended + missed
        const attendanceRate = totalSessions > 0 ? (attended / totalSessions) * 100 : 0

        return {
          playerId: member.id,
          playerName: `${member.attributes.vorname} ${member.attributes.nachname}`,
          totalSessions,
          attended,
          missed,
          attendanceRate: Math.round(attendanceRate * 100) / 100
        }
      })
    } catch (error) {
      console.error('Error fetching player attendance stats:', error)
      throw error
    }
  }
} 