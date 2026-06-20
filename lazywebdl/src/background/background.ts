console.log("background.ts running, rr script ready3");

let testURL = "*://*.royalroad.com/*";

function redirectTest(requestDetails: any) {
  console.log(`about to redirect`);

  const redirect = requestDetails.url.replace("royalroad.com", "dmi.dk");
  // const redirect = requestDetails.url.replace("www.royalroad.com", "https://www.royalroad.com/fiction/122502/path-of-the-deathless-stubbing-book-1-early-march");
  console.log(`redirecting from ${requestDetails.url} to ${redirect}`);

  return {
    redirectUrl:
      redirect,
  };  
};

console.log("passed by redirectTest");

browser.webRequest.onBeforeRequest.addListener(
  redirectTest, 
  { urls: [testURL] }, 
  ["blocking"],
);
console.log("Listener registered:", browser.webRequest.onBeforeRequest.hasListener(redirectTest));

// browser.commands.onCommand.addListener((command) => {
//   if (command === "run-command") {
//     console.log("Custom command triggered!");
//     // Add your logic here
//   }
// });


