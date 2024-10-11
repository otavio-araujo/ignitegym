import React, { useState } from "react"
import { SectionList } from "react-native"

import { VStack, Heading, Text } from "@gluestack-ui/themed"
import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"

export function History() {
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
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />

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
