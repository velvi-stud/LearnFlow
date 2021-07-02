var usr;
var pnt;
var lvl;
var score;

function upload_data() {

    usr = $('#usr').text();
    pnt = $('#pnt').text();
    lvl = $('#lvl').text();
    score = $('#score').text();
    if(parseInt(score) <= 50){
        $( "#pass_no" ).show();
        $( "#pass_yes" ).hide();
    }else{
        $( "#pass_no" ).hide();
        $( "#pass_yes" ).show();
    }

    let x = parseInt(pnt)+parseInt(score)
    console.log("----->"+score)
    $("#put_total_score").text(x);
}


function go_home(){
    let x= $("#put_total_score").text();
    let l = parseInt(lvl)+1
    //AGGIORNO DATI
    if(parseInt(score) >= 50) {
        $.ajax( //esegui:
            {
                url: "/update_data/" + usr.toString() + "/" + l.toString() + "/" + x.toString(),
                type: "POST",
                data: {},
                success: function (data) {
                    console.log(data)
                    if (data === "1") {
                        console.log("utente aggiornato")
                    } else {
                        console.log("errore aggiornamento utente" + data)
                    }
                },
                error: function () {
                    console.log("------> NON RIESCO A CONTATTARE IL SERVER")
                }

            }
        );
    }
    window.location.href = "/MainGame/"
}
