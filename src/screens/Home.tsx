import { useState } from "react"
import { FlatList, FlatListComponent } from "react-native"
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"

import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { ExerciseCard } from "@components/ExerciseCard"

export function Home() {
  const [groupSelected, setGroupSelected] = useState("Costas")
  const [exercises, setSetExercises] = useState([
    "Puxada frontal",
    "Remada unilateral",
    "Remada curvada",
    "Levantamento terra",
    "Agachamento",
    "Elevação lateral",
    "Elevação frontal",
  ])
  const [groups, setGroups] = useState(["Costas", "Bíceps", "Tríceps", "Ombro"])
  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32,
        }}
        style={{
          marginVertical: 40,
          maxHeight: 44,
          minHeight: 44,
        }}
      />

      <VStack p="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercícios
          </Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  )
}
