var fullscreen_off_height = $(window).height();
var isClickedPracticeOrExam = 0;
var isDriller = 0;
var indexOfChosenDriller = -1;
var indexOfChosenSnapshot = -1;

var imagePath = 'http://localhost:52863/Content/Images/';

function repaint_window(onOff){
		var width = $(window).width();
  		var height = $(window).height();

        $('body').css('font-size',(width*18)/1920);
                     
        if(onOff=='on'){
	        if((width/height)<=(16/9)){
	            $(".container").width(width).height(width/(16/9));	
			}else $(".container").width(height*(16/9)).height(height);
		}else{
			if((width/fullscreen_off_height)<=(16/9)){
			$(".container").width(width).height(width/(16/9));	
			}else $(".container").width(fullscreen_off_height*(16/9)).height(fullscreen_off_height);
		}
		
		$('.login_form_border').css("border-width",$('.login_form_border').height()/60 + "px");
		$('#login').css("border-width",$('#login').height()/20 + "px");
		$('#password').css("border-width",$('#password').height()/20 + "px");
		$('.exam_auth,.snapshot_choice,.snapshot_list_div,.practice_auth,.practice_auth_2,.driller_choice').css("border-width",$('.practice').height()/80 + "px");
		$('#driller,#driller_supervisor,#supervisor').css("border-width",$('#driller').height()/80 + "px");
}

function mouseOutAndClick(){
		if(isClickedPracticeOrExam==1){
			$('.practice').css("background-image","url(" + imagePath + "practice_exam_background_white.svg)");
			$('.practice_text').css("color","#ffffff");
			$('.exam').css("background-image","url(" + imagePath + "practice_exam_background.svg)");
			$('.exam_text').css("color","#999999");						
		}else
		if(isClickedPracticeOrExam==2){
			$('.exam').css("background-image","url(" + imagePath + "practice_exam_background_white.svg)");
			$('.exam_text').css("color","#ffffff");			
			$('.practice').css("background-image","url(" + imagePath + "practice_exam_background.svg)");
			$('.practice_text').css("color","#999999");
		}	
}

$(document).click(function(event){
	if(((event.target !== $('.practice')[0]) && (event.target !== $('.practice_text')[0])) && ((event.target !== $('.exam')[0]) && (event.target !== $('.exam_text')[0]))
			&& (event.target !== $('#kaz_text')[0]) && (event.target !== $('#langugae_selected')[0]) && (event.target !== $('#eng_text')[0])
		){
		isClickedPracticeOrExam = 0;
		$(".exam,.practice").css("background-image","url(" + imagePath + "practice_exam_background.svg)");
		$(".exam_text,.practice_text").css("color","#999999");	
		
			$('.practice_exam_choice_div').animate({
				top: "22%"
			},500);
			
			$('.exam_auth').css({
				opacity:1,
				display:'none'}).animate({
					opacity:0
				},500);	
			
			$('.practice_auth').css({
				opacity:1,
				display:'none'}).animate({
					opacity:0
				},500);	

			$('.practice_auth_2').css({
				opacity:1,
				display:'none'}).animate({
					opacity:0
				},500);	

			$('.driller_choice').css({
				opacity:1,
				display:'none'}).animate({
					opacity:0
				},500);	
					
			$(".practice_auth_2").css("margin-left","0%");

			$('.snapshot_choice').css({
				opacity:1,
				display:'none'}).animate({
					opacity:0
				},500);	

	}					
});


