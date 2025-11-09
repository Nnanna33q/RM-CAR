import { createContext } from "react";
import type { PageContextProp } from "@/lib/types";

const PageContext = createContext<PageContextProp>({
    page: 1,
    setPage: () => {}
});

export default PageContext;