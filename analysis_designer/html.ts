namespace biodeep {

    export function createUI(handler: addDesign): HTMLElement {
        let all = $ts("<li>", { class: ["firstLi", "clearfix"] })
            .appendElement($ts("<h3>", { class: "cen" }).display("所有样本分组"))
            .appendElement($ts("<p>", { class: "attentionLis" }).display("单击选中，再次单击可以取消选择"))
            .appendElement($ts("<div>", { class: "clearfix", id: "all_groups" }));
        let action = $ts("<li>", { class: "groEnt" })
            .display($ts("<a>", {
                href: executeJavaScript,
                onclick: function () {
                    handler(getDeisgnerLabels());
                }
            }).display($ts("<i>", {
                class: ["fa", "fa-arrow-right"],
                "aria-hidden": true
            }))
            );
        let designerList = $ts("<li>", { class: "lastLi" })
            .appendElement($ts("<h3>", { class: "cen" }).display("已选组别比对"))
            .appendElement($ts("<p>", { class: "attentionLis" }).display("拖动组内排序"))
            .appendElement($ts("<div>", { class: "clearfix", id: "designs" }));

        return $ts("<ul>", {
            class: "groupCount"
        })
            .appendElement(all)
            .appendElement(action)
            .appendElement(designerList);
    }

    function getDeisgnerLabels(): string[] {
        return $ts($ts("#all_groups").getElementsByTagName("div"))
            .Where(div => div.classList.contains("ui-selected"))
            .Select(div => div.getAttribute("data-target"))
            .ToArray(false);
    }

    export function analysisDesignItem(labels: string[], container: HTMLElement, handleUpdate: Delegate.Action): HTMLElement {
        let designDiv = $ts("<div>", {
            class: ["samplegroup-div", "clearfix"],
            "data-target": JSON.stringify(labels)
        });
        let iscurrent = $ts("<div>", { class: "radio-iscurrent" });
        let ulDiv = $ts("<div>", { class: ["ui-sortable", "clearfix"] });
        let remove = $ts("<a>", {
            href: executeJavaScript
        }).display($ts("<i>", {
            class: ["fa", "fa-times"],
            style: "line-height: 52px;color:red;font-size: 20px;"
        }));

        remove.onclick = function () {
            container.removeChild(designDiv);
            handleUpdate();
        }
        
        for (let label of labels) {
            ulDiv.appendElement($ts("<div>", {
                class: ["widget_group", "ui-sortable-handle"],
                "data-target": label
            }).display(label));
        }
        ulDiv.appendChild(remove);

        return designDiv
            .appendElement(iscurrent)
            .appendElement(ulDiv)
            //.appendElement(remove);
    }
}