const router = require("express").Router();
const multer = require("multer");
//const upload = multer({dest:"upload_file"});//파일을 저장할 폴더 위치

const stg=multer.diskStorage({
    destination : (req, file, cb)=>{
        console.log("==== dest ====");
        cb(null, "upload_file");    //callback(null, "저장 위치") 어느 위치에 저장할지 지정
    },
    filename : (req, file, cb)=>{
        console.log("==== filename ====");
        console.log(file);
        cb(null, Date.now()+"-"+file.originalname);
    }
});
const f_Filter = (req, file, cb)=>{
    console.log("==== filter ====");
    const type = file.mimetype.split("/")[0]; //[0]text, [1]plain
    console.log("type : ", type);
    if(type==="image"){
        cb(null, true);
    }else{
        //req={fileValidation:",,,"}
        req.fileValidation = "이미지만 저장하세요";
        cb(null, false);
    }
}

const upload = multer({storage:stg, fileFilter:f_Filter});

const fileCtrl = require("../controller/file_controller");

router.get("/", fileCtrl.views.index);
router.get("/list", fileCtrl.views.list);
router.get("/download/:fileName", fileCtrl.views.download);
router.get("/delete_file/:fileName", fileCtrl.process.deleteFile);
router.get("/modify_form/:fileName", fileCtrl.views.modifyForm);
router.post("/upload", upload.single("file_name"), fileCtrl.process.upload);
//upload.single():1개, arr():여러개
router.post("/modify", upload.single("newFileName"), fileCtrl.process.modify);

module.exports = router;