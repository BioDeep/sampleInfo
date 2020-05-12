namespace biodeep {

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
        shape1: "●",
        shape2: "■",
        shape3: "◆",
        shape4: "▲",
        shape5: "▼",
        shape6: "○",
        shape7: "□",
        shape8: "◇",
        shape9: "△",
        default: "▽"
    };

    export class metaEditor {

        public constructor(public sampleMeta: IsampleMeta[], div: string) {
            let table = $ts("<table>", { class: "table" });
            let header = $ts("<thead>").appendElement(
                $ts("<tr>")
                    .appendElement($ts("<th>").display("分组名称"))
                    .appendElement($ts("<th>").display("颜色"))
                    .appendElement($ts("<th>").display("形状"))
            );
            let body = $ts("<tbody>");
            let row: IHTMLElement;

            for (let meta of sampleMeta) {
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
                setValue(label, (<HTMLSelectElement><any>opt).value);
            },
            value: _default
        });

        for (let name in shapes) {
            opt.appendElement($ts("<option>", { value: name }).display(shapes[name]));
        }

        return opt;
    }

    function colorSetter(label: string, _default: string, setValue: Delegate.Sub) {
        let opt = $ts("<select>", {
            onchange: function () {
                setValue(label, (<HTMLSelectElement><any>opt).value);
            },
            value: _default
        });

        for (let color of colors) {
            opt.appendElement($ts("<option>", {
                value: color,
                style: `background-color: ${color};`
            }).display(color));
        }

        return opt;
    }
}