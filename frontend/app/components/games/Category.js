import { View, ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import {games} from "../../constants/games"
import { categorys } from "../../constants/games";

export default function Category(){

    return(
        <View>
            <ScrollView horizontal className="mt-4 px-2" >
                {
                    categorys.map((game, index) => <CategoryCard game={game} key={index} />)
                }
            </ScrollView>
        </View>
    )
}