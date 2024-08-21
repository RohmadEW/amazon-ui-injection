import { useAtom } from "jotai"
import { useEffect, useState } from "react"

import { productAtom } from "~store/products"
import type { Product, ProductStar } from "~types/products"

export const ProductDetailMain = () => {
  const [product, setProduct] = useAtom(productAtom)

  const getAsin = () => {
    const element = document.querySelector("input#asin") as HTMLInputElement

    if (element) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        asin: element.value
      }))
    }
  }

  const getName = () => {
    const element = document.querySelector(
      "input#productTitle"
    ) as HTMLInputElement

    if (element) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        name: element.value
      }))
    }
  }

  const getCategory = () => {
    const element = document.querySelector(
      "input#productCategory"
    ) as HTMLInputElement

    if (element) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: element.value
      }))
    }
  }

  const getDescription = () => {
    const element = document.querySelector(
      "div#productDescription"
    ) as HTMLDivElement

    if (element) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        description: element.textContent?.trim() || ""
      }))
    } else {
      const xpathResult = document.evaluate(
        "//h2[text()='Product Description']/following-sibling::div[1]/*[not(self::style or self::script)]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      )

      const nodes = []
      for (let i = 0; i < xpathResult.snapshotLength; i++) {
        nodes.push(xpathResult.snapshotItem(i))
      }

      const tempDoc = document.implementation.createHTMLDocument("temp")

      const cleanTextArray = nodes.map((node) => {
        const html = node.outerHTML
        tempDoc.body.innerHTML = html
        tempDoc.querySelectorAll("script, style").forEach((el) => el.remove())

        return tempDoc.body.textContent?.trim() || ""
      })

      const description = cleanTextArray.filter((text) => text).join(" ")

      setProduct((prevProduct) => ({
        ...prevProduct,
        description: description
      }))
    }
  }

  const getImageUrl = () => {
    const element = document.querySelector(
      "input#productImageUrl"
    ) as HTMLInputElement

    if (element) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image_url: element.value
      }))
    }
  }

  const getPrice = () => {
    const element = document.querySelector(
      "input#priceValue"
    ) as HTMLInputElement

    if (element) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        price: parseFloat(element.value)
      }))
    }
  }

  const getRating = () => {
    const element = document.querySelector(
      "span#acrPopover .a-size-base.a-color-base"
    ) as HTMLSpanElement

    if (element) {
      const rating = element.textContent?.trim()
      setProduct((prevProduct) => ({
        ...prevProduct,
        rating: parseFloat(rating)
      }))
    }
  }

  const getRatingCount = () => {
    const element = document.querySelector(
      "span#acrCustomerReviewText"
    ) as HTMLSpanElement

    if (element) {
      const ratingCount = element.innerText.split(" ")[0].replace(",", "")
      setProduct((prevProduct) => ({
        ...prevProduct,
        rating_count: parseInt(ratingCount)
      }))
    }
  }

  const getStars = () => {
    const productStars: ProductStar = {}

    const starRatings: { [key: string]: string } = {
      five: "a[href*='filterByStar=five_star']",
      four: "a[href*='filterByStar=four_star']",
      three: "a[href*='filterByStar=three_star']",
      two: "a[href*='filterByStar=two_star']",
      one: "a[href*='filterByStar=one_star']"
    }

    Object.keys(starRatings).forEach((key, index) => {
      const starElement = document.querySelector(
        starRatings[key]
      ) as HTMLAnchorElement

      if (starElement) {
        const extractContent = starElement.textContent.split(" star")
        if (extractContent.length > 1) {
          const percentageExtract =
            extractContent[extractContent.length - 1].split("%")
          try {
            const percentage = percentageExtract[index]
            productStars[key as keyof ProductStar] = parseInt(percentage)
          } catch (error) {
            console.error(error)
          }
        }
      }
    })

    setProduct((prevProduct) => ({
      ...prevProduct,
      stars: productStars
    }))
  }

  const getProductURL = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      product_url: window.location.href
    }))
  }

  useEffect(() => {
    getAsin()
    getName()
    getCategory()
    getDescription()
    getPrice()
    getStars()
    getRating()
    getImageUrl()
    getRatingCount()
    getProductURL()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{product.name}</h1>
      <div className="mb-4">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-48 h-48 object-cover"
        />
      </div>
      <div className="mb-4">
        <span className="font-bold">ASIN: </span>
        <span>{product.asin}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Price: </span>
        <span>{product.price}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Rating: </span>
        <span>{product.rating}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Star: </span>
        <span className="flex items-center gap-4">
          <span>5: {product.stars?.five}%</span>
          <span>4: {product.stars?.four}%</span>
          <span>3: {product.stars?.three}%</span>
          <span>2: {product.stars?.two}%</span>
          <span>1: {product.stars?.one}%</span>
        </span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Rating Count: </span>
        <span>{product.rating_count}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Review Count: </span>
        <span>{product.review_count}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Category: </span>
        <span>{product.category}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Product URL: </span>
        <span>{product.product_url}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Image URL: </span>
        <span>{product.image_url}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Description: </span>
        <span>{product.description}</span>
      </div>
    </div>
  )
}
