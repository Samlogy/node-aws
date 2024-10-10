const request = require('supertest');
const pool = require('../../db');
const app = require('../../index');

let todoIdExist;

beforeAll(async () => {
  await pool.connect();
  await pool.query(`TRUNCATE todos`);
  const result = await pool.query(
    `INSERT INTO todos (title, userId, completed) 
     VALUES ('Initial Test Todo', 1, false) 
     RETURNING *`
  );
  todoIdExist = result.rows[0].id;
});

// Integration tests for todos
describe('Todos API', () => {
  const todoIdNotExist = 9999; // ID that doesn't exist

  it('should fetch all todos', async () => {
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Ensure response is an array
  });

  describe('get a todo by id', () => {
    it('should fetch a todo by id', async () => {
      const res = await request(app).get(`/todos/${todoIdExist}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toEqual(expect.any(Number)); // Check if ID is a number
      expect(res.body.title).toEqual(expect.any(String)); // Check if title is a string
    });

    it('should not find a todo by id', async () => {
      const res = await request(app).get(`/todos/${todoIdNotExist}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Todo not found'); // Ensure correct error message
    });
  });

  it('should create a new todo', async () => {
    const newTodo = { title: 'Test Todo 2', userId: 1, completed: false };
    const res = await request(app).post('/todos').send(newTodo);
    console.log('rr => ', newTodo);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newTodo.title);
    todoIdExist = res.body.id;
  });

  describe('delete a todo by id', () => {
    it('should delete the todo', async () => {
      const res = await request(app).delete(`/todos/${todoIdExist}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Todo deleted');
    });

    it('should not find the deleted todo', async () => {
      const res = await request(app).get(`/todos/${todoIdExist}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Todo not found');
    });
  });
});
