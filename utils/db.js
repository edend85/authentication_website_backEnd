const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './utils/.env' });

class DB {
    db_uri;
    db_name;
    client;

    constructor(){
        this.db_uri = process.env.DB_URI;
        this.db_name = process.env.DB_NAME;
        console.log('constructor :>> ',this.db_uri,this.db_name);
        this.client = new MongoClient(this.db_uri);
        this.connect();
    }
    async connect() {
        try {
          console.log('connecting to DB :>> ');
          await this.client.connect();
          console.log('Connected to the database');
        } catch (error) {
          console.error('Failed to connect to the database:', error);
        }
      }
      async InsertUser(collection, doc) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).insertOne(doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async Login(collection, email) {
      try {
        console.log('step 3 :>> ');
          await this.client.connect();
          let user = await this.client.db(this.db_name).collection(collection).findOne({"email":email});
          return user;
      } catch (error) {
          throw error;
      }
      finally {
          await this.client.close();
      }
  }
}
module.exports = DB;