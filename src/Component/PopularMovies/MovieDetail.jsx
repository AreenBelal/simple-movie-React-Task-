import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Pagination,
  Rating,
  Slider,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function MovieDetail() {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null); // Initialize state with null
  const [recommendations, setRecommendations] = useState([]); // Initialize state with null
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [img, setImg] = useState([]); // Initialize loading state
  const [error, setError] = useState(null);

  //if api did not retrun image
  const fallbackImageUrl = "https://via.placeholder.com/500x200?text=No+Image";

  // for pagniation
  const [currentPage, setCurrentPage] = useState(1); // Initialize current page
  const [totalPages, setTotalPages] = useState(1); // Initialize total pages
  const [imagesPerPage] = useState(3); // Number of images per page
  const paginationRef = useRef(null);

  const fetchMovieDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=506883b16b2d89cbdc9e9563c7f245f1&language=en-US`
      );
      setMovie(res.data);
    } catch (error) {
      setError("Error fetching movie details.");
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchRecommend = async () => {
    try {
      const recomm = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=506883b16b2d89cbdc9e9563c7f245f1&language=en-US`
      );
      setRecommendations(recomm.data.results);
    } catch (error) {
      setError("Error fetching movie recommendations.");
      console.error("Error fetching movie recommendations:", error);
    }
  };

  const fetchImg = async (page = 1) => {
    try {
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=506883b16b2d89cbdc9e9563c7f245f1`
      );
      const allImages = response.data.backdrops;
      // if page = 2 .. then startIndex = (1)*2 = 2 and endIndex = 2+2 =4 theat means i will show images from index 2 to 4 (4 not included) only ...
      const startIndex = (page - 1) * imagesPerPage;
      const endIndex = startIndex + imagesPerPage;
      const paginatedImages = allImages.slice(startIndex, endIndex);

      setImg(paginatedImages);
      setTotalPages(Math.ceil(allImages.length / imagesPerPage)); // Calculate total pages
    } catch (error) {
      setError("Error fetching movie recommendations.");
      console.error("Error fetching movie recommendations:", error);
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        await fetchMovieDetails();
        await fetchRecommend();
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]); // Runs when the component mounts or when the id changes

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        await fetchImg(currentPage);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [currentPage]); // Runs when currentPage changes

  const handlePageChange = (event, value) => {
    setLoading(true);
    setCurrentPage(value);

    // Use setTimeout to delay the scroll action
    setTimeout(() => {
      if (paginationRef.current) {
        paginationRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Adjust the delay if necessary
  };

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Box
            sx={{
              height: "50px",
              width: "100%",
              backgroundColor: "rgb(53,53,53)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", marginLeft: "60px" }}
            >
              <Link
                component={RouterLink}
                to="/"
                sx={{ color: "white", textDecoration: "none" }}
              >
                Back /
              </Link> 
              {movie.title || ''} 
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "600px",
              backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.backdrop_path}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%)",
                top: "0",
                left: "0",
                zIndex: "0",
              }}
            ></Box>

            <Box
              sx={{
                position: "absolute",
                width: "90%",
                height: "80% ",
                margin: "0px auto",
                backgroundColor: "rgb(0,0,0,0.7)",
                zIndex: "1",
                display: "flex",
                flexDirection: "row",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                style={{
                  width: "25%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                  padding: "35px 25px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    margin: "25px 0px",
                  }}
                >
                  {movie.original_title}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    margin: "0px 0px 20px",
                  }}
                >
                  Polt
                </Typography>

                <Typography
                  variant="p"
                  sx={{
                    margin: "0px 0px 20px",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {movie.overview}
                </Typography>

                <Typography
                  variant="p"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    margin: "30px 0px 10px",
                  }}
                >
                  IMDB RATING
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "40px",
                    width: "100%",
                  }}
                >
                  <Slider
                    value={movie.vote_average}
                    min={0}
                    max={9}
                    sx={{
                      width: "20%",
                      height: "10px",
                      border: "none",
                      borderRadius: "20px",
                      "& .MuiSlider-track": {
                        backgroundColor: "rgb(22, 212, 123)", // Color of the filled part of the slider
                        opacity: "1",
                        border: "none",
                      },

                      "& .MuiSlider-rail": {
                        backgroundColor: "white", // Color of the unfilled part of the slider
                        opacity: "1",
                      },
                      "& .MuiSlider-thumb": {
                        display: "none", // Hides the thumb
                      },
                    }}
                  />

                  <Typography
                    variant="p"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      margin: "0px 20px",
                      flex: 1,
                    }}
                  >
                    {movie.vote_average}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Typography
            padding={"40px 0px 10px 40px"}
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            Recommendations
          </Typography>

          <Grid
            container
            columns={{ xs: 8, sm: 9, md: 12 }}
            maxWidth={"80%"}
            justifyContent={"flex-start"}
            margin={"0 auto"}
          >
            {recommendations.slice(0, 6).map((e, index) => (
              <Grid item xs={4} sm={3} md={3} key={index}>
                <Card
                  sx={{
                    width: "90%",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    margin: "30px auto",
                    textAlign: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200px"
                    image={
                      e.poster_path
                        ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
                        : fallbackImageUrl
                    }
                    alt={e.title}
                    sx={{ objectFit: "fill" }}
                  />

                  <CardContent>
                    <Typography
                      paddingTop={"10px"}
                      variant="p"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {e.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography
            padding={"40px 0px 10px 40px"}
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            Images of the movie!
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
            ref={paginationRef}
          >
            {img.map((item, index) => (
              <Card
                sx={{
                  width: "300px",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  margin: "20px 30px",
                }}
              >
                <CardMedia
                  sx={{ height: "100%", objectFit: "cover" }}
                  image={
                    item.file_path
                      ? `https://image.tmdb.org/t/p/w500${item.file_path}`
                      : fallbackImageUrl
                  }
                />
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              color="secondary"
              onChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
