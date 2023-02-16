# MemeMuc Launcher

This repository is a _template_ to unify the meme generator bonus project submissions for the _Online Multimedia Lecture_ in the winter semester 2022/23 at LMU Munich.

Any submission must be runnable without additional adaptions by executing
```bash
cd mememuc-launcher && npm run installall && npm start
```

The template contains two folders that are relevant to you. Your implementation is supposed to go in these two folders.
* `./node-backend`: The backend of your project using NodeJS
* `./react-frontend`: The frontend of your project using React

Currently, both folder are filled with some dummy projects.

When you replace the `./node-backend` dummy project with your own implementation, there are two pieces of code which you need to re-include from the dummy project:
- In _app.js_: The block at the very top, commented with `Important`
  ```JavaScript
  const MONGODB_PORT = process.env.DBPORT || '27017';
  const db = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-2223`); // connect to database omm-2223
  console.log(`Connected to MongoDB at port ${MONGODB_PORT}`)
  ```
- In _package.json_: The _scripts_ block
  ```JSON
  "scripts": {
    "startdev": "node ./bin/www",
    "start": "SET DBPORT=65535 && node ./bin/www"
  },
  ```

The other two folders __must not be changed__!
* `./mememuc-launcher` contains configuration files for installing dependencies and launching the application you implement.
* `./mongoserver` cotains a local in-memory database server independent of any existing local installation.
  This database is not persistent and will reset with each restart. It is meant for testing your submission with a consistent data state, independent of the computer on which it runs.
  You _can_ add files to the `./mongoserver/data` subdirectory.

Regarding the other two folder, `node-backend` and `react-frontend`, you are free to edit everything. However if you want to use a database and include demodata in your submission, it makes sense to stick to the code that connects the backend to the in-memory database (see comments at the top of `node-backend/app.js`)


## How To Use

### During Development

During development we recommend to run the two projects (`./node-backend` and `./react-frontend`) individually. However if you prefer, you can use the NodeJS scripts from `./mememuc-launcher` during development too, with the following commands:

```
cd mememuc-launcher
```
navigates your commandline into the mememuc launcher project

```
npm run installall
```
installs the dependencies of all (sub)projects

```
npm run startdev
```
starts the backend project. It will connect to a local MongoDB instance (assuming any is running on your local machine) at the default port `27017`.

### How To Prepare Your Submission

- Export the MongoDB database state that you want us to user for evaluating your submission from your local MongoDB as bson files using `mongodump`, e.g.: `mongodump mongodb://127.0.0.1:27017 --db=omm-ws2223`
- Place all created *.bson and *.metadata.json files in `mongoserver/data`
- The in-memory database server (`./mongoserver`) will import these files as default data whenever you (re)launch the project.

### How We Will Test Your Submission

To evaluate your submission, we will launch the following commands:

```bash
cd mememuc-launcher # Navigates your commandline into the mememuc launcher project.
npm run installall # Installs the dependencies of all (sub)projects.
npm start # Starts the backend project using the non-persistent in-memory MongoDB instance.
```