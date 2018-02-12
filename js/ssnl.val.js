var nbOfParticles = 50;

var paramX = 0;
var paramY = 0;
var rad = (Math.PI / 180);

var valParticles = [];

document.addEventListener('click', function(e){ 
    mx = e.clientX || e.pageX; 
    my = e.clientY || e.pageY 
  console.log(paramX);

  valParticles.push(new createParticle);
}, false);


for(i = 0; i < nbOfParticles; i++) {
  setTimeout(function(){
    mx = Math.random() * valCanvas.width; //first creation: random x
    my = Math.random() * valCanvas.height; //first creation: random y

    valParticles.push(new createParticle);
  }, i * 15);
}

function createParticle() {

  this.x = mx;
  this.y = my ;
  this.r = Math.floor(Math.random() * 30) + 5; //size - rad
  this.a = -90; //angle
  this.vy = Math.floor(Math.random() * 5) + 2; //velocity y
  var color1 = '#e2625f';
  var color2 = '#9b2929';
  var color3 = '#701818';
  var array = [color1, color2, color3];
  this.color = array[Math.floor(Math.random() * 3)]; //one of the three colors
  this.life = Math.random() * 30;

}
  
function drawParticles() {
  requestAnimFrame(drawParticles);
  ctV.clearRect(0,0,cw,ch);
//  ctV.fillStyle = "#64B6A2";
//  ctV.fillRect(0,0, cw, ch);

  for(t = 0; t < valParticles.length; t++) {
    var p = valParticles[t];
    ctV.beginPath();
    ctV.fillStyle = p.color;
    var x1 = p.x + p.r * Math.cos(p.a * rad);
    var y1 = p.y + p.r * Math.sin(p.a * rad);
    var cx1 = p.x + p.r * Math.cos((p.a + 22.5) * rad);
    var cy1 = p.y + p.r * Math.sin((p.a + 22.5) * rad);
    var cx2 = p.x + p.r * Math.cos((p.a - 22.5) * rad);
    var cy2 = p.y + p.r * Math.sin((p.a - 22.5) * rad);
    var chord = 2 * p.r * Math.sin(22.5 * rad / 2);

    ctV.beginPath();
    ctV.moveTo(x1, y1);
    ctV.arc(cx1, cy1, chord, (270 + p.a) * rad, (270 + p.a + 225) * rad);
    ctV.lineTo(p.x, p.y);
    ctV.moveTo(x1, y1);
    ctV.arc(cx2, cy2, chord, (90 + p.a) * rad, (90 + p.a + 135) * rad, true);
    ctV.lineTo(p.x, p.y);
    ctV.fill();

    p.y-=p.vy;

    p.life*=0.8;
    
  }  
}

drawParticles();

