// 最後工具類JS (數字轉千分位設計)  - 數字傳進去 他回傳轉型的結果

function toThousands(x) {
  let parts = x.toString().split("."); //轉為字串   然後.split("."); parts值會變為陣列內字串
  // console.log(parts);

  // split先分離小數點 整數用正則處理完千分位 再join加回來
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

//---------------------------------------------------------------------------------------------

// 表單驗證

const inputs = document.querySelectorAll("input[name],select[data=payment]");
// input name 屬性 有資料的   select有資料的
// querySelectorAll 選到的東西 變成一個陣列 裡面有很多個dom nodeList

const form = document.querySelector(".orderInfo-form");
const constraints = {
  姓名: {
    presence: {
      message: "必填欄位",
    },
  },
  電話: {
    presence: {
      message: "必填欄位",
    },
    length: {
      minimum: 8,
      message: "需超過 8 碼",
    },
    numericality: {
      onlylnteger: true,
      message: "必須為數字",
    },
    format: {
      pattern: /^[09]{2}\d{8}$/,
      message: "輸入正確手機格式",
    },
  },
  信箱: {
    presence: {
      message: "必填欄位",
    },
    email: {
      message: "格式錯誤",
    },
  },
  寄送地址: {
    presence: {
      message: "必填欄位",
    },
  },
  交易方式: {
    presence: {
      message: "必填欄位",
    },
  },
};

inputs.forEach((item) => {
  // console.log(item)

  // blur移開焦點就觸發 change移開焦點並改變值觸發 input瘋狂觸發
  item.addEventListener("change", function () {
    item.nextElementSibling.textContent = "";

    let errors = validate(form, constraints) || ""; // 錯誤或空值
    console.log(errors);
    // 回傳格式 物件包 那些錯誤沒填屬性 值為陣列錯誤訊息

    if (errors) {
      Object.keys(errors).forEach(function (keys) {
        // console.log(document.querySelector(`[data-message=${keys}]`))
        document.querySelector(`[data-message="${keys}"]`).textContent =
          errors[keys];
      });
    }
  });
});

//---------------------------------------------------------------------------------------------
// 信箱的驗證格式(通常有validate 套件就差不多了 除非要其他的監聽 改變的時候 或移開時)

// 正規表達式  前面要符合XX 中間@小老鼠 XXX(小寫a-z 0-9)  加個. 然後XXX  要符合這個然後test
// (這就是一個函式 去包裹 mail的參數就能驗證執行)

function validateEmail(mail) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
}

// 驗證手機號碼格式 - phone 參數欄位要字串
// function validatePhone(phone) {
//   if (/^[09]{2}\d{8}$/.test(phone)) {
//     return true;
//   }
//   return false;
// }
