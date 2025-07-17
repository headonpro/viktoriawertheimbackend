const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_API = `${STRAPI_URL}/admin`;

// You'll need to get this token from Strapi admin panel
// Go to Settings > API Tokens > Create new API Token (Full Access)
const API_TOKEN = 'your-admin-api-token-here';

async function updatePublicPermissions() {
    console.log('🔧 Fixing Custom Endpoint Permissions...\n');
    
    try {
        // Get current public role permissions
        const response = await axios.get(`${ADMIN_API}/users-permissions/roles`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });
        
        const publicRole = response.data.roles.find(role => role.type === 'public');
        
        if (!publicRole) {
            throw new Error('Public role not found');
        }
        
        console.log(`📋 Current Public Role ID: ${publicRole.id}`);
        console.log(`📋 Current Permissions: ${Object.keys(publicRole.permissions).length} permissions`);
        
        // Add custom endpoint permissions
        const customPermissions = {
            // Spieler custom endpoints
            'api::spieler.spieler': {
                'getPlayerStats': { enabled: true },
                'findByTeam': { enabled: true },
                'getTopScorers': { enabled: true },
                'findByPosition': { enabled: true },
                'getInjuredPlayers': { enabled: true }
            },
            // Mannschaft custom endpoints  
            'api::mannschaft.mannschaft': {
                'findWithTrainers': { enabled: true },
                'findActive': { enabled: true },
                'findByAgeGroup': { enabled: true },
                'findOneWithDetails': { enabled: true }
            },
            // Training custom endpoints
            'api::training.training': {
                'createTraining': { enabled: true },
                'findByTeam': { enabled: true },
                'getUpcoming': { enabled: true },
                'updateAttendance': { enabled: true },
                'completeTraining': { enabled: true },
                'findByTrainer': { enabled: true }
            },
            // Mitglied custom endpoints
            'api::mitglied.mitglied': {
                'createMemberWithUser': { enabled: true },
                'getAllMembersWithUsers': { enabled: true }
            }
        };
        
        // Merge with existing permissions
        const updatedPermissions = {
            ...publicRole.permissions,
            ...customPermissions
        };
        
        // Update public role with new permissions
        const updateResponse = await axios.put(`${ADMIN_API}/users-permissions/roles/${publicRole.id}`, {
            name: 'Public',
            description: 'Default role given to unauthenticated user.',
            type: 'public',
            permissions: updatedPermissions
        }, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Successfully updated Public role permissions!');
        console.log(`📊 New permission count: ${Object.keys(updatedPermissions).length}`);
        console.log('\n🎉 Custom endpoints should now be accessible!');
        
    } catch (error) {
        console.log('❌ Error updating permissions:');
        console.log(`   ${error.message}`);
        
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
        }
        
        if (error.message.includes('your-admin-api-token-here')) {
            console.log('\n📝 To fix this:');
            console.log('1. Go to Strapi Admin → Settings → API Tokens');
            console.log('2. Create new token with "Full Access"');
            console.log('3. Replace "your-admin-api-token-here" in this script');
            console.log('4. Run script again');
        }
    }
}

// Manual permission checker - doesn't require admin token
async function checkPermissions() {
    console.log('🔍 Checking current API endpoint accessibility...\n');
    
    const endpoints = [
        '/api/spielers/top-scorers',
        '/api/spielers/injured', 
        '/api/mannschaften/with-trainers',
        '/api/mannschaften/active',
        '/api/trainings/upcoming',
        '/api/mitglieder/getAllMembersWithUsers'
    ];
    
    for (const endpoint of endpoints) {
        try {
            const response = await axios.get(`${STRAPI_URL}${endpoint}`);
            console.log(`✅ ${endpoint} - ACCESSIBLE`);
        } catch (error) {
            const status = error.response?.status || 'ERROR';
            const message = error.response?.data?.error?.message || error.message;
            console.log(`❌ ${endpoint} - ${status}: ${message}`);
        }
    }
}

async function main() {
    const action = process.argv[2];
    
    if (action === 'check') {
        await checkPermissions();
    } else if (action === 'fix') {
        await updatePublicPermissions();
    } else {
        console.log('Usage:');
        console.log('  node fix-permissions.js check  - Check current endpoint accessibility');
        console.log('  node fix-permissions.js fix    - Fix permissions (requires admin token)');
    }
}

if (require.main === module) {
    main().catch(console.error);
} 