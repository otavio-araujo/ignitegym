import { ComponentProps } from "react"
import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from "@gluestack-ui/themed"
import { isLoading } from "expo-font"

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  variant?: "solid" | "outline"
  isLoading?: boolean
}
export function Button({
  title,
  variant = "solid",
  isLoading = false,
  ...rest
}: Props) {
  return (
    <GluestackButton
      {...rest}
      w="$full"
      h="$14"
      bg={variant === "outline" ? "transparent" : "$green700"}
      borderWidth={variant === "outline" ? "$1" : "$0"}
      borderColor="$green500"
      borderRadius="$sm"
      $active-bg={variant === "outline" ? "$gray500" : "$green500"}
      disabled={isLoading}
    >
      {isLoading ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text
          color={variant === "outline" ? "$green500" : "$white"}
          fontSize="$sm"
          fontFamily="$heading"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}
