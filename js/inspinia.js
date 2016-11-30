/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.6
 *
 */
$(document).ready(function () {
	
	$("#adminBtn").click(function(){
		if(firebase.auth().currentUser == null){
			swal({
				title: "로그인을 해주세요.",
				text: "",
				type: "warning"
			});
		} else {
			$('#bodyPage').load("admin.html");
		}
	})
	
	$("#company").click(function(){
		$('#bodyPage').load("company.html");
	})
	
	$("#customer").click(function(){
		$('#bodyPage').load("customer.html");
	})

	$("#crmbtn").click(function(){
		$('#bodyPage').load("call_list.html");
	})
	
	
	
    // Add body-small class if window less than 768px
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').on('click', function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').on('click', function () {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Fullscreen ibox function
    $('.fullscreen-link').on('click', function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').on('click', function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Run menu of canvas
    $('body.canvas-menu .sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').on('click', function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').on('click', function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });

    // Small todo handler
    $('.check-link').on('click', function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });


    // Minimalize menu
    $('.navbar-minimalize').on('click', function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });


    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if (navbarHeigh > wrapperHeigh) {
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if (navbarHeigh < wrapperHeigh) {
            $('#page-wrapper').css("min-height", $(window).height() + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            if (navbarHeigh > wrapperHeigh) {
                $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
            } else {
                $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
            }
        }

    }

    fix_height();

    // Fixed Sidebar
    $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
    });

    // Move right sidebar top after scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $(window).bind("load resize scroll", function () {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    })
});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function () {
//	$('#side-menu li').click(function(){
//		$('#side-menu li').removeClass('active');
//		
//		$(this).addClass('active');
//	})
	
	
    if (localStorageSupport()) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }

        if (collapse == 'on') {
            if (body.hasClass('fixed-sidebar')) {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }

            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }
    
    /* 로그인 or 로그아웃  */
    firebase.auth().onAuthStateChanged(function(user) {
	    if(user){
	    	document.getElementById("signButton").innerHTML = '';
	    	document.getElementById("signButton").innerHTML = '<a onclick="signOut()"><i class="fa fa-sign-out"></i>&nbsp;Logout</a>';
	    	document.getElementById("userName").innerHTML = firebase.auth().currentUser.displayName;
	    	document.getElementById("eMail").innerHTML = firebase.auth().currentUser.email;
		} else {
			document.getElementById("signButton").innerHTML = '';
	    	document.getElementById("userName").innerHTML = '로그인을 해주세요.';
	    	document.getElementById("eMail").innerHTML = '';
	    	document.getElementById("signButton").innerHTML = '<a data-toggle="modal" data-target="#myModal">'+
	    	'<i class="fa fa-sign-out"></i>Login' +
	    	'</a>';
		}
    });
});

// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable(
        {
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        })
        .disableSelection();
}

/* 로그아웃 */

function signOut(){
	firebase.auth().signOut();
	var x = document.getElementById("snackbar");
	x.innerHTML = 'Logout'
	x.className = "show";
	setTimeout(function(){x.className = x.className.replace("show", "");},3000);
	document.getElementById("signButton").innerHTML = '';
	document.getElementById("signButton").innerHTML = '<a data-toggle="modal" data-target="#myModal">'+
	'<i class="fa fa-sign-out"></i>Login' +
	'</a>';
	document.getElementById("userName").innerHTML = '로그인을 해주세요.';
	document.getElementById("eMail").innerHTML = '';
}

/* 로그인 */

function signIn(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
		
	firebase.auth().onAuthStateChanged(function(user) {
		if(user){
			firebase.database().ref('user-infos/' + user.uid).on('value', function(snapshot1){
				if(snapshot1.val() != null){
					firebase.database().ref('infos').orderByChild('email').on('child_added', function(snapshot){
						$('#myModal').modal('hide');
						var x = document.getElementById("snackbar");
						x.innerHTML = 'Login'
							x.className = "show";
						setTimeout(function(){x.className = x.className.replace("show", "");},3000);
						
						document.getElementById("signButton").innerHTML = '';
						document.getElementById("signButton").innerHTML = '<a onclick="signOut()"><i class="fa fa-sign-out"></i>&nbsp;Logout</a>';
						document.getElementById("userName").innerHTML = snapshot.val().username;
						document.getElementById("eMail").innerHTML = snapshot.val().email;
					});
				} else {
					var user = firebase.auth().currentUser;
					$('#myModal').modal('hide');
					$('#myModal1').modal('show');
					document.getElementById("usernameInput").value = user.displayName;
					document.getElementById("emailInput").value = user.email;
					document.getElementById("profileImg").src = user.photoURL;
					document.getElementById("department").value = '';
					document.getElementById("job").value = '';
					document.getElementById("extension").value= '';
					document.getElementById("call").value = '';
					document.getElementById("emergency").value = '';
					document.getElementById("sample6_address").value = '';
					document.getElementById("sample6_address2").value = '';
					document.getElementById("birth1").value = '년도';
					document.getElementById("birth2").value = '월';
					document.getElementById("birth3").value = '일';
					document.getElementById("nickname").value = '';
					document.getElementById("phone").value = '';
				}
			})
		}
	});
}

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

