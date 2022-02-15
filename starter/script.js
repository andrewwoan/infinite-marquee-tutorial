let textArray = document.getElementsByClassName("item");
let test = document.querySelector(".item");

for (let i = 0; i < textArray.length; i++) {
    textArray[i].innerHTML = textArray[i].innerHTML
        .split("")
        .map((character) => {
            return `<span class="hover">${character}</span>`;
        })
        .join("");
}

let counter = 0;
let counter2 = -100;
let direction = true;
window.addEventListener("wheel", (e) => {
    if (e.deltaY === 100) {
        direction = true;
    } else if (e.deltaY === -100) {
        direction = false;
    }
});
render = () => {
    console.log(counter, counter2);
    if (direction) {
        counter += 1 * 0.05;
        counter2 += 1 * 0.05;

        if (counter < 100) {
            textArray[0].style.transform = `translate(${counter}%,0%)`;
        } else {
            counter = -100;
            textArray[0].style.transform = `translate(${counter}%,0%)`;
        }

        if (counter2 < 100) {
            textArray[1].style.transform = `translate(${counter2}%,0%)`;
        } else {
            counter2 = -100;
            textArray[1].style.transform = `translate(${counter2},0%)`;
        }
    } else {
        counter -= 1 * 0.05;
        counter2 -= 1 * 0.05;

        if (counter < 100) {
            textArray[0].style.transform = `translate(${counter2}%,0%)`;
        } else {
            counter = 100;
            textArray[0].style.transform = `translate(${counter2}%,0%)`;
        }

        if (counter2 < 100) {
            textArray[1].style.transform = `translate(${counter}%,0%)`;
        } else {
            counter2 = 100;
            textArray[1].style.transform = `translate(${counter1},0%)`;
        }
    }

    window.requestAnimationFrame(() => render());
};

render();
