db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [{ role: "readWrite", db: process.env.MONGO_INITDB_DATABASE }],
});

db.createCollection("users");

db.users.insertMany([
  {
    id: "728fd5a3-4cf3-4aee-9694-bfc4609a15b6",
    name: "Bob",
    password: "$2b$10$wVkArAfuFttiG2vkEaNJ3eP9Z213xR0.d7NUJwOFY61qIM3iu2hvm",
    factor: {
      type: "push",
      sid: "YF032b53e3d9dac177897e75f0895721ec",
    },
  },
  {
    id: "e13cf2ec-5def-4652-b22b-6f1bca6b55ae",
    name: "Matthias",
    password: "$2b$10$ux2dNeOfu6AYZhr3lfVVyeQJONsDUZTK0p8pU8GwldTakP7d1lInq",
    factor: {
      type: "push",
      sid: "YF03d8bab1ed8b76716500286214c7b29f",
    },
  },
]);
