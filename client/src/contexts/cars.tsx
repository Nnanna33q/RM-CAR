import { createContext } from "react";
import type { CarsContextProp } from "@/lib/types";

const CarsContext = createContext<CarsContextProp>(null);

export default CarsContext