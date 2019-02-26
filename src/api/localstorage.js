function getUserCookie()
{
  // if (document.cookie.length > 0) {
  //   var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
  //   for (var i = 0; i < arr.length; i++) {
  //     var arr2 = arr[i].split('='); //再次切割
  //     //判断查找相对应的值
  //     if (arr2[0] == 'u_info') {
  //       var arr3 = arr2[1].split("|");
  //       var user = {};
  //       for (var z = 0; z < arr3.length; z ++){
  //         user[arr3[z]]=arr3[++z];
  //       }
  //       return user;
  //     }
  //   }
  // }else {return null;}
  return localStorage.getItem("u_info");
}

//设置cookie
function setUserCookie(c_account, c_pwd, exdays, remeberFlag) {
  var exdate = new Date(); //获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
  //字符串拼接cookie
  // window.document.cookie = "u_info" + "=" + "userAccount|"+c_account+"|"+"userPass|"+c_pwd+"|"+
  //   "remeberFlag|"+remeberFlag + ";path=/;expires=" + exdate.toGMTString();
  // 对象转字符串
  // console.log(JSON.stringify({userAccount:c_account,userPass:c_pwd, remeberFlag:remeberFlag, expires:exdate.toGMTString()}));
  localStorage.setItem("u_info",JSON.stringify({userAccount:c_account,userPass:c_pwd, remeberFlag:remeberFlag, expires:exdate.toGMTString()}));
}

export {setUserCookie, getUserCookie}
