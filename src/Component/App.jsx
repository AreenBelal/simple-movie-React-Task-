import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PopularMovies from "./PopularMovies/PopularMovies";
import MovieDetail from "./PopularMovies/MovieDetail";
import Navbar from "./Navbar/Navbar";
import Main from './Main/Main'

export const MovieContext = createContext();

function App() {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
      <> 
      <Router>
      <MovieContext.Provider value={{ visibleCount, setVisibleCount }}>
        <Navbar />
       
        <Routes>
         
        <Route path="/" element={
            <>
              <Main />
              <PopularMovies />
            </>
          } />
           
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>

      </MovieContext.Provider>
    </Router>
    </>
  );
}

export default App;
