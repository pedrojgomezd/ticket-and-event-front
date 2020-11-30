import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { clientHttp } from "./clientHttp";

const authContext = createContext();
const authUser = false; // localStorage.getItem("authUser");
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = (email, password) =>
    clientHttp.get("../sanctum/csrf-cookie").then(() =>
      clientHttp
        .post("../login", { email, password })
        .then((data) => {
          fetchUser();
          router.push("/");
          return data;
        })
        .catch((error) => console.log(error))
    );

  const logout = (email, password) =>
    clientHttp.post("../logout").then((data) => {
      setUser(false);

      return data;
    });

  const fetchUser = async () => {
    try {
      const { data, status } = await clientHttp.get("user");
      console.log({ status });
      if (status !== 200) {
        const dataSantum = await clientHttp.get("../sanctum/csrf-cookie");
        console.log({ dataSantum, status });
        setUser(false);
        return;
      }
      setUser(data);
      setLoading(false);
    } catch (error) {
      setUser(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const redirectHome = () => {
      if (["/login", "/logout"].includes(router.pathname) && user !== false) {
        router.push("/");
      }
    };

    redirectHome();
  }, [user]);

  useEffect(() => {
    fetchUser();

    //return () => fetchUser();
  }, []);

  return {
    user,
    login,
    logout,
    loading,
    fetchUser,
  };
}
