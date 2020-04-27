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

    export function guess_groupInfo(sampleNames: string[] | IEnumerator<string>): NamedValue<string[]>[] {
        if (!Array.isArray(sampleNames)) {
            sampleNames = (<IEnumerator<string>>sampleNames).ToArray();
        }

        let common: string[];
        let column: string[];
        let unique: string[];
        let matrix: string[][] = $from(sampleNames).Select(s => <string[]>Strings.ToCharArray(s, false)).ToArray(false);
        let minLen: number = $from(matrix).Min(s => s.length).length;

        for (let i = 0; i < minLen; i++) {
            column = [];

            for (let name of matrix) {
                column.push(name[i]);
            }

            unique = $from(column).Distinct().ToArray(false);

            if (unique.length == 1) {
                common.push(unique[0]);
            } else {
                
            }
        }
    }
}

