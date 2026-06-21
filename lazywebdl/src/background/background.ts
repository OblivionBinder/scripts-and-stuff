// import redirectedSites from './src/background/sites.ts';

console.log("background.ts running, rr script ready0");

var test = {
  match: "*://*.royalroad.com/*",
  regex: `(?:\S)*(:\/\/)(?:\S)*(.royalroad.com)\/`,
  targetString: "www.royalroad.com",
  replacementString: "www.dmi.dk"  
}

var xitter = {
  match: "*://*.x.com/*",
  regex: `(?:\S)*(:\/\/)(?:\S)*(.royalroad.com)\/`,
  targetString: "www.x.com",
  replacementString: "www.xcancel.com"
};

var reddit = {
  match: "*://*.reddit.com/*",
  regex: `(?:\S)*(:\/\/)(?:\S)*(.royalroad.com)\/`,
  targetString: "www.reddit.com",
  replacementString: "old.reddit.com"
};

var redirectedSites: Map<string, any> = new Map();
redirectedSites.set("test", test)
redirectedSites.set("xitter", xitter)
redirectedSites.set("reddit", reddit)



function redirectTest(requestDetails: any) {
  let redirect = "URL NOT FOUND!?!";

  for (const value of redirectedSites.values()) {
    let webSearch = new RegExp(`${value.regex}`);
    if (requestDetails.url.search(webSearch)) {
      redirect = requestDetails.url.replace("www.reddit.com", "old.reddit.com");
      console.log(`redirecting from ${requestDetails.url} to ${redirect}`);

    }

  }



  // const redirect = requestDetails.url.replace("royalroad.com", "dmi.dk");

  return {
    redirectUrl:
      redirect,
  };  
};


browser.webRequest.onBeforeRequest.addListener(
  redirectTest, 
  { urls: [test.match, xitter.match, reddit.match] }, 
  ["blocking"],
);
console.log("Listener registered:", browser.webRequest.onBeforeRequest.hasListener(redirectTest));

// browser.commands.onCommand.addListener((command) => {
//   if (command === "run-command") {
//     console.log("Custom command triggered!");
//     // Add your logic here
//   }
// });


