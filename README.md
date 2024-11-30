# Zania Frontend Assignment

This React project is created using Vite and implements drag-and-drop functionality for managing cards, along with a mock REST API for data persistence and persistent storage using localStorage.

## Prerequisites

Before running the project, ensure the following are installed on your system:

- Node.js (v18 or later)

## Installation

1. Clone the Repository

```js
git clone <repository-url>
cd <repository-folder>
```

2. Install Dependencies

```js
npm install
```

3. Start the Development Server

```js
npm run dev
```

The app will be available at http://localhost:5173.

## Architectural Approach

Framework:

- The app is built using React with TypeScript and Vite for a fast and modern development experience.

Drag-and-Drop:

- Implemented drag-and-drop functionality using native HTML5 Drag-and-Drop APIs.
- State management in React ensures a seamless reordering experience.

Mock API:

- Used Mock Service Worker (MSW) to create a REST API for fetching and saving data.
- Data persistence is achieved using localStorage, ensuring data remains consistent across page reloads.
