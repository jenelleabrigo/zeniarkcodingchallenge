## Steps in setting up this project in local.

Clone this project to your local environment and go to the project directory.

Run the following commands:
To install the existing npm packages.
```bash
npm install
```

Create a copy of the env file
```bash
cp .env.example .env
```

To start the server
Note: You may change the port in the `.env` file depending on what port you are running the server (default is 3000)
```bash
npm run dev
```

You may edit the questions in the API.
Api is located in `src/api/data.js`
