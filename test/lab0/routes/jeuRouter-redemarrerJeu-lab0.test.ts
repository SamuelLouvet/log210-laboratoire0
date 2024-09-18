import request from 'supertest';
import app from '../../../src/app'; // Import your Express app
import { assert } from 'console';
import 'jest-extended';
import { Joueur } from '../../../src/core/joueur';

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () => {
    const joueur1 = new Joueur("joueur1");
    const joueur2 = new Joueur("joueur2");
  });

  it("redemarrerJeu() should return 200 and JSON as response", async () => {
    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toContain('application/json');
  });

  it("redemarrerJeu() postcondition no more players", async () => {
    await request(app).get('/api/v1/jeu/redemarrerJeu');
    const playersResponse = await request(app).get('/api/v1/jeu/joueurs');
    expect(playersResponse.body).toBeEmpty();
});

it("should return a 404 error after trying to start a game after a restart without players", async () => {
  await request(app).get('/api/v1/jeu/redemarrerJeu');
  const response = await request(app).get('/api/v1/jeu/jouer/');
  expect(response.status).toBe(404);
});
});
