import { createContext } from "react";
import type { TotalEnquiriesContextProp } from "@/lib/types";

const TotalEnquiriesContext = createContext<TotalEnquiriesContextProp | null>(null);

export default TotalEnquiriesContext;