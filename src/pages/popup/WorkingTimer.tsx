import { createSignal, createMemo } from 'solid-js'
import { Work } from '@src/models/works'
import '@src/models/sites.ts'
import { createTimer } from '@solid-primitives/timer'

const WorkingTimer = () => {
  const callback = () => {}
  const [paused, setPaused] = createSignal(false)
  const [delay, setDelay] = createSignal(1000)
  createTimer(callback, () => !paused() && delay(), setTimeout)
  createTimer(callback, () => !paused() && delay(), setInterval)
  // ...
  setDelay(500)
  // pause
  setPaused(true)
  // unpause
  setPaused(false)

  return (
    <div>
      <div>timer</div>
    </div>
  )
}

export default WorkingTimer
