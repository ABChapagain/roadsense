'use client'
import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, InfoWindow, Polygon, useJsApiLoader } from '@react-google-maps/api'
import { isEqual } from 'lodash'
import Link from 'next/link'

const GoogleMapComponent = ({ height, width, markers, zoom, center }) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    })

    const [activeMarker, setActiveMarker] = useState(null)
    const [isInfoWindowOpen, setInfoWindowOpen] = useState(false)
    const [ready, setReady] = useState(false)


    const handleMarkerClick = (marker) => {
        setActiveMarker(marker)
        setInfoWindowOpen(true)
    }

    const handleInfoWindowClose = () => {
        setInfoWindowOpen(false)
    }



    if (!isLoaded) return null

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
                    // icon={{
                    //     url: marker.type === 'cctv' ? 'https://th.bing.com/th/id/R.77059caaecd260d193d21409d5148602?rik=CwRT2u759MWh5g&pid=ImgRaw&r=0' : 'https://th.bing.com/th/id/R.05b330f579076a516e78418dffbbabc8?rik=%2b3Ik4uesHwzlyA&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1942058.png&ehk=ZMwMjU45LQROwjqakvETqUqSVq65A0gNGYwNrPJ%2fCIk%3d&risl=&pid=ImgRaw&r=0',


                    // }}
                    onClick={() => handleMarkerClick(marker)}
                >
                    {isInfoWindowOpen && isEqual(marker, activeMarker) ? (
                        <InfoWindow onCloseClick={handleInfoWindowClose}>
                            <div className='flex flex-col font-bold gap-1 w-48'>
                                <Link
                                    href={`/city/${activeMarker?.city}`}
                                    className='btn-link text-[11px]'
                                >
                                    {activeMarker?.city}
                                </Link>
                                <h3 className='text-[14px]'>{activeMarker?.city}</h3>

                                <p className='text-[11px]' key={marker.city}>
                                    {(!!marker?.ip) && marker.ip}
                                </p>

                                <Link
                                    href={`https://www.google.com/maps/search/?api=1&query=${marker.position.lat},${marker.position.lng}`}
                                    target='_blank'
                                    className='text-[11px] text-blue-600 hover:btn-link'
                                >
                                    Open with Google Maps
                                </Link>
                            </div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))
            }
        </GoogleMap >
    )
}

export default GoogleMapComponent