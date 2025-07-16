export default {
  'users-permissions': {
    enabled: true,
    config: {
      ratelimit: {
        interval: 60000,
        max: 10,
      },
      providers: {
        local: {
          enabled: true,
        },
      },
      actions: {
        register: {
          enabled: true,
          allowedFields: ['username', 'email', 'password', 'vorname', 'nachname'],
        },
        resetPassword: {
          enabled: true,
        },
        forgotPassword: {
          enabled: true,
        },
        emailConfirmation: {
          enabled: true,
        },
      },
      email: {
        confirmation: {
          subject: 'Willkommen bei Viktoria Wertheim - E-Mail bestätigen',
        },
        reset_password: {
          subject: 'Passwort zurücksetzen - Viktoria Wertheim',
        },
      },
    },
  },
};
