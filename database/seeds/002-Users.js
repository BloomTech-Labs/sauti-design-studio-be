const faker = require("faker");

function createUser() {
  return {
    company_name: faker.company.companyName(),
    country: faker.address.country(),
    display_name: faker.name.firstName(),
    email: faker.internet.email(),
    phone_num: faker.phone.phoneNumber(),
    password: "randomPassword",
    google_id: faker.random.uuid(),
    facebook_id: faker.random.uuid()
  };
}

let userList = [];

for (let i = 0; i < 100; i++) {
  userList.push(createUser());
}

exports.seed = function(knex, Promise) {
  return knex("users").then(function() {
    // Inserts seed entries
    return knex("users").insert(userList);
  });
};
