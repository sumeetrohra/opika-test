import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const TaskListPage = lazy(() => import("./pages/TaskListPage"));
const PaginationPage = lazy(() => import("./pages/PaginationPage"));

const App = () => {
  return (
    <div>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/task-list' element={<TaskListPage />} />
            <Route path='/pagination' element={<PaginationPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
