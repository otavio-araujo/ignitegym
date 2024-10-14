import { HistoryDTO } from "@dtos/HistoryDTO"
import { HStack, Text, VStack, Heading } from "@gluestack-ui/themed"

type Props = {
  data: HistoryDTO
}

export function HistoryCard({ data }: Props) {
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
          {data.group}
        </Heading>
        <Text color="$gray100" fontSize="$lg" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>
      <Text color="$gray300" fontSize="$md">
        {data.hour}
      </Text>
    </HStack>
  )
}
