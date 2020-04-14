var js = new Array();
var vname = new Array();

//EntJS리스트 가져오기
for(var i=0; i<Entry.variableContainer.getListByName('EntJS').getArray().length;i++){
  var listitem = Entry.variableContainer.getListByName('EntJS').getArray()[i].data;
  var args = listitem.split(" : ");
  js.push(args[0]);
  vname.push(args[1])
  console.log(`${args[0]} ||  ${args[1]}`);
}
console.log('EntJS리스트 가져오기 성공');

//명령어 변수가 바뀌었는지 체크
function check(a){
  for(var i=0; i<js.length; i++){
    if(js[i] == a) return vname[i];
  }
}
console.log('check 함수 로드 완료');

//toast 옵션 리턴 함수
function toastOptions(a){
  if(a === '성공') return 'success';
  if(a === '경고') return 'warning';
  if(a === '오류') return 'alert';
  if(a === '유지') return true;
  if(a === '사라짐') return false;
}
console.log('toast 옵션 함수 로드 완료');

//EntJS가 실행되었는지 체크
//c = check return 값이라는 뜻
var cready = check('ready');
var calert, ctoast, ceval;
var value, args;
if(cready){
  Entry.variableContainer.getVariableByName(cready).setValue(1);
  Entry.toast.success('성공', 'EntJS가 시작되었습니다.', true);
  console.log('실행시작');
}
Entry.variableContainer.getVariableByName(check('alert')).setValue(0);
Entry.variableContainer.getVariableByName(check('toast')).setValue(0);
Entry.variableContainer.getVariableByName(check('eval')).setValue(0);

//0.1초 마다 반복하면서 명령어 변수가 값이 바뀌었는지 체크
setInterval(function(){
  //check값을 변수에 저장
  calert = check('alert');
  ctoast = check('toast');
  ceval = check('eval');
  
  //alert check
  if(calert){
    value = Entry.variableContainer.getVariableByName(calert).value_;
    if(value){
      alert(calert);
      Entry.variableContainer.getVariableByName(calert).setValue(0);
    }
  }
  
  //toast check
  if(ctoast){
    value = Entry.variableContainer.getVariableByName(ctoast).value_;
    if(value){
      args = value.split(" : ");
      eval(`Entry.toast.${toastOptions(args[0])}(${args[2]}, ${args[3]}, ${toastOptions(args[1])})`);
      Entry.variableContainer.getVariableByName(ctoast).setValue(0);
      console.log(`${toastOptions(args[0])} || ${toastOptions(args[1])} || ${args[2]} || ${args[3]}`);
    }
  }
  
  //eval check
  if(ceval){
    value = Entry.variableContainer.getVariableByName(ceval).value_;
    if(value){
      eval(`${value}`);
      Entry.variableContainer.getVariableByName(ceval).setValue(0);
    }
  }
},100);

//////////////////////
//made by genius0412
//EntJS | JS-in-Entry
//////////////////////
