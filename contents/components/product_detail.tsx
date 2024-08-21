import { useAtom } from "jotai"
import { useEffect, useState } from "react"

import { productAtom } from "~store/products"
import type { Product } from "~types/products"

import { ProductDetailTitle } from "./product_detail/title"

interface ProductDetailMainProps {
  product: Product
  onChange: (product: Product) => void
}

export const ProductDetailMain = () => {
  const [product, setProduct] = useAtom(productAtom)

  const getAsin = () => {
    const inputElement = document.querySelector(
      "input#asin"
    ) as HTMLInputElement
    setProduct({ ...product, asin: inputElement?.value })
  }

  const getCategory = () => {
    const ulElement = document.querySelector(
      "ul.a-unordered-list.a-horizontal.a-size-small"
    ) as HTMLUListElement

    if (ulElement) {
      const anchorElements = ulElement.querySelectorAll("a")
      const textArray = Array.from(anchorElements).map(
        (a) => a.textContent?.trim() || ""
      )
      const textWithCommas = textArray.join(", ")
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: textWithCommas
      }))
    }
  }

  useEffect(() => {
    getAsin()
    getCategory()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
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
        <span className="font-bold">Description: </span>
        <span>{product.description}</span>
      </div>
    </div>
  )
}
