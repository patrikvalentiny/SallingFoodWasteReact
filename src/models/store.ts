export interface Store {
  address?: Address
  brand?: string
  coordinates?: number[]
  hours?: Hour[]
  name: string
  id: string
  type?: string
}

export interface Address {
  city: string
  country: string
  extra: unknown
  street: string
  zip: string
}

export interface Hour {
  date: string
  type: string
  open: string
  close: string
  closed: boolean
  customerFlow: number[]
}
