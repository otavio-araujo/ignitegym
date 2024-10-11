import { ScrollView, TouchableOpacity } from "react-native"
import { Center, Text, VStack } from "@gluestack-ui/themed"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"

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

          <TouchableOpacity>
            <Text
              mt="$2"
              mb="$8"
              fontSize="$md"
              color="$green500"
              fontFamily="$heading"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center gap="$4">
            <Input placeholder="Otávio Araújo" bg="$gray600" isReadOnly />
            <Input
              placeholder="otavio_araujo@hotmail.com"
              bg="$gray600"
              isReadOnly
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
