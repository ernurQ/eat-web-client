import {APIProvider} from "@vis.gl/react-google-maps"
import { PropsWithChildren } from "react"

export function GoogleMapProvider({ children }: PropsWithChildren) {
	return (
		<APIProvider apiKey="AIzaSyAMmMYfo-34daqd4hZhQoVZRKDf9lqlTrA" libraries={['places']}>
			{children}
		</APIProvider>
	)
}
