/// <reference path="../../../build/linq.d.ts" />

interface analysisDesign {
    groups: string[];
}

interface updateDesigns { (current: analysisDesign[]): void; }

/**
 * @param id the container id
*/
function loadDesigner(id: string, groups: string[], currentDesigns: analysisDesign[], handler: updateDesigns = null) {
    $ts(id).clear().appendElement(biodeep.createUI(isNullOrUndefined(handler) ? DoNothing : handler));

    for (let label of groups) {

    }

    for (let design of currentDesigns) {

    }
}
