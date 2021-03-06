
let posizioni = new Array
var ris = new Array
var todrop
var es = 1
var es_copy;
var point_scored;
var data;

function load2(datae,ex){
    es = ex
    es_copy=ex;
    data = datae
    var traccia = document.getElementById('testo')
    var t = document.createTextNode(data[es].esercizio)
    traccia.append(t)

    for (let index = 0; index < data[es].shapes.length; index++) {
        draw(data[es].shapes[index], data[es].array[index], index)
    }

    $.each(data[es].ordineCorretto, function (key, val) {
        var drop = document.createElement("div");
        drop.id = key + 100
        drop.className = "col-12 droppable ui-widget-header"
        drop.setAttribute("style", "padding:0;margin:0")
        var element = document.getElementById("todrop")
        element.appendChild(drop)
    });
    $('body').scroll(function() {
        drawLines();
    });
}



function load(){
    todrop = document.getElementById('todrop').childNodes
    var j = 0
    console.log(todrop)
    for (let index = 0; index < todrop.length; index++) {
        posizioni.push(0)
        ris.push(0)
        }
}

function find_free(){
    console.log(posizioni)
    for (let index = 0; index < todrop.length; index++) {
        if(posizioni[index]==0){
            posizioni[index] = 1
            ind=index
            return todrop[index].id
        }
    }
}


function move(element){
    if(element.classList.contains("off")){
    var el = document.getElementById(find_free())
    el.appendChild(element)
    element.classList.remove("off")
    element.classList.add("on")
    ris[ind]=parseInt(element.id)
    }else{
        var pos = document.getElementById("items")
        updateposizioni(element)
        element.classList.remove("on")
        element.classList.add("off")
        pos.appendChild(element)
    }
    drawLines()
}

function updateposizioni(element){
    for (let index = 0; index < todrop.length; index++) {
        if(posizioni[index]==1){
        if(todrop[index].hasChildNodes){
            var chi = todrop[index].childNodes
            if(chi[0].id==element.id){
                posizioni[index]=0;
            }
        }
    }
}
}


function draw(forma,testo,index){
    var canv = document.createElement('canvas')
    canv.id=index
    canv.height = 100
    canv.width = 200
    canv.className = "off"
    canv.onclick=function(){
        move(this)
          }
    switch(forma){
        case "rombo":
            canv = creaRombo(canv)
            break
        case "par":
            canv = creaParall(canv)
            break
        case "rett":
            canv = creaRett(canv)
            break
        case "ells":
            canv = creaElls(canv)
            break
        case "elle":
            canv = creaElle(canv)
    }
    var x = canv.width/2
    var y = canv.height/2
    var ctx = canv.getContext("2d")
    ctx.font = "20px Georgia"
    ctx.textAlign="center"
    ctx.fillText(testo, x, y)
    var element = document.getElementById("items")
    element.appendChild(canv)
    console.log(canv.getBoundingClientRect())
}



function creaRombo(canvas){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d')
        var h = canvas.height
        var l = canvas.width
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.moveTo(l/2,h/10)
        ctx.lineTo(l/10,h/2)
        ctx.lineTo(l/2,h-h/10)
        ctx.lineTo(l-l/10,h/2)
        ctx.lineTo(l/2,h/10)
            if(data[es].if[1]!=null){
                ctx.moveTo(0,h/2)
                ctx.lineTo(l/10,h/2)
                ctx.stroke();
            }
            if(data[es].if[2]!=null){
                ctx.moveTo(l,h/2)
                ctx.lineTo(l-l/10,h/2)
                ctx.stroke();
            }
        ctx.moveTo(l/2,0)
        ctx.lineTo(l/2,h/10)
        ctx.stroke();
    }
    return canvas
}

