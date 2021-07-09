class Complex {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    sum(complex) {
        return new Complex(this.real + complex.real, this.imag + complex.imag);
    }

    mul(complex) {
        let x = this.real, y = this.imag, u = complex.real, v = complex.imag;
        return new Complex(u*x - v*y, v*x + u*y);
    }

    pow() {
        return this.mul(new Complex(this.real, this.imag));
    }

    mag() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }

    str() {
        return `${this.real} + ${this.imag}i`;
    }
}

function deltas(a, b, steps) {
    let diff = b - a;
    let step = diff / (steps - 1);
    let deltas = [];
    for (let i = 0; i < steps; i++) {
        deltas.push(a + step * i);
    }
    return deltas;
}

function mandelbrot(complex, it) {
    const values = [new Complex(0, 0)];
    for (let i = 1; i <= it; i++) {
        values[i] = values[i-1].pow().sum(complex);
        if (values[i].mag() >= 4) {
            return i;
        }
    }
    return NaN;
}

function mandelbrotset(minX, minY, maxX, maxY, width, height, max_iter) {
    return deltas(minY, maxY, height).map(function(y) {
        return deltas(minX, maxX, width).map(function(x) {
            let cmp = new Complex(x, y);
            return mandelbrot(cmp, max_iter);
        });
    });
}