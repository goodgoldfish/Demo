//模擬後端取來的資料
var cityAry = ['taipei','tokyo','hsinchu'];
var foodAry = [ { "id": 1, "name": "fry rice", "name_cn": "炒飯" }, { "id": 2, "name": "fry noodles", "name_cn": "炒麵" }, { "id": 3, "name": "Sushi", "name_cn": "日本壽司" }, { "id": 4, "name": "Pizza", "name_cn": "義大利比薩" }, { "id": 5, "name": "Tacos", "name_cn": "墨西哥玉米餅" }, { "id": 6, "name": "Croissant", "name_cn": "法國牛角包" }, { "id": 7, "name": "Pad Thai", "name_cn": "泰國炒河粉" }, { "id": 8, "name": "Paella", "name_cn": "西班牙海鮮飯" }, { "id": 9, "name": "Curry", "name_cn": "印度咖哩" }, { "id": 10, "name": "Hamburger", "name_cn": "美國漢堡" }, { "id": 11, "name": "Peking Duck", "name_cn": "中國北京烤鴨" }, { "id": 12, "name": "Kimchi", "name_cn": "韓國泡菜" }, { "id": 13, "name": "Schnitzel", "name_cn": "德國炸肉排" }, { "id": 14, "name": "Sushi", "name_cn": "日本壽司" }, { "id": 15, "name": "Spaghetti Bolognese", "name_cn": "肉醬義大利麵" }, { "id": 16, "name": "Moussaka", "name_cn": "希臘烤茄子" }, { "id": 17, "name": "Feijoada", "name_cn": "巴西黑豆燉肉" }, { "id": 18, "name": "Borscht", "name_cn": "俄羅斯羅宋湯" }, { "id": 19, "name": "Couscous", "name_cn": "摩洛哥庫斯庫斯" }, { "id": 20, "name": "Goulash", "name_cn": "匈牙利燉牛肉" }, { "id": 21, "name": "Sashimi", "name_cn": "日本刺身" }, { "id": 22, "name": "Fish and Chips", "name_cn": "英國炸魚薯條" } ];

var AccountAry = ["Alex", "Taylor", "Jordan", "Casey", "Jamie", "Morgan", "Riley", "Charlie", "Avery", "Cameron", "Sydney", "Dylan", "Quinn", "Reese", "Hayden", "Morgan", "Blake", "Payton", "Skylar", "Parker"];

var UserFoodMapping = [ { "Account": "Alex", "FavoriteFood": "Sushi" }, { "Account": "Alex", "FavoriteFood": "Moussaka" }, { "Account": "Taylor", "FavoriteFood": "Moussaka" }, { "Account": "Jordan", "FavoriteFood": "Sushi" }, { "Account": "Jordan", "FavoriteFood": "Pizza" }, { "Account": "Casey", "FavoriteFood": "Peking Duck" }, { "Account": "Jamie", "FavoriteFood": "Pizza" }, { "Account": "Morgan", "FavoriteFood": "Peking Duck" }, { "Account": "Riley", "FavoriteFood": "Schnitzel" }, { "Account": "Charlie", "FavoriteFood": "Hamburger" }, { "Account": "Charlie", "FavoriteFood": "Schnitzel" }, { "Account": "Avery", "FavoriteFood": "Kimchi" }, { "Account": "Cameron", "FavoriteFood": "Pizza" }, { "Account": "Sydney", "FavoriteFood": "Goulash" }, { "Account": "Dylan", "FavoriteFood": "Feijoada" }, { "Account": "Quinn", "FavoriteFood": "Paella" }, { "Account": "Reese", "FavoriteFood": "Moussaka" }, { "Account": "Hayden", "FavoriteFood": "Paella" }, { "Account": "Morgan", "FavoriteFood": "Pad Thai" }, { "Account": "Blake", "FavoriteFood": "Sushi" }, { "Account": "Payton", "FavoriteFood": "Pad Thai" }, { "Account": "Skylar", "FavoriteFood": "Spaghetti Bolognese" }, { "Account": "Parker", "FavoriteFood": "Hamburger" }, { "Account": "Parker", "FavoriteFood": "Sushi" } ];

