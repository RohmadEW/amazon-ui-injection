import { useEffect, useState } from "react"

export const Asin = () => {
  const [asin, setAsin] = useState<string>("")

  useEffect(() => {
    const asin = document.getElementById("asin") as HTMLInputElement
    setAsin(asin.value)
  }, [])

  return <div className="font-bold mb-2">Review {asin}</div>
}
