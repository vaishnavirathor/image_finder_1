Overview
This project is a web application designed to manage and display HTTP response codes along with corresponding dog images. The application allows users to log in, sign up, search for response codes, save lists of response codes, and manage these lists through a user-friendly interface. The backend is built using Node.js, Express, and MongoDB, while the frontend is developed using React.

Features
Backend
User Authentication: Users can sign up and log in to their accounts.
Search Functionality: Users can filter response codes and view corresponding dog images.
Save Lists: Users can save lists of response codes and their images.
Manage Lists: Users can view, edit, and delete their saved lists.
Frontend
Login/Signup Page: Users can create an account or log in to an existing account.
Search Page: Users can filter response codes and view the corresponding dog images. They can also save these filters as lists.
Lists Page: Users can view all their saved lists, see the images of response codes in a list, and have options to edit or delete the lists.
Dependencies
Backend
bcrypt: For hashing passwords.
body-parser: To parse incoming request bodies.
cors: To enable Cross-Origin Resource Sharing.
dotenv: To load environment variables from a .env file.
express: A web framework for Node.js.
joi: For data validation.
jsonwebtoken: For creating and verifying JSON Web Tokens.
mongoose: An ODM for MongoDB.
Frontend
React: A JavaScript library for building user interfaces.
react-dom: For DOM rendering.
react-router-dom: For routing in React applications.
react-toastify: For providing notifications.
@testing-library/react: For testing React components.
@testing-library/jest-dom: Custom Jest matchers for testing.
@testing-library/user-event: For simulating user events.
react-scripts: A set of scripts for running React applications.
web-vitals: For measuring performance metrics.
Getting Started
Prerequisites
Ensure you have the following installed:

Node.js
MongoDB
Usage
Login/Signup: Access the login or signup page to create an account or log in.
Search: Use the search page to filter response codes and view corresponding dog images.
Save Lists: Save the filtered response codes as lists.
Manage Lists: View, edit, and delete your saved lists from the lists page.
Database
The application uses MongoDB to store user information and lists of response codes. The collections used are:

Users: Stores user credentials and related information.
Lists: Stores lists of response codes, their images, creation date, and list name.
Complexity Analysis
Login/Signup: O(1) for inserting user data and checking credentials.
Search: O(n) for filtering response codes, where n is the number of response codes.
Save Lists: O(1) for inserting a new list into the database.
Manage Lists: O(n) for fetching, updating, or deleting lists, where n is the number of lists.
Submission
Please ensure you have:

Created a video demonstrating the application.
Showcased the database contents in the video.
Uploaded the code and the video to Google Drive with accessible links.
Submitted the shareable links.
The assignment was completed with the assistance of ChatGPT in certain areas, including design aspects, due to time constraints.