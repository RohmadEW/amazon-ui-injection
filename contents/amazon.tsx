import cssText from "data-text:~style.css"
import { useAtomValue } from "jotai"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useState } from "react"

import { productAtom } from "~store/products"

import { ProductDetailMain } from "./components/product_detail"
import { ReviewAnalysisMain } from "./components/review_analysis/main"
import { ScrapeReviewsMain } from "./components/scrape_reviews/main"

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.getElementById("dp-container"),
  insertPosition: "beforebegin"
})

export const getShadowHostId = () => "amazon-plasmo-id"

const PlasmoAmazon = () => {
  const product = useAtomValue(productAtom)

  const [showReviewAnalysis, setShowReviewAnalysis] = useState(false)

  return (
    <div className="w-full border border-gray-300 rounded-md mt-4 mx-[20px]">
      <div className="bg-gray-100 border-t">
        <div className="flex item-centers divide-x">
          <div className="p-4 w-2/12">
            <div className="text-lg font">UI Injection for Amazon</div>
            <div className="flex item-centers gap-2">
              <button className="btn btn-sm btn-primary">Sign Up</button>
              <button className="btn btn-sm btn-outline btn-primary">
                Log In
              </button>
            </div>
          </div>
          <div className="p-4 w-4/12">
            <div className="font-bold mb-2">{product.asin}</div>
            <div>#2 In Cell Phone & Accessories</div>
            <div>
              #1 in{" "}
              <span className="text-blue-500">Cell Phone Basic Cases</span>
            </div>
          </div>
          <div className="p-4 w-6/12">
            <div className="font-bold mb-2">Reviews {product.review_count}</div>
            <div className="flex flex-wrap item-centers gap-4">
              <button
                className={`btn btn-sm font-normal ${showReviewAnalysis ? "btn-primary" : "bg-white border border-gray-300"}`}
                onClick={() => setShowReviewAnalysis(!showReviewAnalysis)}>
                Review Analysis
              </button>
              <button className="btn btn-sm font-normal bg-white border border-gray-300">
                Listing Optimization
              </button>
              <button className="btn btn-sm font-normal bg-white border border-gray-300">
                Q&A Analysis
              </button>
              <button className="btn btn-sm font-normal bg-white border border-gray-300">
                Market Insight
              </button>
              <button className="btn btn-sm font-normal bg-white border border-blue-500 text-blue-500">
                Category Analysis
              </button>
              <button className="btn btn-sm font-normal bg-white border border-blue-500 text-blue-500">
                Competitive Analysis
              </button>
              <button className="btn btn-sm font-normal bg-white border border-blue-500 text-blue-500">
                Drill-Down Details
              </button>
              <button className="btn btn-sm font-normal bg-white border border-blue-500 text-blue-500">
                Review Download
              </button>
            </div>
          </div>
        </div>
      </div>
      {showReviewAnalysis && <ReviewAnalysisMain />}
      <ProductDetailMain />
      {product.asin && <ScrapeReviewsMain />}
    </div>
  )
}

export default PlasmoAmazon
