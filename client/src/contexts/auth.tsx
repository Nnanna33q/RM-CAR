import { createContext } from "react";
import type { AuthContextProp } from "@/lib/types";

const AuthContext = createContext<AuthContextProp>({
    isAuthenticated: false,
    setIsAuthenticated: () => {}
})

export default AuthContext;