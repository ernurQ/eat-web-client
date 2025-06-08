import { MarkerClusterer } from '@googlemaps/markerclusterer'
import type { Marker } from '@googlemaps/markerclusterer'
import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps'
import { useCallback, useEffect, useRef, useState } from 'react'

type Poi = { key: string; location: google.maps.LatLngLiteral }

const PoiMarker = (props: { poi: Poi }) => {
	const map = useMap()
	const [marker, setMarker] = useState<Marker | null>(null)
	const clusterer = useRef<MarkerClusterer | null>(null)

	useEffect(() => {
		if (!map) return
		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({ map })
		}
	}, [map])

	useEffect(() => {
		if (marker) {
			clusterer.current?.clearMarkers()
			clusterer.current?.addMarker(marker)
		}
	}, [marker])

	const handleClick = useCallback(
		(ev: google.maps.MapMouseEvent) => {
			if (!map || !ev.latLng) return
			map.panTo(ev.latLng)
			map.setZoom(20)
			console.log('marker clicked:', ev.latLng.toString())
		},
		[map]
	)

	return (
		<AdvancedMarker
			key={props.poi.key}
			position={props.poi.location}
			ref={(marker) => {
				if (marker) {
					setMarker(marker)
				}
			}}
			clickable={true}
			onClick={handleClick}
		>
			<Pin
				background='#fb2d04'
				glyphColor='#d8f37d'
				borderColor='#fb2d04'
			/>
		</AdvancedMarker>
	)
}

export { PoiMarker as PoiMarkers }
