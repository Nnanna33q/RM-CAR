import { createContext } from "react";
import type { EnquiriesTablistContextProp } from "@/lib/types";

const TablistEnquiriesContext = createContext<EnquiriesTablistContextProp>({
    tablist: 'All',
    setTablist: () => {}
});

export default TablistEnquiriesContext;