function creaElls(canvas){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d')
        var h = canvas.height
        var l = canvas.width
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        if(canvas.getContext){
            var ctx = canvas.getContext('2d')
            var h = canvas.height
            var l = canvas.width
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
            ctx.beginPath()
            ctx.ellipse(l/2,h/2,80,45,0,0,Math.PI*2,false)
            ctx.moveTo(l/2,h/2+45)
            ctx.lineTo(l/2,h)
            for(let i = 0;i<data[es].if.length;i++){
                if(data[es].if[1]==parseInt(canvas.id)){
                    ctx.moveTo(0,h/2)
                    ctx.lineTo(l/10,h/2)
                    ctx.stroke();
                }
                if(data[es].if[2]==parseInt(canvas.id)){
                    ctx.moveTo(l,h/2)
                    ctx.lineTo(l-l/10,h/2)
                    ctx.stroke();
                }
            }
        }
        ctx.stroke();

    }
    return canvas
}

function creaElle(canvas){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d')
        var h = canvas.height
        var l = canvas.width
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        if(canvas.getContext){
            var ctx = canvas.getContext('2d')
            var h = canvas.height
            var l = canvas.width
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
            ctx.beginPath()
            ctx.ellipse(l/2,h/2,80,45,0,0,Math.PI*2,false)
            ctx.moveTo(l/2,h-(h/2+45))
            ctx.lineTo(l/2,0)
            for(let i = 0;i<data[es].if.length;i++){
                if(data[es].if[1]==parseInt(canvas.id)){
                    ctx.moveTo(0,h/2)
                    ctx.lineTo(l/10,h/2)
                    ctx.stroke();
                }
                if(data[es].if[2]==parseInt(canvas.id)){
                    ctx.moveTo(l,h/2)
                    ctx.lineTo(l-l/10,h/2)
                    ctx.stroke();
                }
            }
        }
        ctx.stroke();

    }
    return canvas
}

function creaParall(canvas){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d')
        var h = canvas.height
        var l = canvas.width
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.moveTo(l/10*2,h/10)
        ctx.lineTo(l/10,h-h/10)
        ctx.lineTo(l-(l/10)*2,h-h/10)
        ctx.lineTo(l-(l/10),h/10)
        ctx.lineTo(l/10*2,h/10)
        for(let i = 0;i<data[es].if.length;i++){
            if(data[es].if[1]==parseInt(canvas.id)){
                ctx.moveTo(0,h/2)
                ctx.lineTo(l/10,h/2)
                ctx.stroke();
            }
            if(data[es].if[2]==parseInt(canvas.id)){
                ctx.moveTo(l,h/2)
                ctx.lineTo(l-l/10,h/2)
                ctx.stroke();
            }
        }
        ctx.moveTo(l/2,0)
        ctx.lineTo(l/2,h/10)
        ctx.moveTo(l/2,h-h/10)
        ctx.lineTo(l/2,h)
        ctx.stroke();
    }
    return canvas
}

function creaRett(canvas){
    if(canvas.getContext){
        var ctx = canvas.getContext("2d")
        var h = canvas.height
        var l = canvas.width
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        for(let i = 0;i<data[es].if.length;i++){
            if(data[es].if[1]==parseInt(canvas.id)){
                ctx.moveTo(0,h/2)
                ctx.lineTo(l/10,h/2)
                ctx.moveTo(l/2,h-h/10)
                ctx.lineTo(l/2,h)
                ctx.stroke();
            }
            if(data[es].if[2]==parseInt(canvas.id)){
                ctx.moveTo(l,h/2)
                ctx.lineTo(l-l/10,h/2)
                ctx.moveTo(l/2,h-h/10)
                ctx.lineTo(l/2,h)
                ctx.stroke();
            }
        }

        ctx.strokeRect(l/10, h/10, l-(l/10)*2, h-(h/10)*2);
        ctx.moveTo(l/2,0)
        ctx.lineTo(l/2,h/10)
        ctx.moveTo(l/2,h-h/10)
        ctx.lineTo(l/2,h)
        ctx.stroke()
    }
    return canvas
}

