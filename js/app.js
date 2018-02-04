function _(id){return document.getElementById(id);}
function addClass(el, className){
    if (el.classList){
        el.classList.add(className);
    }else{
        el.className += ' ' + className;
    }
}
function removeClass(el, className){
    if (el.classList){
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}
function hasClass(el, className){
    if (el.classList){
        return el.classList.contains(className);
    } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
}

(function(){
    var menu_button = _("menubtn");
    var main_menu = _("main-navigation");
    var close_btn = _("close-btn");
    var main_content = _("main-content");
    menu_button.addEventListener("click",function(){
        addClass(main_menu, 'open');
    });
    close_btn.addEventListener("click",function(){
        removeClass(main_menu, 'open');
    })
}());


function selectText(element) {
    var doc = document
        , text = element
        , range, selection
    ;
    if (doc.body.createTextRange) { //ms
        range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { //all others
        selection = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function resetCopyText(elm){
    elm.forEach(function(elem,i){
        var btn = elem.querySelector("button");
        removeClass(btn, 'save-success');
        btn.innerHTML = "Copy";
    })
}

(function(){
    var highlight = document.querySelectorAll(".highlight");
    highlight.forEach(function(elem, i){
        var btn = document.createElement("button");
            addClass(btn, 'save');
            btn.textContent = "Copy";
            elem.appendChild(btn);
            btn.addEventListener("click",function(){
                var code_container = elem.querySelector("code");
                selectText(code_container);
                document.execCommand('copy');
                resetCopyText(highlight);
                btn.innerHTML = 'Copied';
                addClass(btn, 'save-success');
            });
        console.log(elem);
    })
}());