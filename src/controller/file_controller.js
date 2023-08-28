const fs = require("fs"); //파일에 관련된 기능 사용
const views={
    index : (req, res)=>{
        res.render("file_index");
    },
    list : (req, res)=>{
        /*
        fs.readdir("./upload_file", (err, files)=>{ //비동기 방식
            console.log("=== 비동기 ===");
            console.log(files);
        });
        */
       
        const fileList = fs.readdirSync("./upload_file"); //Sync 붙으면 동기 방식
        console.log("=== 동기 ===");
        console.log(fileList);
        res.render("file_list", {files:fileList});
    },
    download : (req, res)=>{
        const filePath = `./upload_file/${req.params.fileName}`;
        res.download(filePath);
    },
    modifyForm : (req, res)=>{
        const fileName = req.params.fileName;
        res.render("modify_form", {fileName});
    }
}
const process={
    upload : (req, res)=>{
        console.log("=== ctrl upload ===");
        console.log(req.body);
        console.log("-------------------");
        console.log(req.file);
        console.log("-------------------");
        console.log("req.test", req.fileValidation);
        console.log("===================");
        if(req.fileValidation){
            return res.send(req.fileValidation);//이미지가 아니라면
        }
        res.send("upload")
    },
    deleteFile : (req, res)=>{
        fs.unlinkSync(`./upload_file/${req.params.fileName}`);
        res.redirect("/file/list");
    },
    modify : (req, res)=>{
        console.log("==== modify ====");
        console.log(req.file);  //file값이 없으면 변경 안됨
        if(req.file){
            return res.redirect(`/file/delete_file/${req.body.originFileName}`);
        }
        res.redirect("/file/list");
    }
}

module.exports = {views, process};