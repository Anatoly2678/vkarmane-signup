webpackJsonp([6],{0:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var r=a(1),i=n(r),l=a(29),o=n(l),s=a(43),c=n(s),d=a(48),u=n(d),f=i["default"].createClass({displayName:"SigninPage",render:function(){return i["default"].createElement("div",null,i["default"].createElement("div",{className:"header clearfix"},i["default"].createElement(c["default"],null)),i["default"].createElement(u["default"],null))}});o["default"].render(i["default"].createElement(f,null),document.getElementById("content"))},14:function(e,t,a){var n,r;!function(i){var l=!1;if(n=i,r="function"==typeof n?n.call(t,a,t,e):n,!(void 0!==r&&(e.exports=r)),l=!0,e.exports=i(),l=!0,!l){var o=window.Cookies,s=window.Cookies=i();s.noConflict=function(){return window.Cookies=o,s}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var a=arguments[e];for(var n in a)t[n]=a[n]}return t}function t(a){function n(t,r,i){var l;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},n.defaults,i),"number"==typeof i.expires){var o=new Date;o.setMilliseconds(o.getMilliseconds()+864e5*i.expires),i.expires=o}try{l=JSON.stringify(r),/^[\{\[]/.test(l)&&(r=l)}catch(s){}return r=a.write?a.write(r,t):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape),document.cookie=[t,"=",r,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}t||(l={});for(var c=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,u=0;u<c.length;u++){var f=c[u].split("="),m=f.slice(1).join("=");'"'===m.charAt(0)&&(m=m.slice(1,-1));try{var p=f[0].replace(d,decodeURIComponent);if(m=a.read?a.read(m,p):a(m,p)||m.replace(d,decodeURIComponent),this.json)try{m=JSON.parse(m)}catch(s){}if(t===p){l=m;break}t||(l[p]=m)}catch(s){}}return l}}return n.set=n,n.get=function(e){return n.call(n,e)},n.getJSON=function(){return n.apply({json:!0},[].slice.call(arguments))},n.defaults={},n.remove=function(t,a){n(t,"",e(a,{expires:-1}))},n.withConverter=t,n}return t(function(){})})},48:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(14),i=n(r),l=a(1),o=n(l);t["default"]=o["default"].createClass({displayName:"signin-form",getInitialState:function(){return{email:"",password:"",showAlert:!1,alertText:"",waiting:!1}},render:function(){var e=o["default"].createElement("div",{className:"alert alert-danger",role:"alert"},o["default"].createElement("small",null,this.state.alertText));return o["default"].createElement("form",{className:"form-signin",onSubmit:this.handleSubmit},o["default"].createElement("h2",{className:"form-signin-heading"},"Вход"),o["default"].createElement("div",{className:"form-signin-heading-underline"}),this.state.showAlert?e:null,o["default"].createElement("div",{className:"form-group"},o["default"].createElement("label",{htmlFor:"inputEmail"},"Ваш e-mail"),o["default"].createElement("input",{type:"email",id:"inputEmail",className:"form-control",placeholder:"Укажите ваш e-mail",required:!0,autoFocus:!0,value:this.state.email,onChange:this.handleEmailChange,readOnly:this.state.waiting})),o["default"].createElement("div",{className:"form-group"},o["default"].createElement("label",{htmlFor:"inputPassword"},"Пароль"),o["default"].createElement("input",{type:"password",id:"inputPassword",className:"form-control",placeholder:"Введите пароль",required:!0,value:this.state.password,onChange:this.handlePasswordChange,readOnly:this.state.waiting})),o["default"].createElement("div",{className:"row"},o["default"].createElement("div",{className:"col-sm-6"},o["default"].createElement("button",{type:"submit",className:"btn btn-primary btn-block",readOnly:this.state.waiting},this.state.waiting?"Вход...":"Войти")),o["default"].createElement("div",{className:"col-sm-6"},o["default"].createElement("button",{type:"button",onClick:this.handleRecovery,className:"btn btn-link btn-block",style:{paddingLeft:"0",paddingRight:"0"}},"Забыли пароль?"))))},handleEmailChange:function(e){this.setState({email:e.target.value})},handlePasswordChange:function(e){this.setState({password:e.target.value})},handleSubmit:function(e){e.preventDefault(),this.setState({waiting:!0}),$.ajax({type:"POST",url:"/ServiceModel/AuthService.svc/Login",data:JSON.stringify({TimeZoneOffset:(new Date).getTimezoneOffset(),UserName:this.state.email,UserPassword:this.state.password,WorkspaceName:"Default"}),contentType:"application/json",dataType:"json",success:this.handleLoginResult,error:this.handleLoginError})},handleLoginResult:function(e){return this.setState({waiting:!1}),0!=e.Code?void this.setState({password:"",showAlert:!0,alertText:e.Message}):void $.ajax({type:"POST",url:"/0/rest/LeadGeneratorService/SaveReferralIntoSession",data:JSON.stringify({param:i["default"].get("lead_generator_referral")}),contentType:"application/json",dataType:"json",success:function(){return location.href="/0/Nui/ViewModule.aspx"},error:function(e,t,a){console.error(a),location.href="/0/Nui/ViewModule.aspx"}})},handleLoginError:function(e,t,a){this.setState({showAlert:!0,alertText:a.toString(),waiting:!1})},handleRecovery:function(){location.replace("/recovery.html")}})}});
//# sourceMappingURL=signin.bundle.js.map