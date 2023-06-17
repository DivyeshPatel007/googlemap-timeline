import React from 'react'
import GoogleMapReact from 'google-map-react'
import './Map.scss'

const Polyline = React.memo(({ path }) => {
    const renderPolylines = () => {
        return path.map((point, index) => (
            <polyline
                key={index}
                path={point}
                options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                }}
            />
        ));
    };

    return renderPolylines();
});

function Map() {
    let path = [
        { lat: 28.6138954, lng: 77.2090057 },
        { lat: 23.0216238, lng: 72.5797068 },
        { lat: 19.0785451, lng: 72.878176 },
    ];


    const handleApiLoaded = (map, maps) => {
        new maps.Polyline({
            path: path,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map,
        });
        path.map((x, i) => {
            if (i % 2 !== 0) {
                new maps.Marker({
                    position: x,
                    map: map,
                    options: {
                        icon: {
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: "blue",
                            fillOpacity: 1,
                            strokeWeight: 2,
                        },
                    },
                });
            } else {
                new maps.Marker({
                    position: x,
                    map: map,
                    options: {
                        icon: {
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: "red",
                            fillOpacity: 1,
                            strokeWeight: 2,
                        },
                    },
                });
            }
        });
    };
    const intitialcenter = { lat: 20.39012149793167, lng: 72.90738269251017 };

    return (
        <div className='map'>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyA5uemAs2WR9KQkdVReA9VRcaZ8jA6ZLAM"
                }}
                defaultCenter={intitialcenter}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}

            >

            </GoogleMapReact>

        </div>

    )
}

export default Map