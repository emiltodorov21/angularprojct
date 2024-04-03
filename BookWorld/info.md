# Introduction
This documentation outlines the BookWorld Angular project, a platform that enables users to view, add, and manage a selection of books. The application interfaces with a backend server for data retrieval and management. It includes features for user authentication, book catalog browsing, and profile management.

# Project Structure

# Components
- add-book-page: Handles the creation of new book entries.
- catalog: Lists all available books and allows users to select one to view more details.
- details-page: Displays detailed information about a specific book.
- edit-book-page: Allows for editing the information of existing books.
- home: Serves as the landing page and dashboard for the application.
- login: Manages user login functionality.
- navigation: Contains navigation links and logic for routing across the application.
- not-found: A fallback page for any unmatched routes, showing a 404 error.
- profile: Displays the user's profile information and related actions.
- register: Handles new user registration.

# Interceptors
- token-interceptor: Attaches authentication tokens to HTTP requests.

# Guards
- auth.guard: Protects authenticated routes, ensuring that only logged-in users can access them.
- logged.guard: Redirects users based on their authentication status.

# Services and Interfaces
- Services define the logic for API calls and data handling.
- Interfaces declare the structure for the primary data models used throughout the application.

# Routing
- app-routing.module.ts: Defines the client-side routes and associates them with components.

# Functionality
- Home Page: Introduces the application and its features.
- Catalog Page: Showcases the book collection available on BookWorld.
- Book Management Pages: Allow users to add new books to the catalog, edit existing entries, and view detailed information about each book.
- User Authentication Pages: Provide interfaces for user login, registration, and profile management.

# Setup
1. To get the BookWorld application running locally:
2. Clone the project repository from the provided source.
3. Install necessary dependencies by running npm install in the project root.
4. Start the backend server by executing npm run serverStart.
5. Launch the Angular app with ng serve.
6. The application will be available on http://localhost:4200/.