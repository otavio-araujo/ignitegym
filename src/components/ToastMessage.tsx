import { X } from "lucide-react-native"
import {
  ToastDescription,
  ToastTitle,
  Toast,
  Pressable,
  Icon,
  VStack,
} from "@gluestack-ui/themed"
type Props = {
  id: string
  title: string
  description?: string
  action?: "error" | "success"
  onClose: () => void
}
export function ToastMessage({
  id,
  title,
  description,
  action = "success",
  onClose,
}: Props) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      bgColor={action === "success" ? "$green500" : "$red500"}
      mt="$10"
    >
      <VStack space="xs" w="$full">
        <Pressable onPress={onClose} alignSelf="flex-end">
          <Icon as={X} color="$coolGray50" size="md" />
        </Pressable>
        <ToastTitle color="$white" fontFamily="$heading">
          {title}
        </ToastTitle>
        {description && (
          <ToastDescription color="$white" fontFamily="$body">
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  )
}
