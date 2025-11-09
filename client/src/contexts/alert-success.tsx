import { createContext } from "react";
import type { AlertSuccessContextProp } from "@/lib/types";

const AlertSuccessContext = createContext<AlertSuccessContextProp>([
    {
        success: false,
        successMessage: ''
    },
    () => {} 
]);

export default AlertSuccessContext;