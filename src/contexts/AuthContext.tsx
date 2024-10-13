import { createContext, useState } from "react"
import { UserDTO } from "@dtos/UserDTO"

export type AuthContextDataProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: "1",
    name: "Otávio Araújo",
    email: "otavio@example.com",
    avatar: "https://github.com/otavioaraujo.png",
  })
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
