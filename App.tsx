import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto"
import { StatusBar } from "react-native"

import { config } from "./config/gluestack-ui.config"
import { GluestackUIProvider } from "@gluestack-ui/themed"

import { AuthContext } from "@contexts/AuthContext"

import { Routes } from "@routes/index"

import { Loading } from "@components/Loading"

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContext.Provider
        value={{
          user: {
            id: "1",
            name: "Otavio Araujo",
            email: "otavio@example.com",
            avatar: "https://github.com/otavioaraujo.png",
          },
        }}
      >
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </GluestackUIProvider>
  )
}
