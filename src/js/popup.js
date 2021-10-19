function randomlyClickWikipediaLink() {
  const contentBody = document.querySelector("#content");
  const links = Array.from(contentBody.querySelectorAll("a"));
  const goodLinks = links.filter(
    (l) => l.getAttribute("href")?.slice(0, 1) === "/"
     && l.getAttribute("href")?.slice(1, 2) !== "/"
  );
  const randomIndex = Math.floor(Math.random() * goodLinks.length);
  goodLinks[randomIndex].click();
  console.log(goodLinks);
}

function executeRandomlyClickedLink() {
  chrome.tabs.query(
    { active: true, currentWindow: true, windowType: "normal" },
    function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: {
          tabId: activeTab.id,
          allFrames: true,
        },
        func: randomlyClickWikipediaLink,
      });
    }
  );
}

document.querySelector("#button").onclick = executeRandomlyClickedLink;