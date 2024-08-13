import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Contact = lazy(() => import("./pages/Contact"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Loading = lazy(() => import("./components/Loader"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            {/* Add a route for the NotFound component here for path are not registered */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
