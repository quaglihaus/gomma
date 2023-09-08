# Gomma: an easy way to get hourly averaged metrics

This project includes a front-end part. Unicorns!

## Backend Installation

Go to the root folder and run this command to add all utilised libraries to your environment.

```bash
pip install -r requirements.txt
```

## Frontend Installation

Everything should be already properly set for this section, you just have to install the package requested, like Node.js, ReactJS, Mui


## Run Gomma

run main.py to start flask and the backend is up.
 
Now to run the code you have two possibilities: just sending a request to http://127.0.0.1:3010//hourlymean/<path:fromtime>/<path:totime>
and getting back the Json of the resulting dataset.
But at least look at the video in backend/presentation to see how it would've been with frontend..

Anyway, if you want to live the complete experience, use the frontend.
open a terminal on the frontend folder, or if you're in the root, type this command:
```bash
cd frontend
```
If you've never launched a frontend before download and install Node.js from this page: https://nodejs.org/it/download

then run this command to start the frontend server:
```bash
npm run start
```
Be careful there because sometimes the port 3010 could be already used by some other process. If that's the case, the terminal will ask you if you want to switch port. Accept, then on row 26 of MainPage.js file (/gomma/frontend/src/pages/MainPage.js) edit the path accordingly to the port you're currently in.



Ask for antything you need!

Kind regards,

Martino