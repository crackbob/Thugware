function AutoRejoin () {
    let mainSDKInstance = this;
    if (AutoRejoin.interval) {
        clearInterval(AutoRejoin.interval);
        AutoRejoin.interval = undefined;
    } else {
        AutoRejoin.interval = setInterval(function() {
            if (mainSDKInstance.hooks.frame.document.getElementsByClassName("zm-btn zm-btn-legacy zm-btn--primary")?.[0]?.innerText == "Exit" || document.getElementsByClassName("zm-btn zm-btn-legacy zm-btn--primary zm-btn__outline--blue")?.[0]?.innerText === "Leave") {
                localStorage.clear();
                sessionStorage.clear();
                mainSDKInstance.hooks.frame.location.reload();
            }
        }, 1000);
    }
}

export default AutoRejoin;