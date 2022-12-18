import { createSignal, onMount } from 'solid-js'
import { Work } from '@src/models/works'
import Card from '@src/components/Card'

const OptionsPage = () => {
  chrome.tabs.create({ url: 'src/pages/options/index.html' }, (tab) => {})
}

const Popup = () => {
  return (
    <div class="flex flex-col gap-4 m-4">
      <Card>
        <button onClick={OptionsPage}>拡張機能オプション</button>
      </Card>
    </div>
  )
}

export default Popup
