var Slider = {
    init: function() {
        var slides = document.querySelectorAll('.slides--item');
        var currentIndex = slides.length - 1;

        setInterval(function() {
            slides[currentIndex].setAttribute("style", "opacity: 0");
            currentIndex--;
            if (currentIndex == -1) {
                currentIndex = slides.length - 1;
                for (var i = 0; i < slides.length; i++) {
                    slides[i].setAttribute("style", "");
                }
            }
        }, 4000);
    }
}
