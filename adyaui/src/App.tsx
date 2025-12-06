import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppProvider } from './context';
import { MainLayout } from './layout/MainLayout';
import { ComponentPage } from './pages/ComponentPage';
import { HomePage } from './pages/HomePage';
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="components/:id" element={<ComponentPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
