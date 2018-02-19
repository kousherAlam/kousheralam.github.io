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

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function postForm(url, data, onload, onsuccess, onerror, ontimeout){
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);
    request.onload = function(){
        if(onload){onload();}
    }
    request.onsuccess = function(){
        if(onsuccess){onsuccess();}
    }
    request.onerror = function(){
        if(onerror){onerror();}
    }
    request.ontimeout = function(){
        if(ontimeout){ontimeout();}
    }
}

function contact_form_update(text_to_change){
    _("contact-status-text").innerHTML = text_to_change;
    setTimeout(function(){
        _("contact-form-status").style.display = "none";
    },1000);
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

(function(){
    var send_btn = _("send_contact");
    send_btn.addEventListener("click",function(e){
        var evt = e || window.e || window.event;
        evt.preventDefault();

        var name = _("user_name").value,
            mail_or_phone = _("user_email_or_phone").value,
            message = _("user_message").value,
            name_error = _("name_error"),
            mail_or_phone_error = _("email_phone_error"),
            message_error = _("message_error"),
            can_submit = false;
        
        if( name.length < 2 ){
            can_submit = false;
            name_error.style.display = 'inline-block';
        }else{
            name_error.style.display = 'none';
            can_submit = true;
        }
        if(validateEmail(mail_or_phone)){
            can_submit = true;
            mail_or_phone_error.style.display = 'none';
        }else{
            if(isNumber(mail_or_phone) && mail_or_phone.length > 4){
                can_submit = true;
                mail_or_phone_error.style.display = 'none';
            }else{
                can_submit = false;
                mail_or_phone_error.style.display = 'inline-block';
            }
        }
        if( message.length < 2 ){
            can_submit = false;
            message_error.style.display = 'inline-block';
        }else{
            message_error.style.display = 'none';
            can_submit = true;
        }

        if(can_submit){
            var data = {
                name: name,
                mail_or_phone: mail_or_phone,
                message: message
            }
            postForm('https://graph.facebook.com', data, function(){
                    // onload
                    _("contact-form-status").style.display = "block";
                }, function(){
                    contact_form_update("Successfully Send.");
                }, function(){
                    // onerror
                    contact_form_update("Error !!!!!");
                }, function(){
                    contact_form_update("TimeOUT !!!!!");
                });
        }

    });
}())