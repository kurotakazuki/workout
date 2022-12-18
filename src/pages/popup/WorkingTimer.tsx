import { createSignal, createMemo } from 'solid-js'
import { Work } from '@src/models/works'
import '@src/models/sites.ts'
import { createTimer } from '@solid-primitives/timer'

const WorkingTimer = () => {
  // working time
  let [getCount, setCount] = createSignal<number>(0)
  const hour = () => Math.floor(getCount() / 3600)
  const min = () => Math.floor((getCount() % 3600) / 60)
  const sec = () => getCount() % 60

  const callback = () => {
    setCount((prev) => prev + 1)
  }
  const [getPaused, setPaused] = createSignal(true)
  const [getDelay, setDelay] = createSignal(1000)
  createTimer(callback, () => !getPaused() && getDelay(), setTimeout)
  createTimer(callback, () => !getPaused() && getDelay(), setInterval)

  const startWork = () => {
    chrome.storage.local.get('working', ({ working }: { working: boolean }) => {
      working = true
      chrome.storage.local.set({ working })
    })
    setPaused(false)
  }

  const togglePaused = () => {
    chrome.storage.local.get('working', ({ working }: { working: boolean }) => {
      working = getPaused()
      chrome.storage.local.set({ working })
      alert(working)
    })
    setPaused((prev) => !prev)
  }
  // // ...
  // setDelay(500)
  // // pause
  // setPaused(true)
  // // unpause
  // setPaused(false)

  return (
    <div>
      <div>{getCount()}</div>
      <div>
        {hour()}:{min()}:{sec()}
      </div>
      <button onClick={togglePaused}>
        {getPaused() ? '休憩中' : '作業中'}
      </button>
      <button onClick={startWork}>開始</button>
    </div>
  )
}

export default WorkingTimer
