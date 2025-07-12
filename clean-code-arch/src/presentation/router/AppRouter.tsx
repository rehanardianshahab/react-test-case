// src/presentation/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home
import Home from "../view/home/HomeComponent";
import HomeViewModelImpl from "../view-model/home/HomeViewModelImpl";
import HomeHolder from "../../domain/entity/home/models/HomeHolder";
import ThemeUseCase from "../../domain/interactors/home/ThemeUseCase";

// News
import NewsViewModelImpl from "../view-model/news/NewsViewModelImpl";
import NewsFakeApi from "../../data/news/NewsFakeApi";
import NewsHolder from "../../domain/entity/news/models/NewsHolder";
import NewsUseCase from "../../domain/interactors/news/NewsUseCase";

// Auth
import Login from "../view/auth/AuthComponent";
import AuthViewModelImpl from "../view-model/auth/AuthViewModelImpl";
import AuthFakeApi from "../../data/auth/AuthFakeApi";
import AuthHolder from "../../domain/entity/auth/models/AuthHolder";
import LoginUseCase from "../../domain/interactors/auth/LoginUseCase";

// Home
const homeHolder = new HomeHolder();
const themeUseCase = new ThemeUseCase(homeHolder);
const homeViewModel = new HomeViewModelImpl(themeUseCase, homeHolder);

// News
const newsHolder = new NewsHolder();
const newsRepository = new NewsFakeApi();
const newsUseCase = new NewsUseCase(newsRepository, newsHolder);
const newsViewModel = new NewsViewModelImpl(newsUseCase, newsHolder);

// Auth
const authHolder = new AuthHolder();
const authRepository = new AuthFakeApi();
const loginUseCase = new LoginUseCase(authRepository, authHolder);
const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home homeViewModel={homeViewModel} newsViewModel={newsViewModel} />} />
        <Route path="/login" element={<Login authViewModel={authViewModel} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
