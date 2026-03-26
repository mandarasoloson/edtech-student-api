import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app/app.js';
import { resetDb } from '../src/data/bd.js';

describe('API Students', () => {

  beforeEach(() => {
    resetDb();
  });


  describe('GET /api/students', () => {
    
    // Test 1
    it('1. Doit renvoyer 200 et un tableau', async () => {
      const res = await request(app).get('/api/students');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    // Test 2
    it('2. Doit renvoyer tous les étudiants initiaux (5)', async () => {
      const res = await request(app).get('/api/students');
      expect(res.body.length).toBe(5);
    });

    // Test 3
    it('3. GET /:id valide doit renvoyer l\'étudiant correspondant', async () => {
      const res = await request(app).get('/api/students/1');
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(res.body.firstName).toBe('John');
    });

    // Test 4
    it('4. GET /:id inexistant doit renvoyer 404', async () => {
      const res = await request(app).get('/api/students/999');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    // Test 5
    it('5. GET /:id invalide (ex: "abc") doit renvoyer 400', async () => {
      const res = await request(app).get('/api/students/abc');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("L'ID doit être un nombre");
    });
  });


  describe('POST /api/students', () => {

    const validStudent = {
      firstName: "Elon", lastName: "Musk", email: "elon@edtech.fr", grade: 15, field: "Informatique"
    };

    // Test 6
    it('6. POST avec données valides doit renvoyer 201 + l\'étudiant avec un ID', async () => {
      const res = await request(app).post('/api/students').send(validStudent);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.firstName).toBe('Elon');
    });

    // Test 7
    it('7. POST sans champ obligatoire doit renvoyer 400', async () => {
      const invalidStudent = { firstName: "Elon" }; 
      const res = await request(app).post('/api/students').send(invalidStudent);
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Tous les champs sont obligatoires');
    });

    // Test 8
    it('8. POST avec note invalide (ex: 25) doit renvoyer 400', async () => {
      const invalidGradeStudent = { ...validStudent, grade: 25 };
      const res = await request(app).post('/api/students').send(invalidGradeStudent);
      expect(res.status).toBe(400);
    });

    // Test 9
    it('9. POST avec email déjà existant doit renvoyer 409', async () => {
      const duplicateEmailStudent = { ...validStudent, email: "charlie.brown@example.com" };
      const res = await request(app).post('/api/students').send(duplicateEmailStudent);
      expect(res.status).toBe(409);
    });
  });


  describe('PUT /api/students/:id', () => {

    // Test 10
    it('10. PUT avec données valides doit renvoyer 200 + l\'étudiant modifié', async () => {
      const updateData = { firstName: "Ada", lastName: "Lovelace", email: "ada@edtech.fr", grade: 20, field: "Informatique" };
      const res = await request(app).put('/api/students/1').send(updateData);
      expect(res.status).toBe(200);
      expect(res.body.grade).toBe(20); // La note a bien été modifiée
    });

    // Test 11
    it('11. PUT avec ID inexistant doit renvoyer 404', async () => {
      const updateData = { firstName: "Ghost", lastName: "Rider", email: "ghost@edtech.fr", grade: 10, field: "Informatique" };
      const res = await request(app).put('/api/students/999').send(updateData);
      expect(res.status).toBe(404);
    });
  });


  describe('DELETE /api/students/:id', () => {

    // Test 12
    it('12. DELETE avec ID valide doit renvoyer 200', async () => {
      const res = await request(app).delete('/api/students/1');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Étudiant supprimé avec succès');
    });

    // Test 13
    it('13. DELETE avec ID inexistant doit renvoyer 404', async () => {
      const res = await request(app).delete('/api/students/999');
      expect(res.status).toBe(404);
    });
  });


  describe('GET /api/students/stats & /search', () => {

    // Test 14
    it('14. GET /stats doit renvoyer les statistiques correctes', async () => {
      const res = await request(app).get('/api/students/stats');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalStudents');
      expect(res.body).toHaveProperty('averageGrade');
      expect(res.body).toHaveProperty('studentsByField');
      expect(res.body).toHaveProperty('bestStudent');
      expect(res.body.totalStudents).toBe(5);
    });

    // Test 15
    it('15. GET /search?q=... doit renvoyer les étudiants correspondants', async () => {
      const res = await request(app).get('/api/students/search?q=Alice');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].firstName).toBe('Alice');
    });
  });

});