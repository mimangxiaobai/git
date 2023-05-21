/*
 Highcharts JS v8.0.4 (2020-03-10)

 ColorAxis module

 (c) 2012-2019 Pawel Potaczek

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/color-axis",["highcharts"],function(m){b(m);b.Highcharts=m;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function m(b,e,w,n){b.hasOwnProperty(e)||(b[e]=n.apply(null,w))}b=b?b._modules:{};m(b,"parts-map/ColorSeriesMixin.js",[b["parts/Globals.js"]],function(b){b.colorPointMixin={setVisible:function(b){var e=this,n=b?
"show":"hide";e.visible=e.options.visible=!!b;["graphic","dataLabel"].forEach(function(b){if(e[b])e[b][n]()})}};b.colorSeriesMixin={optionalAxis:"colorAxis",colorAxis:0,translateColors:function(){var b=this,v=this.options.nullColor,n=this.colorAxis,m=this.colorKey;(this.data.length?this.data:this.points).forEach(function(g){var e=g.getNestedProperty(m);if(e=g.options.color||(g.isNull?v:n&&"undefined"!==typeof e?n.toColor(e,g):g.color||b.color))g.color=e})}}});m(b,"parts-map/ColorAxis.js",[b["parts/Globals.js"],
b["parts/Color.js"],b["parts/Point.js"],b["parts/Legend.js"],b["mixins/legend-symbol.js"],b["parts/Utilities.js"]],function(b,e,m,n,B,g){"";var r=e.parse;e=g.addEvent;var z=g.erase,t=g.extend,v=g.isNumber,x=g.merge,q=g.pick,w=g.splat,p=b.Axis;g=b.Chart;var u=b.Series,C=b.colorPointMixin,A=b.noop;t(u.prototype,b.colorSeriesMixin);t(m.prototype,C);g.prototype.collectionsWithUpdate.push("colorAxis");g.prototype.collectionsWithInit.colorAxis=[g.prototype.addColorAxis];var y=b.ColorAxis=function(){this.init.apply(this,
arguments)};t(y.prototype,p.prototype);t(y.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(p.prototype.keepProps),init:function(a,c){this.coll=
"colorAxis";var h=this.buildOptions.call(a,this.defaultColorAxisOptions,c);p.prototype.init.call(this,a,h);c.dataClasses&&this.initDataClasses(c);this.initStops();this.horiz=!h.opposite;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(a){var c=this.chart,h,d=0,l=c.options.chart.colorCount,b=this.options,f=a.dataClasses.length;this.dataClasses=h=[];this.legendItems=[];a.dataClasses.forEach(function(a,k){a=x(a);h.push(a);if(c.styledMode||!a.color)"category"===b.dataClassColor?
(c.styledMode||(k=c.options.colors,l=k.length,a.color=k[d]),a.colorIndex=d,d++,d===l&&(d=0)):a.color=r(b.minColor).tweenTo(r(b.maxColor),2>f?.5:k/(f-1))})},hasData:function(){return!(!this.tickPositions||!this.tickPositions.length)},setTickPositions:function(){if(!this.dataClasses)return p.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(a){a.color=r(a[1])})},buildOptions:function(a,
c){var h=this.options.legend,d=c.layout?"vertical"!==c.layout:"vertical"!==h.layout;return x(a,{side:d?2:1,reversed:!d},c,{opposite:!d,showEmpty:!1,title:null,visible:h.enabled&&(c?!1!==c.visible:!0)})},setOptions:function(a){p.prototype.setOptions.call(this,a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=this.legendSymbol,c=this.chart,h=c.options.legend||{},d,b;a?(this.left=h=a.attr("x"),this.top=d=a.attr("y"),this.width=b=a.attr("width"),this.height=a=a.attr("height"),
this.right=c.chartWidth-h-b,this.bottom=c.chartHeight-d-a,this.len=this.horiz?b:a,this.pos=this.horiz?h:d):this.len=(this.horiz?h.symbolWidth:h.symbolHeight)||this.defaultLegendLength},normalizedValue:function(a){this.isLog&&(a=this.val2lin(a));return 1-(this.max-a)/(this.max-this.min||1)},toColor:function(a,c){var h=this.stops,d=this.dataClasses,b;if(d)for(b=d.length;b--;){var k=d[b];var f=k.from;h=k.to;if(("undefined"===typeof f||a>=f)&&("undefined"===typeof h||a<=h)){var e=k.color;c&&(c.dataClass=
b,c.colorIndex=k.colorIndex);break}}else{a=this.normalizedValue(a);for(b=h.length;b--&&!(a>h[b][0]););f=h[b]||h[b+1];h=h[b+1]||f;a=1-(h[0]-a)/(h[0]-f[0]||1);e=f.color.tweenTo(h.color,a)}return e},getOffset:function(){var a=this.legendGroup,c=this.chart.axisOffset[this.side];a&&(this.axisParent=a,p.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=c)},setLegendColor:function(){var a=this.reversed;var c=a?1:0;a=a?
0:1;c=this.horiz?[c,0,a,0]:[0,a,0,c];this.legendColor={linearGradient:{x1:c[0],y1:c[1],x2:c[2],y2:c[3]},stops:this.stops}},drawLegendSymbol:function(a,c){var b=a.padding,d=a.options,l=this.horiz,k=q(d.symbolWidth,l?this.defaultLegendLength:12),f=q(d.symbolHeight,l?12:this.defaultLegendLength),e=q(d.labelPadding,l?16:30);d=q(d.itemDistance,10);this.setLegendColor();c.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,k,f).attr({zIndex:1}).add(c.legendGroup);this.legendItemWidth=k+b+(l?d:e);this.legendItemHeight=
f+b+(l?e:0)},setState:function(a){this.series.forEach(function(c){c.setState(a)})},visible:!0,setVisible:A,getSeriesExtremes:function(){var a=this.series,c=a.length,b;this.dataMin=Infinity;for(this.dataMax=-Infinity;c--;){var d=a[c];var l=d.colorKey=q(d.options.colorKey,d.colorKey,d.pointValKey,d.zoneAxis,"y");var k=d.pointArrayMap;var f=d[l+"Min"]&&d[l+"Max"];if(d[l+"Data"])var e=d[l+"Data"];else if(k){e=[];k=k.indexOf(l);var g=d.yData;if(0<=k&&g)for(b=0;b<g.length;b++)e.push(q(g[b][k],g[b]))}else e=
d.yData;f?(d.minColorValue=d[l+"Min"],d.maxColorValue=d[l+"Max"]):(u.prototype.getExtremes.call(d,e),d.minColorValue=d.dataMin,d.maxColorValue=d.dataMax);"undefined"!==typeof d.minColorValue&&(this.dataMin=Math.min(this.dataMin,d.minColorValue),this.dataMax=Math.max(this.dataMax,d.maxColorValue));f||u.prototype.getExtremes.call(d)}},drawCrosshair:function(a,c){var b=c&&c.plotX,d=c&&c.plotY,e=this.pos,k=this.len;if(c){var f=this.toPixels(c.getNestedProperty(c.series.colorKey));f<e?f=e-2:f>e+k&&(f=
e+k+2);c.plotX=f;c.plotY=this.len-f;p.prototype.drawCrosshair.call(this,a,c);c.plotX=b;c.plotY=d;this.cross&&!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.chart.styledMode||this.cross.attr({fill:this.crosshair.color}))}},getPlotLinePath:function(a){var c=a.translatedValue;return v(c)?this.horiz?["M",c-4,this.top-6,"L",c+4,this.top-6,c,this.top,"Z"]:["M",this.left,c,"L",this.left-6,c+6,this.left-
6,c-6,"Z"]:p.prototype.getPlotLinePath.apply(this,arguments)},update:function(a,c){var b=this.chart,d=b.legend,e=this.buildOptions.call(b,{},a);this.series.forEach(function(a){a.isDirtyData=!0});(a.dataClasses&&d.allItems||this.dataClasses)&&this.destroyItems();b.options[this.coll]=x(this.userOptions,e);p.prototype.update.call(this,e,c);this.legendItem&&(this.setLegendColor(),d.colorizeItem(this,!0))},destroyItems:function(){var a=this.chart;this.legendItem?a.legend.destroyItem(this):this.legendItems&&
this.legendItems.forEach(function(c){a.legend.destroyItem(c)});a.isDirtyLegend=!0},remove:function(a){this.destroyItems();p.prototype.remove.call(this,a)},getDataClassLegendSymbols:function(){var a=this,c=this.chart,b=this.legendItems,d=c.options.legend,e=d.valueDecimals,k=d.valueSuffix||"",f;b.length||this.dataClasses.forEach(function(d,h){var g=!0,l=d.from,m=d.to,n=c.numberFormatter;f="";"undefined"===typeof l?f="< ":"undefined"===typeof m&&(f="> ");"undefined"!==typeof l&&(f+=n(l,e)+k);"undefined"!==
typeof l&&"undefined"!==typeof m&&(f+=" - ");"undefined"!==typeof m&&(f+=n(m,e)+k);b.push(t({chart:c,name:f,options:{},drawLegendSymbol:B.drawRectangle,visible:!0,setState:A,isDataClass:!0,setVisible:function(){g=this.visible=!g;a.series.forEach(function(a){a.points.forEach(function(a){a.dataClass===h&&a.setVisible(g)})});c.legend.colorizeItem(this,g)}},d))});return b},beforePadding:!1,name:""});["fill","stroke"].forEach(function(a){b.Fx.prototype[a+"Setter"]=function(){this.elem.attr(a,r(this.start).tweenTo(r(this.end),
this.pos),null,!0)}});e(g,"afterGetAxes",function(){var a=this,c=a.options;this.colorAxis=[];c.colorAxis&&(c.colorAxis=w(c.colorAxis),c.colorAxis.forEach(function(c,b){c.index=b;new y(a,c)}))});e(u,"bindAxes",function(){var a=this.axisTypes;a?-1===a.indexOf("colorAxis")&&a.push("colorAxis"):this.axisTypes=["colorAxis"]});e(n,"afterGetAllItems",function(a){var c=[],b,d;(this.chart.colorAxis||[]).forEach(function(d){(b=d.options)&&b.showInLegend&&(b.dataClasses&&b.visible?c=c.concat(d.getDataClassLegendSymbols()):
b.visible&&c.push(d),d.series.forEach(function(c){if(!c.options.showInLegend||b.dataClasses)"point"===c.options.legendType?c.points.forEach(function(b){z(a.allItems,b)}):z(a.allItems,c)}))});for(d=c.length;d--;)a.allItems.unshift(c[d])});e(n,"afterColorizeItem",function(a){a.visible&&a.item.legendColor&&a.item.legendSymbol.attr({fill:a.item.legendColor})});e(n,"afterUpdate",function(){var a=this.chart.colorAxis;a&&a.forEach(function(a,b,d){a.update({},d)})});e(u,"afterTranslate",function(){(this.chart.colorAxis&&
this.chart.colorAxis.length||this.colorAttribs)&&this.translateColors()})});m(b,"masters/modules/coloraxis.src.js",[],function(){})});
//# sourceMappingURL=coloraxis.js.map