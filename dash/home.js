const btnt = document.querySelector('.toggle-btn');

if(btnt){
    btnt.addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('active');   
    });
}else{
    console.log("no existe")
}