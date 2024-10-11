import React from "react"
import { VStack } from "@gluestack-ui/themed"

import { HomeHeader } from "@components/HomeHeader"
import { Group } from "@components/Group"

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />

      <Group name="Costas" />
    </VStack>
  )
}
