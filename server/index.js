const express = require('express');
const cors = require('cors');
const pool = require('./db');
const initDB = require('./initDB') 

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 4002 : 3002);

app.get('/health', (req, res) => {
  res.send('Healthy App');
});

app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos'); // Query the database
    res.status(200).json(result.rows); // Send back the rows
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/todos', async (req, res) => {
  const { title, userId, completed } = req.body; // Get the text from the request body
  try {  
    const result = await pool.query("INSERT INTO todos (title, userId, completed) VALUES ($1, $2, $3) RETURNING *", [title, userId, completed]); // Insert into the database
    res.status(201).json(result.rows[0]); // Return the newly created todo
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id); // Ensure the ID is an integer
  try {
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]); // Delete from the database
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Todo deleted' }); // Return success message
    } else {
      res.status(404).json({ message: 'Todo not found' }); // Todo not found
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  initDB();
  console.log(`Server => http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  pool.end(); // Close the pool when shutting down
  process.exit();
});