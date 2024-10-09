const pool = require("./db"); // Import the PostgreSQL connection pool

const initDB = async () => {
  try {
    // Create the todos table if it does not exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        userId INTEGER NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      );
    `;

    await pool.query(createTableQuery);
    console.log("Todos table created or already exists.");

    const TODOS = [
      {
        userId: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 1,
        title: "quis ut nam facilis et officia qui",
        completed: false,
      },
      {
        userId: 1,
        title: "fugiat veniam minus",
        completed: false,
      },
      {
        userId: 1,
        title: "et porro tempora",
        completed: true,
      },
      {
        userId: 1,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false,
      },
      {
        userId: 1,
        title: "qui ullam ratione quibusdam voluptatem quia omnis",
        completed: false,
      },
      {
        userId: 1,
        title: "illo expedita consequatur quia in",
        completed: false,
      },
      {
        userId: 1,

        title: "quo adipisci enim quam ut ab",
        completed: true,
      },
      {
        userId: 1,
        title: "molestiae perspiciatis ipsa",
        completed: false,
      },
      {
        userId: 1,
        title: "illo est ratione doloremque quia maiores aut",
        completed: true,
      },
    ];

    for (const todo of TODOS) {
      const insertQuery = `
        INSERT INTO todos (title, userId, completed) 
        VALUES ($1, $2, $3) 
        ON CONFLICT (title) DO NOTHING;
      `;
      await pool.query(insertQuery, [todo.title, todo.userId, todo.completed]);
    }

    console.log("Initial todos added.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = initDB;
