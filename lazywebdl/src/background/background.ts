import 'firefox-webext-browser'

console.log("background.ts running");

let httpsRegex = new RegExp(`(\S*)(?:www)`);

// let xitterURL = "*://x.com/*";
// let xitterRegex = "";

// function redirectXitter(requestDetails: any) {
//   console.log(`Redirecting: ${requestDetails.url}`)
//   let redirect = requestDetails.url;

//   return {
//     redirectUrl:
//       redirect,
//   };
// };

let redditURL = "*://www.reddit.com/*";
let redditRegex = new RegExp(`(?::\/\/www)(.reddit.com\/)(\S*)`);

function redirectReddit(requestDetails: any) {
  console.log(`Redirecting: ${requestDetails.url}`)
  let redirect = requestDetails.url.match(httpsRegex) + `old` + requestDetails.url.match(redditRegex);

  return {
    redirectUrl:
      redirect,
  };  
};

// Listeners
// browser.webRequest.onBeforeRequest.addListener(
//   redirectx, 
//   { urls: [xitterURL] }, 
//   ["blocking"],
// );

browser.webRequest.onBeforeRequest.addListener(
  redirectReddit, 
  { urls: [redditURL] }, 
  ["blocking"],
);

// browser.commands.onCommand.addListener((command) => {
//   if (command === "run-command") {
//     console.log("Custom command triggered!");
//     // Add your logic here
//   }
// });


