const getData = () =>
  fetch("./index.json")
    .then(res => res.json())
    .then(res => console.log(res.data))
    .catch(err => console.warn(err));

const pullRequests = getData().then();

window.onload = () => {
  const $button = document.getElementById("button");
  const $display = document.getElementById("display");

  $button.onclick = e => {};
};
