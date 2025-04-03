# CineSearcher

CineSearcher is a movie search application that allows users to search for movies, view details, manage favorites, and track viewing history.

![image](https://github.com/user-attachments/assets/4bff4044-ae04-42f0-91d8-5251d4d383d8)

## 🚀 Live Demo
You can check out the live version here:  
🔗 **[cineSearch App](https://cine-search-two.vercel.app/)**

## Features

### Phase 1
- Search for movies and series using the OMDb API.
- Display movie results in a responsive grid layout.
- View detailed movie information in a modal.
- Implement a view history to track searched movies.
- Ensure search input supports keyboard focus ("/").
- Implement pagination for search results.
- Display error messages from the OMDb API.
- Use Zustand for state management.
- Deploy the application using Vercel.

### Phase 2
- Add a Favorites tab to list favorite movies.
- Implement an Add to Favorites button in the movie details view.
- Enhance search with filters (year and type: Movie/Series).
- Allow users to remove items from the view history.
- Implement a clear history button with a confirmation modal.

## Tech Stack
- React.js
- Tailwind CSS
- Zustand (State Management)
- React Query
- React Router DOM
- Formik for forms
- OMDb API
- NeetoUI Components

## Getting Started

### Prerequisites
- Node.js and npm/yarn installed
- An OMDb API key (Create a free account on [OMDb](https://www.omdbapi.com/))

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/cineSearcher.git
   cd cineSearcher
   ```
2. Install dependencies:
   ```sh
   yarn install  # or npm install
   ```
3. Create a `.env` file and add your OMDb API key:
   ```sh
   REACT_APP_OMDB_API_KEY=your_api_key
   ```
4. Start the development server:
   ```sh
   yarn start  # or npm start
   ```

## Usage
- Search for movies using the search bar.
- Click on a movie to view details.
- Mark movies as favorites using the star icon.
- Use filters to refine search results by year and type.
- View and manage previously searched movies in the history section.
- Remove individual history items or clear the entire history.

## Deployment
To deploy the application using Vercel:
```sh
vercel deploy
```

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-name`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

## License
This project is licensed under the MIT License.

## Acknowledgments
Special thanks to BigBinary Academy for providing the learning resources and guidance for this project.

---

Feel free to modify and enhance this README as needed!


