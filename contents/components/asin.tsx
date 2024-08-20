import { useEffect, useState } from "react"

interface AsinProps {
  asin: string
  onChange: (asin: string) => void
}

export const Asin = ({ asin, onChange }: AsinProps) => {
  useEffect(() => {
    const asin = document.getElementById("asin") as HTMLInputElement
    onChange(asin.value)
  }, [])

  return <div className="font-bold mb-2">{asin}</div>
}
