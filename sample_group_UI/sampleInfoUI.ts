namespace biodeep {

    /**
     * UI class for create sample group information
    */
    export class sampleInfo {

        private currentGroup: string = undefined;

        public constructor(public container: string) {
            $ts(container)
                .clear()
                .appendElement($ts("<div>").display($ts("<select>", { id: "sample_groups" })));
        }

        init() {
            let vm = this;

            $ts("#sample_groups").onchange = function (e) {
                vm.currentGroup = $ts.value("#sample_groups");
                TypeScript.logging.log(vm.currentGroup, TypeScript.ConsoleColors.Cyan);
            }
        }

    }
}

