/// <reference path="../../../../typescripts/build/linq.d.ts" />


interface IsampleMeta {
    sampleInfo: string;
    shape: number;
    color: string;
}

interface saveAction {
    (meta: IsampleMeta[]): void;
}
