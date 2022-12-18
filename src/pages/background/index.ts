import { Site } from '@src/models/sites'
import { WorkString } from '@src/models/works'

// initialization
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(
    ['blockedSites', 'workHistory', 'working'],
    (local) => {
      if (local.blockedSites === undefined) {
        const blockedSites: Site[] = [
          {
            name: 'youtube',
            url: 'https://www.youtube.com/',
          },
        ]
        chrome.storage.local.set({ blockedSites })
      }
      if (local.workHistory === undefined) {
        const workHistory: WorkString[] = []
        chrome.storage.local.set({ workHistory })
      }
      if (local.working === undefined) {
        const working = false
        chrome.storage.local.set({ working })
      }
    }
  )
})

// onUpdated tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url: string = changeInfo.pendingUrl || changeInfo.url
  if (!url || !url.startsWith('http')) {
    return
  }

  chrome.storage.local.get(['blockedSites', 'working'], (local) => {
    const {
      blockedSites,
      working,
    }: { blockedSites: Site[]; working: boolean } = local
    if (
      working &&
      blockedSites.find((site) => {
        // const blockedHostname: string = new URL(site.url).hostname
        // return url.includes(blockedHostname)
        return url.includes(site.url)
      })
    ) {
      chrome.tabs.remove(tabId)
      // tab.mutedInfo = false
    }
  })
})

// changed storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    )

    // local
    // if (namespace === 'local') {
    //   // working
    //   if (key === 'working') {
    //     if (working) {
    //     } else {
    //     }
    //   }
    // }
  }
})

// alarm
// chrome.alarms.onAlarm.addListener((alarm) => {
//   chrome.storage.local.set({ working: false })
// })
