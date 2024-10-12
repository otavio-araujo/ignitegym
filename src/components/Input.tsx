import { ComponentProps } from "react"
import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@gluestack-ui/themed"

type Props = ComponentProps<typeof InputField> & {
  errorMessages?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}
export function Input({
  isReadOnly = false,
  isInvalid = false,
  errorMessages = null,
  ...rest
}: Props) {
  const invalid = !!errorMessages || isInvalid

  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GluestackInput
        h="$14"
        borderWidth="$0"
        borderRadius="$md"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$red500" : "$green500",
        }}
        isReadOnly={isReadOnly}
        isInvalid={invalid}
        $invalid={{ borderWidth: 1, borderColor: "$red500" }}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          px="$4"
          bg="$gray700"
          color="$white"
          fontFamily="$body"
          placeholderTextColor="$gray300"
          {...rest}
        />
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessages}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
