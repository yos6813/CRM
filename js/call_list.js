$("#writebtn").click(function(){
	$('#bodyPage').load("form_call_record.html");
});

/* 유형 드롭다운 옵션 추가 */

firebase.database().ref("types/").orderByKey().endAt("type").on("child_added", function(snapshot){
	snapshot.forEach(function(data){
		$('#typeSelect').append('<option value="'+ snapshot.key +'">' + data.val()
				+ '</option>');
	})
})

$(document).ready(function(){
	firebase.database().ref("posts/").orderByKey().endAt("title").on("child_added", function(snapshot){
		firebase.database().ref('posts/' + snapshot.key).on('value', function(snapshot1){
			$('#postList').each(function(i){
				$('#postList').append('<tr>' +
						'<td class="project-title">' +
						'<span>' + i + '</span>' +
						'</td>' +
						'<td class="project-status">' +
						'<span class="label label-default">' + snapshot1.val().postState + '</span>' +
						'</td>' +
						'<td class="project-category">' +
						'<span>' + snapshot1.val().postType + '</span>' +
						'</td>' +
						'<td class="project-title">' +
						'<a>' + snapshot1.val().title + '</a>' +
						'</td>' +
						'<td class="project-title">' +
						'<a id="titleCom">' + snapshot1.val().postCompany + '</a>' +
						'<br/>' +
						'<small>' + snapshot1.val().username + '</small>' +
						'</td>' +
						'<td class="project-clientcategory">' + 
						'<span class="badge badge-success yeta"> YETA </span>' +
						'<span class="badge badge-info academy"> ACADEMY </span>' +
						'<span class="badge badge-warning consulting"> CONSULTING </span>' +
						'</td>' +
						'<td class="project-people">' +
						'<a href=""><img alt="image" class="img-circle" src="' + snapshot1.val().userImg + '"></a>' +
						'</td>' +
						'<td class="project-people">' +
						'<a href=""><img alt="image" class="img-circle" src="img/a3.jpg"></a>' +
						'</td>' +
						'<td class="project-title">' +
						'<small>접수: ' + snapshot1.val().postDate + '</small>' +
						'<br/>' +
						'<small>처리: 1일 12시간 32분</small>' +
						'</td>' +
				'</tr>');
			})
		});
	});
})

