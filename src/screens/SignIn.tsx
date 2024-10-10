import { VStack, Image } from "@gluestack-ui/themed"
import BackgroundImg from "@assets/background.png"

export function SignIn() {
  return (
    <VStack flex={1} bg="$gray700">
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        w="$full"
        h={624}
        defaultSource={BackgroundImg}
        position="absolute"
      />
    </VStack>
  )
}
