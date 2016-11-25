/* 유형 드롭다운 옵션 추가 */

firebase.database().ref("types/").orderByKey().endAt("type").on("child_added", function(snapshot){
	snapshot.forEach(function(data){
		$('#writeTypeSelect').append('<option value="'+ snapshot.key +'">' + data.val()
				+ '</option>');
	})
})


$("#customerIn").keydown(function(){
//	var nameInput = $("#customerIn").val();
	firebase.database().ref("customer/").orderByKey().on("child_added", function(snapshot){
		firebase.database().ref("customer/" + snapshot.key + '/cusPhone').orderByChild('cusPhone').equalTo($("#customerIn").val()).on('child_added', function(snapshot1){
			snapshot1.forEach(function(data){
					alert(data.val());
				$('#phoneSection').append('<tr>' +
										  '<td><input type="radio" value="option1" id="optionsContact1" name="optionsContact"></td>' +
										  '<td>'+ data[0].val() + '</td>' +
										  '<td>'+ data[1].val() + '</td>' +
										  '<td class="text-right">' +
										  '<div class="btn-group">' +
										  '<button class="modify btn-white btn btn-xs">수정</button>' +
										  '<button class="delete btn-white btn btn-xs">삭제</button>' +
										  '</div>' +
										  '</td>' +
										  '</tr>');
			})
		});
	});
});