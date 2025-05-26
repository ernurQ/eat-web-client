'use client'

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  KeyboardEvent
} from 'react'
import Image from 'next/image'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Swal from 'sweetalert2'
import { useQueryClient } from '@tanstack/react-query'
import { Product } from '@/entities/products'

interface CartItem {
  id: string
  name: string
  thumbnail: string
  price: number
  quantity: number
}

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState(0)

  // localStorage helpers
  const getCart = useCallback(() => {
    if (typeof window === 'undefined') return [] as CartItem[]
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]
    } catch {
      return []
    }
  }, [])

  const updateCart = useCallback(
    (cart: CartItem[]) => {
      if (typeof window === 'undefined') return
      localStorage.setItem('cart', JSON.stringify(cart))
      queryClient.invalidateQueries('cart')
    },
    [queryClient]
  )

  // load initial
  useEffect(() => {
    if (typeof window === 'undefined') return
    const existing = getCart().find(i => i.id === product.id)
    if (existing) setQuantity(existing.quantity)
  }, [getCart, product.id])

  // close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // cart actions
  const handleFirstAdd = () => {
    if (quantity > 0) return
    const cart = getCart()
    cart.push({
      id: product.id,
      name: product.name,
      thumbnail: product.thumbnail,
      price: product.discountedPrice ?? product.price,
      quantity: 1
    })
    updateCart(cart)
    setQuantity(1)
  }
  const handleIncrement = () => {
    if (quantity >= product.maxQuantity) return
    const cart = getCart()
    const idx = cart.findIndex(i => i.id === product.id)
    if (idx >= 0) {
      cart[idx].quantity++
      setQuantity(cart[idx].quantity)
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        thumbnail: product.thumbnail,
        price: product.discountedPrice ?? product.price,
        quantity: 1
      })
      setQuantity(1)
    }
    updateCart(cart)
  }
  const handleDecrement = () => {
    const cart = getCart()
    const idx = cart.findIndex(i => i.id === product.id)
    if (idx < 0) return
    if (cart[idx].quantity > 1) {
      cart[idx].quantity--
      setQuantity(cart[idx].quantity)
    } else {
      cart.splice(idx, 1)
      setQuantity(0)
    }
    updateCart(cart)
  }
  const handleFinal = () => {
    Swal.fire({
      icon: 'success',
      title: 'Товар добавлен в корзину!',
      showConfirmButton: false,
      timer: 1500
    })
    onClose()
  }

  // formatters
  const formattedDate = useMemo(() => {
    try {
      return new Date(product.expirationDate).toLocaleDateString('ru-RU', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    } catch {
      return product.expirationDate
    }
  }, [product.expirationDate])

  const totalPrice = useMemo(() => {
    return (
      ((product.discountedPrice ?? product.price) * quantity)
        .toLocaleString('ru-RU') + ' ₸'
    )
  }, [product.discountedPrice, product.price, quantity])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh] w-full max-w-5xl flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
          aria-label="Close"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left: image + info */}
          <div className="md:w-1/2 p-6 space-y-6">
            <div className="relative w-full h-64">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-green-700 font-semibold">{product.department.name}</p>
            <p className="text-gray-700">{product.description}</p>

            <div className="space-y-4">
              {quantity === 0 ? (
                <button
                  onClick={handleFirstAdd}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded"
                >
                  Добавить в корзину
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleDecrement}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    −
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.maxQuantity}
                    className={`px-3 py-1 rounded ${
                      quantity >= product.maxQuantity
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    }`}
                  >
                    +
                  </button>
                  <button
                    onClick={handleFinal}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
                  >
                    Оплатить
                  </button>
                </div>
              )}
              <p className="font-semibold">Общая сумма: {totalPrice}</p>
              <p className="text-sm text-gray-600">Оставшееся количество: {product.maxQuantity}</p>
              <p className="text-sm text-gray-600">Истекает в: {formattedDate}</p>
              <p>
                <span className="font-semibold">Состав:</span> {product.composition}
              </p>
            </div>
          </div>

          {/* Right: Map */}
          <div className="md:w-1/2 p-6 h-96">
            <CustomMap product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Map component (named export) ---
interface CustomMapProps {
  product: Product
}

export function CustomMap({ product }: CustomMapProps) {
  const companyIcon = useMemo(
    () =>
      L.icon({
        iconUrl: product.department.logo,
        iconSize:    [48, 48],
        iconAnchor:  [24, 48],
        popupAnchor: [0, -48],
      }),
    [product.department.logo]
  )

  return (
    <MapContainer
      center={[product.location.lat, product.location.lng]}
      zoom={13}
      style={{ width: '100%', height: '175%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={[product.location.lat, product.location.lng]}
        icon={companyIcon}
      >
        <Popup>{product.department.name}</Popup>
      </Marker>
    </MapContainer>
  )
}
