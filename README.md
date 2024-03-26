# React Project - Business Pages Promotion

## Overview

This React project focuses on the development of a platform for promoting business pages. The repository contains a responsive application that demonstrates front-end development skills, incorporating a combination of technologies including HTML, CSS, Bootstrap, TypeScript, and React.

## Project Description

The project aims to create a user-friendly platform where businesses can showcase their services or products effectively. Users, whether logged in or not, can explore various business pages and access detailed information by clicking on the respective business cards.

### Dependencies

Here are the dependencies used in this project:

- **@types/react-dom**: ^18.2.19
- **@types/react-router-dom**: ^5.3.3
- **@types/react**: ^18.2.55
- **@typescript-eslint/eslint-plugin**: ^6.21.0
- **@typescript-eslint/parser**: ^6.21.0
- **@vitejs/plugin-react-swc**: ^3.6.0
- **bootstrap**: ^5.3.2
- **eslint-plugin-react-hooks**: ^4.6.0
- **eslint-plugin-react-refresh**: ^0.4.5
- **eslint**: ^8.56.0
- **jwt-decode**: ^4.0.0
- **prettier**: ^3.2.5
- **react-bootstrap**: ^2.10.1
- **react-dom**: ^18.2.0
- **react-hook-form**: ^7.50.1
- **react-icons**: ^5.0.1
- **react-router-dom**: ^6.22.0
- **react**: ^18.2.0
- **typescript**: ^5.3.3
- **vite**: ^5.1.2

## Key Features

- **User Authentication:** Logged-in users can mark business cards as liked, and their preferences are saved even after they log out and log back in.
- **Business Owner Functionality:** Business owners can publish, edit, and delete their business cards. They also have access to a dedicated area where they can manage their cards.
- **Admin Privileges:** Admin users can edit and delete all business cards.
- **Profile Management:** All users can edit and delete their profiles, with the exception of the admin who has the authority to edit and delete all profiles.
- **Responsive Design:** The application is responsive and supports various screen sizes, ensuring an optimal viewing experience across devices. It is optimized for screen sizes up to 1024 pixels wide.

## Folder Structure

The project follows a well-organized architecture for better maintainability:

- **Components:** Reusable components are organized into categories such as Navbar, Footer, and General Components.
- **Contexts:** Context files handle global state management across the application.
- **Interfaces:** Interface files define the structure of data objects used throughout the project.
- **Utils:** Utility functions, including regex functions, are stored here.
- **Services:** Service files contain functions for handling API requests and server communication.
- **Pages:** Pages represent different routes of the application, each residing in a separate folder.
- **Layouts:** The default layout file controls the overall layout of the application, including navigation.

## Navigation

Navigation within the application is intuitive, with the Navbar adapting based on the user's status. The Navbar includes a search bar for searching within the current page. Additionally, on mobile devices, there is a toggle button for accessing the navigation menu.

The location for business users to create new cards is in the "Create New Card" button in the navbar.

## Forms

The project includes forms for creating new users (with options for business or non-business users) and creating new business cards. These forms adhere to email, Israeli phone number, website address, and image URL validation standards. Users are provided with real-time feedback on the validity of their input through regex validation.

## Admin User

Admin users have special privileges to edit and delete all business cards. They can access the admin panel using the following credentials:

- **Email:** admin@gmail.com
- **Password:** Abc!123Abc

## Theme Support

The application provides full theme support, allowing users to switch between light and dark themes according to their preference.

## Installation

You can install all the dependencies by running:

```bash
npm install
or
yarn install
