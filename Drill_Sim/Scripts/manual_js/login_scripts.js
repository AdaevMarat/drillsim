var fullscreen_off_height = $(window).height();
var width = $(window).width();
var height = $(window).height();
var isClickedPracticeOrExam = 0;
var isDriller = 0;
var isUniversal = 0;
var isSupervisor = 0;
var indexOfChosenDriller = -1;
var indexOfChosenSnapshot = -1;
var user_id = "undefined";
var work_mode_set = false;
var exam_form_validated = false;
var practice_form_validated = false;
var redirect_url = null;
var added = false;
var statusHandler = null;

/*
function Simulation(){
    this.type = -1;
    this.step = 1;
    this.team = "undefined";
    this.driller = "undefined";
    this.drillerLevel = 0;
    this.supervisor = "undefined";
    this.supervisorLevel = 0;
    this.snapshot = "undefined";    
}
*/
function Student(uid, name_surname, diff_lvl) {
    this.uid = uid; // serves as connection key, or "ROOM name"
    this.name_surname = name_surname;
    this.pass_num = null;
    this.issued_by = null;
    this.course_name = null;
    this.ip_num = null;
    this.diff_lvl = diff_lvl;
}

function Snapshot(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
}

var students = new Array();
var snapshots = new Array();

function startLoadingAnimation() {
    $('.loader_div').show();
    $('.main_container').css('-webkit-filter', 'blur(7px)').css('-moz-filter', 'blur(7px)').css('-o-filter', 'blur(7px)').css('-ms-filter', 'blur(7px)').css('filter', 'blur(7px)');
}

function stopLoadingAnimation() {
    $('.loader_div').hide();
    $('.main_container').css('-webkit-filter', 'none').css('-moz-filter', 'none').css('-o-filter', 'none').css('-ms-filter', 'none').css('filter', 'none');
}

function checklen(id) {
    // register key up event
    document.getElementById('exam_input_1').onblur();
    document.getElementById('exam_input_2').onblur();
    document.getElementById('practice_input_1').onblur();
    document.getElementById('practice_input_2').onblur();
    var textBox = document.getElementById(id.substr(1, id.length - 1));
    //var trigger = document.getElementById('ex_sub_trigger');
    $(id).keyup(function () {
        if ($(this).val().length == 12) {
            textBox.style.backgroundColor = "#339989";
            $(id).submit();
        } else if ($(this).val().length < 12 ){
            textBox.style.backgroundColor = "#232328";
        } else if ($(this).val().length > 12) {
            textBox.style.backgroundColor = "#92140C";
        }
    });
}

function send_data_async() { // if driller or supervisor
    var concat = user_id + " " + students[indexOfChosenDriller].uid + " " + snapshots[indexOfChosenSnapshot].name + " " + snapshots[indexOfChosenSnapshot].id;
    var abs_path = 'http://localhost:52863/Account/GetDataAsync';
    console.log("send data async called");
    console.log("snp id: " + snapshots[indexOfChosenSnapshot].id);
    $.ajax({
        type: 'GET',
        url: abs_path + "?concat=" + concat,
        success: function (data) {
            $('#practice_form').submit();
        }
    });
}

function login(id) { // called from cshtml
    if (!work_mode_set && id == "practice_form") {
        alert("Work mode not chosen");
        return;
    }
    // kakoi snapshot vibrali i kakogo burilwika (to est ego uid)
    if (isSupervisor || isUniversal) { // not specified in exam input form
        send_data_async(); // send cur_user_id, role, 
    } else {
        $(id).submit();
    }
}

function check_status() {
    $.ajax({
        type: 'GET',
        url: '/Account/GetStatus?uid=' + user_id,
        success: function (data) {
            if (data != null) {
                window.location.href = data; // redirect to exam
            } else {
                console.log("url is null");
            }
        }
    });
    //window.location.href = redirect_url.replace("Standalone", "Exam");
}

// exam login
function login_exam() {
    startLoadingAnimation();
    $("#exam_form").submit();
}

