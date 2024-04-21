import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import{Colors} from "../constants/styles"
import{styles} from "../constants"
import TextFieldConst from '../components/TextFieldConst'
import TextField from '../components/TextField'


export default function WoPStart(){
  return(
    <SafeAreaView 
      className="flex-1 items-left" 
      style={{ backgroundColor: Colors.primary }}>
          {/* Header */}
          <View className="flex-row items-center mb-5 mx-2 ">
            <BackButton />
            <Text className="text-white font-bold text-3xl tracking-widest">
              Wahrheit oder Pflicht
            </Text>
          </View>

          {/* Mitspieler */}
          <View className="item-center mb-5 mx-8 ">
            <Text className={styles.categoryText}>
              Wer Spielt alles mit?
            </Text>
            <View>
              <TextFieldConst placeholder="Maike" />
              <TextField placeholder = "add" />
            </View>
          </View>

          {/* Freunde */}
          <View className="mx-8" >
            <Text className={styles.categoryText}>
              Freundesliste
            </Text>
            
          </View>
    </SafeAreaView>
  )
}