$(document).ready(function () {

    $('#submit_btn_id').click(function () {
        console.log("btn clicked");
        alert("I am clicked!");
        $('#login_form_id').submit();
    });

	repaint_window('on');
	
	$(".practice,.exam").mouseover(function(){
		$(this).css("background-image","url(" + imagePath + "practice_exam_background_white.svg)");
		$('.'+$(this).attr('class')+'_text').css("color","#ffffff");		
	});


	$(".practice,.exam").mouseout(function(){
		if(isClickedPracticeOrExam==0){
			$(this).css("background-image","url(" + imagePath + "practice_exam_background.svg)");
			$('.'+$(this).attr('class')+'_text').css("color","#999999");
		}else{
			mouseOutAndClick();
		}
	});

	$('.exam_auth,.practice_auth,.practice_auth_2,.driller_choice,.snapshot_choice').click(function(event){
    	event.stopPropagation();
	});
	

/*	on practice or exam click*/
	$(".practice,.exam").click(function(){
		if($(this).attr('class')=='practice') isClickedPracticeOrExam = 1; else isClickedPracticeOrExam = 2; 
		mouseOutAndClick();		

		$('.driller_choice').css({
			opacity:1,
			display:'none'}).animate({
				opacity:0
		},500);	
					
		$(".practice_auth_2").css("margin-left","0%");

			$('.snapshot_choice').css({
				opacity:1,
				display:'none'}).animate({
					opacity:0
				},500);	



	if(isClickedPracticeOrExam==2){
		$('.practice_auth_2').css({
			opacity:1,
			display:'none'}).animate({
			opacity:0
		},500);

		$('.practice_auth').css({
			opacity:1,
			display:'none'}).animate({
			opacity:0
		},500);	

		$('.practice_exam_choice_div').animate({
			top: "0%"
		},500);
		
		$('.exam_auth').css({
			opacity:0,
			display:'inline-block'}).animate({
				opacity:1
			},500);

		for(i=1; i<=7; i++){
        	$('#exam_input_'+i).css("border-width",$('#exam_input_'+i).height()/20 + "px");	
        }



    }else
    if(isClickedPracticeOrExam==1){

    	$('.practice_auth_2').css({
			opacity:1,
			display:'none'}).animate({
			opacity:0
		},500);


		$('.exam_auth').css({
			opacity:1,
			display:'none'}).animate({
				opacity:0
		},500);	

		$('.practice_exam_choice_div').animate({
			top: "0%"
		},500);
		
		$('.practice_auth').css({
			opacity:0,
			display:'inline-block'}).animate({
				opacity:1
			},500);

		for(i=1; i<=5; i++){
        	$('#practice_input_'+i).css("border-width",$('#practice_input_'+i).height()/20 + "px");	
        }
    }

	});

	$(".practice_exam_next_icon").click(function(){
		$('.practice_auth').css({
			opacity:1,
			display:'none'}).animate({
			opacity:0
		},500);
		$
		('.practice_auth_2').css({
			opacity:0,
			display:'inline-block'}).animate({
				opacity:1
			},500);

		for(i=1; i<=3; i++){
        	$('#practice_input_2_'+i).css("border-width",$('#practice_input_2_'+i).height()/20 + "px");	
        }

        $('#driller,#driller_supervisor,#supervisor').css("border-width",$('#driller').height()/80 + "px");


	});


	$("#driller,#driller_supervisor,#supervisor").click(function(){
		$("#driller,#driller_supervisor,#supervisor").css("background-color","#2D2D32");
		$("#driller_text,#driller_supervisor_text,#supervisor_text").css("color","#999999");				

		$(this).css("background-color","#999999");
		$('#'+$(this).attr('id')+'_text').css("color","#2D2D32");

		if($(this).attr('id')=='supervisor' || $(this).attr('id')=='driller_supervisor'){
			isDriller = 1;
		}else isDriller = 0;				
	});


	$(".practice_exam_next_icon_2").click(function(){
		if(isDriller==1){
		$('.driller_choice').css({
			opacity:0,
			display:'inline-block'}).animate({
				opacity:1
			},500);
			$(".practice_auth_2").css("margin-left","28%");
		}
	});


	$(function() {
    $( "#selectable").selectable({
      stop: function() {
        $( ".ui-selected", this ).each(function() {
          indexOfChosenDriller = $( "#selectable li").index( this );
        });
      	}
    	});
  	});


	$(function() {
    $( "#selectable_snap").selectable({
      stop: function() {
        $( ".ui-selected", this ).each(function() {
          indexOfChosenSnapshot = $( "#selectable_snap li").index( this );
        });
      	}
    	});
  	});


	$(".drillers_next_icon").click(function(){
		
		if(indexOfChosenDriller==-1){
			alert("Choose Driller");
		}else{
			$('.practice_auth_2').css({
				opacity:1,
				display:'none'}).animate({
					opacity:0
				},500);	

			$('.driller_choice').css({
				opacity:1,
				display:'none'}).animate({
					opacity:0
				},500);	
					
			$(".practice_auth_2").css("margin-left","0%");
		
			$('.snapshot_choice').css({
				opacity:0,
				display:'inline-block'}).animate({
					opacity:1
				},500);	
		}	
	});

	$(".snapshot_button").click(function(){
		
		if(indexOfChosenSnapshot==-1){
			alert("Choose Snapshot");
		}else{
		}
	});



});


$(window).on("fullscreen-on", function(){
	repaint_window('on');
});

$(window).on("fullscreen-off", function(){
	repaint_window('off');                
});