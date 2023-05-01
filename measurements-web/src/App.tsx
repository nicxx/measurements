import { CssBaseline } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { routes as appRoutes } from "./routes";
import { SnackbarProvider } from "notistack";

function App() {

  return (
    <>
      <CssBaseline />
      <Router>
        <Layout>
          <SnackbarProvider />
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;