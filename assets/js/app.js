function toggleMenu(){
    var menu = document.getElementById("mobile-menu");
    if(menu.classList.contains('open')){
        menu.classList.remove('open');
    } else {
        menu.classList.add('open');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('overflow-hidden');
    const loader = document.getElementById('loader-holder');
    if(!loader){ return; }
    loader.parentElement.removeChild(loader);
});
