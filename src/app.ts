/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
//importación de paquetes
import * as CONSTANTES from '../constantes';
import fetch from 'node-fetch';
import * as TIPOS from '../tipos';

//decalaración de variables y constantes



//solicita valores de UTRs
async function getUTRs() {
    try {
        // 👇️ const response: Response
        const response = await fetch(CONSTANTES.getUTRsURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        // 👇️ const result: GetUTRsResponse
        const result = (await response.json()) as TIPOS.GetUTRsResponse;

        console.log('result is: ', JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

// Initialize and add the map
function initMap(): void {
    // The location of parral
    const parral = { lat: CONSTANTES.latParral, lng: CONSTANTES.lonParral};
    // The map, centered at parral
    const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
            zoom: 13,
            center: parral,
        }
    );

    getUTRs();
    // The marker, positioned en las utrs
    const marker = new google.maps.Marker({
        position: parral,
        map: map,
    });
}

declare global {
    interface Window {
        initMap: () => void;
    }
}

if (typeof window !== 'undefined') {
    console.log('You are on the browser')
    window.initMap = initMap;
    // ✅ Can use window here
  } else {
    console.log('You are on the server')
    // ⛔️ Don't use window here
  }



export { };