# CodeSnippetHub

CodeSnippetHub is a web application built with TypeScript, Node.js, Express, React.js, and PostgreSQL using Prisma ORM. It facilitates the submission and display of code snippets in various programming languages.

## Features

- **Form Submission:** Users can submit code snippets along with their username, preferred code language (C++, Java, JavaScript, Python), and standard input (stdin) through a user-friendly form.

- **Display Page:** All submitted entries are displayed in a tabular format on the second page. The displayed information includes the username, code language, stdin, and the timestamp of submission. To maintain readability, the source code is truncated to the initial 100 characters.

## Tech Stack

- **Frontend:** React.js is used to create a dynamic and interactive user interface for form submission and data display.

- **Backend:** Express.js, a minimalist web framework for Node.js, handles server-side logic and API endpoints, ensuring smooth communication between the frontend and the database.

- **Database:** PostgreSQL is employed as the database management system, storing user submissions securely and efficiently.

- **ORM:** Prisma is utilized as the database toolkit and ORM (Object-Relational Mapping) to simplify database access and manipulation, enhancing developer productivity and code maintainability.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies for both frontend and backend: `npm install` (or `yarn install`)
3. Set up PostgreSQL database and update connection details in the backend configuration.
4. Run the backend server: `npm run dev` (or `yarn dev`)
5. Run the frontend application: `npm start` (or `yarn start`)
6. Access the application through the provided URL in your browser.

## Contributing

Contributions are welcome! If you have any ideas for new features, improvements, or bug fixes, feel free to open an issue or submit a pull request. Please adhere to the established code style and guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
