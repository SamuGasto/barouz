import { useQuery } from "@tanstack/react-query";
import horariosService from "../services/horarios";

export function useHorarios() {
    return useQuery({
        queryKey: ["horarios"],
        queryFn: () => horariosService.getHorarios(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}