function add_to_wait_list() {
    console.log("add_to_wait_list called");
    var abs_path = "http://localhost:52863/Account/AddToExamList";
    $.ajax({
        type: 'GET',
        url: '/Account/AddToExamList?id=' + user_id,
        success: function (data) {
            console.log("added to wait list successfully! " + data.is_success);
            statusHandler = setInterval(check_status, 5 * 1000);
        }
    });
}

// exam_form submit -> fill_form called
function fill_form(result) {
    if (result.RedirectUrl) {
        redirect_url = result.RedirectUrl;
        if (!added) {
            added = true;
            add_to_wait_list();
        }
    }
    if (result.is_success) { // return from validate
        // now we have id
        user_id = result.id;
        $("#exam_input_1").prop("readonly", true);
        document.getElementById('exam_input_2').value = result.name_surname;
        document.getElementById('exam_input_3').value = result.pass_num;
        document.getElementById('exam_input_4').value = result.issued_by;
        document.getElementById('exam_input_5').value = result.course_name;
        document.getElementById('exam_input_6').value = result.ip_num;
        document.getElementById('exam_input_7').value = result.diff_lvl;
    }
}

function fill_practice_form(result) {
    if (result.RedirectUrl && work_mode_set) { // vtoroi raz s Logina priwli, s snapshot button on click cshtml vizvali
        window.location.href = result.RedirectUrl;
    }
    if (result.is_success) {
        user_id = result.id;
        // freeze field
        $("#practice_input_1").prop("readonly", true);
        document.getElementById('practice_input_2').value = result.name_surname;
        document.getElementById('practice_input_3').value = "any_value";
        document.getElementById('practice_input_4').value = result.ip_num;
        document.getElementById('practice_input_5').value = result.diff_lvl;
        document.getElementById('practice_input_2_1').value = result.name_surname;
        document.getElementById('practice_input_2_2').value = "any_value";
        document.getElementById('practice_input_2_3').value = result.ip_num;
    }/* else {
        for (var i = 2; i <= 5; i++) {
            var cur = document.getElementById('practice_input_' + i);
            cur.value = "";
            cur.onblur();
        }
        user_id = "undefined";
    }*/
}


function repaint_window(onOff) {
    checklen('#exam_input_1');
    checklen('#practice_input_1');

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
        $('.loader_div').width(width).height(height);
}

function mouseOutAndClick(){
		if(isClickedPracticeOrExam==1){
		    $('.practice').css("background-image", "url('../Content/images/practice_exam_background_white.svg')");
			$('.practice_text').css("color","#ffffff");
			$('.exam').css("background-image", "url('../Content/images/practice_exam_background.svg')");
			$('.exam_text').css("color","#999999");						
		}else
		if(isClickedPracticeOrExam==2){
		    $('.exam').css("background-image", "url('../Content/images/practice_exam_background_white.svg')");
			$('.exam_text').css("color","#ffffff");			
			$('.practice').css("background-image", "url('../Content/images/practice_exam_background.svg')");
			$('.practice_text').css("color","#999999");
		}	
}

