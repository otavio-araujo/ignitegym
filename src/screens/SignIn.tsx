import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  useToast,
} from "@gluestack-ui/themed"
import { Controller, useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"

import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import { useAuth } from "@hooks/useAuth"

import Logo from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"

import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { ToastMessage } from "@components/ToastMessage"

import { AppError } from "@utils/AppError"
import { useEffect, useState } from "react"

type FormData = {
  email: string
  password: string
}

export function SignIn() {
  const toast = useToast()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  function handleNewAccount() {
    navigation.navigate("signUp")
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      console.log(error)
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde."

      setIsLoading(false)

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  useEffect(() => {
    setValue("email", "otavio@email.com")
    setValue("password", "123456")
  }, [])

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
          <Center gap="$2">
            <Heading color="$gray100">Acesse sua conta</Heading>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Informe o E-mail" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  onChangeText={onChange}
                  errorMessages={errors.email?.message}
                  autoCapitalize="none"
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: "Informe a senha" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessages={errors.password?.message}
                  value={value}
                />
              )}
            />

            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
              Ainda não tem acesso?
            </Text>
            <Button
              title="Criar conta"
              variant="outline"
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
