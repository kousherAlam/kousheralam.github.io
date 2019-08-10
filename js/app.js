
function _(id){return document.getElementById(id);}

function fixedmainMenuOnTop(){
    isOnFixed = false,
    fiexToTopClass = "fixed-top", 
    shadowClass = "shadow", 
    mainMenu = _("main-menu"),
    mainContent = _("main-content"),
    skills = _("skills"),
    imageLink = _('main-menu-image'),
    sizeToCompare = parseInt(getComputedStyle(_("main-header")).height) + 10;
    function fixedOnTop(){
        if(window.innerWidth <= 768){
            mainMenu.classList.add(fiexToTopClass);
            mainMenu.classList.add(shadowClass);
            imageLink.classList.remove("d-none");
            mainContent.classList.add("mt-5");
            skills.classList.add("pt-5");
            isOnFixed = true;
            return;
        }
        var x = window.pageYOffset;
        if(x >= sizeToCompare){
            if(!isOnFixed){
                mainMenu.classList.add(fiexToTopClass);
                mainMenu.classList.add(shadowClass);
                imageLink.classList.remove("d-none");
                mainContent.classList.add("mt-5");
                skills.classList.add("pt-5");
                skills.classList.remove("pt-5");
                isOnFixed = true;
            }
        } else {
            mainMenu.classList.remove(fiexToTopClass);
            mainMenu.classList.remove(shadowClass);
            mainContent.classList.remove("mt-5");
            imageLink.classList.add("d-none");
            isOnFixed = false;
        }
    }

    fixedOnTop();
    window.addEventListener("scroll", fixedOnTop);
    window.addEventListener("resize", function(){
        sizeToCompare = parseInt(getComputedStyle(_("main-header")).height);
        fixedOnTop();
    });
}


function showSkillsDetails(){
    var buttons = document.querySelectorAll("[sheet-toggle]");
    for(var i=0; i<buttons.length; i++){
        buttons[i].addEventListener("click", function(){
            var element_id = this.getAttribute("sheet-toggle");
            var projects= _(element_id);
            if(projects){
                document.body.classList.add("overflow-hidden");
                projects.classList.remove("d-none");
                projects.classList.add("d-block");
            }
            console.log("clicked");
        });
    }
}

(function(){
    fixedmainMenuOnTop();
    showSkillsDetails();
    var shade = _("shade"),
        close_menu_btn = _("close_menu_btn"),
        mobile_menu = _("mobile-menu"),
        allLinks = document.querySelectorAll("#mobile-menu a"),
        open_menu_btn = _("open_menu_btn");
    
    
    function closeMenu(){
        mobile_menu.classList.remove("d-block");
        mobile_menu.classList.add("d-none");
        shade.classList.add("d-none");
        shade.classList.remove("d-block");
    }
    function openMenu(){
        mobile_menu.classList.remove("d-none");
        mobile_menu.classList.remove("d-sm-none");
        mobile_menu.classList.add("d-block");
        shade.classList.remove("d-none");
        shade.classList.add("d-block");
    }
    for(var i=0; i<allLinks.length; i++){
        allLinks[i].addEventListener("click", closeMenu);
    }

    shade.addEventListener("click", closeMenu);
    close_menu_btn.addEventListener("click", closeMenu);
    open_menu_btn.addEventListener("click", openMenu);

    var firebaseConfig = {
        apiKey: "AIzaSyDJPI-v3nsTE5eXSTEE1nhcFlCesj_A5UQ",
        authDomain: "mypersonalsite-451454.firebaseapp.com",
        databaseURL: "https://mypersonalsite-451454.firebaseio.com",
        projectId: "mypersonalsite-451454",
        storageBucket: "mypersonalsite-451454.appspot.com",
        messagingSenderId: "775431614205",
        appId: "1:775431614205:web:62900e7e8dcf152f"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    (function(){
        var contactForm = _("contact-form");
        var messageContainer = _("sending-message");
        var overflow = "overflow-hidden";
        var open = "open";
        var errorClass = "is-invalid";

        var email = _("email"), 
            name = _("name"),
            message = _("message"),
            sendReply = _("reply"); 
        
        var db = firebase.firestore();
        contactForm.addEventListener("submit", function(event){
            event.preventDefault();
            if(email.value.trim().lenght < 5){
                email.classList.add(errorClass);
                return false;
            }
            if(name.value.trim().lenght < 4){
                name.classList.add(errorClass);
                return false;
            }
            if(message.value.trim().lenght < 10){
                message.classList.add(errorClass);
                return false;
            }

            document.body.classList.add(overflow)
            messageContainer.classList.add(open);
            db.collection("messages").add({
                email: email.value,
                message: message.value,
                name: name.value, 
                browser: window.navigator.userAgent,
                reply: !sendReply.getAttribute('checked'),
                created_at: new Date(),
            })
            .then(function(docRef) {
                alert("Successfully Message Sended!");
            })
            .catch(function(error) {
                alert("Error Happend");
            }).then(function(){
                messageContainer.classList.remove(open); 
                document.body.classList.remove(overflow);
                email.value = "";
                name.value = "";
                message.value = "";
            });
        });
    }());
}());