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

            $ts(container).clear();

            this.sampleInfo = $from(raw)
                .GroupBy(g => g.sample_info)
                .ToDictionary(g => g.Key, g => g.ToArray(false));

            console.log(this.sampleInfo.Object);
        }

        private createContextMenu() {

        }
    }
}

