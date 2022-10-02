import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Main from './pages/main';
import { ProtectedRoute } from './routes/route';
import store from './stores/store';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='*'
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
