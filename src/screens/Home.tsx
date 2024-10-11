import React from "react"
import { VStack } from "@gluestack-ui/themed"

import { HomeHeader } from "@components/HomeHeader"

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />
    </VStack>
  )
}
