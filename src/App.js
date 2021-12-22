import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import {
  Header,
  AppNameComponent,
  AppIcon,
  SearchComponent,
  SearchInput,
  SearchIcon,
} from "./components/header";

import { RecipeComponent } from "./components/recipe";

/////styles for app

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const DefaultLoading = styled.img`
  height: 200px;
  margin: 20%;
  opacity: 50%;
`;

const App = () => {
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  const APP_ID = "dd3ffea2";

  const APP_KEY = "b4b37afad59e070a14fd1b07d5fdccc3";

  const fetchRecipe = async (searchString) => {
    const APP_ID = "dd3ffea2";

    const APP_KEY = "b4b37afad59e070a14fd1b07d5fdccc3";

    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const result = await axios.get(url);

    updateRecipeList(result.data.hits);
  };

  //debouncing to minimize api calls
  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="hamburger.svg" />
          Recipe Finder
        </AppNameComponent>
        <SearchComponent>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput placeholder="Search recipe..." onChange={onTextChange} />
        </SearchComponent>
      </Header>

      <RecipeListContainer>
        {recipeList.length ? (
          recipeList.map((recipeObj, index) => (
            <RecipeComponent key={index} recipeObj={recipeObj.recipe} />
          ))
        ) : (
          <DefaultLoading src="hamburger.svg" />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default App;
