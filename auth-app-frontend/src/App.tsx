import { Routes, Route } from "react-router";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserLayout from "./pages/user/UserLayout";
import ProfileEdit from "./pages/user/ProfileEdit";
import UserProfile from "./pages/user/UserProfile";
import OAuthSuccess from "./pages/auth/OAuthSuccess";
import OAuthFailure from "./pages/auth/OAuthFailure";
import UserSettings from "./pages/user/UserSettings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="user" element={<UserLayout />}>
          <Route index element={<UserProfile />} />
          <Route path="edit" element={<ProfileEdit />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>

        <Route path="oauth/success" element={<OAuthSuccess />} />
        <Route path="oauth/failure" element={<OAuthFailure />} />        
        <Route path="oauth/error" element={<OAuthFailure />} />

      </Route>
    </Routes>
  );
}

export default App;
