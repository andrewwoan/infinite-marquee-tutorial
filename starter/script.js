// Utility Function(s)

const lerp = (current, target, factor) => {
    let holder = current * (1 - factor) + target * factor;
    holder = parseFloat(holder).toFixed(2);
    return holder;
};
