
// settaggi della pagina
function assign_page(){

    let user = $("#usr").text();
    let lvl = $("#lvl").text();
    let pnt = $("#pnt").text();

    if( user == null || user === ''){
        location.reload();
    }

    document.getElementById("put_username").innerHTML = user.toString();
    document.getElementById("put_username2").innerHTML = user.toString();

    document.getElementById("put_pnt2").innerHTML = pnt.toString();
    document.getElementById("put_pnt").innerHTML = pnt.toString();

    document.getElementById("put_lvl").innerHTML = lvl_to_name(lvl.toString()).toString();

    $.ajax( //esegui:
        {
            url: "/get_top",
            type: "GET",
            data: {},
            success: function (data){

                let result = JSON.parse(data);
                let n = result[0]['n_item'];
                if (n>16)
                    n=16
                let content1 = "<div class=\"row justify-content-center\" translate=\"no\">";
                let usr, pnt;
                let content2 = "</div>";
                let tot_u='', tot_p='';
                for (let i =1; i<n ; i++){
                    usr = result[i]['username']
                    console.log(usr)
                    pnt = result[i]['pnt']
                    tot_u = tot_u.concat(content1).concat(usr).concat(content2)
                    tot_p = tot_p.concat(content1).concat(pnt).concat(content2)
                }
                $("#put_top_usr").html(tot_u);
                $("#put_top_pnt").html(tot_p);
            },
            error: function() {
                console.log("ERRORE CONNESSIONE")
            }
        }
    );
    let ll, dd;
    for(let i = 1; i<=6; i++){
        ll='#lvla'+i
        dd='#lvlb'+i
        console.log(ll+" "+dd)
        if(i>parseInt(lvl)){
            $(ll).show();
            $(dd).hide();
        }
    }

}

// per far uscire l'user
function exit_user(){
    window.location.href='/logout'
}

// per una miglior risposta visiva alla selezione dei livelli
function alternatecollapse(a,b){
    $(a).collapse("show");
    $(b).collapse("hide");
}