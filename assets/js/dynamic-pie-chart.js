(function() {
  var pieCharts = document.querySelectorAll('.pie-chart');
  
  Array.prototype.forEach.call(pieCharts, function(wrapperEl) {
    // Pull our variables out of our helper div
    var dataset = wrapperEl.dataset;
    var percentage = dataset.percentage ? parseInt(dataset.percentage, 10) : 0;
    var diameter = dataset.diameter ? parseInt(dataset.diameter, 10) : 150;
    var strokeWidth = dataset.strokeWidth ? parseInt(dataset.strokeWidth, 10) : 15;
    var fillColor = dataset.fillColor || '#f47b28'; // orange
    var bgColor = dataset.bgColor || '#fac5a1'; // light orange
    
    // Size our wrapper element and add our percentage
    wrapperEl.style.height = diameter + 'px';
    wrapperEl.style.width = diameter + 'px';
    var percentageEl = document.createElement('span');
    percentageEl.classList.add('pie-chart__percentage');
    percentageEl.style.color = fillColor;
    percentageEl.innerText = percentage + '%';
    wrapperEl.appendChild(percentageEl);
    
    // Setting up the values we're gonna use to draw our circles
    var center = diameter;
    var radius = center - (strokeWidth);
    var startAngle = degreesToRadians(-90);
    var fullCircle = degreesToRadians(365);
    var endAngle = startAngle + degreesToRadians(percentage / 100 * 365);
    
    // Draw our canvas! Note we're doubling our sizes so we look good on high res displays
    var canvas = document.createElement('canvas');
    canvas.classList.add('pie-chart__canvas');
    canvas.height = diameter * 2;
    canvas.width = diameter * 2;
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = strokeWidth * 2;
    ctx.strokeStyle = bgColor;
    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, fullCircle);
    ctx.stroke();
    ctx.strokeStyle = fillColor;
    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.stroke();

    wrapperEl.appendChild(canvas);
  });
  
  function degreesToRadians(degrees) {
    return (degrees / 360) * (2 * Math.PI);
  }
})();
