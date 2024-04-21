import GamePage from "./GamePage";
import EventPage from "./EventPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import FriendsPage from "./FriendsPage";
import GamePageAll from "./GamePageAll";
import { withHook } from "../utils/withHook";
import useHome from "../utils/hooks/useHome";

const Home = withHook(useHome, HomePage)


export { GamePage, EventPage, Home, LoginPage, RegisterPage, FriendsPage, GamePageAll }