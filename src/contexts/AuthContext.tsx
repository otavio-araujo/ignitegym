import { createContext, useState } from "react"
import { UserDTO } from "@dtos/UserDTO"

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => void
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

  function signIn(email: string, password: string) {
    setUser({
      id: "",
      name: "",
      email,
      avatar: "",
    })
  }
  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
