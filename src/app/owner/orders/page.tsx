// app/owner/orders/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { AiOutlineLoading3Quarters, AiOutlineSync } from 'react-icons/ai'

type Order = {
  id: string
  code: string
  createdAt: string
  customerName: string
  total: number
  status: 'pending' | 'confirmed' | 'collected' | 'cancelled'
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    code: '123456',
    createdAt: '2025-05-01T12:00:00Z',
    customerName: 'Алексей Иванов',
    total: 1500,
    status: 'pending',
  },
  {
    id: 'ORD-002',
    code: '234567',
    createdAt: '2025-05-02T14:30:00Z',
    customerName: 'Мария Петрова',
    total: 800,
    status: 'confirmed',
  },
  {
    id: 'ORD-003',
    code: '345678',
    createdAt: '2025-05-03T09:15:00Z',
    customerName: 'John Smith',
    total: 1200,
    status: 'collected',
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [codeInput, setCodeInput] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Load mock data on mount
  useEffect(() => {
    setOrders(mockOrders)
  }, [])

  // Simulated refresh
  const fetchOrders = async () => {
    setRefreshing(true)
    // simulate network delay
    await new Promise((r) => setTimeout(r, 500))
    setOrders(mockOrders)
    setRefreshing(false)
  }

  // Partition orders
  const currentOrders = orders.filter((o) => o.status !== 'collected')
  const pastOrders = orders.filter((o) => o.status === 'collected')

  // Simulated confirm by code
  const handleConfirm = () => {
    if (!codeInput.trim()) {
      setMessage('Введите код заказа')
      return
    }
    setLoading(true)
    setMessage(null)

    setTimeout(() => {
      const idx = orders.findIndex((o) => o.code === codeInput.trim())
      if (idx === -1) {
        setMessage('Код не найден')
      } else {
        setMessage('✅ Заказ подтверждён')
        // move to collected
        const updated = [...orders]
        updated[idx].status = 'collected'
        setOrders(updated)
      }
      setCodeInput('')
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header + Refresh */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-800">Управление заказами</h1>
          <button
            onClick={fetchOrders}
            disabled={refreshing}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
          >
            <AiOutlineSync className={refreshing ? 'animate-spin' : ''} />
            <span>Обновить</span>
          </button>
        </div>

        {/* Confirm-by-code card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Подтвердить заказ по коду</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              type="text"
              placeholder="6-значный код"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.replace(/\D/, ''))}
              maxLength={6}
              className="w-48 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
            >
              {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
              <span>Подтвердить</span>
            </button>
          </div>
          {message && <p className="mt-3 text-sm text-red-600">{message}</p>}
        </div>

        {/* Orders Tables */}
        <div className="grid gap-8">
          {/* Current Orders */}
          <section className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">Текущие заказы</h3>
            </div>
            {currentOrders.length === 0 ? (
              <p className="p-6 text-center text-gray-500">Нет новых заказов.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">ID</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Дата</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Клиент</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Сумма</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((o) => (
                    <tr key={o.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{o.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{o.customerName}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {o.total.toLocaleString()} ₸
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={o.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Past Orders */}
          <section className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">Архив заказов</h3>
            </div>
            {pastOrders.length === 0 ? (
              <p className="p-6 text-center text-gray-500">Выполненных заказов ещё нет.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">ID</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Дата</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Клиент</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {pastOrders.map((o) => (
                    <tr key={o.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{o.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{o.customerName}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {o.total.toLocaleString()} ₸
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

// Status badge component
function StatusBadge({ status }: { status: Order['status'] }) {
  const map = {
    pending: { label: 'В ожидании', bg: 'bg-yellow-100', text: 'text-yellow-800' },
    confirmed: { label: 'Подтверждён', bg: 'bg-green-100', text: 'text-green-800' },
    collected: { label: 'Выдан', bg: 'bg-green-100', text: 'text-green-800' },
    cancelled: { label: 'Отменён', bg: 'bg-red-100', text: 'text-red-800' },
  } as const

  const { label, bg, text } = map[status]
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
      {label}
    </span>
  )
}
