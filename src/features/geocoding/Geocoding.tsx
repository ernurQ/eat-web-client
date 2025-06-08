import { Map} from '@vis.gl/react-google-maps'

import { PoiMarkers } from './PoiMarker'

type MapTypes = {
	branchName: string
	branchLocation: string
	lat: number
	lng: number
}

export default function GoogleMap({ branchName, branchLocation, lat, lng }: MapTypes ) {
	return (
		<>
			<Map
				mapId='EATWEB_ID'
				defaultZoom={18}
				defaultCenter={{ lat, lng }}
				style={{ height: '500px', width: '100%' }}
			>
				{lat && lng && (
					<PoiMarkers
						poi={{
							key: `${branchName}, ${branchLocation}`,
							location: {
                lat, lng
              }
						}}
					/>
				)}
			</Map>
		</>
	)
}
