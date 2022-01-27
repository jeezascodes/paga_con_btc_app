export const changeColorWebView = (background, textColor) => `
    document.body.style.backgroundColor = "${background}"; 
    document.body.style.color = "${textColor}";
    const x = document.getElementsByTagName("strong");
    for (let i = 0; i < x.length; i++) {
        x[i].style.color = "${textColor}";
    };
    `;
export const filterByCategory = (selector, text) => `
setTimeout(() => {
 var elements = document.getElementsByClassName("${selector}");
    [].filter.call(elements, function(element){
        element.classList.remove("hide-filter")
      if(!RegExp("${text}").test(element.textContent)){
        element.classList.add("hide-filter")
       }
    });
}, 100);
    `;
