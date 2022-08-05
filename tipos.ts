
export type UTR = {
    conexion_utr: string;
    esControlable: number;
    latitud: string;
    longitud: string;
    nameSensor0: string;
    nameSensor1: string
    nameSensor2: string
    swVersion: string;
    unidad0: string;
    unidad1: string;
    unidad2: string;
    utrGenericName: string;
    utrName: string;
};

//
export type GetUTRsResponse = {
    UTRs: UTR[];
};