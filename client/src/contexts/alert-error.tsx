import { createContext } from "react";
import type { AlertErrorContextProp } from "@/lib/types";

const AlertErrorContext = createContext<AlertErrorContextProp>([
    {
        error: false,
        errorMessage: ''
    },
    () => {} 
]);

export default AlertErrorContext;