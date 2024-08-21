export interface Product {
  asin?: string
  category?: string
  name?: string
  description?: string
  price?: number
  rating?: number
  product_url?: string
  image_url?: string
  rating_count?: number
  review_count?: number
  stars?: ProductStar
  reviews?: ProductReview[]
  scraped_finished?: boolean
}

export interface ProductStar {
  five?: number
  four?: number
  three?: number
  two?: number
  one?: number
}

export interface ProductReview {
  customer_name?: string
  rating?: number
  reviewed_at?: string
  title?: string
  description?: string
  verified?: boolean
  help_count?: number
  attached_urls?: Array<string>
}
