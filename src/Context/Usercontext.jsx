import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [socId ,setSocId]=useState(null);
  const [socRefresh ,setSocRefresh]=useState(0);
  const [custData, setCustdata] = useState(null)


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [refresh]);

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };

   const socTypes = [
        { name: 'Residential', value: '1', label: 'Wings Name' },
        { name: 'Ro-house or Gala Type', value: '2', label: 'Sheri Name' },
        { name: 'Commercial', value: '3', label: 'Wings Name' }
    ];

    

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        socId ,setSocId,
        socRefresh ,setSocRefresh,
        loading,
        setLoading,
        setRefresh,
        logout,
        custData, setCustdata,socTypes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};
