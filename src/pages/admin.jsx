import React, { useContext, useEffect, useState } from "react";
import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import TotalCategoryCount from "../components/TotalCategoryCount";
import { token } from "../assets/contexts";

const fetchData = async (url, Token, setter) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: Token },
    });
    setter(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

function Admin() {
  const [categoryData, setCategoryData] = useState(0);
  const [subCategoryData, setSubCategoryData] = useState(0);
  const [questionData, setQuestionData] = useState(0);
  const Token = useContext(token);

  useEffect(() => {
    fetchData(
      "https://interviewback-ucb4.onrender.com/category/count",
      Token,
      setCategoryData
    );
    fetchData(
      "https://interviewback-ucb4.onrender.com/subcategory/count",
      Token,
      setSubCategoryData
    );
    fetchData(
      "https://interviewback-ucb4.onrender.com/questions/count",
      Token,
      setQuestionData
    );
  }, [Token]);

  return (
    <Box>
      <Container maxWidth>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "15px" }}>
          <Typography>Dashboard</Typography>
        </Breadcrumbs>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TotalCategoryCount
              Title="Total Category"
              Count={categoryData}
              sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TotalCategoryCount
              Title="Total Sub Category"
              Count={subCategoryData}
              sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TotalCategoryCount
              Title="Total Q / A"
              Count={questionData}
              sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Admin;
