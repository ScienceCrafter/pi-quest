
var current_index = 0
var mistakes = 0
var mistakes_current = 0
var end = 0
var score = 0
var time_last = Date.now()
var dur_last = 0
var times_last = [1000]
var speedys_shown = false

function keyPress(e){
  var key;
  if(window.event) {
    key = e.keyCode
  } else if(e.which){
    key = e.which
  }
  let keyv = String.fromCharCode(key)
  // typing numbers
  if (end == 0 && "0123456789".includes(keyv)) {
    document.getElementById("help").style.display = "none";
    if (keyv == pi_digits[current_index] || mistakes_current == 2) {
      keyv = pi_digits[current_index]
      // time
      dur_last = current_index == 0 ? 0 : Date.now() - time_last
      times_last.push(dur_last)
      document.getElementById("last_int").innerHTML = "last interval: " + (dur_last)/1000 + "s"
      time_last = Date.now()
      if (times_last.length >= 21) {
        times_last.shift()
      }
      let x = 0
      for (i = 0;i < times_last.length;i++) {
        x += times_last[i]
      }
      x = Math.round(10000*times_last.length/x)/10
      // progress
      if (mistakes_current > 0) {
        document.getElementById("pi").innerHTML += '<span style="color:#d00">'+keyv+'</span>'
        mistakes_current = 0
      }
      else if (dur_last < 500) {
        document.getElementById("pi").innerHTML += '<span style="color:var(--speed-color);">'+keyv+'</span>'
      }
      else if (dur_last > 10000) {
        document.getElementById("pi").innerHTML += '<span style="color:var(--slow-color);">'+keyv+'</span>'
      } else {
        document.getElementById("pi").innerHTML += keyv
      }
      current_index += 1
      // stats
      document.getElementById("speed").innerHTML = "speed: " + x + " DPS"
      score += 1
      document.getElementById("score").innerHTML = "score: " + score
    } else {
      mistakes += 1
      mistakes_current += 1
      document.getElementById("mistakes").innerHTML = "mistakes: " + mistakes
      //if (mistakes > 2) {
      //  end = 1
      //}
    }
  }
  // end
  if (end == 1 || (key == 13 && end == 0)) {
    end = 2
    let digs = ""
    for (i = 0; i < 5; i++) {
      digs += pi_digits[current_index+i]
    }
    document.getElementById("pi").innerHTML += "<span style='color:#00f'>"+digs+"</span>"
  }
  // reset
  if (key == 114) {
    document.getElementById("pi").innerHTML = "3."
    document.getElementById("mistakes").innerHTML = "mistakes: 0"
    current_index = 0
    mistakes = 0
    mistakes_current = 0
    end = 0
    score = 0
    time_last = Date.now()
    times_last = [1000]
    document.getElementById("score").innerHTML = "score: 0"
  }
}

function toggleSpeedys() {
  if (speedys_shown) {
    speedys_shown = false
    document.documentElement.style.setProperty('--speed-color', '#000');
    document.documentElement.style.setProperty('--slow-color', '#000');
  } else {
    speedys_shown = true
    document.documentElement.style.setProperty('--speed-color', '#4c4');
    document.documentElement.style.setProperty('--slow-color', '#d80');
  }
}
