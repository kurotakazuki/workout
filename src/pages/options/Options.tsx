import { createSignal, onMount } from 'solid-js'
import { Site } from '@src/models/sites'
import { Work, WorkString, worksFromStringObjects } from '@src/models/works'
import SiteList from './SiteList'
import HistoryList from './HistoryList'
import WorkingTimer from './WorkingTimer'
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
    chrome.storage.local.get(
      'workHistory',
      ({ workHistory }: { workHistory: WorkString[] }) => {
        if (workHistory) {
          const mappedWorks: Work[] = worksFromStringObjects(workHistory)
          setWorks(mappedWorks)
          console.log(mappedWorks)
        }
      }
    )
  })

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
        <WorkingTimer />
      </Card>

      <Card>
        {/* <p>ブロック時間：</p> */}
        <div>
          <input
            class="rounded-l-lg p-2 border-t border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="ブロックサイトの追加"
            type="text"
            id="new-block-site"
            size="60"
            onChange={handleChange}
          />
          <button
            class="px-4 rounded-r-lg bg-blue-600  text-white font-bold py-2 uppercase border-blue-600 border-t border-b border-r"
            onClick={addBlockSite}
          >
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
