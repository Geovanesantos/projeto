import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../pages/home/HomeScreen";
import ProfissionalScreen from "../pages/profissional/ProfissionalScreen";
const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Details" component={ProfissionalScreen} />
    </Navigator>
  );
}
