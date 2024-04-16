import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user || null);

    const { data: listener } = supabase.auth.onAuth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user, logout}}>
      {children}
    </AuthContext.Provider>
  )
};
