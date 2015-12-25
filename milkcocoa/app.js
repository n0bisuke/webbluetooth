'use strict'

let milkcocoa = new MilkCocoa('dogi9jz8c16.mlkcca.com');
let ds = milkcocoa.dataStore("dots");

document.querySelector('#connect').addEventListener('click', event => {
  document.querySelector('#state').classList.add('connecting');
  playbulbCandle.connect()
  .then(() => {
    console.log(playbulbCandle.device);
    document.querySelector('#state').classList.remove('connecting');
    document.querySelector('#state').classList.add('connected');
    return playbulbCandle.getDeviceName().then(handleDeviceName)
    .then(() => playbulbCandle.getBatteryLevel().then(handleBatteryLevel));
  })
  .catch(error => {
    console.error('Argh!', error);
  });
});

function hexToRGB(color){
  let r = parseInt(color.substr(1,2), 16);
  let g = parseInt(color.substr(3,2), 16);
  let b = parseInt(color.substr(5,2), 16);
  return [r,g,b];
}

ds.on('push', (pushed) => {
  // console.log(r,g,b);
  playbulbCandle.setColor(hexToRGB(pushed.value.color)).then(onColorChanged);
});

// function changeColor(){
//   // playbulbCandle.setColor(r, g, b).then(onColorChanged);
//   playbulbCandle.setColor(255, 0, 0).then(onColorChanged);
// }

function onColorChanged(rgb) {
  if (rgb) {
    console.log('Color changed to ' + rgb);
    r = rgb[0]; g = rgb[1]; b = rgb[2];
  } else {
    console.log('Color changed');
  }
}
