(this["webpackJsonpodin-book-front-end"]=this["webpackJsonpodin-book-front-end"]||[]).push([[0],{57:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(27),c=a.n(r),i=a(20),o=(a(35),a(12)),l=(a(57),a(4)),u=a.n(l),d=a(10),b=a(6),m=a(5),j=(a(59),a(2)),p=a(30),f=a(28),h=new(a.n(f).a);function g(){return(g=Object(d.a)(u.a.mark((function e(){var t,a,n=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:"",e.next=3,fetch(t,{method:"GET",headers:{Accept:"application/json",Authorization:"Bearer ".concat(localStorage.getItem("jwt"))}});case 3:return a=e.sent,e.abrupt("return",a.json());case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var v=function(){return g.apply(this,arguments)},O=(a(60),a(0));var w=function(e){var t=e.type,a=e.size;return Object(O.jsx)("div",{className:"BootstrapSpinner",children:Object(O.jsx)("div",{className:"spinner-".concat(t," text-primary"),style:{width:a,height:a},role:"status",children:Object(O.jsx)("span",{className:"visually-hidden",children:"Loading..."})})})};var x=function(e){var t=e.alert,a=e.onAlertDelete;return Object(n.useEffect)((function(){var e=setTimeout((function(){return a(t.id)}),1e4);return function(){return clearTimeout(e)}}),[t,a]),Object(O.jsxs)("div",{className:"alert alert-".concat(t.type||"danger"," d-flex align-items-center alert-dismissible mb-1"),role:"alert","data-id":t.id,children:[function(e){var t=24;switch(e){case"success":return Object(O.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:t,fill:"currentColor",className:"bi bi-check-circle-fill flex-shrink-0 me-2",viewBox:"0 0 16 16",role:"img","aria-label":"Success:",children:Object(O.jsx)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"})});case"info":return Object(O.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:t,fill:"currentColor",className:"bi bi-info-circle-fill flex-shrink-0 me-2",viewBox:"0 0 16 16",role:"img","aria-label":"Info:",children:Object(O.jsx)("path",{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"})});case"warning":case"danger":default:return Object(O.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:t,fill:"currentColor",className:"bi bi-exclamation-circle-fill flex-shrink-0 me-2",viewBox:"0 0 16 16",role:"img","aria-label":"warning"===e?"Warning:":"Danger:",children:Object(O.jsx)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})})}}(t.type),Object(O.jsx)("div",{children:t.msg}),Object(O.jsx)("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:function(){a(t.id)}})]})};var y=function(e){var t=e.alerts,a=e.onAlertDelete;return Object(O.jsx)(O.Fragment,{children:t.map((function(e){return Object(O.jsx)(x,{alert:e,onAlertDelete:a},e.id)}))})},N=a(11),k=a(14);var S=function(){var e=Object(n.useState)(!1),t=Object(m.a)(e,2),a=t[0],s=t[1];return Object(n.useEffect)((function(){return s(!0),function(){return s(!1)}}),[]),a};function C(){return(C=Object(d.a)(u.a.mark((function e(){var t,a,n,s,r=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"",a=r.length>1&&void 0!==r[1]?r[1]:{},n=r.length>2&&void 0!==r[2]&&r[2],e.next=5,fetch(t,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("jwt"))},body:JSON.stringify(a)});case 5:return s=e.sent,e.abrupt("return",n?s:s.json());case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var F=function(){return C.apply(this,arguments)};function I(e){var t=e.className,a=e.text,n=e.loadingText,s=e.disabled,r=e.isSubmitting;return Object(O.jsx)("button",{type:"submit",className:t,disabled:s||r,children:r?Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("span",{className:"spinner-border spinner-border-sm fw-bold",role:"status","aria-hidden":"true"}),n]}):Object(O.jsx)("span",{className:"fw-bold",children:a})})}I.defaultProps={className:"",text:"Submit",disabled:!1};var E=I;var U=function(e){var t=e.setCurrentUser,a=S(),s=Object(n.useState)({firstName:"",lastName:"",email:"",password:"",passwordConfirmation:""}),r=Object(m.a)(s,2),c=r[0],i=r[1],l=Object(n.useState)(!1),j=Object(m.a)(l,2),p=j[0],f=j[1];function h(e){var t=e.target,a=t.name,n=t.value;i((function(e){return Object(b.a)(Object(b.a)({},e),{},Object(k.a)({},a,n))}))}function g(e){var t=e.target,a=t.parentNode.querySelectorAll(".invalid-feedback");if(0!==a.length){t.classList.remove("is-invalid");var n,s=Object(N.a)(a);try{for(s.s();!(n=s.n()).done;){n.value.remove()}}catch(r){s.e(r)}finally{s.f()}}}function v(){var e=document.getElementById("signUpForm");if(e){var t=e.querySelectorAll(".invalid-feedback");if(0===t.length)return;var a,n=e.querySelectorAll("input"),s=Object(N.a)(n);try{for(s.s();!(a=s.n()).done;){a.value.classList.remove("is-invalid")}}catch(i){s.e(i)}finally{s.f()}var r,c=Object(N.a)(t);try{for(c.s();!(r=c.n()).done;){r.value.remove()}}catch(i){c.e(i)}finally{c.f()}}}function w(){return(w=Object(d.a)(u.a.mark((function e(n){var s,r,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=function(e){var t,a=document.getElementById("signUpForm"),n=Object(N.a)(e);try{for(n.s();!(t=n.n()).done;){var s=t.value,r=a.querySelector("input[name='".concat(s.param,"']")),c=r.parentNode;r.classList.add("is-invalid");var i=document.createElement("div");i.classList.add("invalid-feedback");var o=document.createTextNode(s.msg);i.appendChild(o),c.insertAdjacentElement("beforeend",i)}}catch(l){n.e(l)}finally{n.f()}},n.preventDefault(),v(),f(!0),e.prev=4,e.next=7,F("".concat("https://odin-book-api-60312.herokuapp.com","/users"),c);case 7:r=e.sent,f(!1),r.err?window.alerts([{msg:r.err.message}]):r.errors?(l=r.errors.some((function(e){return"email"===e.param})),a&&i({firstName:r.user.firstName,lastName:r.user.lastName,email:l?"":r.user.email,password:"",passwordConfirmation:""}),s(r.errors)):(o.Modal.getInstance(document.getElementById("signUpModal")).hide(),localStorage.setItem("jwt",r.jwt),t(r.user),window.alerts([{msg:"You have successfuly signed up",type:"success"}])),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(4),f(!1),window.alerts([{msg:e.t0.message}]);case 16:case"end":return e.stop()}}),e,null,[[4,12]])})))).apply(this,arguments)}return Object(n.useEffect)((function(){document.getElementById("signUpModal").addEventListener("hidden.bs.modal",(function(e){v(),i({firstName:"",lastName:"",email:"",password:"",passwordConfirmation:""})}))}),[]),Object(O.jsxs)("form",{onSubmit:function(e){return w.apply(this,arguments)},id:"signUpForm",children:[Object(O.jsx)("div",{className:"mb-3",children:Object(O.jsx)("input",{type:"text",className:"form-control",placeholder:"First name","aria-label":"First name",name:"firstName",value:c.firstName,onChange:h,onFocus:g})}),Object(O.jsx)("div",{className:"mb-3",children:Object(O.jsx)("input",{type:"text",className:"form-control",placeholder:"Last name","aria-label":"Last name",name:"lastName",value:c.lastName,onChange:h,onFocus:g})}),Object(O.jsx)("div",{className:"mb-3",children:Object(O.jsx)("input",{type:"text",className:"form-control",placeholder:"Email","aria-label":"Email",name:"email",value:c.email,onChange:h,onFocus:g})}),Object(O.jsx)("div",{className:"mb-3",children:Object(O.jsx)("input",{type:"password",className:"form-control",placeholder:"Password","aria-label":"Password",name:"password",value:c.password,onChange:h,onFocus:g})}),Object(O.jsx)("div",{className:"mb-3",children:Object(O.jsx)("input",{type:"password",className:"form-control",placeholder:"Password confirmation","aria-label":"Password confirmation",name:"passwordConfirmation",value:c.passwordConfirmation,onChange:h,onFocus:g})}),Object(O.jsx)(E,{className:"btn btn-success btn-lg w-100 rounded-3",text:"Sign Up",loadingText:"Signing Up...",isSubmitting:p})]})};var B=function(e){var t=e.setCurrentUser;return Object(O.jsx)("div",{className:"modal fade",id:"signUpModal",tabIndex:"-1","aria-labelledby":"signUpModalLabel","aria-hidden":"true",children:Object(O.jsx)("div",{className:"modal-dialog",children:Object(O.jsxs)("div",{className:"modal-content",children:[Object(O.jsxs)("div",{className:"modal-header",children:[Object(O.jsx)("h3",{className:"modal-title",id:"signUpModalLabel",children:"Sign Up"}),Object(O.jsx)("button",{type:"button",className:"btn-close","aria-label":"Close","data-modal-id":"signUpModal",onClick:function(e){var t=e.target.dataset.modalId;o.Modal.getInstance(document.getElementById(t)).hide()}})]}),Object(O.jsx)("div",{className:"modal-body",children:Object(O.jsx)(U,{setCurrentUser:t})})]})})})};window.fbAsyncInit=function(){window.FB.init({appId:"".concat("945137412920931"),cookie:!0,xfbml:!0,version:"v10.0"}),window.FB.AppEvents.logPageView()},function(e,t,a){var n,s=e.getElementsByTagName(t)[0];e.getElementById(a)||((n=e.createElement(t)).id=a,n.src="https://connect.facebook.net/en_US/sdk.js",s.parentNode.insertBefore(n,s))}(document,"script","facebook-jssdk");var A=function(e){var t=e.setIsLoading,a=e.setCurrentUser,s=S(),r=Object(n.useState)({email:"",password:""}),c=Object(m.a)(r,2),i=c[0],l=c[1],j=Object(n.useState)(!1),p=Object(m.a)(j,2),f=p[0],h=p[1],g=Object(n.useState)(void 0),v=Object(m.a)(g,2),w=v[0],x=v[1],y=Object(n.useState)(!1),C=Object(m.a)(y,2),I=C[0],U=C[1],B=Object(n.useState)({}),A=Object(m.a)(B,2),L=A[0],M=A[1];function T(e){var t=e.target,a=t.name,n=t.value;l((function(e){return Object(b.a)(Object(b.a)({},e),{},Object(k.a)({},a,n))}))}function z(){return(z=Object(d.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.preventDefault(),h(!0),e.next=5,F("".concat("https://odin-book-api-60312.herokuapp.com","/auth/local"),i);case 5:n=e.sent,h(!1),n.err?(s&&l((function(e){return Object(b.a)(Object(b.a)({},e),{},{password:""})})),window.alerts([{msg:n.err.message}])):(localStorage.setItem("jwt",n.jwt),a(n.currentUser),window.alerts([{msg:"You have successfuly signed in",type:"success"}])),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),h(!1),window.alerts([{msg:e.t0.message}]);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}return Object(n.useEffect)((function(){var e=setTimeout((function(){window.FB?(x(!0),window.FB.getLoginStatus((function(e){M(e)}))):(x(!1),window.alerts([{msg:"Facebook button is disabled because the Facebook SDK is blocked.",type:"info"}]))}),1500);return function(){return clearTimeout(e)}}),[]),Object(O.jsxs)("form",{onSubmit:function(e){return z.apply(this,arguments)},className:"p-4 bg-white rounded-3 shadow",children:[Object(O.jsx)("div",{className:"mb-3",children:Object(O.jsx)("input",{type:"text",className:"form-control form-control-lg",placeholder:"Email","aria-label":"Email",disabled:I,name:"email",value:i.email,onChange:T})}),Object(O.jsx)("div",{className:"mb-3",children:Object(O.jsx)("input",{type:"password",className:"form-control form-control-lg",placeholder:"Password","aria-label":"Password",disabled:I,name:"password",value:i.password,onChange:T})}),Object(O.jsx)(E,{className:"btn btn-primary btn-lg w-100 rounded-3 mb-2",text:"Sign In",loadingText:"Signing In...",disabled:I,isSubmitting:f}),Object(O.jsxs)("button",{type:"button",className:"btn btn-primary btn-lg w-100 rounded-3",disabled:!w||I,onClick:function(){var e;function n(e){return s.apply(this,arguments)}function s(){return(s=Object(d.a)(u.a.mark((function e(n){var s,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(!0),e.prev=1,e.next=4,F("".concat("https://odin-book-api-60312.herokuapp.com","/auth/facebook"),{userAccessToken:n.authResponse.accessToken},!0);case 4:return s=e.sent,e.next=7,s.json();case 7:(r=e.sent).err?window.alerts([{msg:r.err.message}]):(localStorage.setItem("jwt",r.jwt),a(r.currentUser),window.alerts([{msg:"You have successfuly ".concat(200===s.status?"signed in":"signed up"),type:"success"}])),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),window.alerts([{msg:e.t0.message}]);case 14:t(!1);case 15:case"end":return e.stop()}}),e,null,[[1,11]])})))).apply(this,arguments)}function r(e){return!(!e||!e.data_access_expiration_time)&&1e3*e.authResponse.data_access_expiration_time<=Date.now()}function c(e,t){if(e&&e.authResponse&&e.authResponse.grantedScopes){var a,n=e.authResponse.grantedScopes.split(","),s=t.split(","),r=Object(N.a)(s);try{for(r.s();!(a=r.n()).done;){var c=a.value;if(!n.includes(c))return!1}}catch(i){r.e(i)}finally{r.f()}return!0}return!1}function i(e,t){if(e&&e.authResponse&&e.authResponse.grantedScopes){var a,n=e.authResponse.grantedScopes.split(","),s=t.split(","),r="",c=Object(N.a)(s);try{for(c.s();!(a=c.n()).done;){var i=a.value;n.includes(i)||(r.length>0&&(r+=","),r+=i)}}catch(o){c.e(o)}finally{c.f()}return r}return t}function o(e){U(!0),window.FB.login((function(e){U(!1),M(e),function(e){"connected"===e.status&&(r(e)||!c(e,"public_profile,email")?window.alerts([{msg:"Facebook email is required. Please select the Facebook button again.",type:"info"}]):n(e))}(e)}),Object(b.a)(Object(b.a)({scope:i(e,"public_profile,email")},"connected"===e.status?r(e)?{auth_type:"reauthorize"}:c(e,"public_profile,email")?{}:{auth_type:"rerequest"}:{}),{},{return_scopes:!0}))}w&&!I&&("connected"!==(e=L).status||r(e)||!c(e,"public_profile,email")?o(e):n(e))},children:[Object(O.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",fill:"#fff",className:"bi bi-facebook",viewBox:"0 0 16 16",role:"img","aria-label":"Facebook icon",children:Object(O.jsx)("path",{d:"M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"})}),Object(O.jsx)("span",{className:"fw-bold ms-2",children:"Continue with Facebook"})]}),Object(O.jsx)("div",{className:"border-bottom my-4"}),Object(O.jsx)("button",{type:"button",className:"btn btn-success btn-lg w-100 rounded-3","data-modal-id":"signUpModal",disabled:I,onClick:function(e){var t=e.target.dataset.modalId;new o.Modal(document.getElementById(t)).show()},children:Object(O.jsx)("span",{className:"fw-bold pe-none",children:"Create New Account"})})]})};a(62);var L=function(e){var t=e.setIsLoading,a=e.setCurrentUser;return Object(O.jsx)("div",{className:"container mt-4",children:Object(O.jsx)("div",{className:"row justify-content-center",children:Object(O.jsxs)("div",{className:"col-sm-10 col-md-8 col-lg-6",children:[Object(O.jsx)("h1",{className:"sign-in-h1 text-primary text-center fw-bold mb-4",children:"Odin Book"}),Object(O.jsx)("section",{children:Object(O.jsx)(A,{setIsLoading:t,setCurrentUser:a})})]})})})};var M=function(){var e=Object(n.useState)(!0),t=Object(m.a)(e,2),a=t[0],s=t[1],r=Object(n.useState)([]),c=Object(m.a)(r,2),i=c[0],o=c[1],l=Object(n.useState)(null),f=Object(m.a)(l,2),g=f[0],x=f[1];return Object(n.useEffect)((function(){h.addListener("alerts",(function(e){var t=e.map((function(e){return Object(b.a)(Object(b.a)({},e),{},{id:Object(p.a)()})}));o((function(e){return e.concat(t)}))}))}),[]),Object(n.useEffect)((function(){window.alerts=function(e){return h.emit("alerts",e)}}),[]),Object(n.useEffect)((function(){function e(){return(e=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v("".concat("https://odin-book-api-60312.herokuapp.com","/users/current-user"));case 3:t=e.sent,x(t.currentUser),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),x(!1),window.alerts([{msg:e.t0.message}]);case 11:s(!1);case 12:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),a?Object(O.jsx)(w,{type:"grow",size:"3em"}):Object(O.jsxs)(O.Fragment,{children:[i.length>0&&Object(O.jsx)("div",{className:"container",children:Object(O.jsx)("div",{className:"row justify-content-center",children:Object(O.jsx)("div",{className:"col-md-8",children:Object(O.jsx)(y,{alerts:i,onAlertDelete:function(e){var t=i.filter((function(t){return t.id!==e}));o(t)}})})})}),Object(O.jsx)("main",{children:Object(O.jsxs)(j.d,{children:[Object(O.jsx)(j.b,{exact:!0,path:"/",children:g?Object(O.jsx)(j.a,{to:"/posts"}):Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(B,{setCurrentUser:x}),Object(O.jsx)(L,{setIsLoading:s,setCurrentUser:x})]})}),Object(O.jsx)(j.b,{exact:!0,path:"/posts",children:g?Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("h1",{children:"TODO: timeline"}),JSON.stringify(g)]}):Object(O.jsx)(j.a,{to:"/"})})]})})]})},T=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,73)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,r=t.getLCP,c=t.getTTFB;a(e),n(e),s(e),r(e),c(e)}))};a(68).config(),c.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(i.a,{children:Object(O.jsx)(M,{})})}),document.getElementById("root")),T()}},[[72,1,2]]]);
//# sourceMappingURL=main.bf9c7810.chunk.js.map