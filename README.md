# <div align="center" >  ✅ TASKD PLATFORM ✅ </div>
### <div align="center" > A task management platform that allows the users to increase their productivity </div>
###### <div align="center" > Built using Nextjs 14 🔼, NestJs 🐱 and MongoDb 🍃 </div>

## Steps To Run
- This project was made very easy to run with the current project structure, "One folder to rule them all" 
The main folder contains  a `/taskd_next` which is our front end `Nextjs` app and a `/taskd_nest` which is our backend.
- The main project structure looks something like this :
  
``` 
  .
  ├── taskd_nest              # Nest Backend
  ├── taskd_next              # Nextjs Fronend
  ├── .gitignore              # Gitignore file
  ├── docker-compose.yml      # Docker compose file
  └── README.md
```

- and since it is structured in this way it allowed me to configure my docker compose to run three main services from one command
- the services are : `mong-db`,`nest` and `next`
- NOTE: to run this project it is required to have `docker` installed and the docker app running.
- To run this project all you need to do is :
```bash
docker compose up --build
```
- this command will download the images for you, build containers and then run them
- One of the coolest features is that the database will hold your data even if you restart your containers unless you delete it manually
- once running here are the exposed links for each service:
```
next    : http://localhost:3000
nest    : http://localhost:8000
mongodb : mongodb://loaclhost:1027
```
- Routing for nest is straight forward here are the routes :
```
@GET    : /tasks         : get all tasks
@GET    : /tasks/:id     : get task by id
@GET    : /tasks/summary : get user task summary
@POST   : /tasks         : create a new task
@PUT    : /tasks/:id     : update a task by id
@DELETE : /tasks/:id     : delete a task by id

@POST   : /auth/login    : login as a user
@POST   : /auth/register : register as a user
@POST   : /auth/logout   : logout from your session
```
- keep in mind that the task routes are protected, unless you hit `/auth/login` first, you will not be able to run any endpoints successfully

## Used Nest Features and associated Libraries
- `@nestjs/jwt`: for generating jwt auth tokens
- `bcrypt`: for hashing passwords
- `uuid`: for generating unique ids
- `cors`: for setting up cross origins
- `access-validator`: for input validation
- `morgan`: for server side logging
- `mongoose`: as an ORM for our database
- `cookie-parser`: to parse secure cookies into browser

## Used Next Features and Libraries
- `tailwindCss`: as the main CSS postprocessor
- `axios`: for all things http requests
- `@shadcn/ui`: as a UI library (extends also from `Recharts` which made it the best candidate)
- `react-lottie`: as the animation library
- `next/headers`: to handle the cookies
- `next middleware`: to handle route protection
- `appliDrop design system`: my own design system to be used in upcoming public projects
