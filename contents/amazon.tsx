import cssText from "data-text:~/contents/tailwind.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useEffect, useState } from "react"

import { RuntimeMessageAction } from "~types/runtime_types"

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.getElementById("dp-container"),
  insertPosition: "beforebegin"
})

export const getShadowHostId = () => "amazon-plasmo-id"

const PlasmoAmazon = () => {
  const [asin, setAsin] = useState<string>("")
  const [reviewCount, setReviewCount] = useState<number>(0)

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === RuntimeMessageAction.GET_ASIN) {
        setAsin(request.data.asin)
        sendResponse("Asin has been set")
      }

      if (request.action === RuntimeMessageAction.GET_REVIEW_COUNT) {
        setReviewCount(request.data.count)
        sendResponse("Review count has been set")
      }
    })
  }, [])

  return (
    <span className="w-full bg-gray-100 border border-gray-300 rounded-md mt-4">
      <div className="flex item-centers">
        <div className="p-4 border-r w-2/12">
          <div className="text-lg font">UI Injection for Amazon</div>
          <div className="flex item-centers gap-2">
            <button className="px-2 py-1 bg-blue-500">Sign Up</button>
            <button className="px-2 py-1 bg-white">Log In</button>
          </div>
        </div>
        <div className="p-4 border-r w-4/12">
          <div className="font-bold mb-2">{asin}</div>
          <div>#2 In Cell Phone & Accessories</div>
          <div>
            #1 in <span className="text-blue-500">Cell Phone Basic Cases</span>
          </div>
        </div>
        <div className="p-4 w-6/12">
          <div className="font-bold mb-2">Reviews {reviewCount}</div>
          <div className="flex flex-wrap item-centers gap-4">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md">
              Review Analysis
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md">
              Listing Optimization
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md">
              Q&A Analysis
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md">
              Market Insight
            </button>
            <button className="px-3 py-1 bg-white border border-blue-500 text-blue-500 rounded-md">
              Category Analysis
            </button>
            <button className="px-3 py-1 bg-white border border-blue-500 text-blue-500 rounded-md">
              Competitive Analysis
            </button>
            <button className="px-3 py-1 bg-white border border-blue-500 text-blue-500 rounded-md">
              Drill-Down Details
            </button>
            <button className="px-3 py-1 bg-white border border-blue-500 text-blue-500 rounded-md">
              Review Download
            </button>
          </div>
        </div>
      </div>
    </span>
  )
}

export default PlasmoAmazon
