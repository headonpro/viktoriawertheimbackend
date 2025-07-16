import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Stelle sicher, dass die authenticated Rolle existiert
    const authenticatedRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'authenticated' }
    });

    if (!authenticatedRole) {
      await strapi.db.query('plugin::users-permissions.role').create({
        data: {
          name: 'Authenticated',
          description: 'Default role given to authenticated user.',
          type: 'authenticated',
        }
      });
    }

    // Stelle sicher, dass die public Rolle existiert  
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' }
    });

    if (!publicRole) {
      await strapi.db.query('plugin::users-permissions.role').create({
        data: {
          name: 'Public',
          description: 'Default role given to unauthenticated user.',
          type: 'public',
        }
      });
    }

    // Konfiguriere Admin-Permissions für users-permissions Plugin
    const superAdminRole = await strapi.db.query('admin::role').findOne({
      where: { code: 'strapi-super-admin' }
    });

    if (superAdminRole) {
      // Content Manager Permissions für users-permissions
      const contentManagerPermissions = [
        'plugin::content-manager.explorer.create',
        'plugin::content-manager.explorer.read',
        'plugin::content-manager.explorer.update',
        'plugin::content-manager.explorer.delete'
      ];

      const subjects = [
        'plugin::users-permissions.user',
        'plugin::users-permissions.role'
      ];

      for (const action of contentManagerPermissions) {
        for (const subject of subjects) {
          const existingPermission = await strapi.db.query('admin::permission').findOne({
            where: {
              action,
              subject,
              role: superAdminRole.id
            }
          });

          if (!existingPermission) {
            await strapi.db.query('admin::permission').create({
              data: {
                action,
                subject,
                role: superAdminRole.id,
                conditions: []
              }
            });
          }
        }
      }

      console.log('✅ Admin permissions für users-permissions Plugin konfiguriert');
    }

    // Erstelle benutzerdefinierte Rollen
    await createCustomRoles(strapi);

    // Konfiguriere API-Permissions für Content Types
    await configureApiPermissions(strapi);
  },
};

