const axios = require('axios');

const BASE_URL = 'http://localhost:1337/api';

// Test configuration
const tests = [];
let passedTests = 0;
let failedTests = 0;

function addTest(name, testFn) {
    tests.push({ name, testFn });
}

async function runTest(test) {
    try {
        console.log(`\n🧪 Testing: ${test.name}`);
        await test.testFn();
        console.log(`✅ PASSED: ${test.name}`);
        passedTests++;
    } catch (error) {
        console.log(`❌ FAILED: ${test.name}`);
        console.log(`   Error: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
        }
        failedTests++;
    }
}

// ========== STANDARD REST ENDPOINT TESTS ==========

addTest('GET /kategorien (Standard REST)', async () => {
    const response = await axios.get(`${BASE_URL}/kategorien`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.data) throw new Error('Missing data array');
    console.log(`   Found ${response.data.data.length} kategorien`);
});

addTest('GET /news-artikels (Standard REST)', async () => {
    const response = await axios.get(`${BASE_URL}/news-artikels`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.data) throw new Error('Missing data array');
    console.log(`   Found ${response.data.data.length} news articles`);
});

addTest('GET /mitglieder (Standard REST)', async () => {
    const response = await axios.get(`${BASE_URL}/mitglieder`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.data) throw new Error('Missing data array');
    console.log(`   Found ${response.data.data.length} mitglieder`);
});

addTest('GET /spielers (Standard REST)', async () => {
    const response = await axios.get(`${BASE_URL}/spielers`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.data) throw new Error('Missing data array');
    console.log(`   Found ${response.data.data.length} spielers`);
});

addTest('GET /mannschaften (Standard REST)', async () => {
    const response = await axios.get(`${BASE_URL}/mannschaften`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.data) throw new Error('Missing data array');
    console.log(`   Found ${response.data.data.length} mannschaften`);
});

addTest('GET /trainings (Standard REST)', async () => {
    const response = await axios.get(`${BASE_URL}/trainings`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.data) throw new Error('Missing data array');
    console.log(`   Found ${response.data.data.length} trainings`);
});

addTest('GET /spiele (Standard REST)', async () => {
    const response = await axios.get(`${BASE_URL}/spiele`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.data) throw new Error('Missing data array');
    console.log(`   Found ${response.data.data.length} spiele`);
});

addTest('GET /leaderboard-entries (Standard REST)', async () => {
    const response = await axios.get(`${BASE_URL}/leaderboard-entries`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.data) throw new Error('Missing data array');
    console.log(`   Found ${response.data.data.length} leaderboard entries`);
});

// ========== CUSTOM ENDPOINT TESTS ==========

addTest('GET /spielers/top-scorers (Custom)', async () => {
    const response = await axios.get(`${BASE_URL}/spielers/top-scorers`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    console.log(`   Custom endpoint accessible`);
});

addTest('GET /spielers/position/Sturm (Custom)', async () => {
    const response = await axios.get(`${BASE_URL}/spielers/position/Sturm`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    console.log(`   Position filter working`);
});

addTest('GET /spielers/injured (Custom)', async () => {
    const response = await axios.get(`${BASE_URL}/spielers/injured`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    console.log(`   Injured players endpoint working`);
});

addTest('GET /mannschaften/with-trainers (Custom)', async () => {
    const response = await axios.get(`${BASE_URL}/mannschaften/with-trainers`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    console.log(`   Teams with trainers endpoint working`);
});

addTest('GET /mannschaften/active (Custom)', async () => {
    const response = await axios.get(`${BASE_URL}/mannschaften/active`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    console.log(`   Active teams endpoint working`);
});

addTest('GET /trainings/upcoming (Custom)', async () => {
    const response = await axios.get(`${BASE_URL}/trainings/upcoming`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    console.log(`   Upcoming trainings endpoint working`);
});

// ========== FRONTEND-CRITICAL TESTS ==========

addTest('Frontend: News with Category Population', async () => {
    const response = await axios.get(`${BASE_URL}/news-artikels?populate=kategorie`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    console.log(`   News with categories can be populated`);
});

addTest('Frontend: Players with Team Population', async () => {
    const response = await axios.get(`${BASE_URL}/spielers?populate=mannschaft`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    console.log(`   Players with teams can be populated`);
});

addTest('Frontend: Games with Team Relations', async () => {
    const response = await axios.get(`${BASE_URL}/spiele?populate=*`);
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    console.log(`   Games with team relations working`);
});

// ========== GRAPHQL TEST ==========

addTest('GraphQL Endpoint Available', async () => {
    const query = `
        query {
            kategorien {
                name
            }
        }
    `;
    
    const response = await axios.post(`http://localhost:1337/graphql`, {
        query: query
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.data) throw new Error('Missing GraphQL data');
    console.log(`   GraphQL working with kategorien query`);
});

// ========== RUN ALL TESTS ==========

async function runAllTests() {
    console.log('🚀 Starting Comprehensive Backend Tests');
    console.log(`📊 Running ${tests.length} tests...\n`);
    
    for (const test of tests) {
        await runTest(test);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('📋 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`📊 Total:  ${tests.length}`);
    console.log(`📈 Success Rate: ${((passedTests / tests.length) * 100).toFixed(1)}%`);
    
    if (failedTests === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Backend is working correctly.');
    } else {
        console.log(`\n⚠️  ${failedTests} test(s) failed. Check the errors above.`);
    }
}

// Only run if called directly
if (require.main === module) {
    runAllTests().catch(console.error);
}

module.exports = { runAllTests }; 