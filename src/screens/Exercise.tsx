import React, { useEffect } from "react"
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed"
import { useCallback, useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

import { ArrowLeft } from "lucide-react-native"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"

import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Button } from "@components/Button"
import { ToastMessage } from "@components/ToastMessage"
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { Loading } from "@components/Loading"

type RouteParamsProps = {
  exerciseId: string
}
export function Exercise() {
  const { exerciseId } = useRoute().params as RouteParamsProps
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [submittingRegister, setSubmittingRegister] = useState(false)
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseDTO>(
    {} as ExerciseDTO
  )

  function handleGoBack() {
    setExerciseDetail({} as ExerciseDTO)
    navigation.goBack()
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSubmittingRegister(true)

      await api.post("/history", { exercise_id: exerciseId })

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Parabéns! Exercício registrado no seu histórico com sucesso."
            action="success"
            onClose={() => toast.close(id)}
          />
        ),
      })

      navigation.navigate("history")
    } catch (error) {
      const isAppErro = error instanceof AppError
      const title = isAppErro
        ? error.message
        : "Não foi possível registrar o exercício."

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
    } finally {
      setSubmittingRegister(false)
    }
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExerciseDetail(data)
    } catch (error) {
      const isAppErro = error instanceof AppError
      const title = isAppErro
        ? error.message
        : "Não foi possível carregar os detalhes do exercício."

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
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])
  return (
    <VStack flex={1}>
      <VStack px="$8" pt="$12" bg="$gray600">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontSize="$lg"
            fontFamily="$heading"
            flexShrink={1}
          >
            {exerciseDetail.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text ml="$1" color="$gray200" textTransform="capitalize">
              {exerciseDetail.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <VStack p="$8">
            <Box rounded="$lg" mb="$4" overflow="hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetail.demo}`,
                }}
                resizeMode="cover"
                alt="Exercício"
                w="$full"
                h="$80"
              />
            </Box>

            <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb="$6"
                mt="$5"
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="$gray200" ml="$2">
                    {exerciseDetail.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color="$gray200" ml="$2">
                    {exerciseDetail.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                onPress={handleExerciseHistoryRegister}
                isLoading={submittingRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
