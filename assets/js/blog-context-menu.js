/**
 * This script is used for creating context menu in the blog. 
 * here is the at a glance overview 
 * The main immidiate invoke block of function is called after page loaded
 * It called 
 * @param { createContextMenu } RootElement 
 * to create the context menu and register a 
 * @param { Scroll Event } onDocument
 * to spy the on the document and when certain element comes into view 
 * it detect it and highlight the context menu... 
 * This guide created at 15-may-2020 and updated at 15-may-2020
 */


(function () {
    var isDesktopMedia = null;
    var isDesktopMediaMatch = false;
    var hidexContextMenuButton = document.getElementById("hide-context-menu-btn");


    // if matchMedia api support and screen size change
    if (window.matchMedia) {
        isDesktopMedia = window.matchMedia("(min-width: 992px)");
        isDesktopMedia.addEventListener("change", function (e) {
            if (e.matches) {
                bodyScroll(true);
            } else {
                var isContextMenuOpen = hidexContextMenuButton.getAttribute("data-hidden");
                if (isContextMenuOpen === "false") {
                    bodyScroll(true);
                } else {
                    bodyScroll(true);
                }
            }
        });
    }


    /**
     * Detect The device is desktop or no 
     */
    function isDesktop() {
        if (isDesktopMedia) {
            isDesktopMediaMatch = isDesktopMedia.matches;
            if (isDesktopMediaMatch) {
                return true;
            }
        } else {
            if (window.innerWidth >= 992) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * @param {boolean} isContextMenuOpen 
     */
    function bodyScroll(isContextMenuOpen) {
        if (isDesktop()) {
            document.body.style.overflow = "auto";
        } else {
            if (isContextMenuOpen) {
                document.body.style.overflow = "auto";
            } else {
                document.body.style.overflow = "hidden";
            }
        }
        if (isContextMenuOpen) {
            hidexContextMenuButton.setAttribute("data-hidden", "false");
        } else {
            hidexContextMenuButton.setAttribute("data-hidden", "true");
        }
    }

    function hideContextMenuCMD(contextMenu, contextMenuButton){
        bodyScroll(true);
        contextMenuButton.setAttribute("data-hidden", "true");
        contextMenuButton.classList.add('closed');
        contextMenu.classList.add("closed");
        setTimeout(function () {
            contextMenu.classList.remove("closed");
            contextMenu.style.display = 'none';
            contextMenuButton.removeAttribute("disabled");
        }, 250);
    }

    function openContextMenuCMD(contextMenu, contextMenuButton){
        bodyScroll(false);
        contextMenuButton.setAttribute("data-hidden", "false");
        contextMenu.style.display = 'block';
        contextMenuButton.classList.remove('closed');
        contextMenu.classList.add("open");
        setTimeout(function () {
            contextMenu.classList.remove("open");
            contextMenuButton.removeAttribute("disabled");
        }, 200);
    }


    hidexContextMenuButton.addEventListener("click", function () {
        this.setAttribute("disabled", true);
        var isHidden = this.getAttribute("data-hidden");
        var contextMenu = document.getElementById("main-context-menu");
        if (isHidden == "false") {
            hideContextMenuCMD(contextMenu, this);
        } else {
            openContextMenuCMD(contextMenu, this);
        }
    });



    /**
     * Create a div element and return it. 
     * It will use to make context menu holder. 
     */
    function createContextMenuElement() {
        var elm = document.createElement("div");
        elm.classList.add("context-menu")
        return elm;
    }


    /**
     * This function will create a link element for context menu
     * add a event listener, if someone click on it, it will take 
     * to that position 
     * @param {string} id , the link point to 
     * @param {string} innerText 
     */
    function createTitleLink(id, innerText) {
        var link = document.createElement("a");

        var maxChar = 32;
        if (innerText.length > maxChar) {
            var dot = '';
            for (var i = 0; i < 5; i++) {
                dot += "<span class+'dot'>.</span>";
            }
            innerText = innerText.substr(0, maxChar) + dot;
        }
        link.innerHTML = innerText;
        link.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (!isDesktop()) {
                var contextMenu = document.getElementById("main-context-menu");
                hideContextMenuCMD(contextMenu, hidexContextMenuButton);
            }

            var elm = document.getElementById(id);
            if (elm) {
                var goToPx = elm.offsetTop ? elm.offsetTop - 50 : 50;
                document.scrollingElement.scrollTop = goToPx;
            }
        });
        link.setAttribute("data-target", id);
        link.href = "#" + id;
        return link;
    }


    /**
     * 
     * @param {string} innerText What will be the txt
     * @param {string} typeOfElm header type
     * @param {string} id link id 
     */
    function createTitle(innerText, typeOfElm, id) {
        typeOfElm = typeOfElm || "h2";
        var elm = document.createElement(typeOfElm);
        if (id) {
            elm.setAttribute("data-targetto", id);
        } else {
            id = Date.now().toString();
        }
        elm.appendChild(createTitleLink(id, innerText));
        return elm;
    }



    var scrollSpyTrack = [];

    (function () {
        var contextMenu = createContextMenuElement();
        contextMenu.id = "main-context-menu";
        // contextMenu.appendChild(contextHideButton());
        var deptLevel = 0;
        var currentElement = null;

        // do some iniital work 
        bodyScroll(true);


        /**
         * 
         * @param {DOMElement} elms The main / root element to began iteration 
         */
        function createContextMenu(elms) {
            if (!elms || elms.length <= 0) {
                return;
            }
            for (var i = 0; i < elms.length; i++) {
                var nodeName = elms[i].nodeName.toUpperCase();
                var element = elms[i];
                if (nodeName === "P") {
                    continue;
                } else if (nodeName === "SVG") {
                    continue;
                } else if (nodeName === "FORM") {
                    continue;
                } else if (nodeName === "SPAN") {
                    continue;
                } else if (nodeName === "SPAN") {
                    continue;
                }

                if (nodeName === "H2") {
                    var title = createTitle(elms[i].innerHTML, 'h2', elms[i].id);
                    contextMenu.appendChild(title);
                    deptLevel = 1;
                    scrollSpyTrack.push([element.offsetTop, element, title]);
                    continue;
                } else if (nodeName === "H3") {
                    var title = createTitle(elms[i].innerHTML, 'h3', elms[i].id);
                    if (deptLevel === 1) {
                        deptLevel = 2;
                        var menu = createContextMenuElement();
                        menu.appendChild(title);
                        contextMenu.appendChild(menu);
                        currentElement = menu;
                    } else if (deptLevel === 2) {
                        currentElement.appendChild(title);
                    } else if (deptLevel === 3) {
                        deptLevel = 2;
                        currentElement.parentElement.appendChild(title);
                    }
                    scrollSpyTrack.push([element.offsetTop, element, title]);
                    continue;
                } else if (nodeName === "H4") {
                    console.log("need to work with h4");
                }
                if (elms[i].hasChildNodes) {
                    createContextMenu(elms[i].children);
                }
            }
        }

        // create initial context menu
        createContextMenu(document.querySelectorAll(".the-blog-post"));



        var mainMenu = document.getElementById("the-blog-post");
        mainMenu.prepend(contextMenu);
        var prevActive = null;

        if (isDesktop()) {
            openContextMenuCMD(contextMenu, hidexContextMenuButton);
        } else {
            hideContextMenuCMD(contextMenu, hidexContextMenuButton);
        }

        if (window.matchMedia) {
            window.matchMedia("(min-width: 992px)").addEventListener('change', function (e) {
                if (e.matches) {
                    openContextMenuCMD(contextMenu, hidexContextMenuButton);
                } else {
                    hideContextMenuCMD(contextMenu, hidexContextMenuButton);
                }
            });
        }



        window.addEventListener("scroll", function () {
            if (prevActive && prevActive.length > 0) {
                prevActive[2].classList.remove("active");
            }
            var currentOnScreen = [];
            var scrolled = document.scrollingElement.scrollTop;
            var windowHeight = window.innerHeight;
            var viewprot = scrolled + windowHeight;

            for (var i = 0; i < scrollSpyTrack.length; i++) {
                var pos = scrollSpyTrack[i][0];
                if (pos >= scrolled && pos <= viewprot) {
                    currentOnScreen.push(scrollSpyTrack[i]);
                }
            }
            if (currentOnScreen.length === 0) {
                currentOnScreen.push(prevActive);
            } else {
                prevActive = currentOnScreen[0];
            }
            if (currentOnScreen && currentOnScreen.length > 0) {
                currentOnScreen[0][2].classList.add("active");
                var contextScrollTop = currentOnScreen[0][2].offsetTop;
                contextScrollTop = contextScrollTop - ((windowHeight / 2) + (windowHeight / 4));
                contextMenu.scrollTop = contextScrollTop;
            }
        });
    }());
}());
