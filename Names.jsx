import { useState } from 'react'
export default function Names(){
  const [input,setInput]=useState('loja de roupa fitness')
  const [out,setOut]=useState('')
  const [loading,setLoading]=useState(false)
  async function run(e){
    e.preventDefault(); setLoading(true); setOut('')
    try{ const res = await fetch('/api/gen',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tool:'names',prompt:input})}); const data = await res.json(); setOut(data.text||'') }catch(err){ setOut('Erro: '+err.message)} setLoading(false)
  }
  return (
    <div>
      <h3 className="text-lg font-semibold">Gerador de Nomes</h3>
      <p className="text-sm text-gray-600 mt-1">Digite o nicho ou produto e receba várias opções.</p>
      <form className="mt-3" onSubmit={run}>
        <input value={input} onChange={e=>setInput(e.target.value)} className="w-full p-2 border rounded" />
        <div className="mt-3"><button className="px-4 py-2 bg-indigo-600 text-white rounded">Gerar nomes</button></div>
      </form>
      <div className="mt-3 text-sm text-gray-700">{loading? 'Gerando...': out}</div>
    </div>
  )
}
