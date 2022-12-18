import { createSignal, createMemo, For, startTransition } from 'solid-js'
import { Work } from '@src/models/works'
import '@src/models/sites.ts'

const HistoryList = (props: { works: Work[] }) => {
  return (
    <div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-4 py-2">
              作業内容
            </th>
            <th scope="col" class="px-4 py-2">
              開始時刻
            </th>
            <th scope="col" class="px-4 py-2">
              終了時刻
            </th>
            <th scope="col" class="px-4 py-2">
              作業時間
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={props.works}>
            {(work: Work) => {
              const timeDiff = work.end.getTime() - work.start.getTime()
              // const sec = Math.floor(timeDiff / 1000) % 60
              // const min = Math.floor(timeDiff / 1000 / 60) % 60
              // const hours = Math.floor(timeDiff / 1000 / 60 / 60) % 24
              // const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24)
              const min = Math.floor(timeDiff / 1000 / 60)
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-4 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {work.content}
                  </th>
                  <td class="px-4 py-2">{work.start.toLocaleString('ja')}</td>
                  <td class="px-4 py-2">{work.end.toLocaleString('ja')}</td>
                  <td class="px-4 py-2">
                    {/* {days}日{hours}時間{min}分{sec}秒 */}
                    {min}分
                  </td>
                </tr>
              )
            }}
          </For>
        </tbody>
      </table>
    </div>
  )
}

export default HistoryList
