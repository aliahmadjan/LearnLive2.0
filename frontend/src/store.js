import create from "zustand"
import { devtools, persist} from "zustand/middleware"

const store = (set) => ({
    loginState: false,
    setLoginState: () =>
        set((state) => ({loginState: true})),
        
    user: "student",
    setUser: (role) =>
        set((state) => ({user: role}))
})

const useStore = create(
    devtools(store)
)

export default useStore