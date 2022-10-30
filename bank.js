function out(){
    var p;
    p= document.getElementById("txt2").innerHTML=document.getElementById("username").value; 
    
}
function butt(){
    var b;
    b= document.getElementById("txt3").innerHTML=document.getElementById("date").value; 
    
}


var money=0;
function add()
{
    var a= document.getElementById("inputObject");
    var b=a.value;
    money=money+Number(b);
    document.getElementById("bill").innerHTML=money;
    a.value="";
}
function take()
{
    var a= document.getElementById("inputObject");
    var b=a.value;
    money=money-Number(b);
    document.getElementById("bill").innerHTML=money;
    a.value="";
}
var money1=0;
function add1()
{
    var k= document.getElementById("inputObject1");
    var c=k.value;
    money1=money1+Number(c);
    document.getElementById("bill1").innerHTML=money1;
    k.value="";
}
function take1()
{
    var k= document.getElementById("inputObject1");
    var c=k.value;
    money1=money1-Number(c);
    document.getElementById("bill1").innerHTML=money1;
    k.value="";
}
//var money=0;
//function add()
//{
   // var addMoney=prompt("Сколько вы хотите положить денег на свой счет?");
  //  money=money+Number(addMoney);
//}
//function take()
//{
    //var takeMoney=prompt("Сколько вы снять со своего счета?");
    //if (takeMoney>money){
      //  alert("На вашем счете не достаточно средств");
    //}
    //else{
    //    money=money-Number(takeMoney);
  //  }  
//}
//function check()
//{
  //  alert("На вашем счете "+money+" р.");
//}
