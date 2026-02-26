'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Marker {
  id: number
  lat: number
  lng: number
  name: string
  value: number
  type: 'high' | 'medium' | 'low'
}

interface MapComponentProps {
  markers: Marker[]
}

export default function MapComponent({ markers }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView([-2.5, 118], 5)
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || !markers.length) return

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current?.removeLayer(layer)
      }
    })

    // Add markers
    markers.forEach((marker) => {
      const color = marker.type === 'high' ? '#ef4444' : marker.type === 'medium' ? '#f59e0b' : '#10b981'
      
      const customIcon = L.divIcon({
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [12, 12],
        className: 'custom-marker'
      })

      const leafletMarker = L.marker([marker.lat, marker.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div style="min-width: 150px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${marker.name}</h3>
            <p style="margin: 4px 0;">Aktivitas: <strong>${marker.value}</strong></p>
            <p style="margin: 4px 0;">Tingkat: <strong>${marker.type}</strong></p>
          </div>
        `)
    })
  }, [markers])

  return (
    <div 
      ref={mapRef} 
      style={{ height: '400px', width: '100%' }}
      className="rounded-lg overflow-hidden"
    />
  )
}