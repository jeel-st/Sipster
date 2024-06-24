// Imports
import { router } from "expo-router";

/*
    Method to navigate to the game page

    @return: void
*/
export function navigateToFriendsPage() {
  router.navigate({
    pathname: "/routes/FriendsPage"
  });
};

/*
    Method to navigate to the game page

    @return: void
*/
export function quitGame(activity, router){
  // If the activity has sips, navigate to the game quit page, otherwise navigate to the game page
  if (activity.withSips) {
    router.navigate({ pathname: "/routes/GameQuitPage", params: { activity: JSON.stringify(activity) } })
  } else {
    router.navigate('(tabs)/game')
  }
}