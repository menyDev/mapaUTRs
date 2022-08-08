"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
//importación de paquetes
const CONSTANTES = __importStar(require("../constantes"));
const node_fetch_1 = __importDefault(require("node-fetch"));
//decalaración de variables y constantes
//solicita valores de UTRs
function getUTRs() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 👇️ const response: Response
            const response = yield (0, node_fetch_1.default)(CONSTANTES.getUTRsURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            // 👇️ const result: GetUTRsResponse
            const result = (yield response.json());
            console.log('result is: ', JSON.stringify(result, null, 4));
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
                return error.message;
            }
            else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    });
}
// Initialize and add the map
function initMap() {
    // The location of parral
    const parral = { lat: CONSTANTES.latParral, lng: CONSTANTES.lonParral };
    // The map, centered at parral
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: parral,
    });
    getUTRs();
    // The marker, positioned en las utrs
    const marker = new google.maps.Marker({
        position: parral,
        map: map,
    });
}
if (typeof window !== 'undefined') {
    console.log('You are on the browser');
    window.initMap = initMap;
    // ✅ Can use window here
}
else {
    console.log('You are on the server');
    // ⛔️ Don't use window here
}
