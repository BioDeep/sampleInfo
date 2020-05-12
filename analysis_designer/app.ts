/// <reference path="../../../build/linq.d.ts" />

/// <reference path="html.ts" />
/// <reference path="css.ts" />

interface analysisDesign {
    groups: string[];
}

interface updateDesigns { (current: analysisDesign[]): void; }

$ts(biodeep.loadStyle);

/**
 * @param id the container id
*/
function loadDesigner(id: string, groups: string[], currentDesigns: analysisDesign[], handler: updateDesigns = null) {
    let labelContainer: IHTMLElement;
    let designContainer: IHTMLElement;

    $ts(id).clear().appendElement(biodeep.createUI(isNullOrUndefined(handler) ? DoNothing : handler));

    labelContainer = $ts("#all_groups");
    designContainer = $ts("#designs");

    for (let label of groups) {
        labelContainer.appendElement($ts("<div>", {
            class: ["widget_group"],
            "data-target": label
        }).display(label));
    }

    for (let design of currentDesigns) {

    }
}
