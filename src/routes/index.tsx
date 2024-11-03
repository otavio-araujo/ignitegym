import { Box } from "@gluestack-ui/themed"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"

import { useAuth } from "@hooks/useAuth"

import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { Loading } from "@components/Loading"
import {
  NotificationWillDisplayEvent,
  OneSignal,
  OSNotification,
} from "react-native-onesignal"
import { useEffect, useState } from "react"
import { PushNotification } from "@components/PushNotification"

OneSignal.initialize("abdf8fe7-23a0-4eea-96a0-3653a01a8c23")
OneSignal.Notifications.requestPermission(true)

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  const { user, isLoadingUserStorageData } = useAuth()

  const [notification, setNotification] = useState<OSNotification>()

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent): void => {
      event.preventDefault()
      const notificationResponse = event.getNotification()
      setNotification(notificationResponse)
    }

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      handleNotification
    )

    return () =>
      OneSignal.Notifications.removeEventListener(
        "foregroundWillDisplay",
        handleNotification
      )
  }, [])

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
      {notification?.title && (
        <PushNotification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      )}
    </Box>
  )
}
