import GamePage from "./GamePage";
import EventPage from "./EventPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import FriendsPage from "./FriendsPage";
import { withHook } from "../utils/withHook";
import useHome from "../utils/hooks/useHome";
import useFriends from "../utils/hooks/useFriends";

const Home = withHook(useHome, HomePage)
const Friends = withHook(useFriends, FriendsPage)


export { GamePage, EventPage, Home, LoginPage, RegisterPage, Friends }