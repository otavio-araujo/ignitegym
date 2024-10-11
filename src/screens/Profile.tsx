import { ScrollView, TouchableOpacity } from "react-native"
import { Center, Heading, Text, VStack } from "@gluestack-ui/themed"
import * as ImagePicker from "expo-image-picker"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

export function Profile() {
  async function handleUserPhotoSelect() {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })
  }
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

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
            <Input placeholder="Otávio Araújo" bg="$gray600" />
            <Input
              placeholder="otavio_araujo@hotmail.com"
              bg="$gray600"
              isReadOnly
            />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Center gap="$4" w="$full">
            <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
            <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
            <Input
              placeholder="Confirme a nova senha"
              bg="$gray600"
              secureTextEntry
            />

            <Button title="Atualizar" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
