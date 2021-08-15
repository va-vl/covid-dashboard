# covid-dashboard

## About

A dashboard with most recent data on COVID-19. Uses data from (**disease.sh**)[https://disease.sh]. Uses Leaflet for map visualization and Chart.js for graphs.

Live demo: https://covid-dashboard-va-z.netlify.app

## Install

This project is uses (**yarn**)[https://yarnpkg.com].

1. Clone this repository or download a ZIP archive;
2. Go to the project directory;
3. Call `yarn`;

Rename `.env.example` file to `.env` and fill in a (**Stadia Maps**)[https://stadiamaps.com] API key.

## Run

To run the `yarn serve:build`, install **http-server** globally: `npm install -g http-server`.

- `yarn dev` - run in dev mode;
- `yarn build`- build the app;
- `yarn serve:build` - build the app and run it with **http-server**.
- `yarn test` - run jest test;
