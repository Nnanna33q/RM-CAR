import { createContext } from "react";
import type { EnquiriesContextProp } from "@/lib/types";

const EnquiriesContext = createContext<EnquiriesContextProp>(null);

export default EnquiriesContext;