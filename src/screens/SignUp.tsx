import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
} from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"

import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import Logo from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"

import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useState } from "react"

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const [name, setName] = useState("")

  function handleGoBack() {
    navigation.navigate("signIn")
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          source={BackgroundImg}
          alt="Pessoas treinando"
          w="$full"
          h={624}
          defaultSource={BackgroundImg}
          position="absolute"
        />

        <Center my="$24">
          <Logo />
          <Text color="$gray100" fontSize="$sm">
            Treine sua mente e seu corpo.
          </Text>
        </Center>
        <VStack flex={1} px="$10" pb="$16">
          <Center gap="$2" flex={1}>
            <Heading color="$gray100">Crie sua conta</Heading>

            <Input placeholder="Nome" onChangeText={setName} />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input placeholder="Senha" secureTextEntry />

            <Button title="Criar e acessar" />
          </Center>

          <Button
            title="Voltar para o login"
            mt="$12"
            variant="outline"
            onPress={handleGoBack}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
