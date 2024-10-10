import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
} from "@gluestack-ui/themed"

import Logo from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"

import { Input } from "@components/Input"
import { Button } from "@components/Button"

export function SignUp() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="$gray700">
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

            <Input placeholder="Nome" />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input placeholder="Senha" secureTextEntry />

            <Button title="Criar e acessar" />
          </Center>

          <Button title="Voltar para o login" mt="$12" variant="outline" />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