async function configureApiPermissions(strapi: Core.Strapi) {
  console.log('🔧 Konfiguriere API-Permissions...');

  // Definiere alle Rollen
  const roles = await strapi.db.query('plugin::users-permissions.role').findMany();
  const roleMap = new Map();
  roles.forEach(role => roleMap.set(role.type || role.name.toLowerCase(), role));

  // Content Types und ihre Actions
  const contentTypes = [
    'api::mitglied.mitglied',
    'api::mannschaft.mannschaft', 
    'api::spieler.spieler',
    'api::training.training'
  ];

  const apiActions = ['find', 'findOne', 'create', 'update', 'delete'];
  const customActions = {
    'api::mitglied.mitglied': ['register', 'profile', 'update-profile'],
    'api::mannschaft.mannschaft': ['with-trainers', 'active', 'by-age-group', 'details'],
    'api::spieler.spieler': ['stats', 'by-team', 'top-scorers', 'by-position', 'injured'],
    'api::training.training': ['create-training', 'by-team', 'upcoming', 'attendance', 'complete', 'by-trainer']
  };

  // Permission-Konfiguration pro Rolle
  const permissionConfig = {
    public: {
      'api::mitglied.mitglied': ['register'],
      'api::mannschaft.mannschaft': ['find', 'findOne', 'active', 'by-age-group'],
      'api::spieler.spieler': ['find', 'findOne', 'top-scorers', 'by-position'],
      'api::training.training': ['find', 'findOne', 'upcoming']
    },
    authenticated: {
      'api::mitglied.mitglied': ['find', 'findOne', 'profile', 'update-profile'],
      'api::mannschaft.mannschaft': ['find', 'findOne', 'with-trainers', 'active', 'by-age-group', 'details'],
      'api::spieler.spieler': ['find', 'findOne', 'stats', 'by-team', 'top-scorers', 'by-position', 'injured'],
      'api::training.training': ['find', 'findOne', 'by-team', 'upcoming', 'attendance']
    },
    mitglied: {
      'api::mitglied.mitglied': ['find', 'findOne', 'update', 'profile', 'update-profile'],
      'api::mannschaft.mannschaft': ['find', 'findOne', 'with-trainers', 'active', 'by-age-group', 'details'],
      'api::spieler.spieler': ['find', 'findOne', 'stats', 'by-team', 'top-scorers', 'by-position', 'injured'],
      'api::training.training': ['find', 'findOne', 'by-team', 'upcoming', 'attendance']
    },
    spieler: {
      'api::mitglied.mitglied': ['find', 'findOne', 'update', 'profile', 'update-profile'],
      'api::mannschaft.mannschaft': ['find', 'findOne', 'with-trainers', 'active', 'by-age-group', 'details'],
      'api::spieler.spieler': ['find', 'findOne', 'update', 'stats', 'by-team', 'top-scorers', 'by-position', 'injured'],
      'api::training.training': ['find', 'findOne', 'by-team', 'upcoming', 'attendance']
    },
    trainer: {
      'api::mitglied.mitglied': ['find', 'findOne', 'update', 'profile', 'update-profile'],
      'api::mannschaft.mannschaft': ['find', 'findOne', 'update', 'with-trainers', 'active', 'by-age-group', 'details'],
      'api::spieler.spieler': ['find', 'findOne', 'create', 'update', 'stats', 'by-team', 'top-scorers', 'by-position', 'injured'],
      'api::training.training': ['find', 'findOne', 'create', 'update', 'create-training', 'by-team', 'upcoming', 'attendance', 'complete', 'by-trainer']
    },
    admin: {
      'api::mitglied.mitglied': ['find', 'findOne', 'create', 'update', 'delete', 'register', 'profile', 'update-profile'],
      'api::mannschaft.mannschaft': ['find', 'findOne', 'create', 'update', 'delete', 'with-trainers', 'active', 'by-age-group', 'details'],
      'api::spieler.spieler': ['find', 'findOne', 'create', 'update', 'delete', 'stats', 'by-team', 'top-scorers', 'by-position', 'injured'],
      'api::training.training': ['find', 'findOne', 'create', 'update', 'delete', 'create-training', 'by-team', 'upcoming', 'attendance', 'complete', 'by-trainer']
    },
    vorstand: {
      'api::mitglied.mitglied': ['find', 'findOne', 'create', 'update', 'delete', 'register', 'profile', 'update-profile'],
      'api::mannschaft.mannschaft': ['find', 'findOne', 'create', 'update', 'delete', 'with-trainers', 'active', 'by-age-group', 'details'],
      'api::spieler.spieler': ['find', 'findOne', 'create', 'update', 'delete', 'stats', 'by-team', 'top-scorers', 'by-position', 'injured'],
      'api::training.training': ['find', 'findOne', 'create', 'update', 'delete', 'create-training', 'by-team', 'upcoming', 'attendance', 'complete', 'by-trainer']
    }
  };

  // Erstelle/Aktualisiere Permissions
  for (const [roleName, rolePermissions] of Object.entries(permissionConfig)) {
    const role = roleMap.get(roleName);
    if (!role) {
      console.log(`⚠️  Rolle '${roleName}' nicht gefunden, überspringe...`);
      continue;
    }

    console.log(`🔐 Konfiguriere Permissions für Rolle: ${roleName}`);

    for (const [contentType, actions] of Object.entries(rolePermissions)) {
      for (const action of actions) {
        // Überprüfe ob Permission bereits existiert
        const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
          where: {
            action: `${contentType}.${action}`,
            role: role.id
          }
        });

        if (!existingPermission) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: {
              action: `${contentType}.${action}`,
              role: role.id,
              enabled: true
            }
          });
          console.log(`  ✅ ${contentType}.${action}`);
        }
      }
    }
  }

  console.log('✅ API-Permissions erfolgreich konfiguriert');
}

async function createCustomRoles(strapi: Core.Strapi) {
  console.log('🔧 Erstelle benutzerdefinierte Rollen...');

  const customRoles = [
    {
      name: 'Mitglied',
      description: 'Vereinsmitglied ohne spezielle Funktion',
      type: 'mitglied'
    },
    {
      name: 'Spieler',
      description: 'Aktiver Spieler des Vereins',
      type: 'spieler'
    },
    {
      name: 'Trainer',
      description: 'Trainer einer oder mehrerer Mannschaften',
      type: 'trainer'
    },
    {
      name: 'Admin',
      description: 'Administrator mit erweiterten Rechten',
      type: 'admin'
    },
    {
      name: 'Vorstand',
      description: 'Vorstandsmitglied mit vollständigen Rechten',
      type: 'vorstand'
    }
  ];

  for (const roleData of customRoles) {
    const existingRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { 
        $or: [
          { type: roleData.type },
          { name: roleData.name }
        ]
      }
    });

    if (!existingRole) {
      await strapi.db.query('plugin::users-permissions.role').create({
        data: roleData
      });
      console.log(`  ✅ Rolle erstellt: ${roleData.name}`);
    } else {
      console.log(`  ℹ️  Rolle bereits vorhanden: ${roleData.name}`);
    }
  }

  console.log('✅ Benutzerdefinierte Rollen erfolgreich erstellt');
}
