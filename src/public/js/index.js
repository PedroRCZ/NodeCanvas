function init() {
    let mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0},
        pos_prev: false,
        color: 'black',
        grosorpin: 2
    };
  
   
    let canvas = document.getElementById('drawing');
    let grosor = document.getElementById('valorgrosor')
    let color = document.getElementById('valorcolor');
    let pin = document.getElementById('pintar');
    let limpiar = document.getElementById('limpiar')
    let context = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    
    let socket = io();
    let lim = false
    
    canvas.width = width  + 10;
    canvas.height = height;

    limpiar.addEventListener('click',(e) =>{
        lim = true
    })
  
    canvas.addEventListener('mousedown', (e) => {
        mouse.click = true;
    });
  
    canvas.addEventListener('mouseup', (e) => {
        mouse.click = false;
    });
  
    canvas.addEventListener('mousemove', (e) => {
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
    });

    socket.on('draw_line', data => {
        let line = data.line;
        context.strokeStyle = data.color;
        context.lineWidth = data.grosor;
        if(data.limpiar){
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        context.beginPath();
        context.moveTo(line[0].x * width, line[0].y * height);
        context.lineTo(line[1].x * width, line[1].y * height);
        context.stroke();
    });
  
    function mainLoop() {
        let valorgro = grosor.selectedIndex + 1;
        let valorcol = color.options[color.selectedIndex].value;
        let pinc = pin.options[pin.selectedIndex].value
        mouse.grosorpin = valorgro;
        if(pinc == "pincel"){
            mouse.color = valorcol;
        }else{
            mouse.color = 'white';
        }
        if(mouse.click && mouse.move && mouse.pos_prev) {
            socket.emit('draw_line', { line: [mouse.pos, mouse.pos_prev],color:mouse.color,grosor:mouse.grosorpin, limpiar:lim});
            lim = false
            mouse.move = false;
        }
        mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
        setTimeout(mainLoop, 25);
    }
  
    mainLoop();
  }
  
  document.addEventListener('DOMContentLoaded', init);