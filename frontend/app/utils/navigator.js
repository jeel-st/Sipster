import { router } from "expo-router";

export function navigateToFriendsPage() {
  router.navigate({
    pathname: "/routes/FriendsPage"
  });
};

export function quitGame(activity, router){
  if (activity.withSips) {
    router.navigate({ pathname: "/routes/GameQuitPage", params: { activity: JSON.stringify(activity) } })
  } else {
    router.navigate('(tabs)/games')
  }
}