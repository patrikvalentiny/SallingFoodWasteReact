export interface Store {
  id?: string;
  address?: Address;
  attributes?: Attributes;
  brand?: string;
  coordinates?: number[];
  created?: string;
  distance_km?: unknown;
  hours?: Hour[];
  modified?: string;
  name?: string;
  phoneNumber?: string;
  sapSiteId?: string;
  type?: string;
  vikingStoreId?: string;
}

export interface Address {
  city: string
  country: string
  extra: unknown
  street: string
  zip: string
}

export interface Attributes {
  bakery: boolean
  carlsJunior: boolean
  flowers: boolean
  garden: boolean
  nonFood: boolean
  parking?: boolean
  parkingRestrictions?: boolean
  petFood: boolean
  scanAndGo?: boolean
  smileyscheme?: string
  swipBox?: boolean
  wc: boolean
  wifi: boolean
}

export interface Hour {
  date: string
  type: string
  open?: string
  close?: string
  closed: boolean
  customerFlow?: number[]
}