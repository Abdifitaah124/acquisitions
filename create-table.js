import pg from 'pg';
const { Client } = pg;

async function createTable() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_DfjvTGLX0Ht6@ep-curly-sunset-a48388nk-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
  });

  try {
    await client.connect();
    console.log('Connected to database');
    
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    
    console.log('Creating users table...');
    await client.query(sql);
    console.log('✅ Users table created successfully!');
    
    await client.end();
  } catch (err) {
    console.error('❌ Error:', err.message);
    await client.end();
  }
}

createTable();
