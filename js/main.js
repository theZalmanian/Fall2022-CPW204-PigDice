window.onload = function () {
    setupButton("roll-die", rollD6);
};
function rollD6() {
    var rolledValue = generateNumberWithinRange(1, 6);
    getInputByID("output-score").value = rolledValue.toString();
}
function generateNumberWithinRange(min, max) {
    var number = (Math.random() * max) + min;
    return Math.floor(number);
}
function setupButton(id, useFunction) {
    var button = getByID(id);
    button.onclick = useFunction;
}
function getInputByID(id) {
    return getByID(id);
}
function getByID(id) {
    return document.getElementById(id);
}
