import { Center, Text, VStack } from "@gluestack-ui/themed"

import { ScreenHeader } from "@components/ScreenHeader"
import { ScrollView } from "react-native"
import { UserPhoto } from "@components/UserPhoto"

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: "https://github.com/otavio-araujo.png" }}
            alt="Foto do usuário"
            size="xl"
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
