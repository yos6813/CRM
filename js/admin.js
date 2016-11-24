/* add Admin */

function addDepartment(department){
	var departData = {
		department: department
	};
	
	var newDepartmentKey = firebase.database().ref().child('departments').push().key;
	
	var updates = {};
	updates['/departments/' + newDepartmentKey] = departData;
	
	return firebase.database().ref().update(updates);
}

function addJob(job){
	var jobData = {
		job: job
	};
	
	var newJobKey = firebase.database().ref().child('jobs').push().key;
	
	var updates = {};
	updates['/jobs/' + newJobKey] = jobData;
	
	return firebase.database().ref().update(updates);
}

function addType(type){
	var typeData = {
		type: type
	};
	
	var newtypeKey = firebase.database().ref().child('types').push().key;
	
	var updates = {};
	updates['/types/' + newtypeKey] = typeData;
	
	return firebase.database().ref().update(updates);
}

$("#departButton").click(function(){
	addDepartment(document.getElementById("departmentInput").value);
	document.getElementById("departmentInput").value = '';
	
	var x = document.getElementById("snackbar");
	x.innerHTML = '추가 완료';
	x.className = "show";
	setTimeout(function(){x.className = x.className.replace("show", "");},3000);
});

$("#jobButton").click(function(){
	addJob(document.getElementById("jobInput").value);
	document.getElementById("jobInput").value = '';
	
	var x = document.getElementById("snackbar");
	x.innerHTML = '추가 완료';
	x.className = "show";
	setTimeout(function(){x.className = x.className.replace("show", "");},3000);
});

$("#typeButton").click(function(){
	addType(document.getElementById("typeInput").value);
	document.getElementById("typeInput").value = '';
	
	var x = document.getElementById("snackbar");
	x.innerHTML = '추가 완료';
	x.className = "show";
	setTimeout(function(){x.className = x.className.replace("show", "");},3000);
});

$(document).ready(function(){
	$('.departmentli').remove();
	$('.departmentA').remove();
	$('.jobli').remove();
	$('.jobA').remove();
	$('.typeli').remove();
	$('.typeA').remove();

	/* 부서 리스트 */
	firebase.database().ref("departments/").orderByKey().endAt("department").on("child_added", function(snapshot){
		snapshot.forEach(function(data){
			$('#departmentList1').append('<li class="departmentli list-group-item">' + data.val()
					+ '</li><button class="departmentA btn btn-white btn-xs" value="' + snapshot.key + '">삭제');
		})
	})
	
	/* 직책 리스트 */
	firebase.database().ref("jobs/").orderByKey().endAt("job").on("child_added", function(snapshot){
		snapshot.forEach(function(data){
			$('#jobList1').append('<li class="jobli list-group-item">' + data.val()
					+ '</li><button class="jobA btn btn-white btn-xs" value="' + snapshot.key + '">삭제');
		})
	})	
	
	/* 유형 리스트 */
	firebase.database().ref("types/").orderByKey().endAt("type").on("child_added", function(snapshot){
		snapshot.forEach(function(data){
			$('#typeList1').append('<li class="typeli list-group-item">' + data.val()
					+ '</li><button class="typeA btn btn-white btn-xs" value="' + snapshot.key + '">삭제');
		})
	})	
})
	
/* 리스트 삭제 */

$('.departmentA').on('click', function(){
	firebase.database().ref('departments/' + $(this).val()).remove()
	.then(function(){
		var x = document.getElementById("snackbar");
		x.innerHTML = 'DELETE';
		x.className = "show";
		setTimeout(function(){x.className = x.className.replace("show", "");},3000);
	})
	.catch(function(error){
		var x = document.getElementById("snackbar");
		x.innerHTML = 'FAIL';
		x.className = "show";
		setTimeout(function(){x.className = x.className.replace("show", "");},3000);
	})
})

$('.jobA').on('click', function(){
	firebase.database().ref('jobs/' + $(this).val()).remove()
	.then(function(){
		var x = document.getElementById("snackbar");
		x.innerHTML = 'DELETE';
		x.className = "show";
		setTimeout(function(){x.className = x.className.replace("show", "");},3000);
	})
	.catch(function(error){
		var x = document.getElementById("snackbar");
		x.innerHTML = 'FAIL';
		x.className = "show";
		setTimeout(function(){x.className = x.className.replace("show", "");},3000);
	})
})

$('.typeA').on('click', function(){
	firebase.database().ref('types/' + $(this).val()).remove()
	.then(function(){
		var x = document.getElementById("snackbar");
		x.innerHTML = 'DELETE';
		x.className = "show";
		setTimeout(function(){x.className = x.className.replace("show", "");},3000);
	})
	.catch(function(error){
		var x = document.getElementById("snackbar");
		x.innerHTML = 'FAIL';
		x.className = "show";
		setTimeout(function(){x.className = x.className.replace("show", "");},3000);
	})
})