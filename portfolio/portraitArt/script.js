(()=>{"use strict";const e=()=>{let e=!1;function t(t,l,n,o=!1){const s=document.querySelectorAll(t),c=document.querySelector(l),a=document.querySelector(n),r=document.querySelectorAll("[data-modal]"),i=function(){let e=document.createElement("div");e.style.width="50px",e.style.height="50px",e.style.overflowY="scroll",e.style.visibility="hidden",document.body.appendChild(e);let t=e.offsetWidth-e.clientWidth;return e.remove(),t}();s.forEach((t=>{t.addEventListener("click",(l=>{l.target&&l.preventDefault(),e=!0,o&&t.remove(),r.forEach((e=>{e.style.display="none",e.classList.add("animated","fadeIn")})),c.style.display="block",document.body.style.overflow="hidden",document.body.style.marginRight=`${i}px`}))})),a.addEventListener("click",(e=>{r.forEach((e=>{e.style.display="none"})),c.style.display="none",document.body.style.overflow="",document.body.style.marginRight="0px",document.body})),c.addEventListener("click",(e=>{e.target===c&&(r.forEach((e=>{e.style.display="none"})),c.style.display="none",document.body.style.overflow="",document.body.style.marginRight="0px")}))}t(".button-design",".popup-design",".popup-design .popup-close"),t(".fixed-gift",".popup-gift",".popup-gift .popup-close",!0),t(".button-consultation",".popup-consultation",".popup-consultation .popup-close"),window.addEventListener("scroll",(()=>{let t=document.documentElement.scrollHeight,l=document.body.scrollHeight,n=document.documentElement.clientHeight,o=window.scrollY,s=Math.max(l,t);!e&&o+n>=s&&document.querySelector(".fixed-gift").click()}))},t=(e,t,l,n,o=0,s=1,c=4e3)=>{const a=document.querySelectorAll(e);let r=!1,i=a.length-1;function d(e){e>i&&(o=0),e<0&&(o=i),a.forEach((e=>{e.classList.add("animated"),e.style.display="none"})),a[o].style.display="block"}function u(e){d(o+=e)}d(o);try{const e=document.querySelector(l),t=document.querySelector(n);e.addEventListener("click",(()=>{u(-s),a[o].classList.remove("slideInLeft"),a[o].classList.add("slideInRight")})),t.addEventListener("click",(()=>{u(s),a[o].classList.remove("slideInRight"),a[o].classList.add("slideInLeft")}))}catch(e){}function m(){r="vertical"===t?setInterval((()=>{u(s),a[o].classList.add("slideInDown")}),c):setInterval((()=>{u(s),a[o].classList.remove("slideInRight"),a[o].classList.add("slideInLeft")}),c)}a[o].parentNode.addEventListener("mouseenter",(()=>{clearInterval(r)})),a[o].parentNode.addEventListener("mouseleave",(()=>{m()})),m()},l=e=>{function t(e){let t="+375 (___) ___ __ __",l=0,n=t.replace(/\D/g,""),o=this.value.replace(/\D/g,"");n.length>=o.length&&(o=n),this.value=t.replace(/./g,(function(e){return/[_\d]/.test(e)&&l<o.length?o.charAt(l++):l>=o.length?"":e})),"blur"===e.type?2==this.value.length&&(this.value=""):((e,t)=>{if(t.focus(),t.setSelectionRange)t.setSelectionRange(e,e);else if(t.createTextRange){let l=t.createTextRange();l.collapse(!0),l.moveEnd("character",e),l.moveStart("character",e),l.select()}})(this.value.length,this)}document.querySelectorAll(e).forEach((e=>{e.addEventListener("input",t),e.addEventListener("focus",t),e.addEventListener("blur",t)}))},n=e=>{document.querySelectorAll(e).forEach((e=>{e.addEventListener("keypress",(e=>{e.key.match(/[^а-яё 0-9]/gi)&&e.preventDefault()}))}))},o=(e,t)=>{const l=document.querySelectorAll(e);document.querySelectorAll(t),l.forEach((e=>{e.addEventListener("click",(function(e){l.forEach((e=>{e.classList.remove("active-style"),e.nextElementSibling.classList.remove("active-content"),e.nextElementSibling.style.maxHeight="0px"})),this.classList.add("active-style"),this.nextElementSibling.classList.add("active-content"),this.classList.contains("active-style")?this.nextElementSibling.style.maxHeight=this.nextElementSibling.scrollHeight+80+"px":this.nextElementSibling.style.maxHeight="0px"}))}))},s=e=>{const t=document.querySelector(e);window.addEventListener("scroll",(()=>{document.documentElement.scrollTop>1650?(t.classList.add("animated","fadeIn"),t.classList.remove("fadeOut")):(t.classList.add("fadeOut"),t.classList.remove("fadeIn"))}));const l=document.documentElement,n=document.body;t.addEventListener("click",(function(e){let t=Math.round(n.scrollTop||l.scrollTop);if(""!==this.hash){e.preventDefault();let o=document.querySelector(this.hash),s=0;for(;o.offsetParent;)s+=o.offsetTop,o=o.offsetParent;s=Math.round(s),((e,t,o)=>{let s,c;c=t>e?30:-30;let a=setInterval((function(){let r=Math.round(n.scrollTop||l.scrollTop);s===r||t>e&&r>=t||t<e&&r<=t?(clearInterval(a),history.replaceState(history.state,document.title,location.href.replace(/#.*$/g,"")+o)):(n.scrollTop+=c,l.scrollTop+=c,s=r)}),1)})(t,s,this.hash)}}))};window.addEventListener("DOMContentLoaded",(()=>{e(),t(".feedback-slider-item","horizontal",".main-prev-btn",".main-next-btn"),t(".main-slider-item","vertical"),(()=>{const e=document.querySelectorAll("form"),t=document.querySelectorAll("input"),l=document.querySelectorAll("[name='upload']"),n=document.querySelectorAll(".calc_form select");l.forEach((e=>{e.addEventListener("input",(t=>{let l;l=e.files[0].name.split(".")[0].length>6?"...":".";const n=`${e.files[0].name.split(".")[0].slice(0,10)}${l}.${e.files[0].name.split(".")[1]}`;e.previousElementSibling.textContent=n}))})),e.forEach((e=>{e.addEventListener("submit",(o=>{o.preventDefault();let s=document.createElement("div");s.classList.add("status"),e.parentNode.appendChild(s),e.classList.add("animated","fadeOutUp"),setTimeout((()=>{e.style.display="none"}),400);let c=document.createElement("img");c.setAttribute("src","assets/img/spinner.gif"),c.classList.add("animated","fadeInUp"),s.appendChild(c);let a=document.createElement("div");a.textContent="Loading...",s.appendChild(a);const r=new FormData(e),i=document.querySelector(".calc-price").textContent;let d;r.append("price",i),d=e.closest(".popup-design")||e.classList.contains("calc_form")?"assets/server.php":"assets/question.php",(async(e,t)=>{let l=await fetch(e,{method:"POST",body:t});return await l.text()})(d,r).then((e=>{console.log(e),c.setAttribute("src","assets/img/ok.png"),a.textContent="Success"})).catch((()=>{c.setAttribute("src","assets/img/fail.png"),a.textContent="Oh no, Failure"})).finally((()=>{t.forEach((e=>{e.value=""})),l.forEach((e=>{e.previousElementSibling.textContent="Файл не выбран"})),n.forEach((e=>{e.value=""})),setTimeout((()=>{s.remove(),e.style.display="block",e.classList.remove("fadeOutUp"),e.classList.add("fadeInUp")}),5e3)}))}))}))})(),l("[name='phone']"),n("[name='name']"),n("[name='message']"),((e,t)=>{const l=document.querySelector(e);l.addEventListener("click",(()=>{(async e=>{let t=await fetch(e);if(!t.ok)throw new Error(`Could not fetch ${e}, status: ${t.status}`);return await t.json()})("assets/db.json").then((e=>{e.styles.forEach((({src:e,title:l,link:n})=>{let o=document.createElement("div");o.classList.add("animated","fadeInUp","col-sm-3","col-sm-offset-0","col-xs-10","col-xs-offset-1"),o.innerHTML=`\n                <div class="styles-block">\n                    <img src=${e} alt=${l}>\n                    <h4>${l}</h4>\n                    <a href=${n}>Подробнее</a>\n                </div>\n            `,document.querySelector(t).appendChild(o)}))})).catch((e=>console.log(e))),l.remove()}))})(".button-styles","#styles .row"),((e,t,l,n,o)=>{const s=document.querySelector("#size"),c=document.querySelector("#material"),a=document.querySelector("#options"),r=document.querySelector(".promocode"),i=document.querySelector(".calc-price");let d=0;const u=()=>{let e=Number(s.value),t=Number(c.value),l=Number(a.value);d=Math.round(e*t+l),""==s.value||""==c.value?i.textContent="Выберите разиеры и материал портрета.":"IWANTPOPART"===r.value?i.textContent=Math.round(.7*d):i.textContent=d};s.addEventListener("change",u),c.addEventListener("change",u),a.addEventListener("change",u),r.addEventListener("input",u)})(),(()=>{const e=document.querySelector(".portfolio-menu"),t=e.querySelectorAll("li"),l=e.querySelector(".all"),n=e.querySelector(".lovers"),o=e.querySelector(".chef"),s=e.querySelector(".girl"),c=e.querySelector(".guy"),a=e.querySelector(".grandmother"),r=e.querySelector(".granddad"),i=document.querySelector(".portfolio-wrapper"),d=i.querySelectorAll(".all"),u=i.querySelectorAll(".girl"),m=i.querySelectorAll(".lovers"),p=i.querySelectorAll(".chef"),y=i.querySelectorAll(".guy"),f=document.querySelector(".portfolio-no"),h=e=>{d.forEach((e=>{e.style.display="none",e.classList.remove("animated","fadeIn")})),f.style.display="none",f.classList.remove("animated","fadeIn"),e?e.forEach((e=>{e.style.display="block",e.classList.add("animated","fadeIn")})):(f.style.display="block",f.classList.add("animated","fadeIn")),i.style.alignItems="center",i.style.justifyContent="center"};l.addEventListener("click",(e=>{h(d)})),n.addEventListener("click",(e=>{h(m)})),o.addEventListener("click",(e=>{h(p)})),s.addEventListener("click",(e=>{h(u)})),c.addEventListener("click",(e=>{h(y)})),a.addEventListener("click",(e=>{h()})),r.addEventListener("click",(e=>{h()})),e.addEventListener("click",(e=>{let l=e.target;l&&"LI"==l.tagName&&t.forEach((e=>{e.classList.remove("active"),l.classList.add("active")}))}))})(),(e=>{const t=document.querySelectorAll(".sizes-block");t.forEach((e=>{e.addEventListener("mouseover",(()=>{!function(e){const t=e.querySelector("img"),l=e.querySelectorAll("p:not(.sizes-hit)");t.src=`${t.src.slice(0,-4)}-1.png`,l.forEach((e=>{e.style.display="none"}))}(e)}))})),t.forEach((e=>{e.addEventListener("mouseout",(()=>{!function(e){const t=e.querySelector("img"),l=e.querySelectorAll("p:not(.sizes-hit)");t.src=`${t.src.slice(0,-6)}.png`,l.forEach((e=>{e.style.display="block"}))}(e)}))}))})(),o(".accordion-heading"),((e,t)=>{const l=document.querySelector(".burger"),n=document.querySelector(".burger-menu");l.addEventListener("click",(()=>{console.log("click"),"none"===n.style.display&&window.screen.availWidth<993?n.style.display="block":n.style.display="none"})),window.addEventListener("resize",(()=>{window.screen.availWidth>992&&(n.style.display="none")}))})(),s(".pageup"),(()=>{const e=document.querySelectorAll('[name="upload"]');function t(e){e.preventDefault(),e.stopPropagation()}["dragenter","dragleave","dragover","drop"].forEach((l=>{e.forEach((e=>{e.addEventListener(l,t,!1)}))})),["dragenter","dragover"].forEach((t=>{e.forEach((e=>{e.addEventListener(t,(()=>{return(t=e).closest(".file_upload").style.border="5px solid yellow",void(t.closest(".file_upload").style.backgroundColor="rgba(0,0,0, .7)");var t}),!1)}))})),["dragleave","drop"].forEach((t=>{e.forEach((e=>{e.addEventListener(t,(()=>{return(t=e).closest(".file_upload").style.border="none",void(t.closest(".calc_form")?t.closest(".file_upload").style.backgroundColor="#fff":t.closest(".file_upload").style.backgroundColor="#ededed");var t}),!1)}))})),e.forEach((e=>{e.addEventListener("drop",(t=>{let l;e.files=t.dataTransfer.files;const n=e.files[0].name.split(".");l=n[0].length>6?"...":".";const o=n[0].substring(0,6)+l+n[1];e.previousElementSibling.textContent=o}))}))})()}))})();