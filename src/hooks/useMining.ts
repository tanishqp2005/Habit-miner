import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useMining = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [analysis, setAnalysis] = useState<any>(null)

    const analyzeHabits = async (logs: any[]) => {
        if (!supabase) {
            setError('Supabase connection not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.')
            return
        }
        setLoading(true)
        setError(null)
        try {
            const { data, error: functionError } = await supabase.functions.invoke('analyze-habits', {
                body: { logs },
            })

            if (functionError) throw functionError
            setAnalysis(data)
        } catch (err: any) {
            setError(err.message || 'An error occurred during analysis')
        } finally {
            setLoading(false)
        }
    }

    const saveLog = async (log: { activity_name: string; duration: number; energy_level: number; timestamp: string }) => {
        if (!supabase) {
            setError('Supabase connection not configured.')
            return
        }
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')

            const { error: dbError } = await supabase
                .from('logs')
                .insert([{ ...log, user_id: user.id }])

            if (dbError) throw dbError
        } catch (err: any) {
            setError(err.message)
        }
    }

    return { analyzeHabits, saveLog, loading, error, analysis }
}
