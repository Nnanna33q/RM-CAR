import { createContext } from "react";
import type { TBusinessInfo } from "@/lib/types";

const BusinessInfoContext = createContext<TBusinessInfo | undefined | null>(undefined);

export default BusinessInfoContext