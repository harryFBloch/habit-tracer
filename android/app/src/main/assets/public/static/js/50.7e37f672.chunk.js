(this["webpackJsonphabbit-tracker"]=this["webpackJsonphabbit-tracker"]||[]).push([[50],{294:function(t,e,i){"use strict";i.r(e),i.d(e,"ion_virtual_scroll",(function(){return a}));var r=i(8),n=i(37),o=i(32),s=function(t,e){var i=h(t,e);return i&&t.ownerDocument?t.ownerDocument.importNode(i.content,!0).children[0]:null},h=function(t,e){switch(e){case"item":return t.querySelector("template:not([name])");case"header":return t.querySelector("template[name=header]");case"footer":return t.querySelector("template[name=footer]")}},l=function(t,e,i,r,n,o,s,h,l,a,c,u){for(var d=[],p=u+c,f=c;f<p;f++){var g,v=t[f];if(n)null!=(g=n(v,f,t))&&d.push({i:a++,type:"header",value:g,index:f,height:i?i(g,f):s,reads:i?0:2,visible:!!i});if(d.push({i:a++,type:"item",value:v,index:f,height:e?e(v,f):l,reads:e?0:2,visible:!!e}),o)null!=(g=o(v,f,t))&&d.push({i:a++,type:"footer",value:g,index:f,height:r?r(g,f):h,reads:r?0:2,visible:!!r})}return d},a=function(){function t(t){var e=this;Object(n.o)(this,t),this.range={offset:0,length:0},this.viewportHeight=0,this.cells=[],this.virtualDom=[],this.isEnabled=!1,this.viewportOffset=0,this.currentScrollTop=0,this.indexDirty=0,this.lastItemLen=0,this.totalHeight=0,this.approxItemHeight=45,this.approxHeaderHeight=30,this.approxFooterHeight=30,this.onScroll=function(){e.updateVirtualScroll()}}return t.prototype.itemsChanged=function(){this.calcCells(),this.updateVirtualScroll()},t.prototype.connectedCallback=function(){return Object(r.a)(this,void 0,void 0,(function(){var t,e;return Object(r.c)(this,(function(i){switch(i.label){case 0:return(t=this.el.closest("ion-content"))?(e=this,[4,t.getScrollElement()]):(console.error("<ion-virtual-scroll> must be used inside an <ion-content>"),[2]);case 1:return e.scrollEl=i.sent(),this.contentEl=t,this.calcCells(),this.updateState(),[2]}}))}))},t.prototype.componentDidUpdate=function(){this.updateState()},t.prototype.disconnectedCallback=function(){this.scrollEl=void 0},t.prototype.onResize=function(){this.calcCells(),this.updateVirtualScroll()},t.prototype.positionForItem=function(t){return Promise.resolve(function(t,e,i){var r=e.find((function(e){return"item"===e.type&&e.index===t}));return r?i[r.i]:-1}(t,this.cells,this.getHeightIndex()))},t.prototype.checkRange=function(t,e){return void 0===e&&(e=-1),Object(r.a)(this,void 0,void 0,(function(){var i,n,o;return Object(r.c)(this,(function(r){return this.items?(i=-1===e?this.items.length-t:e,n=function(t,e){var i=t.length>0?t[t.length-1].index:0;return 0===e?0:e===i+1?t.length:t.findIndex((function(t){return t.index===e}))}(this.cells,t),o=l(this.items,this.itemHeight,this.headerHeight,this.footerHeight,this.headerFn,this.footerFn,this.approxHeaderHeight,this.approxFooterHeight,this.approxItemHeight,n,t,i),this.cells=function(t,e,i){if(0===i&&e.length>=t.length)return e;for(var r=0;r<e.length;r++)t[r+i]=e[r];return t}(this.cells,o,n),this.lastItemLen=this.items.length,this.indexDirty=Math.max(t-1,0),this.scheduleUpdate(),[2]):[2]}))}))},t.prototype.checkEnd=function(){return Object(r.a)(this,void 0,void 0,(function(){return Object(r.c)(this,(function(t){return this.items&&this.checkRange(this.lastItemLen),[2]}))}))},t.prototype.updateVirtualScroll=function(){this.isEnabled&&this.scrollEl&&(this.timerUpdate&&(clearTimeout(this.timerUpdate),this.timerUpdate=void 0),Object(n.h)(this.readVS.bind(this)),Object(n.f)(this.writeVS.bind(this)))},t.prototype.readVS=function(){for(var t=this,e=t.contentEl,i=t.scrollEl,r=0,n=t.el;n&&n!==e;)r+=n.offsetTop,n=n.offsetParent;this.viewportOffset=r,i&&(this.viewportHeight=i.offsetHeight,this.currentScrollTop=i.scrollTop)},t.prototype.writeVS=function(){var t=this.indexDirty,e=function(t,e,i){return{top:Math.max(t-i,0),bottom:t+e+i}}(this.currentScrollTop-this.viewportOffset,this.viewportHeight,100),i=this.getHeightIndex(),r=function(t,e,i){for(var r=e.top,n=e.bottom,o=0;o<t.length&&!(t[o]>r);o++);for(var s=Math.max(o-i-1,0);o<t.length&&!(t[o]>=n);o++);return{offset:s,length:Math.min(o+i,t.length)-s}}(i,e,2);(function(t,e,i){return t<=i.offset+i.length||e.offset!==i.offset||e.length!==i.length})(t,this.range,r)&&(this.range=r,function(t,e,i,r){for(var n=0,o=t;n<o.length;n++){var s=o[n];s.change=0,s.d=!0}for(var h=[],l=r.offset+r.length,a=function(r){var n=i[r],o=t.find((function(t){return t.d&&t.cell===n}));if(o){var s=e[r];s!==o.top&&(o.top=s,o.change=1),o.d=!1}else h.push(n)},c=r.offset;c<l;c++)a(c);for(var u=t.filter((function(t){return t.d})),d=function(i){var r=u.find((function(t){return t.d&&t.cell.type===i.type})),n=i.i;r?(r.d=!1,r.change=2,r.cell=i,r.top=e[n]):t.push({d:!1,cell:i,visible:!0,change:2,top:e[n]})},p=0,f=h;p<f.length;p++){d(f[p])}t.filter((function(t){return t.d&&-9999!==t.top})).forEach((function(t){t.change=1,t.top=-9999}))}(this.virtualDom,i,this.cells,r),this.nodeRender?function(t,e,i,r){for(var n,o=Array.from(t.children).filter((function(t){return"TEMPLATE"!==t.tagName})),h=o.length,l=0;l<i.length;l++){var a=i[l],c=a.cell;if(2===a.change){if(l<h)e(n=o[l],c,l);else{var u=s(t,c.type);(n=e(u,c,l)||u).classList.add("virtual-item"),t.appendChild(n)}n.$ionCell=c}else n=o[l];0!==a.change&&(n.style.transform="translate3d(0,"+a.top+"px,0)");var d=c.visible;a.visible!==d&&(d?n.classList.remove("virtual-loading"):n.classList.add("virtual-loading"),a.visible=d),c.reads>0&&(r(c,n),c.reads--)}}(this.el,this.nodeRender,this.virtualDom,this.updateCellHeight.bind(this)):this.domRender?this.domRender(this.virtualDom):this.renderItem&&Object(n.l)(this))},t.prototype.updateCellHeight=function(t,e){var i=this,r=function(){if(e.$ionCell===t){var r=window.getComputedStyle(e),n=e.offsetHeight+parseFloat(r.getPropertyValue("margin-bottom"));i.setCellHeight(t,n)}};e?Object(o.c)(e,r):r()},t.prototype.setCellHeight=function(t,e){var i=t.i;t===this.cells[i]&&(t.height===e&&!0===t.visible||(t.visible=!0,t.height=e,this.indexDirty=Math.min(this.indexDirty,i),this.scheduleUpdate()))},t.prototype.scheduleUpdate=function(){var t=this;clearTimeout(this.timerUpdate),this.timerUpdate=setTimeout((function(){return t.updateVirtualScroll()}),100)},t.prototype.updateState=function(){var t=!(!this.scrollEl||!this.cells);t!==this.isEnabled&&(this.enableScrollEvents(t),t&&this.updateVirtualScroll())},t.prototype.calcCells=function(){this.items&&(this.lastItemLen=this.items.length,this.cells=l(this.items,this.itemHeight,this.headerHeight,this.footerHeight,this.headerFn,this.footerFn,this.approxHeaderHeight,this.approxFooterHeight,this.approxItemHeight,0,0,this.lastItemLen),this.indexDirty=0)},t.prototype.getHeightIndex=function(){return this.indexDirty!==1/0&&this.calcHeightIndex(this.indexDirty),this.heightIndex},t.prototype.calcHeightIndex=function(t){void 0===t&&(t=0),this.heightIndex=function(t,e){if(!t)return new Uint32Array(e);if(t.length===e)return t;if(e>t.length){var i=new Uint32Array(e);return i.set(t),i}return t.subarray(0,e)}(this.heightIndex,this.cells.length),this.totalHeight=function(t,e,i){for(var r=t[i],n=i;n<t.length;n++)t[n]=r,r+=e[n].height;return r}(this.heightIndex,this.cells,t),this.indexDirty=1/0},t.prototype.enableScrollEvents=function(t){var e=this;this.rmEvent&&(this.rmEvent(),this.rmEvent=void 0);var i=this.scrollEl;i&&(this.isEnabled=t,i.addEventListener("scroll",this.onScroll),this.rmEvent=function(){i.removeEventListener("scroll",e.onScroll)})},t.prototype.renderVirtualNode=function(t){var e=t.cell,i=e.type,r=e.value,n=e.index;switch(i){case"item":return this.renderItem(r,n);case"header":return this.renderHeader(r,n);case"footer":return this.renderFooter(r,n)}},t.prototype.render=function(){var t=this;return Object(n.j)(n.c,{style:{height:this.totalHeight+"px"}},this.renderItem&&Object(n.j)(c,{dom:this.virtualDom},this.virtualDom.map((function(e){return t.renderVirtualNode(e)}))))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(n.k)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{itemHeight:["itemsChanged"],headerHeight:["itemsChanged"],footerHeight:["itemsChanged"],items:["itemsChanged"]}},enumerable:!1,configurable:!0}),t}(),c=function(t,e,i){var r=t.dom;return i.map(e,(function(t,e){var i=r[e],n=t.vattrs||{},o=n.class||"";return o+="virtual-item ",i.visible||(o+="virtual-loading"),Object.assign(Object.assign({},t),{vattrs:Object.assign(Object.assign({},n),{class:o,style:Object.assign(Object.assign({},n.style),{transform:"translate3d(0,"+i.top+"px,0)"})})})}))};a.style="ion-virtual-scroll{display:block;position:relative;width:100%;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-virtual-scroll>.virtual-loading{opacity:0}ion-virtual-scroll>.virtual-item{position:absolute !important;top:0 !important;right:0 !important;left:0 !important;-webkit-transition-duration:0ms;transition-duration:0ms;will-change:transform}"}}]);
//# sourceMappingURL=50.7e37f672.chunk.js.map