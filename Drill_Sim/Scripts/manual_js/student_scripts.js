	var fullscreen_off_height = $(window).height();

    var current_menu_id = 1;

    var cur_percentage_left = 0;
    var cur_volume_right = 0;
    //panels
    var cur_value_panels_left_left_part1_metre = 0; 
    var cur_value_panels_left_right_part1_metre = 0;
    var cur_value_panels_left_right_part2_metre = 0;        
    //end

    //29.03.2016
    var cur_value_pvo_left_left_top_metre = 0;
    var cur_value_pvo_left_right_top_metre = 0;
    var cur_value_pvo_right_left_metre = 0;
    var cur_value_pvo_right_right_metre = 0;
    var lever_head_dragging = false;  
    var pvo_left_right_bottom_ellipse_switcher_is_on = 0;

    var pvo_switchers = [0,0,0,0,0,0,0];
    //29.03.2016

    /*28.03.2016*/
    var dragging_panel_left_middle_bottom_regulator_head = false
    /*28.03.2016*/


    /*02.04.2016*/
    var cur_values_valves_metre = [0,0,0];
    var valves_switchers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    /*02.04.2016*/

    /*18.04.2016*/
    var pump_switchers = [0,0,0,0,0,0,0,0];
    /*18.04.2016*/

    var lever_head_level_fullscreen_on_off = -1;
    var left_metre_on_off = 1;
    var right_metre_on_off = 1;
    
    var isSlider_1_active = 0;
    var slider_left_range = 0;
    var slider_right_range;
    var sliderFraction = 0;
    var slider_1_value = 0;

    var isSlider_2_active = 0;
    var slider_1_left_range = 0;
    var slider_1_right_range;
    var sliderFraction_1 = 0;
    var slider_2_value = 0;

    var isSlider_3_active = 0;
    var slider_2_left_range = 0;
    var slider_2_right_range;
    var sliderFraction_2 = 0;
    var slider_3_value = 0;


    var rotorIsOn = 0;
    var pumpIsOn_1 = 0;
    var pumpIsOn_2 = 0;

    //slugging
    var slugging_switcher_1 = 0;
    var slugging_switcher_2 = 0;
    var slugging_switcher_3 = 0;
    var slugging_switcher_4 = 0;
    var slugging_switcher_5 = 0;
    //end

    //panels
    var slider_3_left_range = 0;
    var slider_3_right_range = 0;  
    var sliderFraction_3 = 0;  
    var slider_4_value = 0;
    //end

    var imagePath = 'http://localhost:52863/Content/Images/';


    //menu
    function changeMenuDiv(menuID){

        if(current_menu_id != menuID){

            $("#menu-" + menuID).find('.unselected').show();
            $("#menu-" + menuID).css("background-color","transparent");
            $("#menu-" + menuID).find("#menu_"+menuID+"_icon").attr("src",imagePath + "menu_"+menuID+"_icon"+"_on.svg");
            $("#menu-" + menuID).find("#menu_"+menuID+"_text").css("color","#ffffff");

            $("#menu-" + current_menu_id).find('.unselected').hide();
            $("#menu-" + current_menu_id).css("background-color","#2D2D32");
            $("#menu-" + current_menu_id).find("#menu_"+current_menu_id+"_icon").attr("src",imagePath + "menu_"+current_menu_id+"_icon"+"_off.svg");
            $("#menu-" + current_menu_id).find("#menu_"+current_menu_id+"_text").css("color","#b3b3b3");

            current_menu_id = menuID;

            switch(current_menu_id){
                //02.04.2016
                case '1':
                $(".rotor_area").css("display","block");
                $(".slugging_group,.supervisor_panel,.pvo_equipment,.valves_group,.pumps").css("display","none");
                if(rotorIsOn) repaintRotor(1);
                break;

                case '2':
                $(".valves_group").css("display","block");
                $(".rotor_area,.supervisor_panel,.pvo_equipment,.slugging_group,.pumps").css("display","none");
                if(!rotorIsOn) repaintRotor(0);
                break;

                case '3':
                $(".supervisor_panel").css("display","block");
                $(".rotor_area,.valves_group,.pvo_equipment,.slugging_group,.pumps").css("display","none");
                if(!rotorIsOn) repaintRotor(0);
                break;

                
                case '4':
                $(".pvo_equipment").css("display","block");
                $(".rotor_area,.valves_group,.supervisor_panel,.slugging_group,.pumps").css("display","none");
                if(!rotorIsOn) repaintRotor(0);
                break;

                case '5':
                $(".slugging_group").css("display","block");
                $(".rotor_area,.valves_group,.supervisor_panel,.pvo_equipment,.pumps").css("display","none");
                if(!rotorIsOn) repaintRotor(0);
                break;

                case '6':
                $(".pumps").css("display","block");
                $(".rotor_area,.valves_group,.supervisor_panel,.pvo_equipment,.slugging_group").css("display","none");
                if(!rotorIsOn) repaintRotor(0);
                break;


                //02.04.2016
            }

        }
    }
    //end


    function draw_left_range(startAng,endAng){
            var tx = $('#left_range').height()*0.5026;
            var ty = $('#left_range').height()*0.4833;
            var innerR = $('#left_range').width()*0.4140;
            var outerR = $('#left_range').width()*0.4753;

            var vis = d3.select("#left_range");
            vis.selectAll("*").remove();

            var arc = d3.svg.arc().innerRadius(innerR).outerRadius(outerR) .startAngle((startAng*Math.PI/75)+(-2*Math.PI/3)) .endAngle((endAng*Math.PI/75)+(-2*Math.PI/3));
            vis.append("path").attr("d",arc).attr("transform", "translate("+tx+","+ty+")").attr("fill","#009933"); 
    }

    function draw_right_range(startAng,endAng){
            var tx_r = $('#right_range').height()*0.5026;
            var ty_r = $('#right_range').height()*0.4833;
            var innerR_r = $('#right_range').width()*0.4145;
            var outerR_r = $('#right_range').width()*0.4762;

            var vis_r = d3.select("#right_range");
            vis_r.selectAll("*").remove();

            var arc = d3.svg.arc().innerRadius(innerR_r).outerRadius(outerR_r) .startAngle((startAng*Math.PI/12)) .endAngle((endAng*Math.PI/12));
            vis_r.append("path").attr("d",arc).attr("transform", "translate("+tx_r+","+ty_r+")").attr("fill","#009933"); 
    }
	
    function rotate_left_arrow_1(value_percentage){

          var angle;  
          if(value_percentage<=(9200/239)){
             angle = -92 + value_percentage*2.39;
          } else angle = -92 + value_percentage*2.39;  

          $('.left_arrow_icon').rotate({ animateTo:angle,duration:2000});
            

              var decimal_places = 1;
              var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10; 
              
              $('.left_indicator_text')
              .prop('number', cur_percentage_left * decimal_factor)
              .animateNumber(
                {
                  number: value_percentage * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_percentage_left = value_percentage;
    }


    function rotate_right_arrow_1(value_volume){

          var angle;  
          if(value_volume<=0){
             angle = value_volume*15.25;
          }else angle = value_volume*14.875;

          $('.right_arrow_icon').rotate({ animateTo:angle,duration:2000});
            

              var decimal_places = 3;
              var decimal_factor = decimal_places === 1 ? 2 : decimal_places * 1000; 
              
              $('.right_indicator_text')
              .prop('number', cur_volume_right * decimal_factor)
              .animateNumber(
                {
                  number: value_volume * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_volume_right = value_volume;
    }

    //panels
    function rotate_panel_left_left_metre_arrow(value){
          var angle;  

          angle = value*243/200;

          $('.panel_left_left_part1_metre_arrow_icon').rotate({ animateTo:angle,duration:2000});
            

              var decimal_places = 0;
              var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10; 
              
              $('.panel_left_left_part1_indicator_text')
              .prop('number', cur_value_panels_left_left_part1_metre * decimal_factor)
              .animateNumber(
                {
                  number: value * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_value_panels_left_left_part1_metre = value;
    }



    function rotate_panel_left_right_1_metre_arrow(value){
          var angle;  

          angle = value*243/200;

          $('.panel_left_right_part1_metre_arrow_icon').rotate({ animateTo:angle,duration:2000});
            

              var decimal_places = 0;
              var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10; 
              
              $('.panel_left_right_part1_indicator_text')
              .prop('number', cur_value_panels_left_right_part1_metre * decimal_factor)
              .animateNumber(
                {
                  number: value * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_value_panels_left_right_part1_metre = value;
    }

    function rotate_panel_left_right_2_metre_arrow(value){
          var angle;  

          angle = (value*100)*180/100;

          $('.panel_left_right_part2_metre_arrow_icon').rotate({ animateTo:angle,duration:2000});
            

              var decimal_places = 0;
              var decimal_factor = decimal_places === 0 ? 100 : decimal_places * 1000; 
              
              $('.panel_left_right_part2_indicator_text')
              .prop('number', cur_value_panels_left_right_part2_metre * decimal_factor)
              .animateNumber(
                {
                  number: value * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_value_panels_left_right_part2_metre = value;
    }

    //end



    /*29.03.2016*/

    function rotate_pvo_left_left_top_metre_arrow(value){
          var angle;  

          angle = value*243/200;

          $('.pvo_left_left_top_arrow_icon').rotate({ animateTo:angle,duration:2000});
            

              var decimal_places = 0;
              var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10; 
              
              $('.pvo_left_left_top_indicator_text')
              .prop('number', cur_value_pvo_left_left_top_metre * decimal_factor)
              .animateNumber(
                {
                  number: value * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_value_pvo_left_left_top_metre = value;
    }


    function rotate_pvo_left_right_top_metre_arrow(value){
          var angle;  

          angle = value*243/200;

          $('.pvo_left_right_top_arrow_icon').rotate({ animateTo:angle,duration:2000});
            

              var decimal_places = 0;
              var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10; 
              
              $('.pvo_left_right_top_indicator_text')
              .prop('number', cur_value_pvo_right_left_metre * decimal_factor)
              .animateNumber(
                {
                  number: value * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_value_pvo_right_left_metre = value;
    }


    function rotate_pvo_right_left_metre_arrow(value){
          var angle;  

          angle = value*243/200;

          $('.pvo_right_left_arrow_icon').rotate({ animateTo:angle,duration:2000});
            

              var decimal_places = 0;
              var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10; 
              
              $('.pvo_right_left_indicator_text')
              .prop('number', cur_value_pvo_left_right_top_metre * decimal_factor)
              .animateNumber(
                {
                  number: value * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_value_pvo_left_right_top_metre = value;
    }

    function rotate_pvo_right_right_metre_arrow(value){
          var angle;  

          angle = value*243/40;

          $('.pvo_right_right_arrow_icon').rotate({ animateTo:angle,duration:2000});
            

              var decimal_places = 0;
              var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10; 
              
              $('.pvo_right_right_indicator_text')
              .prop('number', cur_value_pvo_right_right_metre * decimal_factor)
              .animateNumber(
                {
                  number: value * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_value_pvo_right_right_metre = value;
    }




    function rotate_valves_metre_arrows(value,id){
          var angle;  

          angle = (value*100)*180/100;
          $('.valves_metre_part_'+id+'_metre_arrow_icon').rotate({ animateTo:angle,duration:2000});

              var decimal_places = 0;
              var decimal_factor = decimal_places === 0 ? 100 : decimal_places * 1000; 
              

              $('.valves_metre_part_'+id+'_metre_indicator_text')
              .prop('number', cur_values_valves_metre[id] * decimal_factor)
              .animateNumber(
                {
                  number: value * decimal_factor,

                  numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);
                    if (decimal_places > 0) {
                      floored_number = floored_number.toFixed(decimal_places);
                    }

                    target.text(floored_number);
                  }
                },
                1500
              );

              cur_values_valves_metre[id] = value;
    }

    function repaintRotor(type){
        if(type==0){
          $(".rotor_slider_div").html("");
        }else{
          $(".rotor_slider_div").html("<div class="+"rotor_slider"+"><img class="+"rotor"+" src="+imagePath + "rotor.svg"+"><img class="+"rotor"+" src="+imagePath + "rotor.svg"+"></div>");        
          var rotor_slider = $('.rotor_slider').slick({
            accessibility : true,
            autoplay : true,
            autoplaySpeed : 0,
            pauseOnHover : false,
            fade : false,
            speed:1500,
            arrows: false
          });      
        }
    }


    /*02.04.2016*/


    function drawSlider(){
        
        $('.slider_runner_div').draggable({
            axis: "x",
            containment: ".slider_track",
            drag: function(){
                var offset = $(this).offset();
                var xPos = offset.left;
                if(xPos>=slider_left_range && xPos<=slider_right_range){
                    slider_1_value = ((xPos-slider_left_range)/sliderFraction);
                    $('#pump_regulator_turning,.panel_left_left_pump_part2_regulator_turning').rotate((270/120)*Math.round((xPos-slider_left_range)/sliderFraction));
                    $("#regulator_indicator_text,.panel_left_left_pump_part2_indicator_text").text(Math.round((xPos-slider_left_range)/sliderFraction));
                    $(".slider_runner_tooltip_text").text(Math.round((xPos-slider_left_range)/sliderFraction));
                }
            }
        });
    }


    function drawSlider_1(){
        
        $('.slider_runner_div_1').draggable({
            axis: "x",
            containment: ".slider_track_1",
            drag: function(){
                var offset = $(this).offset();
                var xPos = offset.left;
                if(xPos>=slider_1_left_range && xPos<=slider_1_right_range){
                    slider_2_value = ((xPos-slider_1_left_range)/sliderFraction_1);
                    $('#pump_regulator_turning_1,.panel_left_left_pump_part3_regulator_turning').rotate((270/120)*Math.round((xPos-slider_1_left_range)/sliderFraction_1));
                    $("#regulator_indicator_text_1,.panel_left_left_pump_part3_indicator_text").text(Math.round((xPos-slider_1_left_range)/sliderFraction_1));
                    $(".slider_runner_tooltip_text_1").text(Math.round((xPos-slider_1_left_range)/sliderFraction_1));
                }
            }
        });
    }

    function drawSlider_2(){
        
        $('.slider_runner_div_2').draggable({
            axis: "x",
            containment: ".slider_track_2",
            drag: function(){
                var offset = $(this).offset();
                var xPos = offset.left;
                if(xPos>=slider_2_left_range && xPos<=slider_2_right_range){
                    slider_3_value = ((xPos-slider_2_left_range)/sliderFraction_2);
                    $('#pump_regulator_turning_2').rotate((270/300)*Math.round((xPos-slider_2_left_range)/sliderFraction_2));
                    $("#regulator_indicator_text_2").text(Math.round((xPos-slider_2_left_range)/sliderFraction_2));
                    $(".slider_runner_tooltip_text_2").text(Math.round((xPos-slider_2_left_range)/sliderFraction_2));
                }
            }
        });
    }

    //panels
    function drawSlider_3(){
        
        $('.slider_runner_div_3').draggable({
            axis: "x",
            containment: ".slider_track_3",
            drag: function(){
                var offset = $(this).offset();
                var xPos = offset.left;
                if(xPos>=slider_3_left_range && xPos<=slider_3_right_range){
                    slider_4_value = ((xPos-slider_3_left_range)/sliderFraction_3);
                    $('.panel_left_right_pump_part3_regulator_turning').rotate((270/30)*Math.round((xPos-slider_3_left_range)/sliderFraction_3));
                }
            }
        });
    }
    //end

    	
    function repaint_window(onOff){
        var width = $(window).width();
        var height = $(window).height();


        $('body').css('font-size',(width*18)/1920);
                                         
        if(onOff=='on' || onOff=='ready'){
            if((width/height)<=(16/9)){
                $(".container").width(width).height(width/(16/9));  
            }else $(".container").width(height*(16/9)).height(height);
        }else{
            if((width/fullscreen_off_height)<=(16/9)){
            $(".container").width(width).height(width/(16/9));  
            }else $(".container").width(fullscreen_off_height*(16/9)).height(fullscreen_off_height);
        }

        content_width = $(".container").width();
     
        var brake_fraction = ($('.brake_back').height() - $('.lever_head').height()) / 13;
        var down_range = ($('.brake_back').position().top + $('.brake_back').height()) - $('.lever_head').height();
        var up_range = $('.brake_back').position().top;
        
        if(onOff=='on' || onOff=='off'){  
            if(lever_head_level_fullscreen_on_off==1){
                $('.lever_head').css('top', ((down_range)+(down_range - 0.5*brake_fraction))/2);            
            }else if(lever_head_level_fullscreen_on_off==2){
                $('.lever_head').css('top', ((down_range - 0.5*brake_fraction)+(down_range - brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==3){
                $('.lever_head').css('top', ((down_range - brake_fraction)+(down_range - 1.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==4){
                $('.lever_head').css('top', ((down_range - 1.5*brake_fraction)+(down_range - 2*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==5){
                $('.lever_head').css('top', ((down_range - 2*brake_fraction)+(down_range - 2.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==6){
                $('.lever_head').css('top', ((down_range - 2.5*brake_fraction)+(down_range - 3*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==7){
                $('.lever_head').css('top', ((down_range - 3*brake_fraction)+(down_range - 3.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==8){
                $('.lever_head').css('top', ((down_range - 3.5*brake_fraction)+(down_range - 4*brake_fraction))/2);  
            }else if(lever_head_level_fullscreen_on_off==9){
                $('.lever_head').css('top', ((down_range - 4*brake_fraction)+(down_range - 4.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==10){
                $('.lever_head').css('top', ((down_range - 4.5*brake_fraction)+(down_range - 5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==11){
                $('.lever_head').css('top', ((down_range - 5*brake_fraction)+(down_range - 5.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==12){
                $('.lever_head').css('top', ((down_range - 5.5*brake_fraction)+(down_range - 6*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==13){
                $('.lever_head').css('top', ((down_range - 6*brake_fraction)+(down_range - 7*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==14){
                $('.lever_head').css('top', ((down_range - 7*brake_fraction)+(down_range - 8*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==15){
                $('.lever_head').css('top', ((down_range - 8*brake_fraction)+(down_range - 8.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==16){
                $('.lever_head').css('top', ((down_range - 8.5*brake_fraction)+(down_range - 9*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==17){
                $('.lever_head').css('top', ((down_range - 9*brake_fraction)+(down_range - 9.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==18){
                $('.lever_head').css('top', ((down_range - 9.5*brake_fraction)+(down_range - 10*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==19){
                $('.lever_head').css('top', ((down_range - 10*brake_fraction)+(down_range - 10.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==20){
                $('.lever_head').css('top', ((down_range - 10.5*brake_fraction)+(down_range - 11*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==21){
                $('.lever_head').css('top', ((down_range - 11*brake_fraction)+(down_range - 11.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==22){
                $('.lever_head').css('top', ((down_range - 11.5*brake_fraction)+(down_range - 12*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==23){
                $('.lever_head').css('top', ((down_range - 12*brake_fraction)+(down_range - 12.5*brake_fraction))/2);                        
            }else if(lever_head_level_fullscreen_on_off==24){
                $('.lever_head').css('top', ((down_range - 12.5*brake_fraction)+(down_range - 13*brake_fraction))/2);                        
            }
        }
        
        $('.lever_head').on('mousedown', function(e){
          e.preventDefault();
          lever_head_dragging = true;                
        });

        $(document).on('mousemove', function(me){

          if(lever_head_dragging==true){

            if($('.lever_head').position().top<=down_range+10 && $('.lever_head').position().top>=(down_range - brake_fraction/2)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_1.png"});   
                lever_head_level_fullscreen_on_off = 1;           
            }
            
            if($('.lever_head').position().top<=(down_range - brake_fraction/2) && $('.lever_head').position().top>=(down_range - brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_1.5.png"});              
                lever_head_level_fullscreen_on_off = 2;           
            }

            if($('.lever_head').position().top<(down_range - brake_fraction) && $('.lever_head').position().top>=(down_range - 1.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_2.png"});              
                lever_head_level_fullscreen_on_off = 3;           
            }
            
            if($('.lever_head').position().top<(down_range - 1.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 2*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_2.5.png"});              
                lever_head_level_fullscreen_on_off = 4;           
            }
                  
            if($('.lever_head').position().top<(down_range - 2*brake_fraction) && $('.lever_head').position().top>=(down_range - 2.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_3.png"});              
                lever_head_level_fullscreen_on_off = 5;           
            }

            if($('.lever_head').position().top<(down_range - 2.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 3*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_3.5.png"});              
                lever_head_level_fullscreen_on_off = 6;           
            }

            if($('.lever_head').position().top<(down_range - 3*brake_fraction) && $('.lever_head').position().top>=(down_range - 3.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_4.png"});              
                lever_head_level_fullscreen_on_off = 7;           
            }
            
            if($('.lever_head').position().top<(down_range - 3.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 4*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_4.5.png"});  
                lever_head_level_fullscreen_on_off = 8;           
            }
            
            if($('.lever_head').position().top<(down_range - 4*brake_fraction) && $('.lever_head').position().top>=(down_range - 4.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_5.png"});              
                lever_head_level_fullscreen_on_off = 9;           
            }
            
            if($('.lever_head').position().top<(down_range - 4.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_5.5.png"});              
                lever_head_level_fullscreen_on_off = 10;           
            }

            if($('.lever_head').position().top<(down_range - 5*brake_fraction) && $('.lever_head').position().top>=(down_range - 5.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_6.png"});              
                lever_head_level_fullscreen_on_off = 11;           
            }
            
            if($('.lever_head').position().top<(down_range - 5.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 6*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_6.5.png"});              
                lever_head_level_fullscreen_on_off = 12;           
            }

            if($('.lever_head').position().top<(down_range - 6*brake_fraction) && $('.lever_head').position().top>=(down_range - 7*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_7.png"});              
                lever_head_level_fullscreen_on_off = 13;           
            }
            
            if($('.lever_head').position().top<(down_range - 7*brake_fraction) && $('.lever_head').position().top>=(down_range - 8*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_8.png"});              
                lever_head_level_fullscreen_on_off = 14;           
            }
            
            if($('.lever_head').position().top<(down_range - 8*brake_fraction) && $('.lever_head').position().top>=(down_range - 8.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_8.5.png"});              
                lever_head_level_fullscreen_on_off = 15;           
            }

            if($('.lever_head').position().top<(down_range - 8.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 9*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_9.png"});              
                lever_head_level_fullscreen_on_off = 16;           
            }
            
            if($('.lever_head').position().top<(down_range - 9*brake_fraction) && $('.lever_head').position().top>=(down_range - 9.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_9.5.png"});              
                lever_head_level_fullscreen_on_off = 17;           
            }

            if($('.lever_head').position().top<(down_range - 9.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 10*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_10.png"});              
                lever_head_level_fullscreen_on_off = 18;           
            }

            if($('.lever_head').position().top<(down_range - 10*brake_fraction) && $('.lever_head').position().top>=(down_range - 10.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_10.5.png"});              
                lever_head_level_fullscreen_on_off = 19;           
            }

            if($('.lever_head').position().top<(down_range - 10.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 11*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_11.png"});              
                lever_head_level_fullscreen_on_off = 20;           
            }

            if($('.lever_head').position().top<(down_range - 11*brake_fraction) && $('.lever_head').position().top>=(down_range - 11.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_11.5.png"});              
                lever_head_level_fullscreen_on_off = 21;           
            }

            if($('.lever_head').position().top<(down_range - 11.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 12*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_12.png"});              
                lever_head_level_fullscreen_on_off = 22;           
            }

            if($('.lever_head').position().top<(down_range - 12*brake_fraction) && $('.lever_head').position().top>=(down_range - 12.5*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_12.5.png"});              
                lever_head_level_fullscreen_on_off = 23;           
            }
            
            if($('.lever_head').position().top<(down_range - 12.5*brake_fraction) && $('.lever_head').position().top>=(down_range - 13*brake_fraction)){
                $('img[class="lever"]').attr({src: imagePath + "lever_" + "lever_13.png"});              
                lever_head_level_fullscreen_on_off = 24;           
            }

          }
        });

        draw_left_range($('#left_up_range_text').text(),$('#left_down_range_text').text());
        draw_right_range($('#right_up_range_text').text(),$('#right_down_range_text').text());

        $(".slider_regulator").css("display","block");
        slider_left_range = $('.slider_track').offset().left;
        sliderFraction = ($('.slider_track').width()-$('.slider_runner_div').width())/120; 
        slider_right_range = $('.slider_track').offset().left + $('.slider_track').width()-$('.slider_runner_div').width();
        $('.slider_runner_div').css("left",sliderFraction*slider_1_value);
        $(".slider_regulator").css("display","none");

        $(".slider_regulator_1").css("display","block");
        slider_1_left_range = $('.slider_track_1').offset().left;
        sliderFraction_1 = ($('.slider_track_1').width()-$('.slider_runner_div_1').width())/120; 
        slider_1_right_range = $('.slider_track_1').offset().left + $('.slider_track_1').width()-$('.slider_runner_div_1').width();
        $('.slider_runner_div_1').css("left",sliderFraction_1*slider_2_value);
        $(".slider_regulator_1").css("display","none");

        $(".slider_regulator_2").css("display","block");
        slider_2_left_range = $('.slider_track_2').offset().left;
        sliderFraction_2 = ($('.slider_track_2').width()-$('.slider_runner_div_2').width())/300; 
        slider_2_right_range = $('.slider_track_2').offset().left + $('.slider_track_2').width()-$('.slider_runner_div_2').width();
        $('.slider_runner_div_2').css("left",sliderFraction_2*slider_3_value);
        $(".slider_regulator_2").css("display","none");

        //panels
        $(".supervisor_panel,.slider_regulator_3").css("display","block");
        slider_3_left_range = $('.slider_track_3').offset().left;
        sliderFraction_3 = ($('.slider_track_3').width()-$('.slider_runner_div_3').width())/30; 
        slider_3_right_range = $('.slider_track_3').offset().left + $('.slider_track_3').width()-$('.slider_runner_div_3').width();
        $('.slider_runner_div_3').css("left",sliderFraction_3*slider_4_value);
        
        /*28.03.2016*/
        $(".slider_regulator_3").css("display","none");
        if(current_menu_id!=3)$(".slider_regulator_3,.supervisor_panel").css("display","none");
        /*28.03.2016*/
        
        //end
}

function change_slugging_level_of_auqa_in_pipe(value){
    $('.slugging_level_if_aqua_in_pipe_left_div').css("height",""+value+"%");
    $('.slugging_level_if_aqua_in_pipe_left_text').text(value+"%");
} 

//16.05.2016
function change_slugging_level_of_auqa_in_reservoir(value){
    $('.slugging_level_of_aqua_in_reservoir_div,#pumps_level_of_aqua_in_reservoir_text').css("height",""+value+"%");    
    var rotor_aqua_level_in_reservior_ranges_top = 84 - value*0.08;
    var pumps_aqua_level_in_reservior_ranges_top = 88.5 - value*0.16;
    $('.rotor_aqua_level_in_reservior_ranges').css("top",""+rotor_aqua_level_in_reservior_ranges_top+"%");
    $('.pumps_aqua_level_in_reservior_ranges').css("top",""+pumps_aqua_level_in_reservior_ranges_top+"%");
    $('.slugging_level_of_aqua_in_reservoir_text,#pumps_level_of_aqua_in_reservoir_text').text(value+"%");
} 
//16.05.2016

    $(document).click(function(event){
        
        if(event.target !== $('#pump_regulator_turning')[0] && event.target !== $('.slider_regulator')[0] && event.target !== $('.slider_track')[0] 
            && event.target !== $('.slider_runner_div')[0] && event.target !== $('.slider_runner')[0] && event.target !== $('.slider_runner_popup')[0]) 
            if(isSlider_1_active==1){
                $(".slider_regulator").css("display","none");
                isSlider_1_active = 0;
            }

        if(event.target !== $('#pump_regulator_turning_1')[0] && event.target !== $('.slider_regulator_1')[0] && event.target !== $('.slider_track_1')[0] 
            && event.target !== $('.slider_runner_div_1')[0] && event.target !== $('.slider_runner_1')[0] && event.target !== $('.slider_runner_popup')[0]) 
            if(isSlider_2_active==1){
                $(".slider_regulator_1").css("display","none");
                isSlider_2_active = 0;
            }

        if(event.target !== $('#pump_regulator_turning_2')[0] && event.target !== $('.slider_regulator_2')[0] && event.target !== $('.slider_track_2')[0] 
            && event.target !== $('.slider_runner_div_2')[0] && event.target !== $('.slider_runner_2')[0] && event.target !== $('.slider_runner_popup')[0]) 
            if(isSlider_3_active==1){
                $(".slider_regulator_2").css("display","none");
                isSlider_3_active = 0;
            }

        if(event.target !== $('.panel_left_right_pump_part3_regulator_turning')[0] && event.target !== $('.slider_regulator_3')[0] && event.target !== $('.slider_track_3')[0] 
            && event.target !== $('.slider_runner_div_3')[0] && event.target !== $('.slider_runner_3')[0]) 
                $(".slider_regulator_3").css("display","none");
        
        if(event.target !== $('.pumps_aqua_level_in_reservior')[0] && event.target !== $('.pumps_aqua_level_in_reservior_ranges')[0] 
            && event.target !== $('#pumps_level_of_aqua_in_reservoir_text')[0] && event.target !== $('.pumps_aqua_features')[0]  && event.target !== $('.pumps_aqua_features_down')[0] && event.target !== $('.pumps_aqua_features_up')[0] 
            && event.target.id !== 'pumps_part_text' && event.target.id !== 'pumps_part_indicator_input'  && event.target.id !== 'part_indicator_input'
            && event.target.id !== 'pumps_part_unit' && event.target.id !== 'pumps_aqua_utilization_text'){ 
              $(".pumps_aqua_features").css("display","none");
              $('.pumps_elements,.pumps_background').css("opacity",1);
              $('.pumps_elements').css("pointer-events","auto");
              $('.pumps_fil1-reservior').css("fill","#B3B3B3");                  
        }
    });

	$(document).ready(function (){
        repaint_window('ready');
        
        rotate_left_arrow_1(100);
        rotate_right_arrow_1(8);

        $('.lever_head').draggable({
            axis: "y",
            containment: ".brake_back",
        });
          
          //$('.drill_device_2').setAttribute("transform", "translate(0,500)");  
          //$('.drill_device_2').css({"-webkit-transform":"translate(100px,100px)"});

            var longpress = false;
            var interv;
            var drill_device_2_height = 1.17;
            var hose_2_height = 1.17;
            var drill_device_3_pos = 0;
            var drill_device_4_pos = 0;            
            
            function move_down()
            {
                drill_device_2_height -= 0.005;
                hose_2_height -= 0.005;
                drill_device_3_pos += 0.815;
                drill_device_4_pos += 0.1075;
                $('.drill_device_2').css({"transform":"scale(1,"+drill_device_2_height+")"});
                $('.hose_2').css({"transform":"scale(1,"+hose_2_height+")"});
                $('.drill_device_3').css({"transform":"translateY("+drill_device_3_pos+"%"+")"});
                $('.drill_device_4').css({"transform":"translateY("+drill_device_4_pos+"%"+")"});
            }
            
            var startTime, endTime;
            
            $(".descent").on('mousedown', function () {
                startTime = new Date().getTime();
                $(".descent").css("background-color", "#CCCCCC");
                $(".ascent").css("background-color", "#1A1A1A");
                $(".brake_arrow").rotate(180);
                interv = setInterval(function(){
                    move_down();
                }, 150);
            });

            $(".descent").on('mouseup', function () {
                endTime = new Date().getTime();
                longpress = (endTime - startTime < 500) ? false : true;
                clearInterval(interv);
            });

            function move_up()
            {
                drill_device_2_height -= (-1)*0.005;
                hose_2_height -= (-1)*0.005;
                drill_device_3_pos += (-1)*0.815;
                drill_device_4_pos += (-1)*0.1075;
                $('.drill_device_2').css({"transform":"scale(1,"+drill_device_2_height+")"});
                $('.hose_2').css({"transform":"scale(1,"+hose_2_height+")"});
                $('.drill_device_3').css({"transform":"translateY("+drill_device_3_pos+"%"+")"});
                $('.drill_device_4').css({"transform":"translateY("+drill_device_4_pos+"%"+")"});
            }
            
            var startTime, endTime;
            
            $(".ascent").on('mousedown', function () {
                startTime = new Date().getTime();
                $(".descent").css("background-color", "#1A1A1A");
                $(".ascent").css("background-color", "#CCCCCC");
                $(".brake_arrow").rotate(0);
                interv = setInterval(function(){
                    move_up();
                }, 150);
            });

            $(".ascent").on('mouseup', function () {
                endTime = new Date().getTime();
                longpress = (endTime - startTime < 500) ? false : true;
                clearInterval(interv);
            });


            $(".left_ranges").click(function(){
                if(left_metre_on_off==1){
                    $('.left_metre,.left_ranges,.left_restart').css({
                        display:'none'});                                    
                    $('.left_ranges_settings').css({
                        display:'block'});
                }
            });
            
            $(".right_ranges").click(function(){
                if(right_metre_on_off==1){
                    $('.right_metre,.right_ranges,.right_restart').css({
                        display:'none'});                                    
                    $('.right_ranges_settings').css({
                        display:'block'});
                }
            });

            $(".left_cancel").click(function(){
                $('.left_metre,.left_ranges').css({
                    display:'block'});
                $('.left_restart').css({
                    display:'table'});             
                $('.left_ranges_settings').css({
                    display:'none'});
            });

            $(".right_cancel").click(function(){
                $('.right_metre,.right_ranges').css({
                    display:'block'});
                $('.right_restart').css({
                    display:'table'});             
                $('.right_ranges_settings').css({
                    display:'none'});
            });



        jQuery(".left_up_range_input,.left_down_range_input,.right_up_range_input,.right_down_range_input").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .

            if(($(this).attr('class')=='right_up_range_input') || ($(this).attr('class')=='right_down_range_input')){
                if(event.keyCode == 109 || event.keyCode == 189 || event.keyCode == 173) return;
            }

            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }
            }


        });


            $(".left_apply").click(function(){

                $('.left_metre,.left_ranges').css({
                    display:'block'});
                $('.left_restart').css({
                    display:'table'});             
                $('.left_ranges_settings').css({
                    display:'none'});

                $('#left_up_range_text').text($('.left_down_range_input').val());
                $('#left_down_range_text').text($('.left_up_range_input').val());

                draw_left_range($('.left_up_range_input').val(),$('.left_down_range_input').val());

            });

            $(".right_apply").click(function(){
                $('.right_metre,.right_ranges').css({
                    display:'block'});
                $('.right_restart').css({
                    display:'table'});             
                $('.right_ranges_settings').css({
                    display:'none'});

                $('#right_up_range_text').text($('.right_down_range_input').val());
                $('#right_down_range_text').text($('.right_up_range_input').val());
                
                draw_right_range($('.right_up_range_input').val(),$('.right_down_range_input').val());


            });

            $(".left_restart").click(function(){
                if(left_metre_on_off==1){
                    var vis = d3.select("#left_range");
                    vis.selectAll("*").remove();
                    rotate_left_arrow_1(0);
                    $(".left_metre").css("background-image", "url(" + imagePath + "left_metre_1_off.svg)");  
                    $(".left_metre_switch").text("ВЫКЛ").css("background-color", "#2D2D32").css("color","#808080");
                    $(".left_ranges").css("cursor","default");
                    left_metre_on_off = 0;
                }else{
                    draw_left_range($('#left_up_range_text').text(),$('#left_down_range_text').text());
                    $(".left_metre").css("background-image", "url(" + imagePath + "left_metre_1.svg)");  
                    $(".left_metre_switch").text("ВКЛ").css("background-color", "#CCCCCC").css("color","#232328");
                    $(".left_ranges").css("cursor","pointer");
                    left_metre_on_off = 1;                
                }
            });

            $(".right_restart").click(function(){
                if(right_metre_on_off==1){
                    var vis = d3.select("#right_range");
                    vis.selectAll("*").remove();
                    rotate_right_arrow_1(0);
                    $(".right_metre").css("background-image", "url(" + imagePath + "right_metre_1_off.svg)");  
                    $(".right_metre_switch").text("ВЫКЛ").css("background-color", "#2D2D32").css("color","#808080");
                    $(".right_ranges").css("cursor","default");
                    right_metre_on_off = 0;
                }else{
                    draw_right_range($('#right_up_range_text').text(),$('#right_down_range_text').text());
                    $(".right_metre").css("background-image", "url(" + imagePath + "right_metre_1.svg)");  
                    $(".right_metre_switch").text("ВКЛ").css("background-color", "#CCCCCC").css("color","#232328");
                    $(".right_ranges").css("cursor","pointer");
                    right_metre_on_off = 1;                
                }
            });



            $("#pump_regulator_turning").click(function(){
                if(pumpIsOn_1==1){
                    $(".slider_regulator").css("display","block");
                    isSlider_1_active = 1;
                    drawSlider();
                }
            });

            $("#pump_regulator_turning_1").click(function(){
                if(pumpIsOn_2==1){
                    $(".slider_regulator_1").css("display","block");
                    isSlider_2_active = 1;
                    drawSlider_1();
                }
            });

            $("#pump_regulator_turning_2").click(function(){
                if(rotorIsOn==1){
                    $(".slider_regulator_2").css("display","block");
                    isSlider_3_active = 1;
                    drawSlider_2();
                }
            });

            $("#on_green_1,.panel_left_left_pump_part2_on_green_1").click(function(){
                if(pumpIsOn_1==1){   
                    $("#on_green_1").animate({
                        "top": "62%",
                        "background-color":"#BA0000"
                    },700);
                    $(".panel_left_left_pump_part2_on_green_1").animate({
                        "top": "59%",
                        "background-color":"#BA0000"
                    },700);
                    pumpIsOn_1 = 0;
                    $('#pump_on_text,#pump_on_text_3').css("color","#666666");                
                    $('#pump_off_text,#pump_off_text_3').css("color","#b3b3b3");
                    $("#pump_regulator,.panel_left_left_pump_part2").css("background-image", "url(" + imagePath + "pump_regulator_off.svg)");  
                    $("#regulator_indicator_background").css("background-image", "url(" + imagePath + "regulator_indicator_background_off.svg)");
                    $(".panel_left_left_pump_part2_indicator_div").css("background-image", "url(" + imagePath + "panel_left_left_pump_part2_indicator.svg)");   
                    $('#regulator_indicator_unit,.panel_left_left_pump_part2_indicator_text').css("color","#4D4D4D");  
                }else{
                    $("#on_green_1").animate({
                        "top": "14%",
                        "background-color":"#009933"
                    },700);
                    $(".panel_left_left_pump_part2_on_green_1").animate({
                        "top": "18.5%",
                        "background-color":"#009933"
                    },700);

                    pumpIsOn_1 = 1;                    
                    $('#pump_on_text,#pump_on_text_3').css("color","#b3b3b3");                
                    $('#pump_off_text,#pump_off_text_3').css("color","#666666");
                    $("#pump_regulator,.panel_left_left_pump_part2").css("background-image", "url(" + imagePath + "pump_regulator_active.svg)"); 
                    $("#regulator_indicator_background").css("background-image", "url(" + imagePath + "regulator_indicator_background.svg)");  
                    $(".panel_left_left_pump_part2_indicator_div").css("background-image", "url(" + imagePath + "panel_left_left_pump_part2_indicator_on.svg)");   
                    $('#regulator_indicator_unit').css("color","#808080");  
                    $('.panel_left_left_pump_part2_indicator_text').css("color","#999999");  
                }
            });


            $("#on_green_2,.panel_left_left_pump_part3_on_green_2").click(function(){
                if(pumpIsOn_2==1){
                    $("#on_green_2").animate({
                        "top": "62%",
                        "background-color":"red"
                    },700);
                    pumpIsOn_2 = 0;
                    $(".panel_left_left_pump_part3_on_green_2").animate({
                        "top": "59%",
                        "background-color":"#BA0000"
                    },700);
                    $('#pump_on_text_1,#pump_on_text_4').css("color","#666666");                
                    $('#pump_off_text_1,#pump_off_text_4').css("color","#b3b3b3");
                    $("#pump_regulator_1,.panel_left_left_pump_part3").css("background-image", "url(" + imagePath + "pump_regulator_off.svg)");  
                    $("#regulator_indicator_background_1").css("background-image", "url(" + imagePath + "regulator_indicator_background_off.svg)");
                    $('#regulator_indicator_unit_1,.panel_left_left_pump_part3_indicator_text').css("color","#4D4D4D");  
                    $(".panel_left_left_pump_part3_indicator_div").css("background-image", "url(" + imagePath + "panel_left_left_pump_part2_indicator.svg)");   
                }else{
                    $("#on_green_2").animate({
                        "top": "14%",
                        "background-color":"#009933"
                    },700);
                    pumpIsOn_2 = 1;                    
                    $(".panel_left_left_pump_part3_on_green_2").animate({
                        "top": "18.5%",
                        "background-color":"#009933"
                    },700);
                    $('#pump_on_text_1,#pump_on_text_4').css("color","#b3b3b3");                
                    $('#pump_off_text_1,#pump_off_text_4').css("color","#666666");
                    $("#pump_regulator_1,.panel_left_left_pump_part3").css("background-image", "url(" + imagePath + "pump_regulator_active.svg)");  
                    $("#regulator_indicator_background_1").css("background-image", "url(" + imagePath + "regulator_indicator_background.svg)");  
                    $('#regulator_indicator_unit_1').css("color","#808080");  
                    $(".panel_left_left_pump_part3_indicator_div").css("background-image", "url(" + imagePath + "panel_left_left_pump_part2_indicator_on.svg)");   
                    $('.panel_left_left_pump_part3_indicator_text').css("color","#999999");  
                }
            });


            $("#on_green_3").click(function(){
                if(rotorIsOn==1){
                    repaintRotor(0);
                    $("#on_green_3").animate({
                        "top": "62%",
                        "background-color":"red"
                    },700);
                    rotorIsOn = 0;
                    $('#pump_on_text_2').css("color","#666666");                
                    $('#pump_off_text_2').css("color","#b3b3b3");
                    $("#pump_regulator_rotor").css("background-image", "url(" + imagePath + "pump_regulator_off_rotor.svg)");  
                    $("#regulator_indicator_background_2").css("background-image", "url(" + imagePath + "regulator_indicator_background_off.svg)");
                    $('#regulator_indicator_unit_2').css("color","#4D4D4D");  
                }else{
                    repaintRotor(1);
                    $("#on_green_3").animate({
                        "top": "14%",
                        "background-color":"#009933"
                    },700);
                    rotorIsOn = 1;                    
                    $('#pump_on_text_2').css("color","#b3b3b3");                
                    $('#pump_off_text_2').css("color","#666666");
                    $("#pump_regulator_rotor").css("background-image", "url(" + imagePath + "pump_regulator_active_rotor.svg)");  
                    $("#regulator_indicator_background_2").css("background-image", "url(" + imagePath + "regulator_indicator_background.svg)");  
                    $('#regulator_indicator_unit_2').css("color","#808080");  
                }
            });

        //slugging & menu
        $("#menu-"+current_menu_id).find('.unselected').css("display","block");

        $("#menu-1,#menu-2,#menu-3,#menu-4,#menu-5,#menu-6").click(function(){
            changeMenuDiv($(this).attr('id').substr($(this).attr('id').length - 1));
        });

        $("#fil8-1,#fil1").click(function(){
            if(!slugging_switcher_1){
              $(".fil4-1,.fil2-1").css("fill","#B3B3B3");
              $(".str2-1").css("stroke","#B3B3B3");
              $(".fil9-1").css("fill","#333333");  
              $("#fil8-1").css("fill","#33CC33");   
              slugging_switcher_1 = 1; 
            }else{
              $(".fil4-1,.fil2-1").css("fill","#666666");
              $(".str2-1").css("stroke","#666666");
              $(".fil9-1").css("fill","#CCCCCC");  
              $("#fil8-1").css("fill","#FF0000");   
              slugging_switcher_1 = 0;               
            }             
        });

        $("#fil5-2,#fil1-2").click(function(){
            if(!slugging_switcher_2){
              $(".fil4-2,.fil6-2,.fil2-2").css("fill","#B3B3B3");
              $(".str1-2").css("stroke","#B3B3B3");
              $(".fil7-2").css("fill","#333333");  
              $("#fil5-2").css("fill","#33CC33");  
              slugging_switcher_2 = 1; 
            }else{
              $(".fil4-2,.fil6-2,.fil2-2").css("fill","#666666");
              $(".str1-2").css("stroke","#666666");
              $(".fil7-2").css("fill","#CCCCCC");  
              $("#fil5-2").css("fill","#FF0000");  
              slugging_switcher_2 = 0;               
            }              
        });


        $("#fil5-3,#fil1-3").click(function(){
  //          if(slugging_switcher_1==1 || slugging_switcher_2==1){
              if(!slugging_switcher_3){
                $(".fil2-3,.fil6-3").css("fill","#B3B3B3");
                $("#fil5-3").css("fill","#33CC33");  
                slugging_switcher_3 = 1;
              }else{
                $(".fil2-3,.fil6-3").css("fill","#666666");
                $("#fil5-3").css("fill","#FF0000");  
                slugging_switcher_3 = 0;                
              }            
/*                if(slugging_switcher_1==1){
                    $(".fil6-2").css("fill","#B3B3B3");
                    $(".fil7-2").css("fill","#333333");  
                }
                if(slugging_switcher_2==1){
                    $(".fil2-1").css("fill","#B3B3B3");
                    $(".fil9-1").css("fill","#333333");                      
                }
*/  //          } 

        });



        $("#fil5-4,#fil1-4").click(function(){
          if(!slugging_switcher_4){
              $(".fil2-4,.fil6-4,.fil4-4").css("fill","#B3B3B3");
              $(".str1-4").css("stroke","#B3B3B3");
              $("#fil5-4").css("fill","#33CC33");  
              slugging_switcher_4 = 1;
            }else{
              $(".fil2-4,.fil6-4,.fil4-4").css("fill","#666666");
              $(".str1-4").css("stroke","#666666");
              $("#fil5-4").css("fill","#FF0000");  
              slugging_switcher_4 = 0;              
            }               
        });

        $("#fil5-5,#fil1-5").click(function(){
          if(!slugging_switcher_5){
              $(".fil2-5,.fil4-5").css("fill","#B3B3B3");
              $(".str1-5").css("stroke","#B3B3B3");
              $("#fil5-5").css("fill","#33CC33");  
              slugging_switcher_5 = 1;
            }else{
              $(".fil2-5,.fil4-5").css("fill","#666666");
              $(".str1-5").css("stroke","#666666");
              $("#fil5-5").css("fill","#FF0000");  
              slugging_switcher_5 = 0;              
            }               
        });


        change_slugging_level_of_auqa_in_pipe(40);
        change_slugging_level_of_auqa_in_reservoir(60);

        rotate_panel_left_left_metre_arrow(120);
        rotate_panel_left_right_1_metre_arrow(150);
        rotate_panel_left_right_2_metre_arrow(0.5);

        $(".panel_left_right_pump_part3_regulator_turning").click(function(){
            $(".slider_regulator_3").css("display","block");
            drawSlider_3();
        });

                
        var target = $('.panel_left_middle_bottom_regulator_div')

        $('.panel_left_middle_bottom_regulator_head').mousedown(function(e) {
            e.preventDefault(); 
            dragging_panel_left_middle_bottom_regulator_head = true;
        });

        $(document).mouseup(function(e) {
            if(dragging_panel_left_middle_bottom_regulator_head==true){
                dragging_panel_left_middle_bottom_regulator_head = false;
            }
            if(lever_head_dragging==true){
              lever_head_dragging = false;
            }
        });

        $(document).mousemove(function(e) {
            if (dragging_panel_left_middle_bottom_regulator_head) {
                var mouse_x = e.pageX;
                var mouse_y = e.pageY;
                var radians = Math.atan2(mouse_y-$('.wrapper').height()*0.8553, mouse_x-$('.wrapper').width()*0.4289);
                var degree = ((radians * (180 / Math.PI) * -1)-90)*-1;
                if(radians>=-2.0689718614556813 && radians<=-1.0621758785719297){
                    target.css('-moz-transform', 'rotate(' + degree + 'deg)');
                    target.css('-webkit-transform', 'rotate(' + degree + 'deg)');
                    target.css('-o-transform', 'rotate(' + degree + 'deg)');
                    target.css('-ms-transform', 'rotate(' + degree + 'deg)');
                    target.css('-transform', 'rotate(' + degree + 'deg)');
                }

            }
        })


        rotate_pvo_left_left_top_metre_arrow(0);
        rotate_pvo_left_right_top_metre_arrow(150);
        rotate_pvo_right_left_metre_arrow(200);
        rotate_pvo_right_right_metre_arrow(40);



        $(".pvo_left_right_bottom_ellipse_switcher").click(function(){
          if(pvo_left_right_bottom_ellipse_switcher_is_on==0){
            $(this).animate({
              "left": "55%",
              "background-color":"#009933"
            },700);          
            pvo_left_right_bottom_ellipse_switcher_is_on = 1;
          }else{
            $(this).animate({
              "left": "32%",
              "background-color":"#FF00000"
            },700);          
            pvo_left_right_bottom_ellipse_switcher_is_on = 0;            
          }  
        });


        $("#pvo_equipment_switcher_1,#pvo_equipment_switcher_2,#pvo_equipment_switcher_3,#pvo_equipment_switcher_4,#pvo_equipment_switcher_5,#pvo_equipment_switcher_6").click(function(){
             var index = $(this).attr('id').substr($(this).attr('id').length - 1);
             if(index>=1 && index<=4){
               if(pvo_switchers[index]==0){
                  $(this).animate({
                    "left": "52.15%",
                    "background-color":"#009933"
                  },700);

                  $('.pvo_fil0-'+index+'').css("fill","#B3B3B3");
                  $('.pvo_fil2-'+index+',.pvo_fil4-'+index+'').css("fill","#2D2D32");
                  $('.pvo_fil2-'+index+'-1').css("fill","#666666");

                  pvo_switchers[index] = 1;                       
               }else{
                $(this).animate({
                  "left": "42.8%",
                  "background-color":"#FF00000"
                },700);        

                  $('.pvo_fil0-'+index+'').css("fill","#666666");
                  $('.pvo_fil2-'+index+',.pvo_fil2-'+index+'-1').css("fill","#E6E6E6");
                  $('.pvo_fil4-'+index+'').css("fill","#999999");

                  pvo_switchers[index] = 0;                                   
               } 
             }else if(index==5){
               if(pvo_switchers[index]==0){
                  $(this).animate({
                    "left": "17.15%",
                    "background-color":"#009933"
                  },700);
                  $('.pvo_fil0-'+index+'').css("fill","#B3B3B3");
                  $('.pvo_fil2-'+index+',.pvo_fil4-'+index+'').css("fill","#2D2D32");
                  $('.pvo_fil2-'+index+'-1').css("fill","#666666");                  
                  pvo_switchers[index] = 1;                       
               }else{
                $(this).animate({
                  "left": "7.8%",
                  "background-color":"#FF00000"
                },700);          
                  $('.pvo_fil0-'+index+'').css("fill","#666666");
                  $('.pvo_fil2-'+index+',.pvo_fil2-'+index+'-1').css("fill","#E6E6E6");
                  $('.pvo_fil4-'+index+'').css("fill","#999999");
                  pvo_switchers[index] = 0;                                   
               }               
             }else if(index==6){
                if(pvo_switchers[index]==0){
                  $(this).animate({
                    "left": "87.25%",
                    "background-color":"#009933"
                  },700);
                  $('.pvo_fil0-'+index+'').css("fill","#B3B3B3");
                  $('.pvo_fil2-'+index+',.pvo_fil4-'+index+'').css("fill","#2D2D32");
                  $('.pvo_fil2-'+index+'-1').css("fill","#666666");                  
                  pvo_switchers[index] = 1;                       
               }else{
                $(this).animate({
                  "left": "77.9%",
                  "background-color":"#FF00000"
                },700);          
                  $('.pvo_fil0-'+index+'').css("fill","#666666");
                  $('.pvo_fil2-'+index+',.pvo_fil2-'+index+'-1').css("fill","#E6E6E6");
                  $('.pvo_fil4-'+index+'').css("fill","#999999");
                  pvo_switchers[index] = 0;                                   
               } 
             }
        });



        rotate_valves_metre_arrows(0.7,1);
        rotate_valves_metre_arrows(1,2);

        $('.left_alert').attr("src",imagePath + "on_state_alert.svg").css("-webkit-animation","1s rotate360 infinite linear").css("-moz-animation","1s rotate360 infinite linear").css("-ms-animation","1s rotate360 infinite linear").css("animation","1s rotate360 infinite linear");
        $('.right_alert').attr("src",imagePath + "on_state_alert.svg").css("-webkit-animation","1s rotate360 infinite linear").css("-moz-animation","1s rotate360 infinite linear").css("-ms-animation","1s rotate360 infinite linear").css("animation","1s rotate360 infinite linear");

        $(".valves_metre_element_1,.valves_metre_element_2,.valves_metre_element_3,.valves_metre_element_4,.valves_metre_element_5,.valves_metre_element_6,.valves_metre_element_7,.valves_metre_element_8,.valves_metre_element_9,.valves_metre_element_10,.valves_metre_element_11,.valves_metre_element_12,.valves_metre_element_13,.valves_metre_element_14").click(function(){
               if($(this).attr('class').length==22)
                  var index = $(this).attr('class').substr($(this).attr('class').length - 1); 
               else  var index = $(this).attr('class').substr($(this).attr('class').length - 2); 
               if(valves_switchers[index]==0){
                var valves_color = "#B3B3B3";
                $(this).attr('src',imagePath + 'valves_metre_switcher_on.svg');
                valves_switchers[index] = 1;
               }else{
                var valves_color = "#666666";
                $(this).attr('src',imagePath + 'valves_metre_switcher_off.svg');
                valves_switchers[index] = 0;              
              }
               $('.valves_fil-'+index+'').css("fill",valves_color);
               $('.valves_str-'+index+'').css("stroke",valves_color);

               if((index==11 || index==12)){
                 $('.valves_fil-11-12').css("fill",valves_color);
                 $('.valves_str-11-12').css("stroke",valves_color);
               }

               if(index==9 || index==10 || index==14){
                 $('.valves_fil-9-10-14').css("fill",valves_color);
               }

               if(index==13 || index==14){
                 $('.valves_fil-13-14').css("fill",valves_color);
                 $('.valves_str-13-14').css("stroke",valves_color);
               }
               
               if(index==5 || index==6){
                 $('.valves_fil-5-6').css("fill",valves_color);
               }

               if(index==1 || index==2 || index==3){
                 $('.valves_fil-1-2-3').css("fill",valves_color);
                 $('.valves_str-1-2-3').css("stroke",valves_color);
                 $('.valves_metre_element_15').css("color",valves_color);
               }

                if(index==11) $('.valves_metre_element_16').css("color",valves_color);
              });

      //15.05.2016
      $(".pumps_element_switcher_1,.pumps_element_switcher_2,.pumps_element_switcher_3,.pumps_element_switcher_4,.pumps_element_switcher_5,.pumps_element_switcher_6,.pumps_element_switcher_7").click(function(){
        var index = $(this).attr('class').substr($(this).attr('class').length - 1);
        var left = 0;
        var top = 0;
        if(pump_switchers[index]==0){
          switch(index){
            case '1':
            left = 53.65;
            break;

            case '2':
            left = 6.13;
            break;
            
            case '3':
            left = 45.06;
            break;

            case '4':
            top = 50.35;
            break;

            case '5':
            top = 47.58;
            break;

            case '6':
            left = 17.69;
            break;

            case '7':
            left = 64.49;
            break;
          }

          if(index==4 || index==5){
            $(this).animate({
                "top": top+'%',
                "background-color":"#009933"
            },700);          
          }else{
            $(this).animate({
                "left": left+'%',
                "background-color":"#009933"
            },700);
          }
          pump_switchers[index] = 1;
          $('.pumps_element_icon_'+index+'').attr('src',imagePath + 'valves_metre_switcher_on.svg');
          $('.pumps_str-'+index+'').css("stroke","#B3B3B3");
          $('.pumps_fil-'+index+'').css("fill","#B3B3B3");
          $('.pumps_fil-'+index+'-off').css("fill","#666666");
          $('.pumps_fil-'+index+'-on').css("fill","#E6E6E6");
          if(index==6 || index==7){
            $('.pumps_fil-'+index+'-text').css("fill","#333333");
          }                              
        }else{
          switch(index){
            case '1':
            left = 50.7;
            break;

            case '2':
            left = 3.18;
            break;
            
            case '3':
            left = 42.11;
            break;

            case '4':
            top = 55.58;
            break;

            case '5':
            top = 52.78;
            break;  

            case '6':
            left = 14.75;
            break;

            case '7':
            left = 61.55;
            break;            
          }

          if(index==4 || index==5){
            $(this).animate({
                "top": top+'%',
                "background-color":"#FF0000"
            },700);          
          }else{$(this).animate({
              "left": left+'%',
              "background-color":"#FF0000"
          },700);}
          pump_switchers[index] = 0;          
          $('.pumps_element_icon_'+index+'').attr('src',imagePath + 'valves_metre_switcher_off.svg');
          $('.pumps_str-'+index+'').css("stroke","#666666");
          $('.pumps_fil-'+index+'').css("fill","#666666");          
          $('.pumps_fil-'+index+'-off').css("fill","#E6E6E6");
          $('.pumps_fil-'+index+'-on').css("fill","#666666");
          if(index==6 || index==7){
            $('.pumps_fil-'+index+'-text').css("fill","#CCCCCC");
          }                              
        }
      });

      $('.pumps_aqua_level_in_reservior,.pumps_aqua_level_in_reservior_ranges,.pumps_level_of_aqua_in_reservoir_text').click(function(){
          $('.pumps_elements,.pumps_background').css("opacity",0.2);
          $('.pumps_elements').css("pointer-events","none");
          $('.pumps_fil1-reservior').css("fill","white");                  
          $('.pumps_aqua_features').css("display","block");
      });
  });
  //15.05.2016
  $(window).on("fullscreen-on", function(){
        repaint_window('on');
	});
    
	$(window).on("fullscreen-off", function(){
        repaint_window('off');
  });
