//A small plugin that represents JSON data into tabular structure with accordions.
//AUTHOR :SUBHODIP BISWAS
//DATE : 25th May 2013
//VERSION:0.1
//Licensed Under The MIT License 
(function($){
    $.fn.gridAccordion = function(options){
    var opts = $.extend( {}, $.fn.gridAccordion.defaults, options );
    var self = this;
    var _tableRow;
	var counter = 0;
    var _tableDataA;
    var _tableHead;
    var _tableEnd;
    var _table;
    var jsonData = opts.data;
    $.map(jsonData, function(val, i){
        $.map(val, function(key, value){
            _tableDataA = '<table id="'+value+'" class="defGa"><tbody>';
            _tableHeader = '<tr id="tr_'+value+'" onclick="" class="accordion"><td colspan="3" class="bgHeaderMenu"><img class="imgClassPlus" src="'+opts.imgSource+'/plus.png"/><label>'+value+'</label></td></tr>';
            _tableHead = '<tr class="trHead"><td class="firstCol">&nbsp;</td><td class="secondCol">&nbsp;</td><td class="bold">'+opts.tableHead+'</td></tr>';
            _tableEnd = '</tbody></table>';
            _table = _tableDataA+_tableHeader+_tableHead;
            $(self).append(_table);
            $.each(key, function(id, name){
                var className = 'oddRow';
				if(counter == 0){
					counter = 1;
					className = 'evenRow';
				} else {
					counter = 0;
					className = 'oddRow';
				}
                _tableRow = '<tr class="' + className + '"><td align="center">'+id+'</td>\
                             <td class="secondCol" align="center"><input type="checkbox" class="case" name="case" value="'+id+'"/></td>\
                             <td class="rowClick">'+name+'</td></tr>';
                $(self).children('#'+value).append(_tableRow);
            });
            

        });
    });
    $(self).append(_tableEnd);
$(function() {
    $(".defGa tr:not(.accordion)").hide();
    $(".defGa tr:first-child").show();
    $(".defGa tr.accordion").click(function(){
      $(this).nextAll("tr").fadeToggle(500);
    }).eq(0).trigger('click');
});
$(function(){
    $(".selectall").click(function () {
        $('.case').attr('checked', this.checked);
    });
    $(".case").click(function(){
        var id = $(this).attr('value');
       // alert(id);
        if($(".case").length == $(".case:checked").length) {
            $(".selectall").attr("checked", "checked");
        } else {
            $(".selectall").removeAttr("checked");
        }
 
    });
});
$(function() {
	$(".rowClick").click(function(){
		var rowID = $(this).parent().find('input').attr('value');
		//Call popups by passing id's from here
	});
});
$(function(){
    $('.accordion').click(function(){
        var imgClass = $(this).find('img').attr('class');
        if(imgClass == "imgClassMinus"){
            $(this).find('img').removeClass('imgClassMinus');
            $(this).find('img').addClass('imgClassPlus');
            $(this).find('img').attr('src',opts.imgSource+'/plus.png');

        }else {
            $(this).find('img').removeClass('imgClassPlus');
            $(this).find('img').addClass('imgClassMinus');
            $(this).find('img').attr('src',opts.imgSource+'/minus.png')
        }
    });
});




}
}(jQuery));
$.fn.gridAccordion.defaults = {
    data: {},
    imgSource : "images",
    tableHead : "Sample Head"
};
