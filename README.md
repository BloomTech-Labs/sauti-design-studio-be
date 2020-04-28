# Code Climate QA

[![Maintainability](https://api.codeclimate.com/v1/badges/db5d729afcad6ae448a0/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/sauti-design-studio-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/db5d729afcad6ae448a0/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/sauti-design-studio-be/test_coverage)



# API Documentation

#### Backend deployed at [Heroku](https://sauti-design.herokuapp.com/) <br>
#### OLD Backend deployed at [Heroku](https://sauti-studio.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server

#### Express JS

Why did you choose this framework?
- Express has a large community of users.
- Express is the most matured framework for Node.js with 5+ years of use.
- Express offers a quick and simple way to get a server up and running.

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/profile`        | users           | Returns profile info for the logged in user.               |
| GET    | `/workflows`    | users | Returns all workflows made under that user.             |
| GET    | `/workflows/:id`        | owners, supervisors | Returns info for a workflow under user. 
| GET    | `/responses/:id`        | owners, supervisors | Returns responses info corresponding to the workflow.                    |
| POST   | `/workflows` | users                | Creates a new workflow which is tied to the users account. |
| POST   | `/auth` | none                | Creates a new user by logging in with either facebook or google. |
| PUT    | `/profile`        | users |    Edit your profile                                                |
| DELETE | `/users/:id`        | owners, business owner | Delete specefied user                                                  |

# Data Model

#### ORGANIZATIONS

---

```
{
  id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
}
```

#### USERS

---

```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING
  cal_visit: BOOLEAN
  emp_visit: BOOLEAN
  emailpref: BOOLEAN
  phonepref: BOOLEAN
}
```

## Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  OKTA_CLIENT_ID=
    *  OKTA_CLIENT_SECRET=
    *  OIDC_OKTA_DOMAIN=
    *  OKTA_REGISTER_TOKEN=
    *  AT_API_KEY=
    *  JWT_SECRET=
    *  FRONTEND_URL=
    *  DEV_CON=
    *  TEST_CON=
    *  EMAIL_USERNAME=
    *  EMAIL_PASSWORD=
    *  DB_ENV=

OKTA_CLIENT_ID -- Once you have your okta app created, under the client credentials section of your app's settings, you will find your client ID and client secret.

OKTA_CLIENT_SECRET -- Once you have your okta app created, under the client credentials section of your app's settings, you will find your client ID and client secret.

OIDC_OKTA_DOMAIN -- Set this to your okta app's domain. You will need to sign up for an okta developer account and create an app. From there you will get your app's URL.

OKTA_REGISTER_TOKEN -- A token that needs to be created on the okta developer control panel, under "api -> tokens". This token seems to expire a month after initial creation and the expiration date extends for another month from the date last used, so every time a new user registers an account, the expiration date extends to a month from that time.

AT_API_KEY -- Can be any string(?). Is required for functionality but not exactly sure what it does.

JWT_SECRET -- Can be any string. Used for creating the app's JWT token and decoding it.

FRONTEND_URL -- Set this to your frontend's URL. If you are using a local frontend, use http://localhost:port. If you are using a deployed frontend, use your frontend's URL.

DEV_CON -- The connection string used to access the development environment on the knexfile. Example: DEV_CON=postgresql://USERNAME:PASSWORD@localhost/DATABASENAME

TEST_CON -- The connection string used to access the testing environment on the knexfile. Example: TEST_CON=postgresql://USERNAME:PASSWORD@localhost/DATABASENAME

EMAIL_USERNAME -- The gmail account username that will receive all the contact information and the publish submissions.

EMAIL_PASSWORD -- The gmail account's password.

DB_ENV -- For deployment, this should be set to "production" to use the production environment or it will default to "development". See "./database/dbConfig.js" for details.

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/labs13-sauti-studio/labs13-sauti-studio-FE/edit/master/README.md) for details on the fronend of our project.

## Notes

#### Heroku Migration CLI Command: 
heroku run knex --knexfile=./knexfile.js migrate:latest -a sauti-studio-main-server
heroku run knex --knexfile=./knexfile.js migrate:latest -a sauti-studio-dev-server
#### Heroku Seed:Run CLI Command: 
heroku run knex --knexfile=./knexfile.js seed:run -a sauti-studio-main-server
heroku run knex --knexfile=./knexfile.js seed:run -a sauti-studio-dev-server
#### Heroku CLI Log Command: 
heroku logs --tail -a sauti-studio-main-server
heroku logs --tail -a sauti-studio-dev-server
