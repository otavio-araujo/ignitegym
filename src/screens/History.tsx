import { SectionList } from "react-native"
import React, { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"

import { VStack, Heading, Text, useToast } from "@gluestack-ui/themed"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"
import { ToastMessage } from "@components/ToastMessage"

export function History() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState([])

  const [exercises, setExercises] = useState([
    {
      title: "10.10.24",
      data: ["Puxada frontal", "Remada unilateral", "Remada curvada"],
    },
    {
      title: "11.10.24",
      data: ["Levantamento terra", "Agachamento", "Elevação lateral"],
    },
  ])

  async function fetchHistory() {
    try {
      setIsLoading(true)
      const { data } = await api.get("/history")

      console.log(data)
    } catch (error) {
      const isAppErro = error instanceof AppError
      const title = isAppErro
        ? error.message
        : "Não foi possível carregar o histórico."

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

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [])
  )
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading
            mb="$3"
            mt="$10"
            fontSize="$md"
            color="$gray200"
            fontFamily="$heading"
          >
            {title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0
            ? { flex: 1, justifyContent: "center" }
            : { paddingBottom: 100 }
        }
        ListEmptyComponent={() => (
          <Text color="$gray100" textAlign="center">
            Não há exercícios registrados ainda. {"\n"}
            Vamos fazer exercícios hoje?
          </Text>
        )}
      />
    </VStack>
  )
}
