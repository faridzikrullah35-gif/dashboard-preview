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
  const mapInstanceRef = useRef<any>(null)
  const markerLayerRef = useRef<any>(null)
  const isMapInitializedRef = useRef<boolean>(false)

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || isMapInitializedRef.current) return

      const L = await import('leaflet')

      // Check if container already has a map instance
      if ((mapRef.current as any)._leaflet_id) {
        // Container already has a map, skip initialization
        return
      }

      const map = L.map(mapRef.current).setView([-2.5, 118], 5)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      // layerGroup untuk markers
      markerLayerRef.current = L.layerGroup().addTo(map)

      mapInstanceRef.current = map
      isMapInitializedRef.current = true
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        isMapInitializedRef.current = false
      }
    }
  }, [])

  useEffect(() => {
    const addMarkers = async () => {
      if (!mapInstanceRef.current || !markerLayerRef.current) return

      const L = await import('leaflet')

      // clear markers lama
      markerLayerRef.current.clearLayers()

      markers.forEach((marker) => {
        const color =
          marker.type === 'high'
            ? '#ef4444'
            : marker.type === 'medium'
            ? '#f59e0b'
            : '#10b981'

        const customIcon = L.divIcon({
          html: `<div style="
            background-color:${color};
            width:14px;
            height:14px;
            border-radius:50%;
            border:2px solid white;
          "></div>`,
          iconSize: [14, 14],
          className: ''
        })

        L.marker([marker.lat, marker.lng], { icon: customIcon })
          .bindPopup(
            `<strong>${marker.name}</strong><br/>Aktivitas: ${marker.value}`
          )
          .addTo(markerLayerRef.current)
      })
    }

    addMarkers()
  }, [markers])

  return (
    <div
      ref={mapRef}
      style={{ height: '400px', width: '100%' }}
      className="rounded-lg overflow-hidden"
    />
  )
}