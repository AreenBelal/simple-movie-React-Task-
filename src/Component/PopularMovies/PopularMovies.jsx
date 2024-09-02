import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { MovieContext } from "../App";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import LoadingPage from "./LoadingPage";

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const { visibleCount, setVisibleCount } = useContext(MovieContext);

  const getPopularMovie = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=506883b16b2d89cbdc9e9563c7f245f1&language=en-US"
      );
      setMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching the popular movies: ", error);
    } finally {
      setLoading(false);
    }
  };


  const handleClick = () => {
    setVisibleCount(visibleCount + 5);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getPopularMovie();
     };

    fetchData();
  }, []); 


  return (
    <div>

    {loading ? (
      <LoadingPage />
    ) : (

      <>  
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1,
          fontSize: "40px",
          marginTop: "50px",
          marginLeft: "40px",
        }}
      >
        Popular Movies
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 3 }}
          columns={12}
          style={{ width: "90%", margin: "0px auto" }}
        >
          {movies.slice(0, visibleCount).map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Link component={RouterLink} to={`/movie/${movie.id}`}>
                <Box
                  sx={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "400px",
                  }}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>

      {visibleCount < movies.length && (
        <Box sx={{ 
          marginTop: "10px",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
         }}>
          <Button variant="contained" onClick={handleClick} sx={{
            width: '200px',
            height: '50px',
            fontSize: '18px',
            background: 'rgb(0, 174, 255)',
            color: 'rgb(255, 255, 255)',
            borderRadius: '21px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}>
            {" "}
            Load more
          </Button>
        </Box>
      )}

</>
      )}

    </div>
  );
}

export default PopularMovies;
