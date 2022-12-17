import { Site } from '@src/models/sites'
import { Work } from '@src/models/works'

// initialization
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['blockedSites', 'working'], (local) => {
    if (local.blockedSites === undefined) {
      const blockedSites: Site[] = [
        {
          name: 'youtube',
          url: 'https://www.youtube.com/',
        },
      ]
      chrome.storage.local.set({ blockedSites })
    }
    if (local.working === undefined) {
      const working = false
      chrome.storage.local.set({ working })
    }
  })
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
      //   tab.mutedInfo = true
      //   console.log('blocked site')
      //   chrome.windows.get(tab.windowId, (win) => {
      //     if (win.confirm('このサイトは現在閲覧できません。\n削除しますか？')) {
      //       chrome.tabs.remove(tabId)
      //     }
      //   })
    }
  })
})
// alarm
// chrome.alarms.onAlarm.addListener((alarm) => {
//   chrome.storage.local.set({ working: false })
// })
