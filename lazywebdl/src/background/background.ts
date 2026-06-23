console.log("background.ts running, rr script ready0");

class SiteInfo {
  siteURL: URL;
  match: string;
  targetString: string;
  replacementString: string;

  constructor(url:string, match: string, targetString: string, replacementString: string) {
    this.siteURL = new URL(url)
    this.match = match;
    this.targetString = targetString;
    this.replacementString = replacementString;
  };
};

var test = new SiteInfo(
  "https://www.example.com/",
  "*://*.example.com/*", 
  "example.com", 
  "www.example.org"
);

// var xitter = new SiteInfo(
//   "*://*.x.com/*", 
//   "www.x.com", 
//   "www.xcancel.com");

// var reddit = new SiteInfo(
//   "*://*.reddit.com/*", 
//   "www.reddit.com", 
//   "old.reddit.com");

var redirectedSites: SiteInfo[] = [test];
// var redirectedSites: SiteInfo[] = [test, xitter, reddit];

function redirectTest(requestDetails: any) {
  let requestURL = new URL(requestDetails.url);

  for (const siteInfo of redirectedSites) {
    
    if (requestURL.hostname.endsWith("." + siteInfo.targetString)) {
      requestURL.hostname = siteInfo.replacementString;
      // const redirect = requestURL.hostname siteInfo.replacementString)

      console.log(`redirecting from ${requestDetails.url} to ${requestURL.toString()}`);
      return { redirectUrl: requestURL.toString() };
    }
  }


  // for (const siteInfo of redirectedSites) {
  //   const regex = new RegExp(`^https?://([^/]*\\.)?${siteInfo.targetString}(/|$)`);
    
  //   if (regex.test(requestDetails.url)) {
  //     let redirect = requestDetails.url.replace(siteInfo.targetString, siteInfo.replacementString);
      
  //     console.log(`redirecting from ${requestDetails.url} to ${redirect}`);
      
  //     return { redirectUrl: redirect };  
  //   }
  // }

  return {};
};


browser.webRequest.onBeforeRequest.addListener(
  redirectTest, 
  { urls: [test.match] }, 
  // { urls: [test.match, xitter.match, reddit.match] }, 
  ["blocking"],
);
console.log("Listener registered:", browser.webRequest.onBeforeRequest.hasListener(redirectTest));



