# Frontend for My Blog Application

## Description

This frontend is built with Next.js and React. It interacts with the backend to provide a user interface for blog management and viewing.

## Technologies

- **Next.js**: React framework for server-side rendering (SSR) and static site generation (SSG).
- **React**: Library for building user interfaces.
- **Axios**: HTTP client for API requests.

### Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/yourusername/your-frontend-repo.git
  ```

2. Navigate to the project directory:

  ```bash
  cd your-frontend-repo
  ```

3. Install dependencies:

  ```bash
  npm install
  ```

4. Configure environment variables:

  Create a `.env` file at the root of the directory and copy the contents from `.env.local`, replacing the values with your own.

5. Start the application:

  ```bash
  npm run dev
  ```

## Features

- **Login Page**: Allows users to log in and access the application.
- **Home Page**: Displays a list of blogs.
- **Blog Management Page**: Allows admin users to create, update, and delete blogs.

## Choices and Rationale

- **Next.js**: Chosen for its advantages in server-side rendering and static site generation, which enhances performance and SEO.
- **Axios**: Used for API requests from the frontend due to its simple interface and support for interceptors.

## Backend Integration

To complete the application setup, ensure the backend is running. The backend repository can be found [here](https://github.com/PopusoiVictor/blog-app-backend).

## Contributing

Contributions are welcome! Please open issues or pull requests on GitHub and follow the contribution guidelines.