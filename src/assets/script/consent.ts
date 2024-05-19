


(function () {
    const bannerElm = document.getElementById("cookie-consent-banner") as HTMLDivElement;
    const btnAccept = document.getElementById("btn-accept-all") as HTMLButtonElement;
    const btnAcceptSome = document.getElementById("btn-accept-some") as HTMLButtonElement;
    const btnRejectAll = document.getElementById("btn-reject-all") as HTMLButtonElement;
    const footerElm = document.getElementById("page-footer") as HTMLDivElement;

    function togglePadding(isOpen: boolean) {
        if (footerElm === null) { return; }
        if (isOpen === false) {
            footerElm.style.paddingBottom = `0px`;
        } else {
            const bannerHeight = bannerElm.getBoundingClientRect().height;
            footerElm.style.paddingBottom = `${bannerHeight}px`;
        }
    }

    function hideBanner() {
        bannerElm.style.display = "none";
        togglePadding(false);
    }

    if (localStorage.getItem("consentMode") === null) {
        btnAccept.addEventListener("click", function () {
            setConsent({
                necessary: true,
                analytics: true,
                preferences: true,
                marketing: true,
            });
            hideBanner();
        });
        btnAcceptSome.addEventListener("click", function () {
            setConsent({
                necessary: true,
                analytics: (document.getElementById("consent-analytics") as HTMLInputElement).checked,
                preferences: (document.getElementById("consent-preferences") as HTMLInputElement).checked,
                marketing: (document.getElementById("consent-marketing") as HTMLInputElement).checked,
            });
            hideBanner();
        });
        btnRejectAll.addEventListener("click", function () {
            setConsent({
                necessary: false,
                analytics: false,
                preferences: false,
                marketing: false,
            });
            hideBanner();
        });
        bannerElm.style.display = "block";
        togglePadding(true);
    }

    function setConsent(consent) {
        const consentMode = {
            functionality_storage: consent.necessary ? "granted" : "denied",
            security_storage: consent.necessary ? "granted" : "denied",
            ad_storage: consent.marketing ? "granted" : "denied",
            analytics_storage: consent.analytics ? "granted" : "denied",
            personalization: consent.preferences ? "granted" : "denied",
        };

        //@ts-ignore
        gtag("consent", "update", consent);
        localStorage.setItem("consentMode", JSON.stringify(consentMode));
    }
}());