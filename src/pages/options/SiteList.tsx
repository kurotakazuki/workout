import { Site } from '@src/models/sites'
import { For } from 'solid-js'
import { setBlockedSites } from './Options'

const SiteList = (props: { sites: Site[] }) => {
  const deleteBlockSite = (site: Site) => {
      chrome.storage.local.get(
        'blockedSites',
        ({ blockedSites }: { blockedSites: Site[] }) => {
          blockedSites = blockedSites.filter((currSite) => {
            if (currSite !== site) {
              return currSite
            }
          })
        }
      )
      chrome.storage.local.set({ blockedSites })
      setBlockedSites(blockedSites)
  }
  
  return (
    <div>
      <table class="table table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>サイト名</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.sites}>
            {(site: Site, i) => (
              <tr>
                <td>{i}</td>
                <td>{site.name}</td>
                <td>{site.url}</td>
                <button
                  class="p-2 bg-blue-600 text-white"
                  onClick={()=>deleteBlockSite(site)}
                >
                  削除
                </button>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

export default SiteList
