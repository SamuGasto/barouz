// hooks/useLocales.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import localesService from "@/services/locales"
import { LocalRow, LocalInsert, LocalUpdate, LocalConHorarios } from "@/types/tipos_supabase_resumidos"

export function useLocales() {
    return useQuery<LocalConHorarios[]>({
        queryKey: ["locales"],
        queryFn: () => localesService.getLocales(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export function useCreateLocale() {
    const queryClient = useQueryClient()

    return useMutation<LocalRow, Error, LocalInsert>({
        mutationFn: (locale) => localesService.createLocale(locale),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locales"] })
        }
    })
}

export function useUpdateLocale() {
    const queryClient = useQueryClient()

    return useMutation<LocalRow, Error, LocalUpdate & { id: string }>({
        mutationFn: (locale) => localesService.updateLocale(locale),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locales"] })
        }
    })
}

export function useDeleteLocale() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id) => localesService.deleteLocale(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locales"] })
        }
    })
}