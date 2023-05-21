import React from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
    return (
        <Map center={{ lat: 37.05683, lng: 127.05995 }}
            style={{ width: "500px", height: "500px" }}>
            <MapMarker position={{ lat: 37.05683, lng: 127.05995 }}>
                <div style={{ color: "#000" }}>Fitness Basic</div>
            </MapMarker>
        </Map>
    );
};

export default KakaoMap;