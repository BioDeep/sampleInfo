/// <reference path="../../../uikit/build/uikit.colorPicker.d.ts" />

namespace biodeep {

    /**
     * 预设的颜色
    */
    const colors: string[] = [
        "#ee3333",   // red
        "#3366aa",   // blue
        "#009872",   // green
        "#982187",   // purple
        "#faa200",   // yellow
        "#267aa4",   // teal
        "#910000",   // maroon
        "#b56cfe",   // violet
        "#00b7ec",   // cyan
        "#f36a18",   // orange
        "#534731",   // brown
        "#fdb5da",   // pink
        "#064650",   // bluegreen
        "#b5dafe",   // sky
        "#000000"
    ];
    const shapes: {} = {
        shape21: "●",
        shape22: "■",
        shape23: "◆",
        shape24: "▲",
        shape25: "▼",
        shape1: "○",
        shape0: "□",
        shape5: "◇",
        shape2: "△",
        shape6: "▽"
    };

    export class metaEditor {

        public constructor(public sampleMeta: IsampleMeta[], div: string) {
            let table: IHTMLElement = $ts("<table>", { class: "table" });
            let header = $ts("<thead>").appendElement(
                $ts("<tr>")
                    .appendElement($ts("<th>").display("分组名称"))
                    .appendElement($ts("<th>").display("颜色"))
                    .appendElement($ts("<th>").display("形状"))
            );
            let body = $ts("<tbody>");
            let row: IHTMLElement;

            for (let meta of sampleMeta) {
                if (Strings.Empty(meta.color, true)) {
                    meta.color = "ee3333";
                }
                if (Strings.Empty(`${meta.shape}`, true)) {
                    meta.shape = 0;
                }

                row = $ts("<tr>");
                row.appendElement($ts("<td>").display(meta.sampleInfo));
                row.appendElement($ts("<td>").display(colorSetter(meta.sampleInfo, meta.color, <any>((label, value) => this.colorSetter(label, value)))));
                row.appendElement($ts("<td>").display(shapeSetter(meta.sampleInfo, <any>meta.shape, <any>((label, value) => this.shapeSetter(label, value)))));

                body.appendElement(row);
            }

            table.appendElement(header).appendElement(body);

            $ts(div).clear().appendElement(table);
        }

        shapeSetter(label: string, value: string) {
            $from(this.sampleMeta).Where(a => a.sampleInfo == label).First.shape = <any>value;
        }

        colorSetter(label: string, value: string) {
            $from(this.sampleMeta).Where(a => a.sampleInfo == label).First.color = value;
        }
    }

    function shapeSetter(label: string, _default: string, setValue: Delegate.Sub) {
        let opt = $ts("<select>", {
            onchange: function () {
                let strVal: string = (<HTMLSelectElement><any>opt).value;

                strVal = strVal.match(/\d+/g)[0];
                setValue(label, strVal);
            }
        });
        let index = 0;
        let i = 0;

        _default = Strings.Empty(_default, true) ? "shape0" : ("shape" + _default);

        for (let name in shapes) {
            opt.appendElement($ts("<option>", { value: name }).display(shapes[name]));

            if (name == _default) {
                index = i;
            } else {
                ++i;
            }
        }

        let reset: Delegate.Action = function () {
            (<HTMLSelectElement><any>opt).selectedIndex = index;
        }

        reset();
        resetActions.push(reset);

        return opt;
    }

    let current: HTMLSelectElement;
    let currentSetVal: Delegate.Sub;
    let currentLabel: string;
    let currentMoreOpt: HTMLElement;

    function colorSetter(label: string, _default: string, setValue: Delegate.Sub) {
        // 选择更多颜色
        let setMore = function () {
            current = <any>opt;
            currentSetVal = setValue;
            currentLabel = label;
            currentMoreOpt = MoreOpt;

            setMoreColors();
        }
        let MoreOpt = $ts("<option>", {
            value: "more",
            style: "background-color: white;",
            onclick: setMore
        }).display("选择更多颜色...");

        let opt = $ts("<select>", {
            onchange: function () {
                let colorVal: string = (<HTMLSelectElement><any>opt).value;

                if (colorVal != "more") {
                    opt.style.backgroundColor = colorVal;
                    setValue(label, colorVal.substr(1));
                } else {
                    setMore();
                }
            }
        });

        let index = 0;
        let i = 0;

        _default = Strings.Empty(_default, true) ? "#ee3333" : ("#" + _default);

        for (let color of colors) {
            opt.appendElement($ts("<option>", {
                value: color,
                style: `background-color: ${color};`
            }).display(color));

            if (color == _default) {
                index = i;
            } else {
                ++i;
            }
        }

        let reset: Delegate.Action = function () {
            (<HTMLSelectElement><any>opt).selectedIndex = index;
            opt.style.backgroundColor = _default;
        }

        reset();
        resetActions.push(reset);
        opt.appendElement(MoreOpt);

        return opt;
    }

    let resetActions: Delegate.Action[] = [];

    export function reset() {
        for (let action of resetActions) {
            action();
        }
    }

    export function setColorValue(color: TypeScript.ColorManager.w3color) {
        let colorStr: string = color.toHexString()

        current.style.backgroundColor = colorStr;
        current.value = colorStr;
        currentSetVal(currentLabel, colorStr.substr(1));
        currentMoreOpt.style.backgroundColor = colorStr;
        currentMoreOpt.innerHTML = colorStr + " [重新选择颜色]";

        console.log(colorStr);
    }

    function setMoreColors() {
        console.log("设置更多的颜色");

        $ts("#colorBox").show()
        $ts("#pca2d-settings-panel").show();
    }
}