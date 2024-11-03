import { HStack, Text, ButtonIcon, Icon, Pressable } from "@gluestack-ui/themed"
import { OSNotification } from "react-native-onesignal"
import * as Linking from "expo-linking"
import { Bell, X } from "lucide-react-native"

type Props = {
  data?: OSNotification | null
  onClose: () => void
}

export function PushNotification({ data = null, onClose }: Props) {
  function handleOnPress() {
    if (data?.launchURL) {
      Linking.openURL(data.launchURL)
      onClose()
    }
  }
  return (
    <Pressable
      w="$full"
      bgColor={"$gray200"}
      position="absolute"
      top={0}
      p={"$6"}
      pt={"$12"}
      onPress={handleOnPress}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Icon as={Bell} mr={2} />

        <Text fontSize="$md" color="black" flex={1}>
          {data?.title}
        </Text>

        <Pressable onPress={onClose}>
          <ButtonIcon as={X} />
        </Pressable>
      </HStack>
    </Pressable>
  )
}
