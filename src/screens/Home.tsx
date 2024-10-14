import { useCallback, useEffect, useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native"
import { Heading, HStack, Text, useToast, VStack } from "@gluestack-ui/themed"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { ExerciseCard } from "@components/ExerciseCard"
import { ToastMessage } from "@components/ToastMessage"
import { Loading } from "@components/Loading"

export function Home() {
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const [isLoading, setIsLoading] = useState(true)
  const [groupSelected, setGroupSelected] = useState<string>("")
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setSetExercises] = useState<ExerciseDTO[]>([])

  function handleExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId })
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`)
      setSetExercises(data)
    } catch (error) {
      const isAppErro = error instanceof AppError
      const title = isAppErro
        ? error.message
        : "Não foi possível carregar os exercícios."

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

  async function fetchGroups() {
    try {
      const { data } = await api.get("/groups")
      setGroupSelected(data[0])
      setGroups(data)
    } catch (error) {
      const isAppErro = error instanceof AppError
      const title = isAppErro
        ? error.message
        : "Não foi possível carregar os grupos."

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
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected])
  )

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
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

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} p="$8">
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        </VStack>
      )}
    </VStack>
  )
}