/* add User */

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

/* Register Form */

function writeUserInfo(uid, userImg, username, email, nickname, department, job, extension, phone, call, emergency, address, join, birth){
	var infoData = {
		uid: uid,
		picture: userImg,
		username: username,
		email: email,
		nickname: nickname,
		department: department,
		job: job,
		extension: extension,
		phone: phone,
		call: call,
		emergency: emergency,
		address: address,
		join: join,
		birth: birth
	};
	
	var newInfoKey = firebase.database().ref().child('infos').push().key;
	
	var updates = {};
	updates['/infos/' + newInfoKey] = infoData;
	updates['/user-infos/' + uid + '/' + newInfoKey] = infoData;
	
	return firebase.database().ref().update(updates);
}

$('#registerBtn').click(function(){
	var user = firebase.auth().currentUser;
	writeUserData(user.uid, user.displayName, user.email, user.photoURL);
	
	var uid = firebase.auth().currentUser.uid;
	var userImg = firebase.auth().currentUser.photoURL;
	var username = $('#usernameInput').val();
	var email = $('#emailInput').val();
	var nickname = $('#nickname').val();
	var department = $('#department').val();
	var job = $('#job').val();
	var extension = $('#extension').val();
	var phone = $('#phone').val();
	var call = $('#call').val();
	var emergency = $('#emergency').val();
	var address = $('#sample6_address').val() + ' ' + $('#sample6_address2').val();
	var join = $('#join').val();
	var birth = $('#birth1').val() + '/' + $('#birth2').val() + '/' + $('#birth3').val();
	
	writeUserInfo(uid, userImg, username, email, nickname, department, job, extension, phone, call, emergency, address, join, birth);
	$('#myModal1').modal('hide');
	
	var x = document.getElementById("snackbar");
	x.innerHTML = 'Welcome!';
	x.className = "show";
	setTimeout(function(){x.className = x.className.replace("show", "");},3000);
});

/* 부서, 직책, 생년월일 드롭다운 */

$('#myModal1').ready(function(){
		/* 부서  */
		firebase.database().ref("departments/").orderByKey().endAt("department").on("child_added", function(snapshot){
			snapshot.forEach(function(data){
				$('#department1').append('<li><a value="' + data.val() + '">' + data.val()
						+ '</a></li>');
			})
			$('#department1 a').on('click', function(){
				$('#department').val($(this).attr('value'));
			})
		})
		
		/* 직책 */
		firebase.database().ref("jobs/").orderByKey().endAt("job").on("child_added", function(snapshot){
				snapshot.forEach(function(data){
					$('#job1').append('<li><a value="' + data.val() + '">' + data.val()
							+ '</a></li>');
			})
			$('#job1 a').on('click', function(){
				$('#job').val($(this).attr('value'));
			})
		})
		
		/* 생년월일 */
		var today = new Date();
		var toyear = parseInt(today.getFullYear());
		var start = toyear - 5;
		var end = toyear - 70;
		
		for(var i=toyear; i>=end; i--){
			$('#year').append('<li><a value="' + i + '">' + i + '</a></li>');
		}
		
		for(var i=1; i<=12; i++){
			$('#month').append('<li><a value="' + i + '">' + i + '</a></li>');
		}
		
		for(var i=1;i<=31;i++){
			$('#day').append('<li><a value="' + i + '">' + i + '</a></li>');
		}
		
		$('#year a').on('click', function(){
			$('#birth1').val($(this).attr('value'));
		})
		
		$('#month a').on('click', function(){
			$('#birth2').val($(this).attr('value'));
		})
		
		$('#day a').on('click', function(){
			$('#birth3').val($(this).attr('value'));
		})
});

function viewPage(){
	alert("클릭");
	console.log($(this).val());
	firebase.database().ref('posts/' + $(this).val()).on('value', function(snapshot){
		console.log(snapshot.val());
	})
}
