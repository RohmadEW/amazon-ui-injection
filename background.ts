import { RuntimeType } from "~types/runtime_types"

export {}

console.log("Background script is running")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === RuntimeType.CONTENT_SCRIPT) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, request, (response) =>
        sendResponse(response)
      )
    })
  }
})
