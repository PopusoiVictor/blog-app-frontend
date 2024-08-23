import { UserRole } from '@/enums/UserRole';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole | null; 
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole | null>(null);

  const login = (role: UserRole) => {
    setIsAuthenticated(true);
    setRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const storedRole = localStorage.getItem('role') as UserRole | null;
    setIsAuthenticated(isAuth);
    setRole(storedRole);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
