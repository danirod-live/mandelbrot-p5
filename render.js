const width = 1280;
const height = 720;

const maxiters = 256;
const scale = deltas(0, 255, maxiters);

let values;

function setup() {
    createCanvas(width, height);

    values = mandelbrotset(-2.2, -1.2, 0.8, 1.2, width, height, 1000);
}

function draw() {
    colorMode(HSL, 256);
    loadPixels();

    let i = 0;
    values.forEach(row => {
        row.forEach(col => {
            const color = isNaN(col) ? 0 : scale[col];
            pixels[i] = 80;
            pixels[i+1] = isNaN(color) ? 0 : scale[col];
            pixels[i+2] = isNaN(col) ? 0 : 255;
            pixels[i+3] = 255;
            i += 4;
        });
    })

    updatePixels();
}