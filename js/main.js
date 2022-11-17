window.onload = function () {
};
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
