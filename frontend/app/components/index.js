// Events imports
import EventBtn from './events/EventBtn';
import EventInfoCard from './events/EventInfoCard';
import Events from './events/Events';

// Friends imports
import FriendBtn from './friends/FriendBtn';
import FriendBtn2 from './friends/FriendBtn2';
import FriendsCategorys from './friends/FriendsCategorys';
import FriendsContainer from './friends/FriendsContainer';
import FriendsHeaderButtons from './friends/FriendsHeaderButtons';
import FriendsScrollView from './friends/FriendsScrollView';
import FriendsTabButton from './friends/FriendsTabButton';

// Games imports
import GameCard from './games/GameCard';
import Games from './games/Games';
import GameFriendBtn from './games/GameFriendBtn';
import GameActivity from './games/GameActivity';
import GameCameraBtn from './games/GameCameraBtn';
import GameGoBtn from './games/GameGoBtn';
import GameAcitvityPost from './games/GameAcitvityCam';


// Layout imports
import IconButton from './layout/IconButton';
import SipsterButton from './layout/SipsterButton';
import SmallTextField from './layout/SmallTextField';
import TagCard from './layout/TagCard';
import TextField from './layout/TextField';
import ErrorMessage from './layout/ErrorMessage';

// Settings Import
import SettingsButton from './settings/SettingsButton';
import CheckButton from './settings/CheckButton';
import AboutUs from './settings/AboutUs';
import TextButton from './settings/TextButton';
import Help from './settings/Help';
import Picker from './settings/Picker';
import DeleteAccount from './settings/deleteAccount';

// Profile imports
import ProfileCard from './profile/ProfileCard';
import ProfileHeaderButtons from './profile/ProfileHeaderButtons';
import ProfileStagger from './profile/ProfileStagger';
import ProfileInviteBtn from './profile/ProfileInviteBtn';

// Skeletons imports
import FriendsH2Skeleton from './skeletons/FriendsH2Skeleton';
import FriendsSkeleton from './skeletons/FriendsSkeleton';

// Home Imports
import HomeFriends from './home/HomeFriends';
import HomeActivityCard from './home/HomeActivityCard';
import HomeReactionCard from './home/HomeReactionCard';
import HomeFriendBtn from './home/HomeFriendBtn';
import HomeActivityImage from './home/HomeAcitivityImage';
import HomeFooter from './home/HomeFooter';
import HomeHeader from './home/HomeHeader';
import HomeActivityFactory from './home/HomeActivityFactory';

// Provider Imports
import { UserProvider } from './provider/UserProvider';
import { RefreshContext } from './provider/RefreshProvider';


export {
  // Events
  EventBtn, EventInfoCard, Events,

  // Friends
  FriendBtn, FriendBtn2, FriendsCategorys, FriendsContainer, FriendsHeaderButtons, FriendsScrollView, FriendsTabButton,

  // Games
  GameCard, Games, GameFriendBtn, GameActivity, GameCameraBtn, GameGoBtn, GameAcitvityPost,

  // Layout
  IconButton, SipsterButton, SmallTextField, TagCard, TextField, ErrorMessage,

  // Settings
  SettingsButton, CheckButton, AboutUs, TextButton, Help, Picker, DeleteAccount,

  // Profile
  ProfileCard, ProfileHeaderButtons, ProfileStagger, ProfileInviteBtn,

  // Skeletons
  FriendsH2Skeleton, FriendsSkeleton,

  // Home
  HomeFriends, HomeActivityCard, HomeReactionCard, HomeFriendBtn, HomeActivityImage, HomeFooter, HomeHeader, HomeActivityFactory,

  // Provider
  UserProvider, RefreshContext
};
