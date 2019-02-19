
function getTokenCookie() {
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //再次切割
      //判断查找相对应的值
      if (arr2[0] == 'token') {
        return arr2[1];
      }
    }
  }else {return null;}
}

//设置cookie
function setTokenCookie(token) {
  var exdate = new Date(); //获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 1); //保存的天数 1
  //字符串拼接cookie
  console.log(token.toString())
  window.document.cookie = "token" + "=" + token.toString() + ";path=/;expires=" + exdate.toGMTString();
}

function getUserCookie()
{
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //再次切割
      //判断查找相对应的值
      if (arr2[0] == 'u_info') {
        var arr3 = arr2[1].split("|");
        var user = {};
        for (var z = 0; z < arr3.length; z ++){
          user[arr3[z]]=arr3[++z];
        }
        return user;
      }
    }
  }else {return null;}
}

//设置cookie
function setUserCookie(c_account, c_pwd, exdays, remeberFlag) {
  var exdate = new Date(); //获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
  //字符串拼接cookie
  window.document.cookie = "u_info" + "=" + "userAccount|"+c_account+"|"+"userPass|"+c_pwd+"|"+
    "remeberFlag|"+remeberFlag + ";path=/;expires=" + exdate.toGMTString();
}

// importance
export {getTokenCookie, setTokenCookie, setUserCookie, getUserCookie}