$(document).click(function(event){
	if(((event.target !== $('.practice')[0]) && (event.target !== $('.practice_text')[0])) && ((event.target !== $('.exam')[0]) && (event.target !== $('.exam_text')[0]))
			&& (event.target !== $('#kaz_text')[0]) && (event.target !== $('#langugae_selected')[0]) && (event.target !== $('#eng_text')[0]) && (event.target !== $('.loader_div')[0]) && (event.target !== $('#loader')[0]) && (event.target !== $('#box')[0]) && (event.target !== $('#hill')[0])
		){
		isClickedPracticeOrExam = 0;
		$(".exam,.practice").css("background-image", "url('../Content/images/practice_exam_background.svg')");
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

//PROCEED
function set_work_mode() {
    if (!isDriller && !isSupervisor && !isUniversal) {
        alert("Choose work mode");
        return;
    }
    var concat = user_id;
    if (isDriller == 1) {
        concat += "_driller";
    } else if (isSupervisor == 1) {
        concat += "_supervisor";
    } else {
        concat += "_universal";
    }

    var abs_path = 'http://localhost:52863/Account/SetWorkMode';

    $.ajax({
        type: 'GET',
        url: abs_path + "?concat=" + concat,
        success: function (data) {
            work_mode_set = true;
        }
    });

}

// ajax get snapshots from server db
function get_snapshots() {
    var abs_path = 'http://localhost:52863/User/GetSnapshotList';

    $.ajax({
        type: 'GET',
        url: abs_path,
        success: function (data) {
            snapshots.length = 0;
            var len = data.length;
            for (i = 0; i < len; i++) {
                snapshots.push(new Snapshot(data[i].id, data[i].name, data[i].description));
                $('#selectable_snap').append('<li class="ui-widget-content"><p>' + (parseInt(i, 10) + 1) + '. ' + data[i].name + '</p><p>' + data[i].description + '</p></li>');
            }
        }
    });
}



$(document).ready(function () {
	repaint_window('on');
	get_snapshots();

	$(".practice,.exam").mouseover(function(){
		$(this).css("background-image","url('../Content/images/practice_exam_background_white.svg')");
		$('.'+$(this).attr('class')+'_text').css("color","#ffffff");		
	});


	$(".practice,.exam").mouseout(function(){
		if(isClickedPracticeOrExam==0){
		    $(this).css("background-image", "url('../Content/images/practice_exam_background.svg')");
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
		    opacity: 1,
		    display: 'none'
		}).animate({
		    opacity: 0
		}, 500);


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

	} else
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
	});


	$("#driller,#driller_supervisor,#supervisor").click(function(){
		$("#driller,#driller_supervisor,#supervisor").css("background-color","#2D2D32");
		$("#driller_text,#driller_supervisor_text,#supervisor_text").css("color","#999999");				

		$(this).css("background-color","#999999");
		$('#'+$(this).attr('id')+'_text').css("color","#2D2D32");

		if($(this).attr('id')=='supervisor'){
		    isSupervisor = 1;
		    isDriller = 0;
		    isUniversal = 0;
		    set_work_mode();
		} else if ($(this).attr('id') == 'driller') {
		    isDriller = 1;
		    isSupervisor = 0;
		    isUniversal = 0;
		    set_work_mode();
		} else if ($(this).attr('id') == 'driller_supervisor') {
		    isUniversal = 1;
		    isDriller = 0;
		    isSupervisor = 0;
		    set_work_mode();
		}
	});


	$(".practice_exam_next_icon_2").click(function(){
	    if (isUniversal == 1 || isSupervisor == 1) { // draw css and send request to server and get JSON 
		$('.driller_choice').css({
			opacity:0,
			display:'inline-block'}).animate({
				opacity:1
			},500);
			$(".practice_auth_2").css("margin-left","28%");
	    } else if (isDriller == 1) { // stop scenario, proceed to /User/Standalone
	        $('.snapshot_button').click(); // calls practice form submit in cshtml
	    }
	    // after animate send request append
	    $.ajax({
	        type: 'GET',
	        url: '/Account/GetOnlineList?id=' + user_id,
	        success: function (data) {
	            $('#selectable').empty();
	            console.log("online list asynchronously received");
	            students.length = 0;
	            var len = data.length;
	            for (var i = 0; i < len; i++) {
                    // write to local list
	                // for each user
	                students.push(new Student(data[i].id, data[i].name_surname, data[i].diff_lvl));
	                var li = document.createElement("li");
	                li.innerHTML = data[i].name_surname;
	                li.setAttribute("class", "ui-widget-content");
	                $('#selectable').append(li);
	            }
	        }
	    });
	});


	$(function() {
    $( "#selectable").selectable({
      stop: function() {
        $( ".ui-selected", this ).each(function() {
            indexOfChosenDriller = $("#selectable li").index(this);
            console.log("uid: " + students[indexOfChosenDriller].uid);
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
		
		if(indexOfChosenSnapshot==-1 && (isSupervisor == 1 || isUniversal == 1)){
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