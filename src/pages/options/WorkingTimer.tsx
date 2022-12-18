import { createSignal, onCleanup, onMount } from 'solid-js'
import { Work, WorkString, worksFromStringObjects } from '@src/models/works'
import '@src/models/sites.ts'
import { createTimer } from '@solid-primitives/timer'
import { setWorks } from './Options'

const WorkingTimer = () => {
  onMount(() => {
    chrome.storage.local.get('working', ({ working }: { working: boolean }) => {
      working = false
      chrome.storage.local.set({ working })
    })
  })
  onCleanup(() => {
    chrome.storage.local.get('working', ({ working }: { working: boolean }) => {
      working = false
      chrome.storage.local.set({ working })
    })
  })

  // working time
  let [getCount, setCount] = createSignal<number>(0)
  const hour = () => Math.floor(getCount() / 3600)
  const min = () => Math.floor((getCount() % 3600) / 60)
  const sec = () => getCount() % 60

  // timer state
  const [getStart, setStart] = createSignal<Date>(new Date())
  const [getEnd, setEnd] = createSignal<Date>(new Date())
  // timer
  const callback = () => {
    setCount((prev) => prev + 1)
  }
  const [getPaused, setPaused] = createSignal(true)
  const [getDelay, setDelay] = createSignal(1000)
  createTimer(callback, () => !getPaused() && getDelay(), setTimeout)
  createTimer(callback, () => !getPaused() && getDelay(), setInterval)

  const togglePaused = () => {
    if (getPaused()) {
      // Paused
      // Start working
      chrome.storage.local.get(
        'working',
        ({ working }: { working: boolean }) => {
          working = true
          chrome.storage.local.set({ working })
          setPaused(false)
        }
      )
      setStart(new Date())
    } else {
      // Started
      // Start resting
      chrome.storage.local.get(
        'working',
        ({ working }: { working: boolean }) => {
          working = false
          chrome.storage.local.set({ working })
          setPaused(true)
        }
      )
      setEnd(new Date())
      // add Work
      if (getStart() && getEnd()) {
        chrome.storage.local.get(
          'workHistory',
          ({ workHistory }: { workHistory: WorkString[] }) => {
            const work: Work = {
              start: getStart(),
              end: getEnd(),
              content: getWorkContent(),
            }
            if (workHistory === undefined) {
              workHistory = [work]
            } else {
              workHistory.push({
                content: work.content,
                start: work.start.toISOString(),
                end: work.end.toISOString(),
              })
            }
            // update works
            chrome.storage.local.set({ workHistory })
            setWorks(worksFromStringObjects(workHistory))
          }
        )
      }
    }
  }

  // Work name
  const [getWorkContent, setWorkContent] = createSignal<string>('')
  const handleChange = (event: Event): void => {
    if (!(event.target instanceof HTMLInputElement)) {
      return
    }
    setWorkContent(event.target.value as string)
  }

  return (
    <div>
      <div>
        <input
          class="rounded-l-lg p-2 border-t mr-1 border-b border-l text-gray-800 border-gray-200 bg-white"
          placeholder="作業名"
          type="text"
          size="60"
          onChange={handleChange}
        />
      </div>
      <div>
        {hour()}:{min()}:{sec()}
      </div>
      <button onClick={togglePaused}>
        {getPaused() ? '休憩中' : '作業中'}
      </button>
    </div>
  )
}

export default WorkingTimer
