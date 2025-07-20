# Addis Software Test Project

This project is a full-stack application for managing a list of songs. It demonstrates frontend development skills, including ReactJS, Redux Toolkit, Redux-Saga, Emotion for styling, and manual Webpack configuration. The application interacts with a REST API to perform CRUD operations and includes features like pagination, testing, and deployment.

## Features

### Frontend Features
- **Paginated List of Songs**: Displays a paginated list of songs with details like title, artist, album, and year.
- **CRUD Operations**: Allows users to create, read, update, and delete songs via API calls.
- **React Hooks**: Utilizes `useState` and `useEffect` for state management.

### Backend Integration
- **API Integration**: Uses JSONPlaceholder as the backend for managing songs.
- **API Endpoints**:
  - **Fetch Songs**: `GET /songs`
    - Fetches the list of songs.
    - Response:
      ```json
      [
        {
          "id": 1,
          "title": "Song Title",
          "artist": "Artist Name",
          "album": "Album Name",
          "year": 2023
        }
      ]
      ```
  - **Add Song**: `POST /songs`
    - Adds a new song.
    - Request Body:
      ```json
      {
        "title": "New Song",
        "artist": "New Artist",
        "album": "New Album",
        "year": 2023
      }
      ```
  - **Update Song**: `PUT /songs/:id`
    - Updates an existing song.
    - Request Body:
      ```json
      {
        "title": "Updated Title",
        "artist": "Updated Artist",
        "album": "Updated Album",
        "year": 2024
      }
      ```
  - **Delete Song**: `DELETE /songs/:id`
    - Deletes a song by ID.

### Testing
- **Unit Tests**: Includes unit tests for reducers and sagas.
- **Component Tests**: Tests for `SongsList` and `SongForm` components using React Testing Library.

### Performance
- **Code Splitting**: Implements lazy loading for components to optimize bundle size.

### Deployment
- **Frontend**: Hosted on Netlify.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Song-Management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Webpack Configuration

The Webpack setup includes:
- **Custom Rules**: Handles JavaScript, CSS, and image files.
- **Environment Variables**: Uses `dotenv` to manage environment variables like `API_BASE_URL`.
- **Plugins**: Includes `HtmlWebpackPlugin` for generating the HTML file and `DefinePlugin` for injecting environment variables.

### Key Configuration
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.API_BASE_URL": JSON.stringify(process.env.API_BASE_URL),
    }),
  ],
  devServer: {
    static: "./dist",
    port: 3000,
    open: true,
    hot: true,
  },
  mode: "development",
};
```

## AI Tool Usage

- **GitHub Copilot**: Assisted in generating boilerplate code for React components and Redux setup.
- **ChatGPT**: Provided guidance on Webpack configuration and testing strategies.

### Verification Steps
- Verified API calls using Postman.
- Tested components using React Testing Library.
- Debugged Redux state updates using Redux DevTools.

## Submission Guidelines

- **Git Repository**: The project is hosted on a public GitHub repository with clear commit history.
- **README.md**: Includes setup instructions, Webpack configuration, and AI usage details.
