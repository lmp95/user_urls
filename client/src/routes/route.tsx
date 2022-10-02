import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Blacklist from '../pages/blacklist';
import UrlList from '../pages/url';
import { RootState } from '../stores/store';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSelector((state: RootState) => state.user);
  return token ? children : <Navigate to={'/login'} replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<UrlList />} />
      <Route path='/blacklist' element={<Blacklist />} />
    </Routes>
  );
};
