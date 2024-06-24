import { router } from "expo-router";

export function navigateToFriendsPage() {
    router.navigate({
      pathname: "/routes/FriendsPage"
    });
  };