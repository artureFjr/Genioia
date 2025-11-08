import { useState } from 'react'
export default function Captions(){
  const [prompt,setPrompt]=useState('Legenda para post sobre treino de vôlei')
  const [tone,setTone]=useState('engraçado')
  const [loading,setLoading]=useState(false)
  const [result,setResult]=useState('')

  async function handle(e){ 
    e.preventDefault(); setLoading(true); setResult('')
    try{
      const res = await fetch('/api/gen',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tool:'caption',prompt,tone})})
      const j = await res.json(); setResult(j.text||'')
    }catch(err){ setResult('Erro: '+err.message)}
    setLoading(false)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">Gerador de Legendas</h3>
      <p className="text-sm text-gray-600 mt-1">Digite o contexto e escolha o tom. Geramos opções prontas.</p>
      <form className="mt-3" onSubmit={handle}>
        <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={3} className="w-full p-2 border rounded" />
        <div className="mt-2 flex gap-2">
          <select value={tone} onChange={e=>setTone(e.target.value)} className="p-2 border rounded">
            <option value="engraçado">Engraçado</option>
            <option value="profissional">Profissional</option>
            <option value="emocional">Emocional</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Gerar</button>
        </div>
      </form>

      <div className="mt-4">
        {loading && <div className="text-sm text-gray-500">Gerando...</div>}
        {!loading && result && (
          <div className="mt-3 bg-gray-50 p-4 rounded">
            <h4 className="font-medium">Resultado</h4>
            <pre className="whitespace-pre-wrap mt-2">{result}</pre>
            <div className="mt-3"><button onClick={()=>navigator.clipboard.writeText(result)} className="px-3 py-2 border rounded">Copiar</button></div>
          </div>
        )}
      </div>
    </div>
  )
}
