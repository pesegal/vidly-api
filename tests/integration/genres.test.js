const request = require('supertest');
let server; // Note this is started and stopped before each test so that there is no conflict when starting the server.

describe('/api/genres', () => {
    beforeEach(() => {
        server = require('../../index');
    })
    afterEach(() => {
        server.close();
    })
    describe('GET /', () => {
        it('should return all genres', async () => {
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        })
    })
})