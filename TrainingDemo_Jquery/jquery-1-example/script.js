$(function() {
  $("#btnShowData").on("click", function() {
    // 抓取三個必填欄位
    var name = $("input[registvalue='First Name']").val().trim();
    var email = $("input[registvalue='Email']").val().trim();
    var password = $("input[registvalue='Password']").val().trim();

    // 檢查必填
    if (!name || !email || !password) {
      alert("請填寫 Name, Email, Password 欄位！");
      return;
    }

    // 檢查 Email 格式
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Email 格式不正確，請輸入正確的 Email！");
      return;
    }

    // 組合一筆資料
    var rowHtml = "";
    $(".RegistrationRowCss").each(function() {
      var label = $(this).find("span[registvalue]").attr("registvalue");
      var value = "";

      // 抓 input[type=text, password]
      var input = $(this).find("input[type=text], input[type=password]");
      if (input.length > 0) {
        value = input.val();
      }

      // 抓 select
      var select = $(this).find("select");
      if (select.length > 0) {
        value = select.find("option:selected").text();
      }

      // 抓 radio
      var radio = $(this).find("input[type=radio]:checked");
      if (radio.length > 0) {
        value = radio.next("span").text();
      }

      if (value && label && value !=="- Select -") {
        rowHtml += "<tr><td>" + label + "</td><td>" + value + "</td></tr>";
      }
    });

    // 新增到 table
    $(".displayResult table tbody").empty();
    $(".displayResult table tbody").append(rowHtml);

    // 清空輸入值（避免重複送出一樣的資料）
    //$(".RegistrationRowCss input[type=text], .RegistrationRowCss input[type=password]").val("");
    //$(".RegistrationRowCss select").prop("selectedIndex", 0);
    //$(".RegistrationRowCss input[type=radio]").prop("checked", false);
    //$(".RegistrationRowCss input[type=checkbox]").prop("checked", false);
  });
});