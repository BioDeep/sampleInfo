namespace biodeep.ui {

    export function doStyle() {
        $ts("head")
            .appendElement($ts("<style>").display("background-color: lightBlue;"));
    }
}