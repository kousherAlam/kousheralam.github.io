function DOMOPerations(id) {
    var dom = document.getElementById(id);

    function appendHTML(html) {
        dom.innerHTML += html;
    }

    function clearHTML() {
        dom.innerHTML = "";
    }

    function hasClass(className) {}

    function addClass(className) {}

    function removeClass(className) {}

    function fadeOut(time, delay, timingFunc, others) {
        time = time || '500ms';
        delay = delay || '0ms'
        timingFunc = timingFunc || 'linear';
        others = others || '';
        dom.style.animation = `fadeOut ${time} ${delay} ${timingFunc} ${others}`
    }

    function fadeIn(time, delay, timingFunc, others) {
        time = time || '500ms';
        delay = delay || '0ms'
        timingFunc = timingFunc || 'linear';
        others = others || '';
        dom.style.animation = `fadeOut ${time} ${delay} ${timingFunc} ${others}`
    }

    function sequenceAnimation() {
        console.log(arguments);
    }

    return {
        appendHTML,
        clearHTML,
        hasClass,
        addClass,
        removeClass,
        animations: {
            fadeOut, 
            fadeIn, 
            sequenceAnimation,
        }
    }
}

