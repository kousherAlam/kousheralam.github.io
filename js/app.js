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
    menu_button.addEventListener("click",function(){
        addClass(main_menu, 'open');
    });
    close_btn.addEventListener("click",function(){
        removeClass(main_menu, 'open');
    })
}())