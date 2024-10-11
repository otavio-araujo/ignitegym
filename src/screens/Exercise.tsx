import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed"

import { ArrowLeft } from "lucide-react-native"
import BodySvg from "@assets/body.svg"

import { AppNavigatorRoutesProps } from "@routes/app.routes"
export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <VStack flex={1}>
      <VStack px="$8" pt="$12" bg="$gray600">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontSize="$lg"
            fontFamily="$heading"
            flexShrink={1}
          >
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text ml="$1" color="$gray200" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  )
}
