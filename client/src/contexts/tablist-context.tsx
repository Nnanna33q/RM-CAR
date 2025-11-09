import { createContext } from "react";
import type { TablistContextProp } from "@/lib/types";

const TablistContext = createContext<TablistContextProp>({
    tablist: 'All',
    setTablist: () => {}
});

export default TablistContext