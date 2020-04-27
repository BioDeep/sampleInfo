namespace biodeep {

    /**
     * UI class for create sample group information
    */
    export class sampleInfo {

        private sampleInfo: Dictionary<IsampleInfo[]>;

        public get model(): IsampleInfo[] {
            return this.sampleInfo.Values.Unlist(a => a).ToArray(false);
        }

        public get csv(): string {
            let table: IsampleInfo[] = this.model;
            let text: string = biodeep.as_tabular(table);

            return text;
        }

        public constructor(public container: string, sampleNames: string[]) {
            let raw = biodeep.buildModels(biodeep.guess_groupInfo(sampleNames));

            this.sampleInfo = $from(raw)
                .GroupBy(g => g.sample_info)
                .ToDictionary(g => g.Key, g => g.ToArray(false));

            $ts(container).clear();
            $ts(container).appendElement(sampleInfo.createContextMenu());
            $ts(container).appendElement(sampleInfo.createSampleInfotable(this.model));

            console.log(this.sampleInfo.Object);

            this.init();
        }

        private lastSelectedRow: HTMLTableRowElement;
        private trs: HTMLCollectionOf<HTMLTableRowElement>;

        /**
         * hook events
        */
        private init() {
            let vm = this;

            // disable text selection
            document.onselectstart = function () {
                return false;
            }

            this.trs = (<HTMLTableElement>$ts("#sampleinfo").any)
                .tBodies[0]
                .getElementsByTagName("tr");

            $ts(this.trs).ForEach(tr => tr.onmousedown = function () {
                vm.RowClick(tr, false);
            })

            this.registerContextMenu();

            biodeep.ui.doStyle();
        }

        private registerContextMenu() {
            let menuDisplayed = false;
            let menuBox = null;

            window.addEventListener("contextmenu", function () {
                let left = arguments[0].clientX;
                let top = arguments[0].clientY;

                menuBox = window.document.querySelector(".menu");
                menuBox.style.left = left + "px";
                menuBox.style.top = top + "px";
                menuBox.style.display = "block";

                arguments[0].preventDefault();

                menuDisplayed = true;
            }, false);

            window.addEventListener("click", function () {
                if (menuDisplayed == true) {
                    menuBox.style.display = "none";
                }
            }, true);
        }

        RowClick(currenttr: HTMLTableRowElement, lock: boolean) {
            if ((<any>window.event).ctrlKey) {
                this.toggleRow(currenttr);
            }

            if ((<any>window.event).button === 0) {
                if (!(<any>window.event).ctrlKey && !(<any>window.event).shiftKey) {
                    this.clearAll();
                    this.toggleRow(currenttr);
                }

                if ((<any>window.event).shiftKey) {
                    this.selectRowsBetweenIndexes([this.lastSelectedRow.rowIndex, currenttr.rowIndex])
                }
            }
        }

        toggleRow(row: HTMLTableRowElement) {
            if (row.classList.contains("selected")) {
                row.classList.remove('selected');
            } else {
                row.classList.add('selected');
            }

            this.lastSelectedRow = row;
        }

        selectRowsBetweenIndexes(indexes: number[]) {
            let tr: HTMLTableRowElement

            indexes.sort(function (a, b) {
                return a - b;
            });

            for (var i = indexes[0]; i <= indexes[1]; i++) {
                tr = this.trs[i - 1];

                if (!isNullOrUndefined(tr)) {
                    tr.classList.add('selected');
                }
            }
        }

        clearAll() {
            for (var i = 0; i < this.trs.length; i++) {
                this.trs[i].classList.remove('selected');
            }
        }

        private static createSampleInfotable(model: biodeep.IsampleInfo[]): HTMLElement {
            return $ts.evalHTML.table(model, null, { id: "sampleinfo", class: "sampleinfo" });
        }

        private static createContextMenu(): HTMLElement {
            let div = $ts("<div>", { id: "context", class: "menu" });

            div.appendElement($ts("<div>", { class: "menu-item" }).display("添加样本分组"));
            div.appendElement($ts("<div>", { class: "menu-item" }).display("退出编辑模式"));

            return div;
        }
    }
}

