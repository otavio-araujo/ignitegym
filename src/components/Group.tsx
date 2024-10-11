import { Button, Text } from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type Props = ComponentProps<typeof Button> & {
  name: string
  isActive?: boolean
}

export function Group({ name, isActive = false, ...rest }: Props) {
  return (
    <Button
      minWidth="$24"
      h="$10"
      bg="$gray600"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      borderWidth={isActive ? 1 : 0}
      borderColor="$green500"
      sx={{
        ":active": { borderWidth: 1 },
      }}
      {...rest}
    >
      <Text
        color={isActive ? "$green500" : "$gray200"}
        textTransform="uppercase"
        fontSize="$xs"
        fontFamily="$heading"
      >
        {name}
      </Text>
    </Button>
  )
}
