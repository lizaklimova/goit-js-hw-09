const t={body:document.querySelector("body"),start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")};let e=null;t.start.addEventListener("click",(function(){e=setInterval((()=>{t.stop.disabled=!1,t.start.disabled=!0,t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.stop.addEventListener("click",(function(){clearInterval(e),t.start.disabled=!1,t.stop.disabled=!0}));
//# sourceMappingURL=01-color-switcher.0ee9b1b0.js.map
