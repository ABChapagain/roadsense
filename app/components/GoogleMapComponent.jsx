'use client'
import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, InfoWindow, Polygon } from '@react-google-maps/api'
import { isEqual } from 'lodash'
import Link from 'next/link'

const GoogleMapComponent = ({ height, width, markers, zoom, center }) => {
    const [activeMarker, setActiveMarker] = useState(null)
    const [isInfoWindowOpen, setInfoWindowOpen] = useState(false)

    console.log(markers)


    const handleMarkerClick = (marker) => {
        setActiveMarker(marker)
        setInfoWindowOpen(true)
    }

    const handleInfoWindowClose = () => {
        setInfoWindowOpen(false)
    }

    return (
        <GoogleMap
            mapContainerStyle={{ height, width }}
            center={center}
            zoom={zoom}
        >
            {markers?.map((marker, index) => (
                <Marker
                    key={`${marker.title}-${index}`}
                    title={marker.title}
                    position={marker.position}
                    onClick={() => handleMarkerClick(marker)}
                >
                    {isInfoWindowOpen && isEqual(marker, activeMarker) ? (
                        <InfoWindow onCloseClick={handleInfoWindowClose}>
                            <div className='flex flex-col font-bold gap-1 w-48'>
                                <Link
                                    href={`/alerts/${activeMarker?.id}`}
                                    className='btn-link text-[11px]'
                                >
                                    {activeMarker?.hazard}
                                </Link>
                                <h3 className='text-[14px]'>{activeMarker?.title}</h3>
                                {activeMarker?.address.split(',').map((add) => (
                                    <p className='text-[11px]' key={add}>
                                        {add}
                                    </p>
                                ))}
                                <Link
                                    href={marker.link}
                                    target='_blank'
                                    className='text-[11px] text-blue-600 hover:btn-link'
                                >
                                    Open with Google Maps
                                </Link>
                            </div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    )
}

export default GoogleMapComponent