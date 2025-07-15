import { strapi } from './strapi'
import { AuthService } from './auth'

export interface PlayerStats {
  tore: number
  spiele: number
  position: string
  rueckennummer?: number
  foto?: {
    data: {
      id: number
      attributes: {
        url: string
        alternativeText?: string
      }
    }
  }
}

export interface TrainingSession {
  id: number
  attributes: {
    titel: string
    datum: string
    dauer: number
    ort: string
    beschreibung?: string
    trainingsziel?: string
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
    teilnehmer?: {
      data: Array<{
        id: number
        attributes: {
          vorname: string
          nachname: string
        }
      }>
    }
    abwesende?: {
      data: Array<{
        id: number
        attributes: {
          vorname: string
          nachname: string
        }
      }>
    }
  }
}

export interface Game {
  id: number
  attributes: {
    datum: string
    heimmannschaft: string
    auswaertsmannschaft: string
    toreHeim?: number
    toreAuswaerts?: number
    spielort: string
    liga?: string
    isHeimspiel: boolean
    status: 'geplant' | 'live' | 'beendet' | 'abgesagt'
  }
}

export interface TeamInfo {
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
  }
}

export class PlayerApiService {
  
  // Get player data by member ID
  static async getPlayerByMemberId(memberId: number): Promise<any> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      const response = await strapi.get('/spielers', {
        params: {
          filters: {
            mitglied: {
              id: {
                $eq: memberId
              }
            }
          },
          populate: {
            foto: true,
            mannschaft: {
              populate: ['teamfoto']
            },
            mitglied: true
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data?.data?.[0] || null
    } catch (error) {
      console.error('Error fetching player data:', error)
      throw error
    }
  }

  // Get training sessions for a team
  static async getTrainingSessions(teamId: number, limit = 10): Promise<TrainingSession[]> {
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
            trainer: {
              populate: ['mitglied']
            },
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
      console.error('Error fetching training sessions:', error)
      throw error
    }
  }

  // Get upcoming training sessions
  static async getUpcomingTrainingSessions(teamId: number): Promise<TrainingSession[]> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      const now = new Date().toISOString()
      const response = await strapi.get('/training-sessions', {
        params: {
          filters: {
            mannschaft: {
              id: {
                $eq: teamId
              }
            },
            datum: {
              $gte: now
            },
            status: {
              $ne: 'abgesagt'
            }
          },
          populate: {
            trainer: true,
            teilnehmer: true
          },
          sort: ['datum:asc'],
          pagination: {
            limit: 5
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data?.data || []
    } catch (error) {
      console.error('Error fetching upcoming training sessions:', error)
      throw error
    }
  }

  // Get games for a team
  static async getTeamGames(teamId: number, limit = 10): Promise<Game[]> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      const response = await strapi.get('/spiels', {
        params: {
          filters: {
            mannschaft: {
              id: {
                $eq: teamId
              }
            }
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
      console.error('Error fetching team games:', error)
      throw error
    }
  }

  // Get upcoming games
  static async getUpcomingGames(teamId: number): Promise<Game[]> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      const now = new Date().toISOString()
      const response = await strapi.get('/spiels', {
        params: {
          filters: {
            mannschaft: {
              id: {
                $eq: teamId
              }
            },
            datum: {
              $gte: now
            },
            status: {
              $ne: 'abgesagt'
            }
          },
          sort: ['datum:asc'],
          pagination: {
            limit: 3
          }
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data?.data || []
    } catch (error) {
      console.error('Error fetching upcoming games:', error)
      throw error
    }
  }

  // Register for training session
  static async registerForTraining(trainingId: number, memberId: number): Promise<void> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      // Get current training session
      const trainingResponse = await strapi.get(`/training-sessions/${trainingId}`, {
        params: {
          populate: ['teilnehmer', 'abwesende']
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const training = trainingResponse.data.data
      const currentParticipants = training.attributes.teilnehmer?.data || []
      const currentAbsent = training.attributes.abwesende?.data || []

      // Add member to participants, remove from absent if present
      const newParticipants = [
        ...currentParticipants.filter((p: any) => p.id !== memberId),
        { id: memberId }
      ]
      const newAbsent = currentAbsent.filter((p: any) => p.id !== memberId)

      await strapi.put(`/training-sessions/${trainingId}`, {
        data: {
          teilnehmer: newParticipants.map((p: any) => p.id),
          abwesende: newAbsent.map((p: any) => p.id)
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error('Error registering for training:', error)
      throw error
    }
  }

  // Mark as absent for training session
  static async markAbsentForTraining(trainingId: number, memberId: number): Promise<void> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      // Get current training session
      const trainingResponse = await strapi.get(`/training-sessions/${trainingId}`, {
        params: {
          populate: ['teilnehmer', 'abwesende']
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const training = trainingResponse.data.data
      const currentParticipants = training.attributes.teilnehmer?.data || []
      const currentAbsent = training.attributes.abwesende?.data || []

      // Add member to absent, remove from participants if present
      const newParticipants = currentParticipants.filter((p: any) => p.id !== memberId)
      const newAbsent = [
        ...currentAbsent.filter((p: any) => p.id !== memberId),
        { id: memberId }
      ]

      await strapi.put(`/training-sessions/${trainingId}`, {
        data: {
          teilnehmer: newParticipants.map((p: any) => p.id),
          abwesende: newAbsent.map((p: any) => p.id)
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error('Error marking absent for training:', error)
      throw error
    }
  }

  // Get player training attendance statistics
  static async getPlayerTrainingStats(memberId: number, teamId: number): Promise<{
    totalSessions: number
    attended: number
    missed: number
    attendanceRate: number
  }> {
    const token = AuthService.getToken()
    if (!token) throw new Error('Nicht authentifiziert')

    try {
      // Get all training sessions for the team
      const allSessionsResponse = await strapi.get('/training-sessions', {
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

      const sessions = allSessionsResponse.data?.data || []
      let attended = 0
      let missed = 0

      sessions.forEach((session: any) => {
        const participants = session.attributes.teilnehmer?.data || []
        const absent = session.attributes.abwesende?.data || []
        
        const wasPresent = participants.some((p: any) => p.id === memberId)
        const wasAbsent = absent.some((p: any) => p.id === memberId)
        
        if (wasPresent) {
          attended++
        } else if (wasAbsent) {
          missed++
        }
      })

      const totalSessions = attended + missed
      const attendanceRate = totalSessions > 0 ? (attended / totalSessions) * 100 : 0

      return {
        totalSessions,
        attended,
        missed,
        attendanceRate: Math.round(attendanceRate * 100) / 100
      }
    } catch (error) {
      console.error('Error fetching training stats:', error)
      throw error
    }
  }
} 