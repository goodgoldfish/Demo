# jQuery 1&2

20250917

## 目錄

1. 基礎 jQuery
2. jQuery UI
	- Datepicker
	- Dialog

---

# 一、jQuery 基礎


## 1. jQuery 簡介

jQuery 是一個優秀的 JavaScript 函式庫 (框架)
不是程式語言


## 2. jQuery 基本語法

### 頁面載入流程

1. 解析 HTML → 建立 DOM 樹
瀏覽器**從上到下**讀 HTML。
如果讀到 `<script>` 就會停下來執行 JavaScript（同步腳本）。

2. 載入 CSS / 圖片 / 其他資源
圖片、樣式可能還在下載中，但 DOM 結構已經完成。

3. DOM 完成事件 (DOMContentLoaded)
DOM 樹建立完成後會觸發。
這就是 jQuery 的 `$(document).ready(...)` 或 `$(function(){...})` 監聽的時機點。

4. 頁面完全載入 (window.onload)
代表 DOM、CSS、圖片、iframe 全部載入完成。
時間點比 DOM ready 晚。

需特別注意**執行順序**，很多詭異的bug與載入順序有關
- 當頁面有多個 `$(document).ready(...)`時，瀏覽器會逐一執行而不會彼此覆蓋
- 使用到jquery函式庫的其他函式庫(ex.jqueryUI)的引用順序，若順序顛倒瀏覽器將報錯
- 因為`ready(){...}`內容太長，沒注意到click事件寫在ready之外，因此該click事件執行時目標元素尚不存在(dom未完成載入)，即使click事件寫法無誤，該事件也無法被正確執行

