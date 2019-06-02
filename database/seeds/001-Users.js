const faker = require("faker");

function createUser() {
  return {
    company_name: faker.company.companyName(),
    country: faker.address.country(),
    email: faker.internet.email(),
    phone_num: faker.phone.phoneNumber(),
    password: "randomPassword"
  };
}

let userList = [];

for (let i = 0; i < 150; i++) {
  userList.push(createUser());
}

exports.seed = function(knex, Promise) {
  return knex("users").then(function() {
    // Inserts seed entries
    return knex("users").insert(userList);
  });
};
