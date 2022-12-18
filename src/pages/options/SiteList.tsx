import { Site } from '@src/models/sites'
import { For } from 'solid-js'
import { setBlockedSites } from './Options'

const SiteList = (props: { sites: Site[] }) => {
  const deleteBlockSite = (site: Site) => {
    chrome.storage.local.get(
      'blockedSites',
      ({ blockedSites }: { blockedSites: Site[] }) => {
        blockedSites = blockedSites.filter((currSite) => {
          if (currSite.url !== site.url) {
            return currSite
          }
        })
        chrome.storage.local.set({ blockedSites })
        setBlockedSites(blockedSites)
      }
    )
  }

  return (
    <div>
      <table class="list-table">
        <thead class="list-thead">
          <tr>
            <th scope="col" class="px-4 py-3">
              サイト名
            </th>
            <th scope="col" class="px-4 py-3">
              URL
            </th>
            <th scope="col" class="px-4 py-3">
              削除
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={props.sites}>
            {(site: Site, i) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-4 py-2">{site.name}</td>
                <td class="px-4 py-2">{site.url}</td>
                <td>
                  <span
                    class={
                      'material-symbols-outlined text-red-400 hover:text-red-600 rounded-full cursor-pointer'
                    }
                    onClick={() => deleteBlockSite(site)}
                  >
                    delete
                  </span>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

export default SiteList
