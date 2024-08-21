import { useEffect, useState } from "react"

import type { Product } from "~types/products"

interface ScrapeReviewsMainProps {
  product: Product
}

export const ScrapeReviewsMain = ({ product }: ScrapeReviewsMainProps) => {
  const asin = product.asin
  const [totalReviews, setTotalReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [reviewsCount, setReviewsCount] = useState(0)
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [msgFromServer, setMsgFromServer] = useState(null)

  useEffect(() => {
    const fetchReviewsCount = async () => {
      try {
        setLoading(true)
        const url = `https://www.amazon.com/product-reviews/${asin}/ref=cm_cr_getr_d_paging_btm_next_3?ie=UTF8&reviewerType=all_reviews&sortBy=recent&pageNumber${page}&pageNumber=${page}`
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
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchReviewsCount()
  }, [asin])

  useEffect(() => {
    const sendReviewToServer = async (reviewData) => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/scraping/insert_reviews",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              asin: asin,
              reviews: reviewData
            })
          }
        )

        if (res.ok) {
          const data = await res.json()
          setMsgFromServer(data.message)
        }

        // if (!res.ok) {
        //   throw new Error("Failed to send reviews to server")
        // }
      } catch (err) {
        // setError(err.message)
      }
    }

    const fetchReviews = async () => {
      try {
        setLoading(true)
        const totalPages = Math.ceil(reviewsCount / 10)

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          const url = `https://www.amazon.com/product-reviews/${asin}/ref=cm_cr_getr_d_paging_btm_next_3?ie=UTF8&reviewerType=all_reviews&sortBy=recent&pageNumber${currentPage}&pageNumber=${currentPage}`
          const res = await fetch(url)
          const html = await res.text()

          const parser = new DOMParser()
          const doc = parser.parseFromString(html, "text/html")

          const reviews = Array.from(
            doc.querySelectorAll(".a-section.review.aok-relative")
          )

          const reviewData = reviews.map((review) => {
            const rating = (review.querySelector(".a-icon-alt") as HTMLElement)
              ?.innerText
            const title = (review.querySelector(".review-title") as HTMLElement)
              ?.innerText
            const date = (review.querySelector(".review-date") as HTMLElement)
              ?.innerText
            const customer_review = (
              review.querySelector(".review-text") as HTMLElement
            )?.innerText
            const verified = review.querySelector(".a-declarative")
              ? true
              : false
            const name = (
              review.querySelector(".a-profile-name") as HTMLElement
            )?.innerText

            return {
              rating: rating?.trim(),
              title_review: title?.trim(),
              date: date?.trim(),
              customer_review: customer_review
                ?.trim()
                .startsWith("The media could not be loaded.")
                ? "No Media"
                : customer_review?.trim(),
              verified: verified,
              customer_name: name?.trim()
            }
          })

          setTotalReviews((prevReviews) => [...prevReviews, ...reviewData])
          sendReviewToServer(reviewData)
        }

        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    if (reviewsCount > 0) {
      fetchReviews()
    }
  }, [asin, reviewsCount])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
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
                <h2 className="card-title">{review.title_review}</h2>
                <p>{review.customer_review}</p>
                <p className="text-sm text-gray-500">
                  <em>{review.date}</em> by {review.customer_name} -{" "}
                  {review.rating} -{" "}
                  {review.verified ? "Verified Purchase" : "Unverified"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
