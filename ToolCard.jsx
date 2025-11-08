export default function ToolCard({title,desc,active,onClick}){
  return (
    <div onClick={onClick} className={`p-5 rounded-lg bg-white shadow ${active? 'border-2 border-indigo-500':''} cursor-pointer`}>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
      <div className="mt-4"><button className="px-3 py-2 bg-indigo-600 text-white rounded">Usar</button></div>
    </div>
  )
}
