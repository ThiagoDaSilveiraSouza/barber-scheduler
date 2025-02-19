import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { useAuthStore } from "./store";

function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <div className={"bg-base-100 h-screen"}>
      <AppRoutes />
    </div>
  );
}

export default App;
