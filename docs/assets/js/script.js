var domReady=function(t){"interactive"===document.readyState||"complete"===document.readyState?t():document.addEventListener("DOMContentLoaded",t)};domReady(function(){Slider.init()});var Slider={init:function(){var t=document.querySelectorAll(".slides--item"),e=t.length-1;e>0&&setInterval(function(){if(t[e].setAttribute("style","opacity: 0"),-1==--e){e=t.length-1;for(var n=0;n<t.length;n++)t[n].setAttribute("style","")}},4e3)}};