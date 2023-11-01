# Weather UI

Welcome to the Weather UI project! This web application allows you to check current and historical weather data. It's built using React, Ant Design, Redux, and React Router. 
[NOTE]: Before starting weather_ui server (starts at localhost:3000) , You should start weather_backend_server (starts at localhost:8080) . 

## Table of Contents
1. [Clone the Repository](#1-clone-the-repository)
2. [Install Dependencies](#2-install-dependencies)
3. [Start the Server](#3-start-the-server)
4. [About the Project](#4-about-the-project)
5. [Limitations]
6. [Chrome Extentions]

## 1. Clone the Repository
To get started, you can clone this repository to your local machine using the following command:

```bash
git clone https://github.com/SouravChoudhary/weather_ui.git
```

## 2. Install Dependencies
Before running the application, you need to install the project dependencies. Navigate to the project directory and run:

```bash
cd weather_ui
npm install
```

This command will install all the required packages and libraries.

## 3. Start the Server
Once the dependencies are installed, you can start the development server using the following command:

```bash
npm start
```

The application will be accessible at `http://localhost:3000`. You can view it in your web browser.

## 4. About the Project
The Weather UI project is a modern web application for checking weather data. It provides the following features and implementations:

- **Current Weather**: You can search for the current weather in a specific city.
- **Historical Weather**: View historical weather data for different cities.
- **User Authentication**: Users can register and log in to access their search history.

### Project Structure
- `src` directory contains the React components and application logic.
- `actions` directory holds Redux action creators.
- `reducers` directory manages the application's state with Redux.
- `components` folder includes reusable UI components.
- `css` directory for styles and CSS files.
- `utils` contains utility functions.
- `constants` for project-specific constants.

### Limitations 

1. **User Authentication**: The user authentication system is basic and may not include advanced security features. It's recommended to enhance security for a production-ready application.

2. **Cross-Browser Compatibility**: The application might not be fully optimized for all web browsers. Further testing and adjustments may be needed for a wider browser compatibility.

3. **Mobile Responsiveness**: The project may not be fully optimized for mobile devices. Enhancing the user interface and responsiveness for smaller screens could be a consideration for improvement.

4. **Error Handling**: Error handling is minimal in the current implementation. To enhance user experience, more comprehensive error messages and graceful error handling can be added.

5. **Testing**: Extensive testing, including unit tests and end-to-end testing, is not included in the project. For a production-ready application, comprehensive testing should be implemented.

### Chrome Extentions
  - Use Redux DevTools Chrome extension for viewing the application state during development.
  - Install and enable the CORS Chrome extension if you encounter CORS-related issues when accessing external APIs

Feel free to explore the source code, and have fun experimenting with this Weather UI application!

---
