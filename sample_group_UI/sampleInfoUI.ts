
/**
 * UI class for create sample group information
*/
export class sampleInfo {

    private currentGroup: string = undefined;

    init() {
        let vm = this;

        $ts("#sample_groups").onChange = function (e) {
            vm.currentGroup = $ts.value("#sample_groups");
            TypeScript.logging.log(vm.currentGroup, TypeScript.ConsoleColors.Cyan);
        }
    }

}