// App.tsx
import { useEffect, useState } from "react";
import { ConfigProvider, theme, Button } from "antd";
import 'antd/dist/reset.css';
import AppRouter from "./presentation/router/AppRouter";
import HomeHolder from './domain/entity/home/models/HomeHolder';
import ThemeUseCase from './domain/interactors/home/ThemeUseCase';
import Navbar from "./presentation/components/Navbar";
import HomeViewModelImpl from "./presentation/view-model/home/HomeViewModelImpl";

const homeHolder = new HomeHolder();
const themeUseCase = new ThemeUseCase(homeHolder);
const homeViewModel = new HomeViewModelImpl(themeUseCase, homeHolder);


function App() {
  const [isDarkMode, setIsDarkMode] = useState(themeUseCase.getTheme());

  useEffect(() => {
    homeViewModel.setTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        token: {},
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Navbar isDark={isDarkMode} toggleTheme={() => setIsDarkMode((prev) => !prev)} />
      <div style={{ padding: 16 }}>
        <AppRouter />
      </div>
    </ConfigProvider>
  );
}

export default App;
