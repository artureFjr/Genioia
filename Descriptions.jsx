import { useState } from 'react'
export default function Descriptions(){
  const [input,setInput]=useState('Tênis de vôlei masculino tamanho 44, respirável e leve')
  const [out,setOut]=useState('')
  const [loading,setLoading]=useState(false)
  async function go(e){
    e.preventDefault(); setLoading(true); setOut('')
    try{ const res = await fetch('/api/gen',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tool:'description',prompt:input})}); const data = await res.json(); setOut(data.text||'') }catch(err){ setOut('Erro: '+err.message)} setLoading(false)
  }
  return (
    <div>
      <h3 className="text-lg font-semibold">Descrição para Loja</h3>
      <p className="text-sm text-gray-600 mt-1">Digite o produto e gere uma descrição persuasiva pronta para marketplaces.</p>
      <form className="mt-3" onSubmit={go}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} rows={3} className="w-full p-2 border rounded" />
        <div className="mt-3"><button className="px-4 py-2 bg-indigo-600 text-white rounded">Gerar descrição</button></div>
      </form>
      <div className="mt-3 text-sm text-gray-700">{loading? 'Gerando...': out}</div>
    </div>
  )
}
