const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');

const { MONGO_DBNAME, MONGO_PORT, MONGO_USER, MONGO_PSSWD } = process.env;
const db = {
  host: 'localhost',
  port: MONGO_PORT || '27017',
  name: MONGO_DBNAME || 'twilioverify',
  user: MONGO_USER,
  pwd: MONGO_PSSWD,
};

const mongoURI = `mongodb://${db.user}:${db.pwd}@${db.host}:${db.port}/${db.name}?authSource=admin`;

class Repository {
  constructor() {
    MongoClient.connect(mongoURI)
      .then((client) => {
        this.db = client.db(db.name);
        this.users = this.db.collection('users');
        console.log('Connected to MongoDB');
      })
      .catch((error) => console.error('Error connecting to MongoDB:', error));
  }

  async create(name, password, phone = null, twoFA = false) {
    const user = {
      id: uuidv4(),
      password: bcrypt.hashSync(password, 10),
      phone,
      name,
      twoFA,
    };

    await this.users.insertOne(user);
  }

  async findUserByNameAndPassword(name, password) {
    const user = await this.users.findOne({ name: name });

    if (!user) {
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return;
    }

    return user;
  }

  async findByName(name) {
    const user = await this.users.findOne({ name: name });

    return user;
  }

  async findById(id) {
    const user = await this.users.findOne({ id: id });

    return user;
  }

  async updatePassword(id, newPassword) {
    const result = await this.users.findOneAndUpdate(
      { id: id },
      { $set: { ...user, password: bcrypt.hashSync(newPassword, 10) } },
      { returnDocument: 'after' }
    );
    if (result.value) {
      res.json(result.value);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }

  async addPushVerification(id, factor) {
    const result = await this.users.findOneAndUpdate(
      { id: id },
      { $set: { ...user, factor: factor } },
      { returnDocument: 'after' }
    );
    if (result.value) {
      res.json(result.value);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }
}

module.exports = Repository;
