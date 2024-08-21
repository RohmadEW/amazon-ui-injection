import { atom } from "jotai"

import type { Product } from "~types/products"

const productAtom = atom<Product>({})

export { productAtom }
