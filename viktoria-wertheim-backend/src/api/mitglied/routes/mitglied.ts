/**
 * mitglied router
 */

export default {
  routes: [
    // Custom Admin-Routen
    {
      method: 'POST',
      path: '/mitglieds/createMemberWithUser',
      handler: 'mitglied.createMemberWithUser',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/mitglieds/getAllMembersWithUsers',
      handler: 'mitglied.getAllMembersWithUsers',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
}; 