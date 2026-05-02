console.log("CONTENT SCRIPT LOADED");
browser.commands?.onCommand?.addListener?.(runMacro);

async function runMacro(command) {
    if (command !== "paragraphs") return;
    console.log("macro loaded");

    const input = prompt("Two digits (e.g. 37):");
    if (!input || input.length < 2) return;

    const x = input[0];
    const y = input[1];

    const text = `${x}-${y} paragraph response`;

    const el = document.activeElement;

    if (el && (el.tagName === "TEXTAREA" || el.isContentEditable)) {
        el.focus();
        document.execCommand("insertText", false, text);
    } else {
        navigator.clipboard.writeText(text);
    }
}