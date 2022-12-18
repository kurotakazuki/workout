import { createSignal, onMount } from 'solid-js'
import { Site } from '@src/models/sites'
import { Work } from '@src/models/works'
import SiteList from './SiteList'
import HistoryList from './HistoryList'
import Card from '@src/components/Card'

export const [getBlockedSites, setBlockedSites] = createSignal<Site[]>([])
export const [getWorks, setWorks] = createSignal<Work[]>([])

const Options = () => {
  const [getBlockSiteUrl, setBlockSiteUrl] = createSignal<string>('')

  const handleChange = (event: Event): void => {
    if (!(event.target instanceof HTMLInputElement)) {
      return
    }
    setBlockSiteUrl(event.target.value as string)
  }

  onMount(() => {
    chrome.storage.local.get(
      'blockedSites',
      ({ blockedSites }: { blockedSites: Site[] }) => {
        if (blockedSites) {
          setBlockedSites(blockedSites)
        }
      }
    )
  })

  const toggleWorking = () => {
    chrome.storage.local.get('working', ({ working }: { working: boolean }) => {
      working = !working
      chrome.storage.local.set({ working })
      alert(working)
    })
  }

  const addBlockSite = () => {
    try {
      new URL(getBlockSiteUrl())
      const siteUrl = getBlockSiteUrl()

      if (siteUrl != '') {
        chrome.storage.local.get(
          'blockedSites',
          ({ blockedSites }: { blockedSites: Site[] }) => {
            const site: Site = {
              name: siteUrl.replace('https://', '').replace('.com', ''),
              url: siteUrl,
            }
            if (blockedSites === undefined) {
              blockedSites = [site]
            } else {
              blockedSites.push(site)
            }
            // update sites
            chrome.storage.local.set({ blockedSites })
            setBlockedSites(blockedSites)
          }
        )
      }
    } catch (err) {
      alert('不正なURL')
    }
  }

  return (
    <div class="flex flex-col gap-4 m-4">
      <Card>
        <button class="p-2 bg-blue-600 text-white" onClick={toggleWorking}>
          作業中
        </button>
      </Card>
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
        <SiteList sites={getBlockedSites()} />
      </Card>
      <Card>
        <HistoryList works={getWorks()} />
      </Card>
    </div>
  )
}

export default Options
