import { useEffect, useMemo } from "react";
import { AuthRouter } from "../auth/routes";
import { ProjectRouter } from "../project";
import { LoadingScreen } from "../theme";
import { useLocalStorage } from "../data";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../shared";

export const AppRoutes = () => {
  const {
    status,
    onChecking,
    jwtInfo: { token },
  } = useAuthStore();
  const { SaveLastPath } = useLocalStorage();
  const { pathname, search } = useLocation();
  useMemo(
    async () => await SaveLastPath(pathname + search),
    [pathname, search, SaveLastPath]
  );

  useEffect(() => {
    onChecking();
  }, []);
  if (status === "checking") return <LoadingScreen />;

  return (
    <>
      {status === "not-authenticated" || (token ?? "").length === 0 ? (
        <AuthRouter />
      ) : (
        <ProjectRouter />
      )}
    </>
  );
};
