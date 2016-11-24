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

