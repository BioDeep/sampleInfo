namespace biodeep {

    export function loadStyle() {
        let css = $ts("<style>", { type: "style/css" });

        css.innerText = `.widget_group {
    border-radius: 5px;
    padding: 5px 30px 5px 20px;
    margin-bottom: 10px;
    margin-top: 10px;
    background-color: #1ea2e9;
    border: 1px solid #428bca;
    color: #ffffff;
    margin-right: 10px;
    float: left;
    cursor: pointer;
    position: relative;
}`;
        $ts("&head").appendElement(css);
    }
}