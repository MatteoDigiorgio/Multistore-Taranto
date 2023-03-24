# Multistore Taranto

This is a showcase website for a local business.

## Table of Contents

- [Multistore Taranto](#multistore-taranto)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Technologies Used](#technologies-used)

## Features

- Admin authentication: the owner can login for restocking the website

## Installation

1. Clone this repository

```
git clone https://github.com/MatteoDigiorgio/Multistore-Taranto.git
```

2. Run `npm install` to install the dependencies
3. Create a Firebase project and enable authentication, Cloud Firestore, and Cloud Functions
4. Create a `.env` file in the root directory and add the following environment variables:

```
# Authentication
GOOGLE_ID=[insert your GOOGLE_ID here]
GOOGLE_SECRET=[insert your GOOGLE_SECRET here]
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=[insert your JWT_SECRET here]

# Service Account
FIREBASE_SERVICE_ACCOUNT_KEY=[insert your FIREBASE_SERVICE_ACCOUNT_KEY here]

HOST=http://localhost:3000
```

5. Run `npm run dev` to start the development server

## Technologies Used

- Next.js
- React
- Firebase (Authentication, Cloud Firestore, Cloud Functions)
- Redux
