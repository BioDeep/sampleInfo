namespace biodeep {

    export function createInputModal() {
        let modalDoc = $ts("<div>", {
            class: "modal-dialog",
            role: "document"
        }).display($ts("<div>", {
            class: "modal-content"
        }).display(`       
            <div class="modal-header">  
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
                    <span aria-hidden="true">×</span>  
                </button>  
                <h4 class="modal-title" id="myModalLabel">设置分组名称</h4>  
            </div>  
            <div class="modal-body">  
                <p><input id="sample-groupName" type="text" class="form-control" placeholder="请在这里输入样本分组名称"></input></p>  
            </div>  
            <div class="modal-footer">  
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
                <button id="group_checked" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>  
            </div>`));
        let modal = $ts("<div>", {
            class: ["modal", "fade"],
            id: "myModal",
            tabindex: -1,
            role: "dialog",
            "aria-labelledby": "myModalLabel"
        }).display(modalDoc);

        $ts("&body").appendElement(modal);
    }
}