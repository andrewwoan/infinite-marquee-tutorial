const lerp = (current, target, factor) => {
    let holder = current * (1 - factor) + target * factor;
    holder = parseFloat(holder).toFixed(2);
    return holder;
};

class LoopingText {
    constructor(el, currentTranslation, speed, interpolationFactor) {
        this.el = el;
        this.currentTranslation = currentTranslation;
        this.lerp = {
            current: this.currentTranslation,
            target: this.currentTranslation,
        };
        this.interpolationFactor = interpolationFactor;
        this.speed = speed;
        this.metric = 100;

        this.onScroll();
        this.render();
    }

    onScroll() {
        window.addEventListener("scroll", () => {
            this.lerp.target += this.speed * 5;
        });
    }

    animate() {
        this.lerp.target += this.speed;
        this.lerp.current = lerp(
            this.lerp.current,
            this.lerp.target,
            this.interpolationFactor
        );

        if (this.lerp.target > this.metric) {
            this.lerp.current -= this.metric * 2;
            this.lerp.target -= this.metric * 2;
        }

        this.el.style.transform = `translateX(${this.lerp.current}%)`;
    }

    render() {
        this.animate();
        window.requestAnimationFrame(() => this.render());
    }
}

let elements = document.querySelectorAll(".item");

new LoopingText(elements[0], -100, 0.15, 0.1);
new LoopingText(elements[1], 0, 0.15, 0.1);
