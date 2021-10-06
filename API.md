**Register User**
----
  Returns json data of the successful registered user.

* **URL**

  /users

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Body Params**

     **Required:**
 
   `username: string`
   `password: string`
   *password must be 8 to 32 characters long, and it must contain at least a lowercase letter, an uppercase letter, and a digit.*

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{username: "stanley288", createdAt: "2021-10-06T01:06:58-07:00"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Validation Failed", details: {...} }`
  OR
    **Content:** `{ message : "Username already exists." }`



**Authenticate User**
----
  Authenticates and returns json data of the authenticated user.

* **URL**

  /users

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Headers Params**

     **Required:**
 
   `Authorization: Basic <credentials>`
   *The credentials are constructed from the Base64 encoding of ID and password joined by a single colon :.*

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{username: "stanley288", createdAt: "2021-10-06T01:06:58-07:00"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "User does not exist"}`
    
    OR

    **Content:** `{ message: "Incorrect Password"}`

