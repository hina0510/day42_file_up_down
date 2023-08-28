function readURL(input){//파일에 대한 정보
    console.log(input);
    const file = input.files[0];
    console.log(file);
    if(file !=""){  //파일에 정보가 있다면
        const reader = new FileReader(); //파일을 읽는 기능
        reader.readAsDataURL(file);
        reader.onload = (e)=>{
            console.log(e.target.result);//실질적인 파일에 대한 정보
            document.querySelector("#preview").src = e.target.result;
        }
    }
}