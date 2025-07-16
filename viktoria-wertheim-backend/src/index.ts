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
    console.log('🚀 Viktoria Wertheim Backend wird gestartet...');
    
    // Einfache Rollen-Erstellung ohne komplexe Permissions
    await createBasicRoles(strapi);
    
    console.log('✅ Backend erfolgreich gestartet');
  },
};

async function createBasicRoles(strapi: Core.Strapi) {
  console.log('🔧 Erstelle grundlegende Rollen...');

  // Stelle sicher, dass die Standard-Rollen existieren
  const roles = [
    {
      name: 'Public',
      description: 'Default role given to unauthenticated user.',
      type: 'public'
    },
    {
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated'
    }
  ];

  for (const roleData of roles) {
    const existingRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: roleData.type }
    });

    if (!existingRole) {
      await strapi.db.query('plugin::users-permissions.role').create({
        data: roleData
      });
      console.log(`  ✅ Rolle erstellt: ${roleData.name}`);
    }
  }

  console.log('✅ Grundlegende Rollen konfiguriert');
}
