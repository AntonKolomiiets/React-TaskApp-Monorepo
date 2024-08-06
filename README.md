# React TaskApp Monorepo

## Overview

This monorepo contains a Task App built with React.js for the frontend and Express.js for the backend. The application features:
- A responsive and animated design.
- A login modal with JWT token authentication.
- An SQLite3 database for data storage.
- A monorepo structure to manage both client and server codebases.

## Demo

(https://github.com/AntonKolomiiets/React-TaskApp-Monorepo/edit/main/demo.gif)

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/AntonKolomiiets/React-TaskApp-monorepo.git
    cd React-TaskApp-Monorepo
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Run server and React app:

    ```sh
    npm start
    ```

4. For faster testing use Login and Password:

    Anton, 123
    

## Features

### Client (React.js)
- **Responsive Design**: Optimized for both mobile and desktop views.
- **Animated Components**: Utilizes Framer Motion for smooth animations.
- **Authentication**: Login modal with JWT token-based authentication.
- **State Management**: Managed with React hooks and context.

### Server (Express.js)
- **Authentication**: JWT token-based authentication for secure API endpoints.
- **Database**: SQLite3 for lightweight and efficient data storage.
- **API Endpoints**: RESTful API for managing tasks and user authentication.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
