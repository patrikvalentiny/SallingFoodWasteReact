export interface Clearance {
  offer: Offer
  product: Product
}

export interface Offer {
  currency: string
  discount: number
  ean: string
  endTime: string
  lastUpdate: string
  newPrice: number
  originalPrice: number
  percentDiscount: number
  startTime: string
  stock: number
  stockUnit: string
}

export interface Product {
  categories: Categories
  description: string
  ean: string
  image?: string
}

export interface Categories {
  da?: string
  en?: string
}
