/// <reference path="../../../../typescripts/build/linq.d.ts" />
/// <reference path="../../../uikit/build/uikit.fast_colorPicker.d.ts" />

interface IsampleMeta {
    sampleInfo: string;
    shape: number;
    color: string;
}

interface saveAction {
    (meta: IsampleMeta[]): void;
}
