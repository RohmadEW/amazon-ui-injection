import cssText from "data-text:~/contents/tailwind.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

import { Asin } from "./components/asin"
import { ReviewCount } from "./components/review_count"

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
          <Asin />
          <div>#2 In Cell Phone & Accessories</div>
          <div>
            #1 in <span className="text-blue-500">Cell Phone Basic Cases</span>
          </div>
        </div>
        <div className="p-4 w-6/12">
          <ReviewCount />
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
