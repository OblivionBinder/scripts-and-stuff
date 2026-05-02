/**
 * Returns all of the registered extension commands for this extension
 * and their shortcut (if active).
 *
 * Since there is only one registered command in this sample extension,
 * the returned `commandsArray` will look like the following:
 *    [{
 *       name: "toggle-feature",
 *       description: "Send a 'toggle-feature' event to the extension"
 *       shortcut: "Ctrl+Shift+U"
 *    }]
 */
console.log("started script")


let gettingAllCommands = browser.commands.getAll();
gettingAllCommands.then((commands) => {
  for (let command of commands) {
    // Note that this logs to the Add-on Debugger's console: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Debugging
    // not the regular Web console.
    console.log(command); 
  }
});

async function paragraphsToClipboard() {
  console.log("inserting paragraphs to clipboard")

  const type = "text/plain";
  const clipboardItemData = {
    [type]: "paragraphs response" 
  }
  const clipboardItem = new ClipboardItem(clipboardItemData);
  await navigator.clipboard.write([clipboardItem]);
  console.log("finished inserting pgs to cb")
}

async function getClipboardParagraphs() {
  try {
    console.log("trying to retrieve cbpgs")

    paragraphsToClipboard()

    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        const paragraphsText = await clipboardItem.getType(type);
        
        // we can now use blob here
      }
    }
  } catch (err) {
    console.log("failed to retrieve cbpgs")

    if (err instanceof Error) {
      console.error(err.name, err.message);
    } else {
      console.log("Bwuh!?! Invalid Error!")
    }
  }
}


/**
 * Fired when a registered command is activated using a keyboard shortcut.
 *
 * In this sample extension, there is only one registered command: "Ctrl+Shift+U".
 * On Mac, this command will automatically be converted to "Command+Shift+U".
 */
browser.commands.onCommand.addListener(async (command) => {
  if (command === "paragraphs") {
    try {
      getClipboardParagraphs()
    } catch (err) {
      console.error("Injection failed:", err);
    } 
  }
});
