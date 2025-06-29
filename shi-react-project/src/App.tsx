import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main/MainPage';
import { Layout } from './layout/layout';
import { GeneratorPage } from './pages/GeneratorPage/GeneratorPage';
import './App.module.css';
import { HistoryPage } from './pages/HistoryPage/HistoryPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
