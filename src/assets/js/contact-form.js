var ContactForm = {
    init: function() {
        var inputs = ["name", "email", "message", "keystring"];

        document.getElementById("contactForm").addEventListener("submit", function(event) {
            event.preventDefault();
            var formData = new FormData(document.forms.contactForm);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/mail.php", true);
            xhr.send(formData);
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                var response = JSON.parse(xhr.response)
                if (response) {
                    var captchaNode = document.getElementById("key");
                    var src = captchaNode.src;
                    captchaNode.src = src + '#' + new Date().getTime();
                    if (response.errors && response.errors.length) {
                        for (var i = 0; i < response.errors.length; i++) {
                            var elementNode = document.getElementById(response.errors[i].field);
                            elementNode.classList.add('__error');
                            if (response.errors[i].field == 'keystring') {
                                elementNode.value = '';
                            }
                        }
                    } else if (response.success) {
                        for (var i = 0; i < inputs.length; i++) {
                            document.getElementById(inputs[i]).value = '';
                        }
                        var messageNode = document.getElementById('success');
                        messageNode.innerHTML = response.success;
                        setTimeout(function() {
                            messageNode.innerHTML = "";
                        }, 5000);
                    }

                }
            }
        });

        for (var i = 0; i < inputs.length; i++) {
            document.getElementById(inputs[i]).addEventListener("focus", function() {
                this.classList.remove('__error');
            });
        }
    }
};
