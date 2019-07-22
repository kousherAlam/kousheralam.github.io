(function(){
    function _(id){return document.getElementById(id);}
    function addClass(element){
        
    }
    function removeClass(element){}
    function show(element){}
    function hide(element){}
    function sendMessage(element){}


    (function(){
        var contactForm = _("contact-form");
        var message = _("sending-message");
        var overflow = "overflow-hidden";
        var open = "open";
        contactForm.addEventListener("submit", function(){
            document.body.classList.add(overflow)
            message.classList.add(open);
    
            setTimeout(function(){
                message.classList.remove(open); 
                document.body.classList.remove(overflow)
            }, 3000);
        });
    }());
}());