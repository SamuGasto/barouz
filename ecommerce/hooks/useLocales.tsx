import { useQuery } from "@tanstack/react-query";
import localesService from "../services/locales";

export function useLocales() {
    return useQuery({
        queryKey: ["locales"],
        queryFn: () => localesService.getLocales(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

}
