// adapted from
// http://www.jeffreyharrell.com/blog/2010/11/creating-a-shake-event-in-mobile-safari/
function onShake(cb) {
  var sensitivity = 20;

  // Position variables
  var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;

  // Listen to motion events and update the position
  window.addEventListener('devicemotion', function (e) {
      x1 = e.accelerationIncludingGravity.x;
      y1 = e.accelerationIncludingGravity.y;
      z1 = e.accelerationIncludingGravity.z;
  }, false);

  // Periodically check the position and fire
  // if the change is greater than the sensitivity
  setInterval(function () {
      var change = Math.abs(x1-x2+y1-y2+z1-z2);

      if (change > sensitivity) cb();

      // Update new position
      x2 = x1;
      y2 = y1;
      z2 = z1;
  }, 150);
}

onload = function() {
  var time
    , interval
    , slideEl = document.getElementById("slide")
    , timeEl = document.getElementById("time")
    
  document.addEventListener("touchmove", function(e) {
    e.preventDefault()
  })

  onShake(reset)
  reset()

  function reset() {
    time = 0
    clearInterval(interval)
    interval = setInterval(update, 1000)
    redraw()  
  }
  
  function redraw() {
    slideEl.innerHTML = 0|time/20 + 1
    timeEl.innerHTML  = time % 20
  }
  
  function update() {
    time++
    redraw()
  }
}