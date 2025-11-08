// Next.js API Route - requires OPENAI_API_KEY in environment variables
export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { tool, prompt, tone } = req.body || {}
  const OPENAI_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_KEY) return res.status(500).json({ error: 'Missing OPENAI_API_KEY' })

  let userPrompt = ''
  if (tool === 'caption'){
    userPrompt = `Você é um copywriter brasileiro. Gere 6 opções de legenda curtas e virais para: ${prompt}. Tom: ${tone}. Numere as opções.`
  } else if (tool === 'names'){
    userPrompt = `Gere 20 nomes curtos, memoráveis e fáceis de pronunciar em português para: ${prompt}. Separe por vírgula.`
  } else if (tool === 'description'){
    userPrompt = `Crie uma descrição persuasiva, otimizada para vendas em marketplaces (até 3 parágrafos) para: ${prompt}. Use bullets curtos quando possível.`
  } else {
    userPrompt = prompt || 'Gere um texto curto.'
  }

  try{
    const r = await fetch('https://api.openai.com/v1/chat/completions',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: 'Você é um assistente que escreve em português do Brasil.' }, { role: 'user', content: userPrompt }], max_tokens: 600 })
    })
    const j = await r.json()
    const text = j.choices && j.choices[0] && (j.choices[0].message?.content || j.choices[0].text) ? (j.choices[0].message?.content || j.choices[0].text) : JSON.stringify(j)
    return res.status(200).json({ text })
  }catch(err){
    console.error(err)
    return res.status(500).json({ error: 'Generation failed' })
  }
}
