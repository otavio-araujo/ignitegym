import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import {
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Icon,
} from "@gluestack-ui/themed"
import { ChevronLeft } from "lucide-react-native"
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { api } from "@services/api"

type Props = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$gray500"
        p="$2"
        alignItems="center"
        pr="$4"
        rounded="$md"
        mb="$3"
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="Imagem do exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white" fontFamily="$heading">
            {data.name}
          </Heading>

          <Text
            color="$gray200"
            fontFamily="$body"
            fontSize="$sm"
            numberOfLines={2}
          >
            {data.series} séries de {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon as={ChevronLeft} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
