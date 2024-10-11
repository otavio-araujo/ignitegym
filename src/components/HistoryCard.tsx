import { HStack, Text, VStack, Heading } from "@gluestack-ui/themed"

export function HistoryCard() {
  return (
    <HStack
      w="$full"
      px="$5"
      py="$4"
      mb="$3"
      rounded="$md"
      bg="$gray600"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr="$5" flex={1}>
        <Heading
          color="$white"
          fontSize="$md"
          numberOfLines={1}
          fontFamily="$heading"
          textTransform="capitalize"
        >
          Costas
        </Heading>
        <Text color="$gray100" fontSize="$lg" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>
      <Text color="$gray300" fontSize="$md">
        8:52
      </Text>
    </HStack>
  )
}
