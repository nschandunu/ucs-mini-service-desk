# UCS Mini Service Desk

This is a lightweight, client-side React application built for the UCS technical assessment. The requirement was to build a fully functional service desk without a backend, so this app relies entirely on React state and the browser's `localStorage` API for data persistence. 

I focused on keeping the architecture flat, avoiding unnecessary dependencies, and building a clean, high-contrast UI.

## Features

- **Ticket Management:** Create new support tickets with categories and priority levels.
- **Dashboard Summary:** Live counters calculating total, open, in-progress, and closed tickets on the fly.
- **Search & Filters:** Real-time filtering by status, priority, and a text search for ticket titles.
- **Ticket Details:** A modal view to update ticket statuses and append internal support notes.
- **Persistent State:** Data is saved to `localStorage` automatically on every state change.

## Tech Stack

- **React + Vite:** Chosen for fast scaffolding and instant HMR. 
- **Tailwind CSS:** Used for styling. I stuck to the `zinc` color palette with generous whitespace to give it a clean, minimalist feel without writing custom CSS files.
- **State & Storage:** Native React Hooks (`useState`, `useEffect`) and the browser's `localStorage` API. No complex state management libraries were needed.

## Running Locally

To run this project on your local machine:

1. Clone the repository:
   
```bash
   git clone <your-repo-link>ucs-mini-service-desk
```
2. Navigate to the directory:
```bash
   cd ucs-mini-service-desk
```
3. Install dependencies:
```bash
   npm install
```
4. Start the development server:
```bash
   npm run dev
```
5. Open the local URL provided in your terminal

## Deployment
The application is deployed via Vercel and can be accessed live here: 
```bash
https://ucs-mini-service-desk-six.vercel.app
```
