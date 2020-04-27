namespace biodeep {

    export function createInputModal() {
        let modal = $ts("<div>", {
            class: ["modal", "fade"],
            id: "myModal",
            tabindex: -1,
            role: "dialog",
            "aria-labelledby": "myModalLabel"
        }).display(`		
    <div class="modal-dialog" role="document">  
        <div class="modal-content">  
            <div class="modal-header">  
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
                    <span aria-hidden="true">×</span>  
                </button>  
                <h4 class="modal-title" id="myModalLabel">设置分组名称</h4>  
            </div>  
            <div class="modal-body">  
                <p><input id="sample-groupName" type="text" class="form-control"></input></p>  
            </div>  
            <div class="modal-footer">  
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
                <button type="button" class="btn btn-primary">确定</button>  
            </div>  
        </div>  
    </div> `);

        $ts("&body").appendElement(modal);
    }
}