fetch("https://api.github.com/repos/Microsoft/join-dev-design/commits")
  .then(function(response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }
    response.json().then(function(commits) {
      window.commits = commits;
      window.currentCommitIndex = 0;
    });
  })
  .catch(function(err) {
    console.log("Fetch Error :-S", err);
  });

function setHTMLAsLastTimeChanged(commitSha) {
  fetch("https://api.github.com/repos/Microsoft/join-dev-design/commits/" + commitSha)
    .then(function(response) {
      response.json().then(function(commit) {
			if(commit.files.filter((function(file) {
				return (file.filename.indexOf('index.html') > -1)
			})).length > 0) {
				getBodyHTMLAtCommit(commitSha)
			} else {
				timeTravelBack()
			}
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

function getBodyHTMLAtCommit(commitSha) {
  fetch(
    "https://raw.githubusercontent.com/Microsoft/join-dev-design/" +
      commitSha +
      "/docs/index.html"
  )
    .then(function(response) {
      response.text().then(function(commitBodyHtml) {
        var spacer = "<hr>" + window.currentCommitIndex + " Commits Ago: <hr>";
        document.getElementById("renderPreviousCommitNode").innerHTML +=
          spacer + commitBodyHtml;
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

function timeTravelBack() {
  if (window.currentCommitIndex === window.commits.length) {
    alert("You are currently at the first commit.");
    return;
  }

  window.currentCommitIndex += 1;
  var nextCommitSha = window.commits[window.currentCommitIndex].sha;
  setHTMLAsLastTimeChanged(nextCommitSha);
}
