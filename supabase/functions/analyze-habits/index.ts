import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { logs } = await req.json()

    if (!logs || logs.length < 7) {
      return new Response(
        JSON.stringify({ error: 'Calibration Phase: Please provide at least 7 days of logs for analysis.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY'))
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
      You are a Lead Behavioral Scientist. Analyze the following 30-day activity logs (Time + Action + Context + Energy Level).
      Logs: ${JSON.stringify(logs)}

      Identify:
      1. 3 recurring "Productivity Killers" (e.g., "The Afternoon Slump").
      2. 3 "High-Output Windows" where energy and focus are at their peak.
      3. A restructured, optimized 24-hour master schedule based on these patterns.

      Return the analysis in a structured JSON format:
      {
        "productivity_killers": [{"name": string, "description": string, "time_range": string}],
        "high_output_windows": [{"name": string, "description": string, "time_range": string}],
        "restructured_schedule": [{"time": string, "activity": string, "note": string}],
        "narrative_insight": string
      }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Attempt to parse JSON from the response if it's wrapped in markdown
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse analysis" }

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
