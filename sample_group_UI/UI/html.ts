namespace biodeep {

    /**
     * UI class for create sample group information
    */
    export class sampleInfo {

        private sampleInfo: Dictionary<HTMLTableRowElement[]>;
        private tableTitles: string[];

        public get model(): IsampleInfo[] {
            let vm = this;

            return this.sampleInfo.Values
                .Unlist(a => a)
                .Select(function (tr) {
                    let sample: IsampleInfo = <IsampleInfo>{};
                    let cells = tr.getElementsByTagName("td");

                    for (let title of vm.tableTitles) {
                        sample[title] = cells.item(vm.tableTitles.indexOf(title)).innerText;
                    }

                    return sample;
                }).ToArray(false);
        }

        public get csv(): string {
            let table: IsampleInfo[] = this.model;
            let text: string = biodeep.as_tabular(table);

            return text;
        }

        public constructor(public container: string, sampleNames: string[]) {
            let raw = biodeep.buildModels(biodeep.guess_groupInfo(sampleNames));

            $ts(container).clear();
            $ts(container).appendElement(sampleInfo.createContextMenu());
            $ts(container).appendElement(sampleInfo.createSampleInfotable(raw));

            this.init();
            this.sampleInfo = new Dictionary<HTMLTableRowElement[]>({});

            let index: number = this.tableTitles.indexOf("sample_info");

            for (let sample_group of $ts(this.trs).GroupBy(tr => tr.cells.item(index).innerText).ToArray(false)) {
                this.sampleInfo.Add(sample_group.Key, sample_group.ToArray(false));
            }
        }

        private lastSelectedRow: HTMLTableRowElement;
        private trs: HTMLCollectionOf<HTMLTableRowElement>;

        public editMode: boolean = true;

        /**
         * hook events
        */
        private init() {
            let vm = this;

            // disable text selection
            document.onselectstart = function () {
                return !vm.editMode;
            }

            this.trs = (<HTMLTableElement>$ts("#sampleinfo").any)
                .tBodies[0]
                .getElementsByTagName("tr");
            this.tableTitles = $ts(
                (<HTMLTableElement>$ts("#sampleinfo").any)
                    .tHead
                    .getElementsByTagName("th")
            )
                .Select(th => th.innerText)
                .ToArray(false);

            $ts(this.trs).ForEach(tr => tr.onmousedown = function () {
                vm.RowClick(tr, false);
                vm.editMode = true;
            })

            this.registerContextMenu();
        }

        private registerContextMenu() {
            let menuDisplayed = false;
            let menuBox: HTMLElement = null;
            let vm = this;

            window.addEventListener("contextmenu", function () {
                if (vm.editMode) {
                    let left = arguments[0].clientX;
                    let top = arguments[0].clientY;

                    menuBox = window.document.querySelector(".menu");
                    menuBox.style.left = left + "px";
                    menuBox.style.top = top + "px";
                    menuBox.style.display = "block";

                    arguments[0].preventDefault();

                    menuDisplayed = true;
                }
            }, false);

            window.addEventListener("click", function () {
                if (menuDisplayed == true) {
                    menuBox.style.display = "none";
                }
            }, true);

            $ts("#add-group").onclick = function () {
                vm.buildSampleInfo();
            }
            $ts("#exit-edit-mode").onclick = function () {
                vm.editMode = false;
            }
        }

        private buildSampleInfo() {
            let selects = $ts.select(".selected");
            let vm = this;

            $('#myModal').modal();
            $ts("#group_checked").onclick = function () {
                let name: string = $ts.value("#sample-groupName");
                let index: number = vm.tableTitles.indexOf("sample_info");

                for (let tr of selects.ToArray(false)) {
                    tr.getElementsByTagName("td").item(index).innerText = name;
                }

                vm.sampleInfo.Delete(name);
                vm.sampleInfo.Add(name, <any>selects.ToArray(false));
            }
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
                tr = this.trs[i];

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
            return $ts.evalHTML.table(model, null, { id: "sampleinfo", class: ["sampleinfo", "table"] });
        }

        private static createContextMenu(): HTMLElement {
            let div = $ts("<div>", { id: "context", class: "menu" });

            div.appendElement($ts("<div>", { class: "menu-item", id: "add-group" }).display("添加样本分组"));
            div.appendElement($ts("<div>", { class: "menu-item", id: "exit-edit-mode" }).display("退出编辑模式"));

            return div;
        }
    }
}

