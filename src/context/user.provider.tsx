import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
  } from "react";
import { TUser } from "@/types/user.types";
  
  interface TUserProviderValues {
    user: TUser | null;
    isLoading: boolean;
    setUser: (user: TUser | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  }
  
  const UserContext = createContext<TUserProviderValues | undefined>(undefined);
  
  const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<TUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleUser = async () => {
      const userData = localStorage.getItem("user_data_hiublue");
  
      setUser(userData ? JSON.parse(userData) : null);
      setIsLoading(false);
    };
  
    useEffect(() => {
      handleUser();
    }, [isLoading]);
  
    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
          isLoading,
          setIsLoading,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => {
    const context = useContext(UserContext);
  
    if (context === undefined) {
      throw new Error("useUser must be used within the UserProvider context");
    }
  
    return context;
  };
  
  export default UserProvider;
  