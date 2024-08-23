import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { UserRole } from '@/enums/UserRole';

const Tabs = () => {
  const router = useRouter();
  const { pathname } = router;
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <div className="tabs">
      <Link href="/">
        <span className={pathname === '/' ? 'active' : ''}>Home</span>
      </Link>

      {isAuthenticated ? (
        <>
          {role === UserRole.ADMIN && (
            <Link href="/manage">
              <span className={pathname === '/manage' ? 'active' : ''}>Manage Blogs</span>
            </Link>
          )}
          <button onClick={logout} className="logout-button">Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">
            <span className={pathname === '/login' ? 'active' : ''}>Login</span>
          </Link>
          <Link href="/register">
            <span className={pathname === '/register' ? 'active' : ''}>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Tabs;
