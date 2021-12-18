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

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;

export const RecipeImage = styled.img`
  object-fit: cover;
  height: 200px;
`;

export const RecipeTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`;

export const IngredientsText = styled.span`
  font-size: 18px;
  border: solid 1px green;
  color: black;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  color: green;
  text-align: center;
  margin-bottom: 12px;
`;

export const SeeMoreText = styled(IngredientsText)`
  color: #eb3300;
  border: solid 1px #eb3300;
`;

export const RecipeComponent = (props) => {
  const { recipeObj } = props;
  return (
    <RecipeContainer>
      <RecipeImage src={recipeObj.image} />
      <RecipeTitle>{recipeObj.label}</RecipeTitle>
      <IngredientsText>See Complete Recipe</IngredientsText>
      <SeeMoreText>See Complete Recipe</SeeMoreText>
    </RecipeContainer>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
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
        {recipeList.length &&
          recipeList.map((recipeObj, index) => (
            <RecipeComponent key={index} recipeObj={recipeObj.recipe} />
          ))}
      </RecipeListContainer>
    </Container>
  );
};

export default App;
