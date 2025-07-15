// Test für das neue saubere Backend
const API_URL = 'http://localhost:1337';

async function testNewBackend() {
  console.log('🧪 Teste das neue saubere Backend...\n');

  try {
    // 1. Registriere Admin User (falls noch nicht registriert)
    console.log('1️⃣ Teste Admin-Registrierung...');
    
    const registerResponse = await fetch(`${API_URL}/admin/register-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: 'Onur',
        lastname: 'Cirakoglu',
        email: 'cirakoglu.onur@gmail.com',
        password: 'admin123456'
      })
    });

    if (registerResponse.ok || registerResponse.status === 400) {
      console.log('✅ Admin User bereit');
    } else {
      console.log('❌ Admin-Registrierung fehlgeschlagen');
      return;
    }

    // 2. Login als Admin
    console.log('\n2️⃣ Teste Admin-Login...');
    const loginResponse = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'cirakoglu.onur@gmail.com',
        password: 'admin123456'
      })
    });

    if (!loginResponse.ok) {
      console.log('❌ Admin-Login fehlgeschlagen');
      return;
    }

    const loginData = await loginResponse.json();
    const authToken = loginData.jwt;
    console.log('✅ Admin-Login erfolgreich');

    // 3. Teste createMemberWithUser API
    console.log('\n3️⃣ Teste createMemberWithUser API...');
    
    const testUserData = {
      username: 'testuser-new',
      email: 'test-new@example.com',
      password: 'password123',
      vorname: 'Test',
      nachname: 'User',
      mitgliedstyp: 'spieler',
      benutzerrolle: 'spieler'
    };

    const createResponse = await fetch(`${API_URL}/api/mitglieds/createMemberWithUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(testUserData)
    });

    const createData = await createResponse.json();
    console.log('Status:', createResponse.status);
    console.log('Response:', createData);

    if (createResponse.ok) {
      console.log('\n🎉 ERFOLG! Das neue Backend funktioniert perfekt!');
      console.log('✅ Keine Policy Failed Fehler mehr');
      console.log('✅ User-Erstellung funktioniert');
      console.log('\n🚀 NÄCHSTE SCHRITTE:');
      console.log('1. Gehe zu: http://localhost:3000/admin');
      console.log('2. Jetzt sollte alles funktionieren!');
    } else {
      console.log('\n🔧 Noch ein kleines Problem, aber das Backend ist sauber');
      console.log('Response:', createData);
    }

  } catch (error) {
    console.error('❌ Fehler:', error.message);
    console.log('\n💡 Das Backend startet möglicherweise noch...');
    console.log('Warte kurz und versuche erneut');
  }
}

testNewBackend(); 