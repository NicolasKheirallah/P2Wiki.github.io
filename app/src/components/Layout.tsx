import { Outlet } from 'react-router';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--ps-bg)' }}>
      <Header />
      <Outlet />
    </div>
  );
}
