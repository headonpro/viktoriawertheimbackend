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
  },
};
