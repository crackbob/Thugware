function AutoRejoin () {
    let mainSDKInstance = this;
    if (AutoRejoin.interval) {
        clearInterval(AutoRejoin.interval);
        AutoRejoin.interval = undefined;
    } else {
        AutoRejoin.interval = setInterval(function() {
            if (mainSDKInstance.scope.document.getElementsByClassName("zm-btn zm-btn-legacy zm-btn--primary")?.[0]?.innerText == "Exit" || mainSDKInstance.scope.document.getElementsByClassName("zm-btn zm-btn-legacy zm-btn--primary zm-btn__outline--blue")?.[0]?.innerText === "Leave") {
                localStorage.clear();
                sessionStorage.clear();
                mainSDKInstance.scope.localStorage.clear();
                mainSDKInstance.scope.sessionStorage.clear();
                mainSDKInstance.scope.location.reload();
                mainSDKInstance.hooks.recache();
            }
        }, 500);
    }
}

export default AutoRejoin;