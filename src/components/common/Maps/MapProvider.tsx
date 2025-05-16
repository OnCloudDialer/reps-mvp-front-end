import { APIProvider } from '@vis.gl/react-google-maps'
import { Config } from '../../../config'
import React from 'react'

interface MapProviderProps {
    children: React.ReactNode
}

const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
    return (
        <APIProvider apiKey={Config.googleMapApiKey}>
            {children}
        </APIProvider>
    )
}

export default MapProvider