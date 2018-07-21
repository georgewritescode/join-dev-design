class DisplayCount {
  constructor(length = 0) {
    this.max = length - 1;
    this.count = 0;
  }
  reset() {
    this.count = 0;
    return this.count;
  }
  maximize() {
    this.count = this.max;
    return this.count;
  }
  add(v = 0) {
    if (!Number.isFinite(v)) {
      console.warn(
        `invalid arguments passed in DisplayCount.add() (has to be a finite number)`
      );
      return this.count;
    }

    this.count += v;
    if (this.count > this.max) this.reset();
    if (this.count < 0) this.maximize();
    return this.count;
  }
}

const getPullRequests = () =>
  fetch("./index.json")
    .then(res => res.json())
    .then(res => res.data.repository.pullRequests.edges)
    .catch(err => console.warn(err));

const getEl = id => document.getElementById(id);

window.onload = async () => {
  const $buttonFirst = getEl("js-button-first");
  const $buttonNext = getEl("js-button-next");
  const $buttonPrevious = getEl("js-button-previous");
  const $buttonLast = getEl("js-button-last");

  const $display = getEl("js-display");
  const $historyId = getEl("js-history-id");
  const $prTitle = getEl("js-pr-title");
  const $prAuthor = getEl("js-pr-author");
  const $prEditor = getEl("js-pr-editor");
  const $prMergedAt = getEl("js-pr-mergedAt");

  const updateDisplay = currentDisplay => {
    const pr = pullRequests[currentDisplay];
    const { id, title, author, editor, mergedAt } = pr.node;

    $display.src = `./history/${id}/docs/`;
    $historyId.textContent = currentDisplay;
    $prTitle.textContent = title;
    $prAuthor.textContent = author.login;
    $prEditor.textContent = editor && editor.login;
    $prMergedAt.textContent = mergedAt;
  };

  const pullRequests = await getPullRequests();
  const count = new DisplayCount(pullRequests.length);

  $buttonFirst.onclick = () => {
    updateDisplay(count.reset());
  };
  $buttonNext.onclick = () => {
    updateDisplay(count.add(1));
  };
  $buttonPrevious.onclick = () => {
    updateDisplay(count.add(-1));
  };
  $buttonLast.onclick = () => {
    updateDisplay(count.maximize());
  };
};
