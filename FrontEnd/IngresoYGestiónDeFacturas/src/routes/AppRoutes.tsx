import { AuthRouter } from "../auth/routes";
import { ProjectRouter } from "../project";
import { LoadingScreen } from "../theme";

let status = "authenticated";
export const AppRoutes = () => {
  if (status === "checking") return <LoadingScreen />;

  return (
    <>{status === "not-authenticated" ? <AuthRouter /> : <ProjectRouter />}</>
  );
};
