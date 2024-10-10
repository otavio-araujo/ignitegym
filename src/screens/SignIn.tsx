import { VStack, Image, Center, Text, Heading } from "@gluestack-ui/themed"

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input"

export function SignIn() {
  return (
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
        <Center gap="$2">
          <Heading color="$gray100">Acesse sua conta</Heading>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
        </Center>
      </VStack>
    </VStack>
  )
}
