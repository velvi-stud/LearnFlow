
function assign_page() {
    let user = $("#usr").text();
    let pnt = $("#pnt").text();
    if (user == null || user === '' || pnt==null || pnt === '') {
        location.reload();
    }
    document.getElementById("put_username").innerHTML = user.toString();
    document.getElementById("put_pnt").innerHTML = pnt.toString();
}


// per far uscire l'user
function exit_user(){
    deleteAllCookies()
    window.location.href='/logout'
}

function start_exercise(){
    let ex = $("#ex").text();
    ex=ex.toString()
    window.location.href = "/exercise_multiple_question/"+parseInt(ex.toString())+"/"+"0"
}

function go_home(){
    window.location.href = "/MainGame/"
}