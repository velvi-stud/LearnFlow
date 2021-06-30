var data
var es


// settaggi della pagina
function assign_page() {

    let user = $("#usr").text();
    let pnt = $("#pnt").text();

    if (user == null || user === '' || pnt==null || pnt === '') {
        location.reload();
    }

    document.getElementById("put_username").innerHTML = user.toString();
    document.getElementById("put_pnt").innerHTML = pnt.toString();
}


function carica(jsondata,ex){
    data = jsondata
    es = ex
    var element = document.getElementById("put-title")
    var t = document.createTextNode(data[es].esercizio)
    element.append(t)
    var i = 1
    $.each(data[es].risposte, function(key,value){
        var el = document.createElement("h5")
        el.className = "my-auto"
        var id_elemento = "radio"
        id_elemento = id_elemento.concat(i)
        i = i+1
        var t = document.createTextNode(value)
        var element = document.getElementById(id_elemento);
        el.appendChild(t)
        element.append(t);
    });
}


function controlla(){
    var corr = data[es].corretta
    console.log(corr)
    var fl = false
    for(var i = 0 ;i<4;i++){
        var id_elem = "btnradio"
        var a = i+1
        id_elem = id_elem.concat(a)
        if(document.getElementById(id_elem).checked==true){
            if(a==corr)
            fl = true
            break
        }
    }
    if(fl){
        alert("brav")
    }else{
        alert("strunz")
    }
}



function load_back(){
    let d = parseInt(es_copy)-1
    let z = $('#score').text()
    window.location.href = "/exercise_flow_chart/"+d+"/"+z
}

async function load_next(){
    let point=1;
    point = point * check();
    console.log("done: "+ point)
    let z = $('#score').text()
    point = point + parseInt(z);
    point_scored=point;
    console.log("total:"+point)
    let d = parseInt(es_copy)+1
    // await sleep(5000)
    window.location.href = "/exercise_flow_chart/"+d+"/"+point.toString()
}

async function load_end(){
    let point=1;
    point = point * check();
    console.log("done: "+ point)
    let z = $('#score').text()
    point = point + parseInt(z);
    console.log("total:"+point)
    // await sleep(5000)
    window.location.href = "/end_exercise/"+point;
}


// per far uscire l'user
function exit_user(){
    deleteAllCookies()
    window.location.href='/logout'
}