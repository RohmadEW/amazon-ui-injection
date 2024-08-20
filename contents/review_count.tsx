import type { PlasmoCSConfig } from "plasmo"

import type { ReviewCountRuntimeMessage } from "~types/review_count"
import { RuntimeMessageAction, RuntimeType } from "~types/runtime_types"

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*"]
}

window.addEventListener("load", () => {
  const reviewCountText = document.getElementById(
    "acrCustomerReviewText"
  ) as HTMLInputElement
  const reviewCount = parseInt(
    reviewCountText.innerText.split(" ")[0].replace(",", "")
  )

  setTimeout(() => {
    chrome.runtime.sendMessage(
      {
        type: RuntimeType.CONTENT_SCRIPT,
        action: RuntimeMessageAction.GET_REVIEW_COUNT,
        data: {
          count: reviewCount
        }
      } as ReviewCountRuntimeMessage,
      (msg) => {
        console.info(msg)
      }
    )
  }, 1000)
})
