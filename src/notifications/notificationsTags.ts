import { OneSignal } from "react-native-onesignal"

export function tagUserDaysWithoutPractice(numerOfdays: number) {
  OneSignal.User.addTag("days_without_practice", numerOfdays.toString())
}

export function tagUserName(userName: string) {
  OneSignal.User.addTag("user_name", userName)
}
