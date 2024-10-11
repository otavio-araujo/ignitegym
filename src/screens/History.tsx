import React from "react"

import { VStack, Text } from "@gluestack-ui/themed"
import { ScreenHeader } from "@components/ScreenHeader"
import { HistoryCard } from "@components/HistoryCard"
export function History() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />

      <HistoryCard />
    </VStack>
  )
}
