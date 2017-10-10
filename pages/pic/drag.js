(function () {
    $(document).on({
        dragleave: function (e) {    //拖离 
            e.preventDefault();
        },
        drop: function (e) {  //拖后放 
            e.preventDefault();
        },
        dragenter: function (e) {    //拖进 
            e.preventDefault();
        },
        dragover: function (e) {    //拖来拖去 
            e.preventDefault();
        }
    });

    let dragBox = document.querySelector('.drag-file-cotainer');
    dragBox.addEventListener('drop', async function (e) {
        e.preventDefault();

        let files = e.dataTransfer.files;
        let file = files[0];
        let fd = new FormData();
        fd.append('filePath', currentDir);
        for(let f of files){
            fd.append(f.name,f);
        }
        let res = await fileDealer.uploadFile(fd);
        if (res.code == 'success') {
            alert("上传成功");
            let fileListCon = $(".file-list");
            let fileList = await fileDealer.getFileList(currentDir);
            fileListDOM(fileListCon, fileList);
            if (returnDir.length == 0) {
                returnBtn.addClass('disable');
            }
        }

    });
})();