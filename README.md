﻿# Bike Rental Server

I have created a Bike Rental Service backend system using NodeJS, ExpressJS, MongoDB, and Mongoose. The api's of our project is secured using JWT (json web token). We have implemented two type of valid role for our api one is "Admin" and another is "User". Admin and User plays different role in our api and they have their specific access according to their roles. We have handled error routes with relevant message and status.

API Endpoints:

- /api/users
- /api/auth
- /api/bikes
- /api/rental

## To Run The Project

To run the project in your device _clone_ the project and then run the following commands

```shell
npm install
npm run start:dev
```

For checking the es linting and to fix the linting run the commands

```shell
npm run lint
npm run lint:fix
```

To make your code organized run the command

```shell
npm run prettier:fix
```
