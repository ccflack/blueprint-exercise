import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header.component';
import WelcomePage from "./components/WelcomePage.component";
import AboutPage from "./components/AboutPage.component";
import ScreenerPage from "./components/ScreenerPage.component";
import ResultsPage from './components/ResultsPage.component';
import NoMatchPage from "./components/NoMatchPage.component";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/screeners/:id" element={<ScreenerPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
