namespace biodeep {

    export function createUI(handler: addDesign): HTMLElement {
        let all = $ts("<li>")
            .appendElement($ts("<h3>", { class: "cen" }).display("所有样本分组"))
            .appendElement($ts("<p>", { class: "attentionLis" }).display("按住Ctrl多选"))
            .appendElement($ts("<div>", { id: "all_groups" }));
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
        let designerList = $ts("<li>")
            .appendElement($ts("<h3>", { class: "cen" }).display("已选组别比对"))
            .appendElement($ts("<p>", { class: "attentionLis" }).display("拖动组内排序"))
            .appendElement($ts("<div>", { id: "designs" }));

        return $ts("<ul>", {
            class: "groupCount"
        })
            .appendElement(all)
            .appendElement(action)
            .appendElement(designerList);
    }

    function getDeisgnerLabels(): string[] {
        return $ts($ts("#all_groups").getElementsByTagName("div"))
            .Select(div => div.getAttribute("data-target"))
            .ToArray(false);
    }
}