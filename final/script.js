// Utility Function(s)

const lerp = (current, target, factor) => {
    let holder = current * (1 - factor) + target * factor;
    holder = parseFloat(holder).toFixed(2);
    return holder;
};

class LoopingElement {
    constructor(
        el,
        directionChange,
        addTargetOnScroll,
        scrollOptions,
        currentTranslation,
        speed,
        interpolationFactor
    ) {
        this.el = el;
        this.currentTranslation = currentTranslation;
        this.lerp = {
            current: this.currentTranslation,
            target: this.currentTranslation,
        };
        this.interpolationFactor = interpolationFactor;
        this.speed = speed;
        this.metric = 100;
        this.directionChange = directionChange;

        this.scrollDirection = false;
        this.scrollTop = 0;

        this.addTargetOnScroll = addTargetOnScroll;
        this.scrollOptions = scrollOptions;

        this.events();
        this.render();
    }

    events() {
        window.addEventListener("scroll", (e) => {
            let direction =
                window.pageYOffset || document.documentElement.scrollTop;
            if (direction > this.scrollTop) {
                this.scrollDirection = true;
                if (this.addTargetOnScroll) {
                    if (
                        this.scrollOptions === "forward" ||
                        this.scrollOptions === "forwardbackward" ||
                        this.scrollOptions === "doubleforward"
                    ) {
                        this.lerp.target += this.speed * 5;
                    }
                    if (this.scrollOptions === "doublebackward") {
                        this.lerp.target -= this.speed * 5;
                    }
                }
            } else {
                this.scrollDirection = false;
                if (this.addTargetOnScroll) {
                    if (
                        this.scrollOptions === "backward" ||
                        this.scrollOptions === "forwardbackward" ||
                        this.scrollOptions === "doublebackward"
                    ) {
                        this.lerp.target -= this.speed * 5;
                    }

                    if (this.scrollOptions === "doubleforward") {
                        this.lerp.target += this.speed * 5;
                    }
                }
            }
            this.scrollTop = direction <= 0 ? 0 : direction;
        });
    }

    goForward() {
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
    }

    goBackward() {
        this.lerp.target -= this.speed;
        this.lerp.current = lerp(
            this.lerp.current,
            this.lerp.target,
            this.interpolationFactor
        );

        if (this.lerp.target < -this.metric - 20) {
            this.lerp.current -= -this.metric * 2;
            this.lerp.target -= -this.metric * 2;
        }
    }

    animate() {
        if (this.directionChange === false) {
            this.goForward();
        } else {
            this.scrollDirection ? this.goForward() : this.goBackward();
        }

        this.el.style.transform = `translateX(${this.lerp.current}%)`;
    }

    render() {
        this.animate();
        window.requestAnimationFrame(() => this.render());
    }
}

let elements = document.querySelectorAll(".item");

new LoopingElement(elements[0], false, true, "doubleforward", -100, 0.15, 0.1);
new LoopingElement(elements[1], false, true, "doubleforward", 0, 0.15, 0.1);

new LoopingElement(elements[2], true, true, "none", 100, 0.5, 0.1);
new LoopingElement(elements[3], true, true, "none", 0, 0.5, 0.1);

new LoopingElement(elements[4], true, true, "forwardbackward", 100, 0.5, 0.1);
new LoopingElement(elements[5], true, true, "forwardbackward", 0, 0.5, 0.1);
