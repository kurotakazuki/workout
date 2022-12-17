import '@src/models/sites.ts'
import { children } from 'solid-js'
import '@src/index.css'

const Card = (props) => {
  const c = children(() => props.children)
  return <div class="px-4 py-6 rounded shadow-lg bg-white">{c()}</div>
}

export default Card
