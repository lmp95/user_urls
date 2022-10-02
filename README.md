## Clone or download repo

In the root directory, you can run:

for backend api, path to backend folder and run

### `npm i`

### `npm run dev`

for frontend, path to client folder and run

### `npm i`

### `npm run start`

Open [http://localhost:3000](http://localhost:3000) to view frontend in browser.
Open [http://localhost:3500](http://localhost:3500) to view backend api in browser.

##### Create User for login

**POST METHOD** [http://localhost:3500/v1/user/](http://localhost:8080/v1/user/)
_content-type_ - application/json
_request body_

         "username": "Administrator",
         "password": "123@abc",
         "email": "admin@mail.com",
         "status": true

After create user, able to login with created email and password.
