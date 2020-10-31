
function toggleMenu(){
    var menu = document.getElementById("mobile-menu");
    console.log('toggle menu is clickeing', menu);
    if(menu.classList.contains('open')){
        menu.classList.remove('open');
    } else {
        menu.classList.add('open');
    }
}
