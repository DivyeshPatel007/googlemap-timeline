import React, { useContext, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import './Map.scss'
import { MapContext } from '../../Context';

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

const Map = () => {
    const [distance, setDistance] = useState(0);
    const { userdata } = useContext(MapContext);
    console.log(userdata);

    let path = [{ lat: "", lng: "" }];
    let usrpath = userdata.map((d) => {
        // console.log("LOGGGING", d);
        return { lat: d.latitude, lng: d.longitude };
    });

    path = [].concat(usrpath);
    let count = 0;
    // let path = [
    //     { lat: 28.6138954, lng: 77.2090057 },
    //     { lat: 23.0216238, lng: 72.5797068 },
    //     { lat: 19.0785451, lng: 72.878176 },
    // ];
    // console.log("users path", path);



    // console.log("rnere");
    const handleApiLoaded = async (map, maps) => {
        console.log("in handleappiload");
        const directionsService = new maps.DirectionsService();
        const directionsRenderer = new maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: "#0000FF", // Set the desired color here
                strokeOpacity: 1.0,
                strokeWeight: 5,
            },
        });
        directionsRenderer.setMap(map);

        let origin, destination, tempwayp;
        let waypoints = [{ location: "", stopover: true }];

        const directionGenerator = async (origin, destination, waypoints) => {
            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    waypoints: waypoints,
                    optimizeWaypoints: true,
                    travelMode: maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                        console.log("resul", result);
                        const legs = result.routes[0].legs;
                        legs.forEach((leg) => {
                            count += leg.distance.value;
                        });

                        console.log("Distance: count:", count);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                    let count2 = count / 1000;
                    setDistance(count2);
                    console.log("count in ddirserv", count2);
                }
            );
        };
        let batchSize = 25;
        if (path.length < batchSize) {
            console.log("len is <25");
            let last = path[path.length - 1];
            origin = path[0];
            destination = last;
            tempwayp = path.slice(1, -1);
            waypoints = tempwayp.map((d) => {
                return { location: d };
            });
            await directionGenerator(origin, destination, waypoints);
            console.log("after diret", count);
        } else {
            console.log("Sorry : >25");
            tempwayp = path.slice(1, -1);
            waypoints = tempwayp.map((d) => {
                return { location: d };
            });
            const numBatches = Math.ceil(waypoints.length / batchSize);
            console.log("numb", numBatches);
            for (let i = 0; i < numBatches; i++) {
                const startIndex = i * batchSize;
                const endIndex = Math.min(startIndex + batchSize, waypoints.length);
                const pathBatch = waypoints.slice(startIndex, endIndex);
                let tempwaypBatch = pathBatch.slice(1, -1);
                let waypointsBatch = tempwaypBatch.map((d) => {
                    return { location: d };
                });
                await directionGenerator(
                    pathBatch[0],
                    pathBatch[pathBatch.length - 1],
                    waypointsBatch
                );
            }
        }

        // new maps.Polyline({
        //   path: path,
        //   strokeColor: "#FF0000",
        //   strokeOpacity: 1.0,
        //   strokeWeight: 2,
        //   map: map,
        // });
        console.log("patj", path);
        path.map((x) => {
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
        });
        //     new maps.Polyline({
        //         path: path,
        //         strokeColor: "#FF0000",
        //         strokeOpacity: 1.0,
        //         strokeWeight: 2,
        //         map: map,
        //     });
        //     path.map((x, i) => {
        //         if (i % 2 !== 0) {
        //             new maps.Marker({
        //                 position: x,
        //                 map: map,
        //                 options: {
        //                     icon: {
        //                         path: window.google.maps.SymbolPath.CIRCLE,
        //                         scale: 8,
        //                         fillColor: "blue",
        //                         fillOpacity: 1,
        //                         strokeWeight: 2,
        //                     },
        //                 },
        //             });
        //         } else {
        //             new maps.Marker({
        //                 position: x,
        //                 map: map,
        //                 options: {
        //                     icon: {
        //                         path: window.google.maps.SymbolPath.CIRCLE,
        //                         scale: 8,
        //                         fillColor: "red",
        //                         fillOpacity: 1,
        //                         strokeWeight: 2,
        //                     },
        //                 },
        //             });
        //         }
        //     });
    };
    const intitialcenter = { lat: 20.39012149793167, lng: 72.90738269251017 };

    return (
        <div className='map'>
            <div><h1>Distance : {distance}</h1></div>

            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyA5uemAs2WR9KQkdVReA9VRcaZ8jA6ZLAM"
                }}
                key={path}
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