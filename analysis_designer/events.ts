namespace biodeep.UI_events {

    export function handlerEvent(handler: updateDesigns): addDesign {
        handler = isNullOrUndefined(handler) ? DoNothing : handler;

        return function (labels) {

        }
    }

    export function doLabeler(label: string): HTMLElement {
        let labelDiv: IHTMLElement = $ts("<div>", {
            class: ["widget_group"],
            "data-target": label
        }).display(label);

        labelDiv.onclick = function () {
            if (labelDiv.classList.contains("ui-selected")) {
                labelDiv.classList.remove("ui-selected");
            } else {
                labelDiv.classList.add("ui-selected");
            }
        }

        return labelDiv;
    }

    export function getCurrentDesigns(): analysisDesign[] {
        return $ts($ts("#designs").getElementsByTagName("div"))
            .Select(a => getDesign(a))
            .ToArray(false);
    }

    function getDesign(label: HTMLElement): analysisDesign {
        let labels: string[] = JSON.parse(label.getAttribute("data"));

        return <analysisDesign>{
            groups: labels
        }
    }
}