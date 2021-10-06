# **User Authentication** Service

**User registration and authentication** microservice for Lendesk assignment

### Development Setup

Run service in docker container with Redis image available with below script.

```bash
> make up # -> port 9090
```

### API Documentation

Please refer to API.md for API Documentation.


### Service Requirements

Using Node.js as your framework and Redis for data storage, we need an authentication API for internal services to create and authenticate users. This API should be RESTful and use JSON. It should be fast and secure, and be able to pass a basic security audit (e.g. password complexity). If there are areas of security that your solution hasn't had time to address they should be annotated for future development. The API should be able to create a new login with a username and password, ensuring that usernames are unique. It should also be able to authenticate this login at a separate end point. It should respond with 200 OK messages for correct requests, and 401 for failing authentication requests. It should do proper error checking, with error responses in a JSON response body. 


### Additional Features

1. The passowrd saved in the database has been hashed with SHA512 to enforce security standards and prevent password leaks.
2. The server will validate the authentication of the user through the authorization header with basic strategy.
3. Input validation has been added to the endpoint using `joi` 
4. The server provides healthcheck endpoint ```GET '/' ``` for monitoring tools to detect  outage realtime.

### Risks / Potential Improvements

1. Redis is meant for temporary storage solution, registered user data can be lost. It should be replaced with a permanent database.
2. Unit tests and integration tests should be added for automated testing.
3. A rate limiting middleware should be added to prevent brute-force password attacks.
4. HTTPS protocal should enabled when deploying to production environment.

