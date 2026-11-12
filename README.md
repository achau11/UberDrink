# UberDrink

**Historical group project · Node.js / Express / PostgreSQL / EJS**

A small café ordering application developed as a group project during Lighthouse Labs. The code includes account registration and login, a database-backed menu/order view, server-rendered pages, and an experimental SMS order-status integration using Twilio.

This is a learning-era prototype, **not an actively maintained production service**.

## Stack

- **Server:** Node.js, Express, EJS, cookie-session
- **Data:** PostgreSQL (Node `pg`)
- **Frontend:** JavaScript, jQuery, Sass, Bootstrap
- **Integration:** Twilio SMS (requires your own account and numbers)

## Project layout

- `routes/` — login, registration, ordering, status and SMS endpoints
- `db/schema/` and `db/seeds/` — database setup and example data
- `views/` — server-rendered templates
- `public/` and `styles/` — frontend assets

## Local setup

1. Install Node.js, npm and PostgreSQL.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in your **own** database connection details. Set a long random `SESSION_SECRET`.
4. Run `npm run db:reset` to initialize the **development** database. **This resets data; never target a database you need to preserve.**
5. Start with `npm run local` (or `npm start`) and open `http://localhost:8080/`.

The Twilio integration also needs your own account SID, token and sender/recipient numbers. Without that configuration, SMS functionality is unavailable. The project uses older dependencies and may require modernization to run on current Node.js versions.

## Security and maintenance

This repository is retained as a record of a collaborative early project. Before deploying anything derived from it, review and upgrade dependencies, authentication/session handling, input validation and SMS webhook security. Do not commit `.env` files, credentials, production customer information, or real phone numbers.
