import { RouterProvider } from "react-router-dom";
import router from "./routes/route";

const App = () => {
  return (
    <div className="font-serif">
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
