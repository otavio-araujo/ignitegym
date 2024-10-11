import { useState } from "react"
import { HStack, VStack } from "@gluestack-ui/themed"

import { HomeHeader } from "@components/HomeHeader"
import { Group } from "@components/Group"

export function Home() {
  const [groupSelected, setGroupSelected] = useState("costas")
  return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack>
        <Group
          name="Costas"
          isActive={groupSelected === "costas"}
          onPress={() => setGroupSelected("costas")}
        />
        <Group
          name="Biceps"
          isActive={groupSelected === "biceps"}
          onPress={() => setGroupSelected("biceps")}
        />
        <Group
          name="Triceps"
          isActive={groupSelected === "triceps"}
          onPress={() => setGroupSelected("triceps")}
        />
      </HStack>
    </VStack>
  )
}
