import { createSignal } from 'solid-js'
import '@src/models/sites.ts'
import HistoryList from './HistoryList'

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
    <div>
      <div>
        <form>
          <p>ブロック時間：</p>
          <p>
            ブロックサイトの追加:
            <input
              type="text"
              id="new-block-site"
              size="60"
              onChange={handleChange}
            />
          </p>
          <button type="submit" onClick={addBlockSite}>
            保存
          </button>
        </form>
      </div>
      <div>
        <h2>ブロックリスト</h2>
        <button type="submit" id="remove">
          削除
        </button>
      </div>
      m
      <div>
        <HistoryList />
      </div>
    </div>
  )
}

export default Options
