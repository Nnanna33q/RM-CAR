import { createContext } from "react";
import type { TotalCarsContextProp } from "@/lib/types";

const TotalCarsContext = createContext<TotalCarsContextProp | null>(null);

export default TotalCarsContext;