[![Stories in Ready](https://badge.waffle.io/FENIX-Platform/fenix-ui-olap.png?label=ready&title=Ready)](https://waffle.io/FENIX-Platform/fenix-ui-olap)
fenix-ui-olap
=============


#FENIX UI CHART


Requirejs import : 
```javascript
define(['fx-chart/start'], function (ChartCreator) {
...
```
General principe:
From a ressource Fenix (FX in this document) and some extra-configurations provided, a pivotator based creator apply two mains operations : 
	-denormalisation of the dataset
	-aggregation
	-renderisation of the result with an external library


Constructor :
```javascript
   this.chart = new ChartCreator(config);
   ```
with config is a json Object with these fields :
<table>
   <tr>
         <th>Parameter</th>
         <th>Type</th>
         <th>Default Value</th>
         <th>Example</th>
         <th>Description</th>
      </tr>
<tr><td>type </td>
<td>string</td>
<td>-<td>
<td>"line","column","column_stacked","area","pyramide","area_stacked","scatter","boxplot"</td>
<td> type of chart we want to display</td>
</tr>

<tr><td>

columns and rows</td>
<td>json array</td>
<td>[]<td>
<td>columns:["Country","Indicator_EN"],rows:["Year"]</td>
<td>
	Define the operations of denormalization of FX : wich columns have to be display as rows and wich in columns
 
</td></tr>
<tr><td>aggregations</td>
<td>json array</td>
<td>[]<td>
<td>aggregations:["IndicatorCode_EN","Year"]</td>
<td>FX columns we want to aggregate,
they will not appears in the Grid

</td></tr>
<tr><td>values</td>
<td>json array</td>
<td>[]<td>
<td>values:["values","Flag","Units"]
<td> describe wich columns in the ressources will be aggregates and displayed in the values part of the grid
</td></tr>
<tr><td>
aggregationFn</td>
<td>json Object</td>
<td>{}<td>
<td> {value:"sum",Flag:"dif",Units:"dif"}</td><td>
			This object is needed to identify which 					aggregation function have to be applied for each field on the "values" part of the dataset. The functions identifiers "sum" and dif in this example refer to a function of aggregation implemented in the functions part of the application
</td></tr>
<tr><td>
formatter</td>
<td>string</td>
<td>-<td>
<td> "localstring" or "value" : iditifier of the formater function for the value field localstring result will be in this format : "1 250,12", value will return 1250,12  ; value is hightly recommanded for charting
</td></tr>
<tr><td>

hidden</td><td> not yet implemented : now it is an equivalent of the "aggregations" parameter
</td></tr>
<tr><td>
decimals</td><td> number of decimal for the values

</td></tr>
<tr><td>

el</td><td> the ID of the dom container where the grid will be displayed
</td></tr>
<tr><td>
model</td><td> The ressource FENIX to display
</td></tr>
<tr><td>
showRowHeaders</td><td>boolean to show the row header in the output matrix of the pivotator (cf pivotator documention) ; false is hightly recommanded for charting
</table>
Full example : 
```javascript
var FX={
  metadata:{
	dsd:{
	columns:[
		{"id" : "country","title" : {"EN" : "COUNTRY CODE"},key:true},
		{"id" : "country_EN","title" : {"EN" : "COUNTRIES"}},
		{"id" : "element","title" : { "EN" : "elementcode"},key:true},
		{"id" : "element_EN","title" : {"EN" : "element"}},
		{"id" : "item","title" : {"EN" : "Item"},key:true},
		{"id" : "item_EN","title" : {"EN" : "item"}},
		{"id" : "year","title" : {"EN" : "year"},key:true,subject:"time"},
		{"id" : "um","title" : {"EN" : "um"},subject:"um"},
		{"id" : "value","title" : {"EN" : "value"},subject:"value",dataType:"number"},
		{"id" : "flag","title" : {"EN" : "flag"},subject:"flag"},
		{"id" : "v1","title" : {"EN" : "v1"},dataType:"number",subject:"value"},
		{"id" : "v1|*v2","title" : {"EN" : "v2"},subject:"flag"}	,{"id" : "v3","title" : {"EN" : "v3"}},{"id" : "v4","title" : {"EN" : "v4"}},{"id" : "v5","title" : {"EN" : "v5"}}
		]
		}
		},
  
  "data" : [
  ["4","Algeria","5312","Area_harvested","366","Artichokes","2006","Ha","1713.00","","","003","1","007",""],
  ["4","Algeria","5312","Area_harvested","366","Artichokes","2007","Ha","1813.00","","","003","1","007",""]]};

var config={
rows :["country_EN","element_EN","item_EN"],
 columns :["year"],
aggregations:["item_EN"],
values:["value"],
aggregationFn:{value:"sum"},
formatter:"localstring",
showRowHeaders:true,
model:FX,
el:"#result",
type="line"
}


   this.chart = new ChartCreator(config);
   ```
will create a line chart in the container with the ID=result with country label, element label in row and the year in columns, group by the item: the aggregation function used will be the sum for the columns "value"


#update
the update function allow the user to modify the config file and refresh the chart : model,el have don't need to be provided.
example : 
```javascript
this.chart.update({type:"area"})

```
