import { ComponentProps } from "react"
import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from "@gluestack-ui/themed"
import { isLoading } from "expo-font"

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  isLoading?: boolean
}
export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      bg="$green700"
      borderWidth="$0"
      borderColor="$green500"
      borderRadius="$sm"
      $active-bg="$green500"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text color="$white" fontSize="$sm" fontFamily="$heading">
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}
