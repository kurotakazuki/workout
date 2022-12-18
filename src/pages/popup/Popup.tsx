import { createSignal, onMount } from 'solid-js'
import { Work } from '@src/models/works'
import Card from '@src/components/Card'
import WorkingTimer from './WorkingTimer'

const Popup = () => {
  return (
    <div class="flex flex-col gap-4 m-4">
      <Card>
        <WorkingTimer />
      </Card>

      <Card>
        <a href="options.html">拡張機能オプション</a>
      </Card>
    </div>
  )
}

export default Popup
