import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import type { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
