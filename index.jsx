import { useState } from 'react'
import ToolCard from '../components/ToolCard'
import Captions from '../components/Captions'
import Names from '../components/Names'
import Descriptions from '../components/Descriptions'

export default function Home(){
  const [tool, setTool] = useState('legendas')
  return (
    <div className="min-h-screen">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Gênio IA</h1>
          <p className="text-sm text-gray-600 mt-1">Ferramentas de IA em português — sem rosto, só resultado.</p>
        </div>
        <div className="flex gap-3">
          <a className="px-4 py-2 bg-indigo-600 text-white rounded" href="#tools">Experimentar</a>
          <a className="px-4 py-2 border border-indigo-600 rounded" href="#pricing">Premium</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <section id="tools" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ToolCard title="Gerador de Legendas" desc="Legendas curtas para Instagram/Reels" active={tool==='legendas'} onClick={()=>setTool('legendas')} />
          <ToolCard title="Gerador de Nomes" desc="Nomes para lojas, produtos e marcas" active={tool==='nomes'} onClick={()=>setTool('nomes')} />
          <ToolCard title="Descrição para Loja" desc="Descrição otimizada para Shopee/Mercado Livre" active={tool==='descricao'} onClick={()=>setTool('descricao')} />
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          {tool==='legendas' && <Captions />}
          {tool==='nomes' && <Names />}
          {tool==='descricao' && <Descriptions />}
        </section>

        <section id="pricing" className="mt-10 bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold">Plano Premium</h3>
          <p className="mt-2 text-gray-600">R$9,90/mês — acessos ilimitados, sem anúncios e templates exclusivos.</p>
          <div className="mt-4 flex gap-3">
            <form action="/api/checkout" method="POST">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded">Assinar Premium</button>
            </form>
            <button className="px-4 py-2 border rounded">Mais tarde</button>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">© {new Date().getFullYear()} Gênio IA</footer>
      </main>
    </div>
  )
}
