const lerp = (current, target, factor) =>
    current * (1 - factor) + target * factor;

class LoopingText {
    constructor(DOMElements) {
        this.DOMElements = DOMElements;
        console.log(this.DOMElements);
        this.counter = 0;
        this.counter2 = 100;
        this.direction = true;
        this.speed = 0.3;
        this.render();
        this.onScroll();
    }

    onScroll() {
        window.addEventListener("wheel", (e) => {
            if (e.deltaY === 50) {
                direction = true;
            } else if (e.deltaY === -50) {
                direction = false;
            }
        });
    }

    render() {
        console.log(this.counter, this.counter2);

        if (this.counter < 100) {
            this.counter += this.speed;
            this.DOMElements[0].style.transform = `translate(${this.counter}%, 0%)`;
        } else {
            this.counter = -100;
        }

        if (this.counter2 < 100) {
            this.counter2 += this.speed;
            this.DOMElements[1].style.transform = `translate(${this.counter2}%, 0%)`;
        } else {
            this.counter2 = -100;
        }

        window.requestAnimationFrame(() => this.render());
    }
}

let textArray = document.getElementsByClassName("item");
new LoopingText(textArray);
