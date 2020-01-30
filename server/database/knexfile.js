module.exports = {
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'db.sqlite3'
    }
  }
}

