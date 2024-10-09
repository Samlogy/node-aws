const request = require('supertest');

const pool = require('../db');
const app = require('../index');

// Before all tests, you might want to clear the database or set up initial data
beforeAll(async () => {
await pool.connect(); 
await pool.query('TRUNCATE TABLE todos');
});

// Unit tests for health endpoint
describe('GET /health', () => {
  it('should return healthy message', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Healthy App');
  });
});

// Integration tests for todos
describe('Todos API', () => {
  let todoIdExist; 
  const todoIdNotExist = 9999

    it('should fetch all todos', async () => {
        const response = await request(app).get('/todos');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should fetch a todo by id', async () => {
        const res = await request(app).get(`/todos/${todoIdExist}`); 
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toEqual(expect.any(Number));  
        expect(res.body.title).toEqual(expect.any(String)); 
    })

    it('should not find a todo by id', async () => {
        const res = await request(app).get(`/todos/${todoIdNotExist}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Todo not found');
    });

    it('should create a new todo', async () => {
        const newTodo = { title: 'Test Todo', userId: 1, completed: false };
        const res = await request(app).post('/todos').send(newTodo);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id'); // Ensure an ID is returned
        expect(res.body.title).toBe(newTodo.title);
        todoId = res.body.id; // Save the created todo ID
    });

    it('should delete the todo', async () => {
        const res = await request(app).delete(`/todos/${todoIdExist}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Todo deleted');
    });

    it('should not find the deleted todo', async () => {
        const res = await request(app).get(`/todos/${todoIdNotExist}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Todo not found');
    });
});

// afterAll(async () => {
//     await pool.end();
// });
