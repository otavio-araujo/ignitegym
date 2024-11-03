import { createContext, useEffect, useState } from "react"
import { UserDTO } from "@dtos/UserDTO"
import { api } from "@services/api"
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser"
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken"
import { ref } from "yup"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export type AuthContextDataProps = {
  user: UserDTO
  userDaysWithoutPractice: number
  isLoadingUserStorageData: boolean
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [userDaysWithoutPractice, setUserDaysWithoutPractice] =
    useState<number>(0)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function getUserLastPracticeDoneAt() {
    let lateDate: string[] | Date
    try {
      const { data } = await api.get("/history")

      if (data.length > 0) {
        lateDate = data[0].title.split(".").reverse() as string[]
        lateDate = new Date(
          Number(lateDate[0]),
          Number(lateDate[1]),
          Number(lateDate[2])
        )

        const distance = formatDistanceToNow(lateDate, {
          locale: ptBR,
        }).toString()

        const daysWithoutPractice = distance.split("dias")[0]

        setUserDaysWithoutPractice(Number(daysWithoutPractice))
      }
    } catch (error) {
      throw error
    }
  }

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setUser(userData)
  }

  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserSave(userData)
      await storageAuthTokenSave({ token, refresh_token })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password })

      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token)

        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)

      setUser({} as UserDTO)

      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await storageUserSave(userUpdated)
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const currentLoggedUser = await storageUserGet()
      const { token } = await storageAuthTokenGet()

      if (currentLoggedUser && token) {
        userAndTokenUpdate(currentLoggedUser, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    getUserLastPracticeDoneAt()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])
  return (
    <AuthContext.Provider
      value={{
        user,
        userDaysWithoutPractice,
        signIn,
        signOut,
        isLoadingUserStorageData,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
