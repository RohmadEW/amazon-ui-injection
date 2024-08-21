import { useEffect, useState } from "react"

export const ProductDetailTitle = ({ product, onChange }) => {
  const [title, setTitle] = useState("")

  const getProductTitle = () => {
    const inputElement = document.querySelector(
      "input#productTitle"
    ) as HTMLInputElement

    onChange({ ...product, name: inputElement?.value })
    setTitle(inputElement?.value)
  }

  useEffect(() => {
    getProductTitle()
  }, [])

  return <h1 className="text-3xl font-bold mb-2">{title}</h1>
}
