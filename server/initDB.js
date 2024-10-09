const pool = require("./db"); // Import the PostgreSQL connection pool

const initDB = async () => {
  try {
    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT FROM pg_tables 
        WHERE tablename = 'todos'
      );
    `;
    const tableExistsResult = await pool.query(tableExistsQuery);
    const tableExists = tableExistsResult.rows[0].exists;

    if (tableExists) {
      const countQuery = 'SELECT COUNT(*) FROM todos';
      const countResult = await pool.query(countQuery);
      const rowCount = parseInt(countResult.rows[0].count, 10);

      if (rowCount > 0) {
        console.log("Todos table already exists and contains data.");
        return;
      }
    }

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        userId INTEGER NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      );
    `;
    await pool.query(createTableQuery);
    console.log("Todos table created.");

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
        title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
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

    console.log("DB todos added!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = initDB;
