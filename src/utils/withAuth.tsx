import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const AuthHOC: React.FC<P> = (props) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        router.push('/login');
      }
    }, [router, token]);

    return authenticated ? <WrappedComponent {...props} /> : <p>Loading...</p>;
  };

  AuthHOC.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthHOC;
};

export default withAuth;
