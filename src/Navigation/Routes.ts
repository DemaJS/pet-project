import { Settings } from "./../Components/Settings/Settings";
import { SignupForm } from "./../Components/Login/Formik-login";
import { Counter } from "../Components/Counter/Counter";
import { Profile } from "../Components/Profile/Profile";
import { ToDo } from "../Components/ToDo/ToDo";
import { Users } from "../Components/Users/Users";

export const routes = [
  {
    path: "/todo",
    component: ToDo,
  },
  {
    path: "/counter",
    component: Counter,
  },
  {
    path: "/profile/:userID?",
    component: Profile,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/login",
    component: SignupForm,
  },
  {
    path: "/settings",
    component: Settings,
  },
];
