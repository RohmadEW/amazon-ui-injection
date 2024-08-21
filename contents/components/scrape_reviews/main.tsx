import { useAtom, useAtomValue } from "jotai"
import { useEffect, useState } from "react"

import { productAtom } from "~store/products"
import type { ProductReview } from "~types/products"

export const ScrapeReviewsMain = () => {
  const [product, setProduct] = useAtom(productAtom)

  const [totalReviews, setTotalReviews] = useState<ProductReview[]>([])
  const [loading, setLoading] = useState(false)
  const [reviewsCount, setReviewsCount] = useState(0)
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [msgFromServer, setMsgFromServer] = useState(null)

  useEffect(() => {
    const fetchReviewsCount = async () => {
      try {
        setLoading(true)
        const url = `https://www.amazon.com/product-reviews/${product.asin}/ref=cm_cr_getr_d_paging_btm_next_3?ie=UTF8&reviewerType=all_reviews&sortBy=recent&pageNumber${page}&pageNumber=${page}`
        const res = await fetch(url)
        const html = await res.text()

        const parser = new DOMParser()
        const doc = parser.parseFromString(html, "text/html")

        const tempRatingCount = (
          doc.querySelector(
            'div[data-hook="cr-filter-info-review-rating-count"]'
          ) as HTMLElement
        )?.innerText.trim()

        const count = parseInt(
          tempRatingCount
            ?.split("total ratings, ")
            .pop()
            ?.replace(/[^0-9]/g, "") ?? "0"
        )

        setReviewsCount(count)
        setProduct((prevProduct) => ({
          ...prevProduct,
          review_count: count
        }))
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchReviewsCount()
  }, [product.asin])

  const sendToServer = async (productData) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/scraping/insert_reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product: productData
        })
      })

      if (res.ok) {
        const data = await res.json()
        setMsgFromServer(data.message)
      }
    } catch (err) {
      setMsgFromServer(error.message)
    }
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const totalPages = Math.ceil(reviewsCount / 10)

        const currentTotalReviews: ProductReview[] = []
        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const url = `https://www.amazon.com/product-reviews/${product.asin}/ref=cm_cr_getr_d_paging_btm_next_3?ie=UTF8&reviewerType=all_reviews&sortBy=recent&pageNumber${currentPage}&pageNumber=${currentPage}`
          const res = await fetch(url)
          const html = await res.text()

          const parser = new DOMParser()
          const doc = parser.parseFromString(html, "text/html")

          const reviews = Array.from(
            doc.querySelectorAll(".a-section.review.aok-relative")
          )

          const reviewData = reviews.map((review) => {
            const currentProductReview: ProductReview = {}

            const name = review.querySelector(".a-profile-name") as HTMLElement
            if (name) {
              currentProductReview.customer_name = name.innerText.trim()
            }

            const rating = review.querySelector(".a-icon-alt") as HTMLElement
            if (rating) {
              currentProductReview.rating = parseFloat(
                rating.innerText.trim().split(" ")[0]
              )
            }

            const title = review.querySelector(".review-title") as HTMLElement
            if (title) {
              const titleSpan = title.innerText.trim().split("out of 5 stars")
              if (titleSpan.length > 1) {
                currentProductReview.title = titleSpan[1].trim()
              }
            }

            const date = review.querySelector(".review-date") as HTMLElement
            if (date) {
              currentProductReview.reviewed_at = date.innerText
                .trim()
                .split("on ")[1]
            }

            const customer_review = review.querySelector(
              ".review-text"
            ) as HTMLElement
            if (customer_review) {
              currentProductReview.description =
                customer_review.innerText.trim()
            }

            const verified = review.querySelector(".a-declarative")
              ? true
              : false
            currentProductReview.verified = verified

            const helpCountText = review.querySelector(
              "span.cr-vote-text"
            ) as HTMLElement
            if (helpCountText) {
              const helpCount = parseInt(
                helpCountText.innerText.trim().split(" ")[0]
              )
              if (helpCount) {
                currentProductReview.help_count = helpCount
              }
            }

            const images = review.querySelectorAll(
              "img.review-image-tile"
            ) as NodeListOf<HTMLImageElement>
            if (images) {
              const imageLinks = Array.from(images).map((img) => img.src)
              currentProductReview.attached_urls = imageLinks
            }

            return currentProductReview
          })

          currentTotalReviews.push(...reviewData)
          setTotalReviews(currentTotalReviews)
        }

        setProduct((prevProduct) => ({
          ...prevProduct,
          scraped_finished: true,
          reviews: currentTotalReviews
        }))

        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    if (reviewsCount > 0) {
      fetchReviews()
    }
  }, [product.asin, reviewsCount])

  useEffect(() => {
    if (product.scraped_finished) {
      sendToServer(product)
    }
  }, [product.scraped_finished])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4 mt-8">
        {loading && <div className="loading loading-spinner"></div>}
        <h1 className="text-2xl font-bold">
          Total Reviews: {totalReviews.length} ({reviewsCount})
        </h1>
      </div>
      {msgFromServer && (
        <div className="alert alert-success">{msgFromServer}</div>
      )}
      <div className="h-[500px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {totalReviews.map((review, index) => (
            <div key={index} className="card shadow-md bg-base-100">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-lg font-bold">{review.title}</h2>
                </div>
                <span className="text-sm text-gray-500">
                  {review.reviewed_at}
                </span>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-500 mr-auto">
                    {review.customer_name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {review.verified ? "Verified" : "Not Verified"}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-sm text-gray-500">
                    Rating: {review.rating}
                  </span>
                </div>
                <div className="mb-4">
                  <p>{review.description}</p>
                </div>
                <div className="mb-4">
                  {review.attached_urls?.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={review.title}
                      className="w-24 h-24 object-cover"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    Helpful: {review.help_count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
