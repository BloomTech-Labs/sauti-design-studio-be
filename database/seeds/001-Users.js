const faker = require("faker");

function createUser() {
  return {
    CompanyName: faker.company.companyName(),
    Country: faker.address.country(),
    Email: faker.internet.email(),
    PhoneNum:faker.phone.phoneNumber(),
    Password: "randomPassword"
  };
}

userList = [];

for (let i = 0; i < 100; i++) {
  userList.push(createUser());
}

exports.seed = function(knex, Promise) {
  return knex("Users").then(function() {
    // Inserts seed entries
    return knex("Users").insert(userList);
  });
};