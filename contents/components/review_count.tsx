import { useEffect, useState } from "react"

export const ReviewCount = () => {
  const [reviewCount, setReviewCount] = useState<string>("")

  useEffect(() => {
    const reviewCountText = document.getElementById(
      "acrCustomerReviewText"
    ) as HTMLSpanElement
    setReviewCount(reviewCountText.innerText.split(" ")[0].replace(",", ""))
  }, [])

  return <div className="font-bold mb-2">Reviews {reviewCount}</div>
}