var UserCityMapping = [ { "Account": "Alex", "City": "hsinchu" }, { "Account": "Alex", "City": "tokyo" }, { "Account": "Taylor", "City": "taipei" }, { "Account": "Jordan", "City": "hsinchu" }, { "Account": "Jordan", "City": "tokyo" }, { "Account": "Casey", "City": "hsinchu" }, { "Account": "Jamie", "City": "tokyo" }, { "Account": "Morgan", "City": "taipei" }, { "Account": "Riley", "City": "tokyo" }, { "Account": "Charlie", "City": "hsinchu" }, { "Account": "Charlie", "City": "tokyo" }, { "Account": "Avery", "City": "taipei" }, { "Account": "Cameron", "City": "hsinchu" }, { "Account": "Sydney", "City": "tokyo" }, { "Account": "Dylan", "City": "tokyo" }, { "Account": "Quinn", "City": "hsinchu" }, { "Account": "Reese", "City": "tokyo" }, { "Account": "Hayden", "City": "taipei" }, { "Account": "Morgan", "City": "taipei" }, { "Account": "Blake", "City": "taipei" }, { "Account": "Payton", "City": "tokyo" }, { "Account": "Skylar", "City": "taipei" }, { "Account": "Parker", "City": "taipei" }, { "Account": "Parker", "City": "hsinchu" } ];

$(document).ready(function() {
  readyDDL();
})

function readyDDL(){
  cityAry.forEach(function(item){
    $('#ddl_City').append('<option>'+item+'</option>');
  });
  
  foodAry.map(item => item?.name).forEach(function(item){
    $('#ddl_food_NEW').append('<option>'+item+'</option>');
    //.toUpperCase()
  });
  
  var UserFoodAry = [...new Set(UserFoodMapping.map(x=>x.FavoriteFood) )];
  UserFoodAry.forEach(function(item){
    $('#ddl_food_NOW').append('<option>'+item+'</option>');
    //.toUpperCase()
  });
}

function findUser(){
	var City = $('#ddl_City option:selected').html();
	var Food_Now = $('#ddl_food_NOW option:selected').html();
	
	var UserList_City = UserCityMapping.filter(item => item?.City == City).map(item => item?.Account);
	var UserList_Food = UserFoodMapping.filter(item => item?.FavoriteFood == Food_Now).map(item => item?.Account);
	console.log('在'+City+'的user：' + UserList_City.join(', '));
	console.log('喜歡'+Food_Now+'的user：' + UserList_Food.join(', '));
	
	var tempAry1 = []
	
	UserList_City.forEach(function(eachCity){
		UserList_Food.forEach(function(eachFood){
			if(eachCity== eachFood){
				tempAry1.push(eachCity);
			}
		});
	});
	
	console.log('在'+City+'且喜歡'+Food_Now+'的user：' + tempAry1.join(', '));
  	//$('#div_result').empty();
  $('.tb_result').addClass('old_result');
	var tempTable = $('<table/>').addClass('tb_result').prependTo($('#div_result'));
	var tempTrCity = $('<tr/>').appendTo(tempTable);
	var tempTrFood = $('<tr/>').appendTo(tempTable);
	var tempTrInter = $('<tr/>').appendTo(tempTable);
	
	var tempTd1_1 = $('<td/>').html('在'+City+'的user：').appendTo(tempTrCity);
	var tempTd1_2 = $('<td/>').html(UserList_City.join(', ')).appendTo(tempTrCity);
	var tempTd2_1 = $('<td/>').html('喜歡'+Food_Now+'的user：').appendTo(tempTrFood);
	var tempTd2_2 = $('<td/>').html(UserList_Food.join(', ')).appendTo(tempTrFood);
	var tempTd3_1 = $('<td/>').html('在'+City+'且喜歡'+Food_Now+'的user：' ).appendTo(tempTrInter);
	var tempTd3_2 = $('<td/>').html(tempAry1.join(', ')).appendTo(tempTrInter);
}