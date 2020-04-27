namespace biodeep {

    export interface IsampleInfo {

        /**
         * the unique id
        */
        ID: string;
        /**
         * the display title of the sample
        */
        sample_name: string;
        /**
         * the sample group name
        */
        sample_info: string;
        /**
         * injection order in LC-MS experiment, used for batch normalization only
        */
        injectionOrder: number;
        /**
         * the LC-MS experiment batch number
        */
        batch: number;
        sample_info1?: string;
        sample_info2?: string;
        color: string;
        color1?: string;
        color2?: string;

        shape: number;
        shape1?: number;
        shape2?: number;

        delete?: string;
    }

    export function as_tabular(sampleInfo: IsampleInfo[] | IEnumerator<IsampleInfo>): string {
        return $ts.csv.toText(sampleInfo, false);
    }

    export function buildModels(guessInfo: NamedValue<string[]>[]): IsampleInfo[] {
        let data: IsampleInfo[] = [];

        for (let group of guessInfo) {
            for (let label of group.value) {
                data.push(<IsampleInfo>{
                    ID: label,
                    sample_name: label,
                    sample_info: group.name,
                    injectionOrder: 0,
                    batch: 0,
                    color: "000000",
                    shape: 19
                });
            }
        }

        return data;
    }

    export function guess_groupInfo(sampleNames: string[] | IEnumerator<string>): NamedValue<string[]>[] {
        if (!Array.isArray(sampleNames)) {
            sampleNames = (<IEnumerator<string>>sampleNames).ToArray();
        }

        let common: string[];
        let column: string[];
        let unique: string[];
        let matrix: string[][] = $from(sampleNames).Select(s => <string[]>Strings.ToCharArray(s, false)).ToArray(false);
        let minLen: number = $from(matrix).Min(s => s.length).length;
        let groups: NamedValue<string[]>[] = [];

        for (let i = 0; i < minLen; i++) {
            column = [];

            for (let name of matrix) {
                column.push(name[i]);
            }

            unique = $from(column).Distinct().ToArray(false);

            if (unique.length == 1) {
                common.push(unique[0]);
            } else {
                for (let start of unique) {
                    let index = $from(column).Select(c => c == start).ToArray(false);
                    let part = $from(matrix).subset(index);
                    let newCommon: string[] = [...common];

                    newCommon.push(start);

                    for (let group of splitOfGroupLabels(newCommon, i, part.ToArray(false))) {
                        groups.push(group);
                    }
                }

                break;
            }
        }

        return groups;
    }

    /**
     * move to next untile get next different character 
    */
    function splitOfGroupLabels(common: string[], i: number, matrix: string[][]): NamedValue<string[]>[] {
        let minLen: number = $from(matrix).Min(s => s.length).length;
        let column: string[];
        let unique: string[];
        let groups: NamedValue<string[]>[] = [];

        for (; i < minLen; i++) {
            column = [];

            for (let name of matrix) {
                column.push(name[i]);
            }

            unique = $from(column).Distinct().ToArray(false);

            if (unique.length == 1) {
                common.push(unique[0]);
            } else {
                for (let start of unique) {
                    let index = $from(column).Select(c => c == start).ToArray(false);
                    let labels = $from(matrix).subset(index).Select(s => s.join("")).ToArray(false);
                    let groupName: string = common.join("") + start;

                    groups.push(new NamedValue<string[]>(groupName, labels));
                }

                break;
            }
        }

        return groups;
    }
}

