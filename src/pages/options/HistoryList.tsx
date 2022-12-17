import { createSignal, createMemo, For, startTransition } from 'solid-js'
import { Work } from '@src/models/works'
import '@src/models/sites.ts'

const HistoryList = () => {
  const list: Work[] = [
    {
      start: new Date('December 17, 1995 03:24:00'),
      end: new Date('December 17, 1995 03:27:00'),
      content: 'sagyou1',
    },
    {
      start: new Date('December 18, 1995 03:24:00'),
      end: new Date('December 18, 1996 03:24:00'),
      content: 'sagyou2',
    },
  ]
  return (
    <div>
      <table class="table table-auto">
        <thead>
          <tr>
            <th>作業内容</th>
            <th>開始時刻</th>
            <th>終了時刻</th>
            <th>作業時間</th>
          </tr>
        </thead>
        <tbody>
          <For each={list}>
            {(list: Work) => {
              const timeDiff = list.end.getTime() - list.start.getTime()
              const sec = Math.floor(timeDiff / 1000) % 60
              const min = Math.floor(timeDiff / 1000 / 60) % 60
              const hours = Math.floor(timeDiff / 1000 / 60 / 60) % 24
              const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24)
              return (
                <tr>
                  <td>{list.content}</td>
                  <td>{list.start.toLocaleString('ja')}</td>
                  <td>{list.end.toLocaleString('ja')}</td>
                  <td>
                    {days}日{hours}時間{min}分{sec}秒
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
