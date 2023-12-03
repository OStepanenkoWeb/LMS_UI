## Demo

https://lms-ui-steel.vercel.app/

## About


This is a UI LMS system with the functionality of purchasing, reviews, questions and course evaluations

## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/OStepanenkoWeb/LMS_UI.git
    npm install
    npm run dev

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.

Note: If you are already running a webserver on port 80 (e.g. Macs usually have the Apache webserver running on port 80) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. `PORT=3000 npm start`).

## Configuring

If you configure a .env file.

Environment variables:

* NEXT_PUBLIC_BASE_URL (url example http://localhost:8000/api/v1/)

* NEXT_PUBLIC_DOMEN_URL (main domen backend example http://localhost:8000/)

keys for the media file management service
* NEXT_PUBLIC_SUPABASE_URL
* NEXT_PUBLIC_SUPABASE_ANON_KEY

Google authorization keys
* GOOGLE_CLIENT_ID
* GOOGLE_CLIENT_SECRET

GitHub authorization keys
* GITHUB_CLIENT_ID
* GITHUB_CLIENT_SECRET

Token secret
SECRET

