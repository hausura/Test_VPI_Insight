import { Provider } from "react-redux";
import { Store } from "./redux/Store";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";

function App() {

  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