function drawLines(){
        creaLinee(data[es].if)
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function creaLinee(toconn){
    var sum = 0
    for (let index = 0; index < posizioni.length; index++) {
            if(posizioni[index])
                sum+=1
    }
    $(".line").remove()
    if(sum==posizioni.length){
    var elPart = document.getElementById(toconn[0])
    var start1 = elPart.getBoundingClientRect()
    var h = elPart.height
    var l = elPart.width
    var leftLine = document.getElementById(toconn[1])
    var end1 = leftLine.getBoundingClientRect()
    // var a = $('nav').height()+16
    // console.log(a)
    // var b = a*2+15
    var gg = document.getElementById('container')
    var g = gg.getBoundingClientRect().x
    console.log(g)
    g=0
    //linedraw2(end1.x,(end1.y+h/2)+g,start1.x,(start1.y+h/2)+g)

    console.log(end1.x,end1.y+h/2,start1.x,start1.y+h/2)
    var rightLine=document.getElementById(toconn[2])
    var end2 = rightLine.getBoundingClientRect()
    //linedraw2(end2.x+l,end2.y+h/2+g,start1.x+l,start1.y+h/2+g)

    var fromPoint = getOffset($('#1')[0]);
    var toPoint = getOffset($('#5')[0]);
    console.log(fromPoint,toPoint)

    var from = function () {},
    to = new String('to');
    from.y = fromPoint.top;
    from.x = fromPoint.left;
    to.y = toPoint.top;
    to.x = toPoint.left;

    $('HTML').line(end1.x,(end1.y+h/2)+g,start1.x,(start1.y+h/2)+g);
    $('HTML').line(end2.x+l,end2.y+h/2+g,start1.x+l,start1.y+h/2+g)
    console.log(end2.x+l,end2.y+h/2,start1.x+l,start1.y+h/2)
    }
}


function check(){
    var corrette = 0
    $.each(
        data[es].ordineCorretto,
        function(key,val){
            if(ris[key]==val){
                corrette=corrette+1
            }
        }
    );
    let xx = (corrette/ris.length)*100
    let yy =  Math.floor(xx)
    console.log(yy)
    return yy
}


(function($) {
    var helpers = {
      createLine: function(x1, y1, x2, y2, options){

                    // Check if browser is Internet Exploder ;)
                    var isIE = navigator.userAgent.indexOf("MSIE") > -1;
                    if (x2 < x1){
                      var temp = x1;
                      x1 = x2;
                      x2 = temp;
                      temp = y1;
                      y1 = y2;
                      y2 = temp;
                    }
                    var line = document.createElement("div");
                    
                    line.className = options.class;
                    
                    // Formula for the distance between two points
                    // http://www.mathopenref.com/coorddist.html
                    var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  
                    line.style.width = length + "px";
                    line.style.borderBottom = options.stroke + "px " + options.style;
                    line.style.borderColor = options.color;
                    line.style.position = "absolute";
                    line.style.zIndex = options.zindex;
  
                    if(isIE){
                      line.style.top = (y2 > y1) ? y1 + "px" : y2 + "px";
                      line.style.left = x1 + "px";
                      var nCos = (x2-x1)/length;
                      var nSin = (y2-y1)/length;
                      line.style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + nCos + ", M12=" + -1*nSin + ", M21=" + nSin + ", M22=" + nCos + ")";
                    }else{
                      var angle = Math.atan((y2-y1)/(x2-x1));
                      line.style.top = y1 + 0.5*length*Math.sin(angle) + "px";
                      line.style.left = x1 - 0.5*length*(1 - Math.cos(angle)) + "px";
                      line.style.transform = line.style.MozTransform = line.style.WebkitTransform = line.style.msTransform = line.style.OTransform= "rotate(" + angle + "rad)";
                    }
                    return line;
                  }
    }
    
  
    $.fn.line = function( x1, y1, x2, y2, options, callbacks) {
                  return $(this).each(function(){
                    if($.isFunction(options)){
                        callback = options;
                        options = null;
                    }else{
                      callback = callbacks;
                    }
                    options = $.extend({}, $.fn.line.defaults, options);
  
                    $(this).append(helpers.createLine(x1,y1,x2,y2,options)).promise().done(function(){
                      if($.isFunction(callback)){
                        callback.call();
                      }
                    });
  
                  
                });
    };
    $.fn.line.defaults = {  zindex : 10000,
                            color : '#000000',
                            stroke: "1",
                            style: "solid",
                            class: "line",
                          };
  })(jQuery);


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
    window.location.href='/logout'
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}