import {useState} from "react";

export const useFetching = (store, callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            if (e.response.status === 401) {
                await store.refreshToken()
                try {
                    await callback()
                } catch (e) {
                    setError(e.message)
                }
            }
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}