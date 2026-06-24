
function addJoinButton () {
    const heading = Array.from(document.querySelectorAll("h1")).find(el => el.textContent == "Join meeting");

    if (!heading) return;

    let container = heading.parentElement;
    if (!container) return;

    const buttons = container.querySelectorAll("button");

    if (buttons.length >= 2) return;

    const firstBtn = buttons[0];
    if (!firstBtn) return;

    const newBtn = firstBtn.cloneNode(true);

    const label = newBtn.querySelector("*");
    if (label) label.textContent = "Join from Browser";

    newBtn.onclick = (e) => {
        e.stopPropagation();
        location.href = location.href.replace("/j/", "/wc/join/")+ "?ref_from=launch&fromPWA=1";
    };

    firstBtn.parentElement.appendChild(newBtn);

}

function ForceWebJoin () {
    let mainSDKInstance = this;

    if (ForceWebJoin.interval) {
        clearInterval(ForceWebJoin.interval);
        ForceWebJoin.interval = undefined;
    } else {
        ForceWebJoin.interval = setInterval(addJoinButton, 1000);
        addJoinButton();
    }
}

export default ForceWebJoin;