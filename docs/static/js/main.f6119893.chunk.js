(this.webpackJsonpcashback=this.webpackJsonpcashback||[]).push([[0],{26:function(e,c,t){},29:function(e,c,t){},30:function(e,c,t){},31:function(e,c,t){},32:function(e,c,t){},33:function(e,c,t){},34:function(e,c,t){},35:function(e,c,t){},36:function(e,c,t){},37:function(e,c,t){},38:function(e,c,t){},39:function(e,c,t){"use strict";t.r(c);var n=t(1),a=t.n(n),i=t(13),s=t.n(i),o=t(7),r=t(16),l=t(17),u=t(5),b=t(2),j=t(10),d=t(14),O=t(15),h=function(){function e(c){Object(d.a)(this,e),this.creationDate=c.creationDate||new Date,this.id=c.id||"".concat(this.creationDate.getTime()),this.name=c.name,this.phone=c.phone,this.transactions=c.transactions||[],this.cashbackBalance=this.cashbackBalanceFromTransactions}return Object(O.a)(e,[{key:"lastTransaction",get:function(){return this.transactions.sort((function(e,c){return c.date-e.date}))[0]}},{key:"cashbackBalanceFromTransactions",get:function(){return this.transactions.reduce((function(e,c){return e+c.value}),0)}},{key:"addTransaction",value:function(e){this.transactions.push(Object(b.a)({},e)),this.cashbackBalance+=e.value}}]),e}();h.filter=function(e,c){if("name"===c.by&&c.value.length){var t=c.value.toLowerCase().split(" ").filter((function(e){return e.trim().length}));return e.filter((function(e){return t.every((function(c){return e.name.trim().toLowerCase().includes(c)}))}))}return e},h.sort=function(e,c){return e.sort((function(e,t){var n="asc"===c.direction?e[c.by]:t[c.by],a="asc"===c.direction?t[c.by]:e[c.by];return"lastTransaction"===c.by?n.date-a.date:"name"===c.by||"phone"===c.by?n.localeCompare(a):n-a}))};var m=h,f=t(0),v=a.a.createContext({});function x(){var e=a.a.useContext(v);return{addClient:e.addClient,editClient:e.editClient,addTransaction:e.addTransaction}}var C=function(e){var c=e.children,t=Object(n.useState)([]),a=Object(u.a)(t,2),i=a[0],s=a[1],o=Object(n.useCallback)((function(e){var c=new m(e);e.initialCashback&&c.addTransaction({date:c.creationDate,value:e.initialCashback}),s([].concat(Object(j.a)(i),[c]))}),[i]),r=Object(n.useCallback)((function(e,c){var t=new m(Object(b.a)(Object(b.a)({},i.find((function(c){return c.id===e}))),c));s([].concat(Object(j.a)(i.filter((function(c){return c.id!==e}))),[t]))}),[i]),l=Object(n.useCallback)((function(e,c){e.addTransaction(c);var t=new m(Object(b.a)(Object(b.a)({},i.find((function(c){var t=c.id;return e.id===t}))),e));s([].concat(Object(j.a)(i.filter((function(c){var t=c.id;return e.id!==t}))),[t]))}),[i]);return Object(f.jsx)(v.Provider,{value:{clients:i,addClient:o,editClient:r,addTransaction:l},children:c})},p=t(4),k=t.p+"static/media/logo.ff172001.png";t(26);var g=function(e){var c=e.className,t=Object(p.a)(e,["className"]);return Object(f.jsxs)("header",Object(b.a)(Object(b.a)({className:"header".concat(c?" ".concat(c):"")},t),{},{children:[Object(f.jsx)("div",{className:"gradient"}),Object(f.jsx)("img",{src:k,className:"logo",alt:"Escudo Geek"})]}))},N=t(6);t(29);var y=function(e){var c=e.theme,t=void 0===c?"regular":c,n=e.className,a=e.children,i=Object(p.a)(e,["theme","className","children"]);return Object(f.jsx)("button",Object(b.a)(Object(b.a)({className:"button ".concat(t).concat(n?" ".concat(n):"")},i),{},{children:a}))};t(30);var S=function(e){var c=e.icon,t=e.text,n=e.className,a=e.style,i=Object(p.a)(e,["icon","text","className","style"]);return Object(f.jsxs)("div",{className:"input".concat(n?" ".concat(n):""),style:a,children:[(null===c||void 0===c?void 0:c.length)&&Object(f.jsx)(N.a,{icon:["fas",c],className:"left-icon"}),(null===t||void 0===t?void 0:t.length)&&Object(f.jsx)("span",{className:"left-text",children:t}),Object(f.jsx)("input",Object(b.a)({autoComplete:"none"},i))]})};t(31);var T=function(e){var c=e.onSearch,t=e.onAddClient,a=e.className,i=Object(p.a)(e,["onSearch","onAddClient","className"]),s=Object(n.useState)(""),o=Object(u.a)(s,2),r=o[0],l=o[1],j=Object(n.useCallback)((function(e){var t;if(l((null===e||void 0===e||null===(t=e.target)||void 0===t?void 0:t.value)||""),c){var n,a,i=null===e||void 0===e||null===(n=e.target)||void 0===n||null===(a=n.value)||void 0===a?void 0:a.trim();c((null===i||void 0===i?void 0:i.length)?i:"")}}),[c]),d=Object(n.useCallback)((function(e){j()}),[j]);return Object(f.jsxs)("section",Object(b.a)(Object(b.a)({className:"action-bar".concat(a?" ".concat(a):"")},i),{},{children:[Object(f.jsx)(S,{icon:"search",type:"text",placeholder:"Buscar por nome...",value:r,onChange:j}),r.trim().length>0&&Object(f.jsx)(N.a,{icon:["fas","times-circle"],className:"clear-icon",onClick:d}),Object(f.jsx)(y,{theme:"primary",onClick:t,children:"Adicionar cliente"})]}))};function B(e){var c=e.column,t=e.icon,a=e.label,i=e.sorting,s=e.onSort,o=Object(n.useCallback)((function(){s&&s({by:c,direction:i.by!==c||"desc"===i.direction?"asc":"desc"})}),[c,i,s]);return Object(f.jsx)("th",{children:Object(f.jsxs)("h3",{onClick:o,children:[Object(f.jsx)(N.a,{icon:["fas",t],className:"column-icon"}),a,i.by===c&&Object(f.jsx)(N.a,{icon:["fas","caret-".concat("asc"===i.direction?"down":"up")],className:"sorting-icon"})]})})}var L=function(e){var c=e.sorting,t=e.onSort;return Object(f.jsx)("tr",{children:M.map((function(e,n){return Object(f.jsx)(B,Object(b.a)(Object(b.a)({},e),{},{sorting:c,onSort:t}),n)}))})};function w(e){var c,t=e.column,a=e.client,i=e.onClick,s=Object(n.useCallback)((function(){i&&i({column:t,client:a})}),[t,a,i]),o=Object(n.useMemo)((function(){return"https://wa.me/55".concat(a.phone,"?text=Voc\xea ainda tem R$ ").concat(F(a.cashbackBalance)," de cashback aqui na loja. Aproveita e d\xe1 uma passada aqui!")}),[a]);switch(t){case"name":return Object(f.jsx)("td",{children:Object(f.jsxs)("span",{onClick:s,children:[a.name,Object(f.jsx)(N.a,{icon:["fas","user-edit"],className:"edit-icon"})]})});case"phone":return Object(f.jsx)("td",{children:(null===(c=a.phone)||void 0===c?void 0:c.length)>0&&Object(f.jsxs)("a",{target:"_blank",rel:"noreferrer",href:o,children:[a.phone,Object(f.jsx)(N.a,{icon:["fab","whatsapp"],className:"edit-icon"})]})});case"lastTransaction":return Object(f.jsx)("td",{children:Object(f.jsxs)("span",{onClick:s,children:[a.lastTransaction?a.lastTransaction.date.toLocaleString():"-",Object(f.jsx)(N.a,{icon:["fas","donate"],className:"edit-icon"})]})});case"cashbackBalance":return Object(f.jsx)("td",{children:Object(f.jsxs)("span",{onClick:s,children:[a.cashbackBalance?"R$ ".concat(F(a.cashbackBalance)):"-",Object(f.jsx)(N.a,{icon:["fas","donate"],className:"edit-icon"})]})});default:return null}}function A(){return Object(f.jsx)("tr",{children:Object(f.jsxs)("td",{colSpan:"999",className:"empty",children:[Object(f.jsx)(N.a,{icon:["fas","ban"],className:"empty-icon"}),Object(f.jsx)("span",{className:"message",children:"Nenhum cliente encontrado."}),Object(f.jsx)("span",{className:"tip",children:'Adicione novos clientes clicando em "Adicionar cliente"!'})]})})}function F(e){return e.toFixed(2).replace(".",",")}var D=function(e){var c=e.search,t=e.sorting,i=e.onClick,s=function(e,c){var t=a.a.useContext(v).clients,i=Object(n.useMemo)((function(){return m.filter(t,{by:"name",value:e})}),[e,t]);return Object(n.useMemo)((function(){return m.sort(i,c)}),[i,c])}(c,t);return s.length?s.map((function(e){return Object(f.jsx)("tr",{children:M.map((function(c,t){return Object(f.jsx)(w,Object(b.a)(Object(b.a)({},c),{},{client:e,onClick:i}),t)}))},e.id)})):Object(f.jsx)(A,{})};t(32);var M=[{column:"name",icon:"user",label:"Cliente"},{column:"phone",icon:"phone",label:"Telefone"},{column:"lastTransaction",icon:"receipt",label:"\xdaltimo lan\xe7amento"},{column:"cashbackBalance",icon:"coins",label:"Cashback"}],R=function(e){var c=e.search,t=e.onClick,a=e.className,i=Object(p.a)(e,["search","onClick","className"]),s=Object(n.useState)({by:"name",direction:"asc"}),o=Object(u.a)(s,2),r=o[0],l=o[1];return Object(f.jsxs)("table",Object(b.a)(Object(b.a)({className:"clients-list".concat(a?" ".concat(a):"")},i),{},{children:[Object(f.jsx)("thead",{children:Object(f.jsx)(L,{sorting:r,onSort:l})}),Object(f.jsx)("tbody",{children:Object(f.jsx)(D,{search:c,sorting:r,onClick:t})})]}))};t(33);var $=function(e){var c=e.title,t=e.cancelLabel,a=void 0===t?"Cancelar":t,i=e.onCancel,s=e.confirmLabel,o=void 0===s?"Confirmar":s,r=e.onConfirm,l=e.className,u=e.children,j=Object(p.a)(e,["title","cancelLabel","onCancel","confirmLabel","onConfirm","className","children"]),d=Object(n.useCallback)((function(e){e.preventDefault(),r&&r()}),[r]);return Object(f.jsx)("div",Object(b.a)(Object(b.a)({className:"dialog".concat(l?" ".concat(l):"")},j),{},{children:Object(f.jsx)("form",{onSubmit:d,children:Object(f.jsxs)("section",{className:"content-container",children:[(null===c||void 0===c?void 0:c.length)>0&&Object(f.jsx)("header",{className:"title",children:Object(f.jsx)("h2",{children:c})}),Object(f.jsx)("div",{className:"content",children:u}),Object(f.jsxs)("footer",{className:"action",children:[Boolean(i)&&Object(f.jsx)(y,{type:"button",onClick:i,children:a}),Boolean(r)&&Object(f.jsx)(y,{type:"submit",theme:"primary",children:o})]})]})})}))};t(34);var E=function(e){var c=e.client,t=e.onCancel,a=Object(p.a)(e,["client","onCancel"]),i=Object(n.useState)(c.name||""),s=Object(u.a)(i,2),o=s[0],r=s[1],l=Object(n.useState)(c.phone||""),j=Object(u.a)(l,2),d=j[0],O=j[1],h=Object(n.useState)(""),m=Object(u.a)(h,2),v=m[0],C=m[1],k=x(),g=k.addClient,N=k.editClient,y=Object(n.useMemo)((function(){return"".concat(c.id?"Editar":"Adicionar"," cliente")}),[c]),T=Object(n.useMemo)((function(){return c.id?"".concat(c.name," est\xe1 acumulando cashback com o Escudo Geek desde ").concat(c.creationDate.toLocaleDateString(),"!"):"Adicione um novo cliente para come\xe7ar a acumular cashback com o Escudo Geek!"}),[c]),B=Object(n.useCallback)((function(){var e={name:o,phone:d,initialCashback:v};c.id?N(c.id,e):g(e),t&&t()}),[c,o,d,v,g,N,t]);return Object(f.jsxs)($,Object(b.a)(Object(b.a)({},a),{},{title:y,onCancel:t,onConfirm:B,className:"client-dialog",children:[Object(f.jsx)("p",{children:T}),Object(f.jsx)(S,{type:"text",icon:"user",placeholder:"Nome",value:o,onChange:function(e){return r(e.target.value)},className:"name",autoFocus:!0,required:!0}),Object(f.jsx)(S,{type:"tel",icon:"phone",placeholder:"Telefone",value:d,onChange:function(e){return O(e.target.value)},maxLength:11,className:"phone"}),!c.id&&Object(f.jsx)(S,{type:"number",icon:"coins",text:"R$",placeholder:"Cashback inicial",value:v,onChange:function(e){return C(e.target.valueAsNumber||"")},min:0,step:"any",className:"initial-cashback"})]}))};t(35);function q(e){return e.toFixed(2).replace(".",",")}var G=function(e){var c=e.client,t=e.onCancel,n=Object(p.a)(e,["client","onCancel"]),a=1===c.transactions.length?"o":"os";return Object(f.jsxs)($,Object(b.a)(Object(b.a)({},n),{},{title:"Movimenta\xe7\xf5es de ".concat(c.name),cancelLabel:"OK",onCancel:t,className:"transaction-dialog",children:[Object(f.jsxs)("p",{children:[c.name," tem ",c.transactions.length," lan\xe7ament",a," registrad",a,"!"]}),Object(f.jsxs)("table",{children:[Object(f.jsx)("tbody",{children:c.transactions.sort((function(e,c){return e.date-c.date})).map((function(e){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{className:"date",children:e.date.toLocaleString()}),Object(f.jsxs)("td",{className:e.value>0?"increased":"decreased",children:["R$ ",q(e.value)]})]},e.date.getTime())}))}),Object(f.jsx)("tfoot",{children:Object(f.jsx)("tr",{children:Object(f.jsxs)("td",{colSpan:"2",children:["Cashback: R$ ",q(c.cashbackBalance)]})})})]})]}))};t(36);var P=function(e){var c,t=e.client,a=e.onCancel,i=Object(p.a)(e,["client","onCancel"]),s=Object(n.useState)(""),o=Object(u.a)(s,2),r=o[0],l=o[1],j=Object(n.useState)(!1),d=Object(u.a)(j,2),O=d[0],h=d[1],m=x().addTransaction,v=Object(n.useMemo)((function(){return-1*t.cashbackBalance}),[t]),C=Object(n.useMemo)((function(){return r>0?"increase":r<0?"decrease":"same"}),[r]),k=Object(n.useCallback)((function(){m(t,{date:new Date,value:r}),a&&a()}),[t,r,a,m]),g=Object(n.useCallback)((function(){h(!0)}),[]),y=Object(n.useCallback)((function(){h(!1)}),[]);return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)($,Object(b.a)(Object(b.a)({},i),{},{title:"Lan\xe7ar cashback",onCancel:a,onConfirm:k,className:"transaction-form-dialog",children:[Object(f.jsxs)("p",{children:["Adicione cashback para ",t.name," informando um valor positivo, ou remova com um valor negativo. O valor ser\xe1 lan\xe7ado com a data e hora de agora."]}),Object(f.jsxs)("div",{className:"balance-container",children:[Object(f.jsx)(S,{type:"number",icon:"coins",text:"R$",placeholder:"Valor do cashback",value:r,onChange:function(e){return l(e.target.valueAsNumber||"")},required:!0,autoFocus:!0,min:v,step:"any"}),Object(f.jsxs)("div",{className:"balance-message ".concat(C),children:["R$ ",(c=t.cashbackBalance+(r||0),c.toFixed(2).replace(".",","))]})]}),Object(f.jsxs)("p",{className:"history",onClick:g,children:[Object(f.jsx)(N.a,{icon:["fas","receipt"],className:"history-icon"}),"Ver hist\xf3rico de lan\xe7amentos"]})]})),O&&Object(f.jsx)(G,{client:t,onCancel:y})]})};t(37);var V=function(){var e=Object(n.useState)(""),c=Object(u.a)(e,2),t=c[0],a=c[1],i=Object(n.useState)(),s=Object(u.a)(i,2),o=s[0],r=s[1],l=Object(n.useState)(!1),b=Object(u.a)(l,2),j=b[0],d=b[1],O=Object(n.useState)(!1),h=Object(u.a)(O,2),m=h[0],v=h[1],x=Object(n.useCallback)((function(e){a(e)}),[]),p=Object(n.useCallback)((function(){r({name:t}),d(!0)}),[t]),k=Object(n.useCallback)((function(){d(!1),r()}),[]),N=Object(n.useCallback)((function(){v(!1),r()}),[]),y=Object(n.useCallback)((function(e){var c=e.client,t=e.column;r(c),"name"===t?d(!0):v(!0)}),[]);return Object(f.jsx)(C,{children:Object(f.jsxs)("div",{className:"app",children:[Object(f.jsx)(g,{}),Object(f.jsx)(T,{onSearch:x,onAddClient:p}),Object(f.jsx)(R,{search:t,onClick:y}),j&&Object(f.jsx)(E,{client:o,onCancel:k}),m&&Object(f.jsx)(P,{client:o,onCancel:N})]})})},I=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,40)).then((function(c){var t=c.getCLS,n=c.getFID,a=c.getFCP,i=c.getLCP,s=c.getTTFB;t(e),n(e),a(e),i(e),s(e)}))};t(38);o.b.add(r.a,l.a),s.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(V,{})}),document.getElementById("root")),I()}},[[39,1,2]]]);
//# sourceMappingURL=main.f6119893.chunk.js.map