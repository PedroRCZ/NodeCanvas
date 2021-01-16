module.exports = io => {

    // keep track of all lines that client sends
    let line_history = [];
    let color_history = [];
    let grosor_history = [];
    let limpiar = false;
  
    io.on('connection', socket => {
      for (let i in line_history) {
        socket.emit('draw_line', {line: line_history[i],color:color_history[i],grosor:grosor_history[i],limpiar});
      }
  
      socket.on('draw_line', data => {
        line_history.push(data.line);
        color_history.push(data.color);
        grosor_history.push(data.grosor);
        limpiar = data.limpiar
        io.emit('draw_line', { line: data.line, color: data.color,grosor: data.grosor,limpiar:data.limpiar});
        if(limpiar){
          line_history = [];
          color_history = [];
          grosor_history = [];
        }
      });
    });
    
  
};