import { Route, Routes } from 'react-router';

import { CatalogPage, HomePage } from '@pages';
import { AuthPage } from '@pages/auth';
import { AuthLogin, AuthRegister } from '@components/auth';
import { ProtectedRoute } from '@components/protectedRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/auth" element={<AuthPage />}>
        <Route index element={<AuthLogin />} />
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/catalog" element={<CatalogPage />} />
      </Route>
    </Routes>
  );
};
