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

type Props = TouchableOpacityProps & {
  // title: string
}

export function ExerciseCard({ ...rest }: Props) {
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
            uri: "https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c,q_80,enc_auto/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp",
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
            Exercício
          </Heading>

          <Text
            color="$gray200"
            fontFamily="$body"
            fontSize="$sm"
            numberOfLines={2}
          >
            3 séries de 20 repetições
          </Text>
        </VStack>
        <Icon as={ChevronLeft} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
