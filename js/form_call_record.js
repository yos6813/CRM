/* 유형 드롭다운 옵션 추가 */

firebase.database().ref("types/").orderByKey().endAt("type").on("child_added", function(snapshot){
	snapshot.forEach(function(data){
		$('#writeTypeSelect').append('<option value="'+ snapshot.key +'">' + data.val()
				+ '</option>');
	})
})

$("#customerIn").keydown(function(){
	var phoneSel = $('.customerSel').val();
	var phoneSel2;
	
	firebase.database().ref('customer').orderByChild('cusName').equalTo(phoneSel).on('child_added',function(snapshot){
		firebase.database().ref('customer/' + snapshot.key + '/cusPhone').on('value', function(snapshot2){
			snapshot2.forEach(function(){
				phoneSel2 = snapshot2.val();
				console.log(phoneSel2);
				$.each(phoneSel2, function(index, item){
					$('#phoneSection').append('<tr>' +
							'<td><input type="radio" value="option1" id="optionsContact1" name="optionsContact"></td>' +
							'<td>'+ item[0] + '</td>' +
							'<td>'+ item[1] + '</td>' +
							'<td class="text-right">' +
							'<div class="btn-group">' +
							'<button class="modify btn-white btn btn-xs">수정</button>' +
							'<button class="delete btn-white btn btn-xs">삭제</button>' +
							'</div>' +
							'</td>' +
							'</tr>');
				})
			})
		})
	});
});