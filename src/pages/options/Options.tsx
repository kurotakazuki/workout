import { createSignal } from 'solid-js'
import '@src/models/sites.ts'
import HistoryList from './HistoryList'
import Card from '@src/components/Card'

const Options = () => {
  const [getBlockSiteUrl, setBlockSiteUrl] = createSignal<string>('')
  const handleChange = (event: Event): void => {
    if (!(event.target instanceof HTMLInputElement)) {
      return
    }
    setBlockSiteUrl(event.target.value as string)
  }
  const addBlockSite = () => {
    // const siteUrl = getBlockSiteUrl()
    // if (siteUrl != '') {
    //   chrome.storage.local.get('blockedSites', ({ blockedSites: Sites[] }) => {
    //     blockedSites.push(siteUrl)
    //     chrome.storage.local.set({ blockedSites })
    //   })
    // }
  }

  return (
    <div class="flex flex-col gap-4 m-4">
      <Card>
        <p>ブロック時間：</p>
        <div>
          ブロックサイトの追加:
          <input
            type="text"
            id="new-block-site"
            size="60"
            onChange={handleChange}
          />
          <button class="p-2 bg-blue-600 text-white" onClick={addBlockSite}>
            保存
          </button>
        </div>
      </Card>
      <Card>
        <h2>ブロックリスト</h2>
        <div>{getBlockSiteUrl()}</div>
        <button type="submit" id="remove">
          削除
        </button>
      </Card>
      <div>
        <HistoryList />
      </div>
    </div>
  )
}

export default Options