### function 1
[Demo Menu](https://goodgoldfish.github.io/Demo/TrainingDemo_Jquery/Memu.html)

### 基本語法
```javascript
$(誰).(什麼時候).(去做什麼)
```

範例1：
文件(document)物件載入完成(ready)後，執行動作(`function(){...}`)
```javascript
$(document).ready(function() {
  console.log("DOM 已經載入完成！");
});
```
範例2:
```javascript
//將ID為「demo」的DOM元素內的html內容替換成"Hello Java"
$("#demo").html('Hello Java');

//javascript寫法
document.getElementById("demo").innerHTML = "Hello Java";
```


## 3. 引用元件的方法
在jQuery中引用元件的方法 `$([選擇器])`

1. TagName
```javascript
$("TagName")
```

2. ID
```javascript
$("#ID")
```

3. Class
```javascript
$(".Class")
```

html範例
```html=
<div class='demo_Div'>
    <h2 class='title'>This is a title.</h2>
    <p id="firstP">hello world</p>
    <p>hello world</p>
    <p>hello world</p>
    <p>hello world</p>
    <p>hello world</p>
</div>
```
1. 使用TagName : 
指定所有div皆顯示
ex: `$('div').show();`

2. 使用ID : 
＄("#ID")
取得ID為firstP的元素的html
ex: `$('#firstP').html();`

3. 使用Class
＄(".Class")
ex: `$('.title').html();`


## 4. 元件取值 / 設值方法
[Jquery 1 example](https://goodgoldfish.github.io/Demo/TrainingDemo_Jquery/jquery-1-example/index.html)

`.val()`：取得 value

`.val("值")`：設定 value

`.html()`：取得 HTML

`.html("值")`：設定 HTML

`.text()`：取得文字

`.text("值")`：設定文字

:::info
### .val() vs .text() vs .html()

`.val()` → 取/設 input、select、textarea 的值。

`.text()` → 取/設純文字（不會解析 HTML）。

`.html()` → 取/設 HTML（會解析標籤）。
:::
## 5. .attr()

取屬性：
```javascript
$("#div1").attr("class");
```

設屬性：
```javascript
$("#div1").attr("class", "f12gray2");
```

常用於設定非 style 屬性，或在前端藏值，搭配 selector 使用很便利：
```javascript
$('input[type="text"][model="D11"]').val();
```

example:
```html
<div id="div1" class="testClass" myName="iamdiv"></div>
```
```javascript
console.log($("#div1").attr("myName")); //output: iamdiv
```

## 6. .css()

取屬性：
```javascript
$('#div1').css('background-color');
```

設屬性：
```javascript
$("#div1").css("display", "none");
```

適用於 style 屬性

## 7. 新增元素的方法
[Function Demo 2](https://goodgoldfish.github.io/Demo/TrainingDemo_Jquery/Demo%202.html)

.append()：插入在最後
```javascript
$('#div1').append('<span>' + testString + '</span>');
```

.prepend()：插入在開頭
```javascript
$('#div1').prepend('<span>x</span>');
```

## 8. 父、子元件取法

.parent()：父元件

.parents()：所有上層

.children()：子元件

.find()：內部元素

.siblings()：鄰近元素 (不含自己)

$('#Id').find('.otherClass');

## 9. Checkbox / Select / Radio 取值
注意選擇器

### 1. Checkbox
```javascript
$('#Checkbox_Id').attr("checked")        // 回傳字串
$('#Checkbox_Id').attr("checked", true)  // 勾選
$('#Checkbox_Id').attr("checked", false) // 取消
$('#Checkbox_Id').prop("checked")        // 回傳布林值
```

### 2. Select
下拉選單
```javascript
$("#select_id").find("option:selected").text(); // 取得文字
$("#select_id").val();                          // 取得值
```

### 3. Radio
```html
<label><input type="radio" name="group1" value="1"><span>radio 1</span></label>
<label><input type="radio" name="group1" value="2" checked><span>radio 2</span></label>
<label><input type="radio" name="group1" value="3"><span>radio 3</span></label>
<label><input type="radio" name="group1" value="4"><span>radio 4</span></label>
<label><input type="radio" name="group1" value="5"><span>radio 5</span></label>
```

```javascript
$("input[name='ID']:checked").val();
```

## 10. .prop() vs .attr()

- .attr() → 操作 HTML 原始屬性（靜態值）。
- .prop() → 操作 DOM 屬性（實際運行狀態）。
    - 例如：checkbox 用 `.prop('checked')` 才能拿到正確勾選狀態。

## 11. 事件方法

```javascript
.click(function(){})

.change(function(){})

.on('事件', 'selector', function(){})：取代 .live()

.live()：舊版 jQuery 使用，已淘汰
```
「事件」綁定的前提是被綁定的元素已經存在

- `.click(handler)`
    直接綁定點擊事件給「現有」的元素。
    缺點：對於動態新增的元素不會生效。
- `.on('click', selector, handler)`
    事件委派 (event delegation)，由父元素監聽，子元素即使之後才新增也能觸發。
    同理，父元素必須存在才能使用on。

:::info
建議新人養成習慣用 .on()，比較不容易踩坑。
:::

## 12. 迴圈
`.each(function() { })`

參考範例

## 13. Selector

seletor非常多，彼此還能互相組合搭配
有需要時再查就好(關鍵字:css seletor)

### 1. 基本選擇器
- `*` ：選取所有元素  ex: `$("*")`
- `#id` ：依照 ID 選取  ex: `$("#myId")`
- `.class` ：依照 class 選取  ex: `$(".myClass")`
- `element` ：依照標籤選取  ex: `$("div")`

### 2. 群組選擇器

`$("div, p, span")` → 選取多個標籤

### 3. 層級選擇器

`$("div > p")` → div下的子元素(父-->子)

`$("div p")` → 所有後代元素(父-->所有子孫)

`$("h1 + p")` → h1 後緊鄰的 p

`$("h1 ~ p")` → h1 之後的所有 p

### 4. 其他

```css
/*屬性選擇器*/
[name="username"]

[type="text"]

[href^="https"] → 以 https 開頭

[href$=".pdf"] → 以 .pdf 結尾

[href*="jquery"] → 包含 jquery

/*表單*/
:first / :last → 選擇第一/最後一個

:even / :odd → 選擇排序是偶數/奇數的元素

:eq(index) → 指定特定index的元素
```

### 6. 表單選擇器

:input → 選取所有表單元素

:checked

:selected

---
# 二、jQuery UI

https://jqueryui.com/

## 1. 範例
1. [Sample(codepen)](https://codepen.io/GoldfishIsGood/pen/LYXYdGP)
2. TraningPackage
\trainingPackage\TrainingPackage\TrainingWebSite\jQuery\

## 2. jQuery UI 介紹

下載網址：http://jqueryui.com/download

常用功能：
Datepicker
Dialog
AutoComplete

## 3. Datepicker 介紹

Date Picker：挑選日期的 API

## 4. Datepicker 語法
```htmlembedded
<div>
     Date : 
     <input id="Datepicker1" name="Datepicker1" type="text" value="" />
</div>
```

```javascript
$("#datepicker1").datepicker({
  minDate: "-10D",
  maxDate: "+1M +10D"
});
```

* 常用屬性
**minDate**: 最小日期 (如: "-10D")
**maxDate**: 最大日期 (如: "+1M +10D")
**dateFormat**: 顯示格式 (如: "yy/mm/dd")

## 5. Datepicker 範例

範例路徑：
\Training Package\TrainingWebSite\jQuery\DatepickerExample\*.*

## 6. Datepicker 練習

請利用 Datepicker，顯示可被選取的區間在 小於 5 天 與 大於 2 個月 的功能

## 7. Dialog
在頁面彈出一個自定義的視窗，可用於提示、警告或顯示相關資料等等的功能。
設定Dialog時，要先存在一個div元素，
設定完成後，這個div將會「變成」dialog。

**初始化**
通常放在ready區塊中
```javascript
$("#dialog").dialog({
  height: 140,
  modal: true
});
```
**方法呼叫**
```javascript
$("#dialog").dialog("open");
```

### example

```htmlembedded
<div id="DialogTheDialog" style="display:none">
    <p>這個p是存在於$('#DialogTheDialog')內的元素</p>  
</div>
```

```javascript
//設定dialog的範例
$('#DialogTheDialog').dialog({
  width: 300,
  height: 320,
  autoOpen: false,//通常設置為false，避免user剛打開畫面dialog就跳出來
  open: function () {
      //開啟dialog時執行的動作
  },
  close: function () {
      //關閉dialog時執行的動作
      //如果dialog是用於輸入資料，可以把重置欄位資料的動作放在這裡
  },
});
```

### 常用屬性

**modal**: true：開啟時鎖住背景

**height / width**：設定大小

**zIndex**：設定層級

**open / close**：開關事件

**buttons**：自訂按鈕與事件

**autoOpen**: 是否自動開啟

## 8. Dialog 範例

範例路徑：
\Training Package\TrainingWebSite\jQuery\DialogExample\*.*

## 9. Dialog 練習

寫一個 Dialog 頁面

Dialog 必須由 Button 觸發才會開啟

頁面載入時不會自動開啟
