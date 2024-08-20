import type { PlasmoCSConfig } from "plasmo"

import type { AsinRuntimeMessage } from "~types/asin"
import { RuntimeMessageAction, RuntimeType } from "~types/runtime_types"

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*"]
}

window.addEventListener("load", () => {
  const asin = document.getElementById("asin") as HTMLInputElement

  setTimeout(() => {
    chrome.runtime.sendMessage(
      {
        type: RuntimeType.CONTENT_SCRIPT,
        action: RuntimeMessageAction.GET_ASIN,
        data: {
          asin: asin.value
        }
      } as AsinRuntimeMessage,
      (msg) => {
        console.info(msg)
      }
    )
  }, 1000)
})
