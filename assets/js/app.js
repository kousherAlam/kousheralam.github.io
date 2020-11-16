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
    var loader = document.getElementById('loader-holder');
    if(!loader){ return; }
    loader.parentElement.removeChild(loader);
});

window.addEventListener("load", function(){
    var imageViewContainer = document.getElementsByClassName("image-viewer-slider");
    if(imageViewContainer && imageViewContainer.length > 0){
        for(var i=0; i<imageViewContainer.length; i++){
            var loadeing = imageViewContainer[i].querySelector('div.loading');
            var slider = imageViewContainer[i].querySelector('ul.d-none');
            if(loadeing){
                loadeing.parentElement.removeChild(loadeing);
            }
            if(slider){
                slider.classList.remove('d-none');
            }
        }
    }
});