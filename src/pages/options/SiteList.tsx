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
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-1 py-3">
              ID
            </th>
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
                <td class="px-1 py-2">{i}</td>
                <td class="px-4 py-2">{site.name}</td>
                <td class="px-4 py-2">{site.url}</td>
                <td>
                  <span
                    class={'material-symbols-outlined hover:text-blue-600 rounded-full'}
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
