// components/LeafletMap.tsx
'use client'
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface LeafletMapProps {
  lat: number
  lng: number
  logoUrl: string // URL of the company logo to use as marker icon
  companyName: string
}

export default function LeafletMap({ lat, lng, logoUrl, companyName }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize the map only on the client
    const map = L.map(mapRef.current).setView([lat, lng], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    // Create a custom icon using the company’s logo
    const companyIcon = L.icon({
      iconUrl: logoUrl,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -48],
    })

    // Add marker
    const marker = L.marker([lat, lng], { icon: companyIcon }).addTo(map)
    marker.bindPopup(`<strong>${companyName}</strong>`)

    return () => {
      map.remove() // clean up on unmount
    }
  }, [lat, lng, logoUrl, companyName])

  return <div ref={mapRef} style={{ width: '100%', height: '170%' }} />
}
