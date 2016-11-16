var user = firebase.auth().currentUser;

/* window load */

window.addEventListener('load', function() {
	if(firebase.auth().currentUser == null){
		document.getElementById("signButton1").innerHTML = '<a data-toggle="modal" data-target="#myModal">Login</a>';
		document.getElementById("userName").innerHTML = '로그인을 해주세요.';
		document.getElementById("eMail").innerHTML = '';
		document.getElementById("signButton").innerHTML = '<a data-toggle="modal" data-target="#myModal">'+
		'<i class="fa fa-sign-out"></i>Login' +
		'</a>';
	} else {
		document.getElementById("signButton").innerHTML = '<a onclick="signOut()"><i class="fa fa-sign-out">&nbsp;Logout</i></a>';
		document.getElementById("signButton1").innerHTML = '<a onclick="signOut()">Logout</a>';
		firebase.auth().onAuthStateChanged(function(user) {
			document.getElementById("userName").innerHTML = firebase.auth().currentUser.displayName;
			document.getElementById("eMail").innerHTML = firebase.auth().currentUser.email;
		});
	}
});

/* 로그아웃 */

function signOut(){
	firebase.auth().signOut();
	var x = document.getElementById("snackbar");
	x.innerHTML = 'Logout'
		x.className = "show";
	setTimeout(function(){x.className = x.className.replace("show", "");},3000);
	document.getElementById("signButton").innerHTML = '<a data-toggle="modal" data-target="#myModal">'+
	'<i class="fa fa-sign-out"></i>Login' +
	'</a>';
	document.getElementById("signButton1").innerHTML = '<a data-toggle="modal" data-target="#myModal">Login</a>';
	document.getElementById("userName").innerHTML = '로그인을 해주세요.';
	document.getElementById("eMail").innerHTML = '';
}

/* 로그인 */

function signIn(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
	
	var userId = firebase.auth().currentUser.uid;
	firebase.database().ref('/users/' + userId).on('value', function(snapshot){
		if(snapshot.val() != null){
			alert(snapshot.val());
			$('#myModal').modal('hide');
			var x = document.getElementById("snackbar");
			x.innerHTML = 'Login'
			x.className = "show";
			setTimeout(function(){x.className = x.className.replace("show", "");},3000);
			document.getElementById("signButton").innerHTML = '<a onclick="signOut()"><i class="fa fa-sign-out"></i>&nbsp;Logout</a>';
			document.getElementById("signButton1").innerHTML = '<a onclick="signOut()">Logout</a>';
			firebase.auth().onAuthStateChanged(function(user) {
				var user = firebase.auth().currentUser;
				document.getElementById("userName").innerHTML = firebase.auth().currentUser.displayName;
				document.getElementById("eMail").innerHTML = firebase.auth().currentUser.email;
				writeUserData(user.uid, user.displayName, user.email, user.photoURL);
			});
		} else {
			$('#myModal').modal('hide');
			$('#myModal1').modal('show');
			document.getElementById("usernameInput").value = firebase.auth().currentUser.displayName;
			document.getElementById("emailInput").value = firebase.auth().currentUser.email;
			document.getElementById("profileImg").src = firebase.auth().currentUser.photoURL;
			document.getElementById("department").value = '';
			document.getElementById("job").value = '';
			document.getElementById("extension").value= '';
			document.getElementById("call").value = '';
			document.getElementById("emergency").value = '';
			document.getElementById("sample6_address").value = '';
			document.getElementById("sample6_address2").value = '';
			document.getElementById("year").value = '년도';
			document.getElementById("month").value = '월';
			document.getElementById("day").value = '일';
		}
	});
}

/* Register */



/* 다음 주소 찾기 */

function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = ''; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                fullAddr = data.roadAddress;

            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                fullAddr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
            if(data.userSelectedType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_address').value = fullAddr;

            // 커서를 상세주소 필드로 이동한다.
            document.getElementById('sample6_address2').focus();
        }
    }).open();
}

/* load window */

function minor(){
	$("#bodyPage").load("minor.html")
}

function admin(){
	$("#bodyPage").load("admin.html")
}

/* add User */

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

/* add Admin */

function addDepartment(department){
	var departmentData = {
		department: department
	};
	
	var newDepartmentKey = firebase.database().ref().child('department').push().key;
	
	var updates = {};
    updates['/department/' + newPostKey] = departmentData;

    return firebase.database().ref().update(updates);
}

function newDepartment(department) {
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    return addDepartment(department);
  });
}

document.getElementById("departmentSubmit").submit = function(e){
	newDepartment(department).then(function() {
		admin();
	});
}