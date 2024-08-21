import { useEffect, useState } from "react"

import type { Product } from "~types/products"

interface AsinProps {
  product: Product
  onChange: (product: Product) => void
}

export const Asin = ({ product, onChange }: AsinProps) => {
  useEffect(() => {
    const asin = document.getElementById("asin") as HTMLInputElement
    onChange({ ...product, asin: asin?.value })
  }, [])

  return <div className="font-bold mb-2">{product.asin}</div>
}
