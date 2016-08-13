var instructor_current_menu_id = -1;
var instructor_current_section_id = 1;
var instructor_previous_complications_id = -1;
var state_of_screen = 0;
var instructor_is_complicated_1 = [0, 0, 0];
var instructor_is_complicated_2 = [0, 0, 0, 0, 0];
var instructor_is_complicated_3 = [0, 0, 0, 0, 0];
var instructor_is_complicated_4 = [0, 0, 0, 0, 0, 0, 0];
var simulation_creation_index_of_chosen_driller = -1;
var simulation_creation_index_of_chosen_supervisor = -1;
var simulation_creation_index_of_chosen_member_to_edit = -1;
var instructor_page_charts_data = [];
var instructor_page_charts = new Array(7);

var serverPath = 'http://localhost:52863/';
var imagePath = 'http://localhost:52863/Content/Images/';
var roomName = null;

function Student(id, name, passportNumber, passportBy, nameOfCourse, ipNumber, role, isInDistance) {
    this.id = id;
    this.name = name;
    this.passportNumber = passportNumber;
    this.passportBy = passportBy;
    this.nameOfCourse = nameOfCourse;
    this.ipNumber = ipNumber;
    this.role = role;
    this.isInDistance = isInDistance;

    this.level = 0;
}

function Snapshot(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
}

function Simulation() {
    this.type = -1;
    this.step = 1;
    this.team = "undefined";
    this.driller = "undefined";
    this.driller_id = "";
    this.drillerLevel = 0;
    this.supervisor = "undefined";
    this.supervisor_id = "";
    this.supervisorLevel = 0;
    this.snapshot = "undefined";
    this.snapshot_id = -1;
}

// Creating Snapshot and adding to db, Settings panel
function Snap() {
    this.name = "undefined";
    this.ht = new Array();
    this.fs = new Array();
    this.FFT = new Array();
    this.k = new Array();
    this.FPgr = new Array();
    this.drive = "undefined";
    this.VOpn = new Array();
    this.VCls = new Array();
    this.Vmtl = -1;
    this.APMPi = -1;
    this.MPi = -1;
    this.Pmrt = -1;
    this.Liner = -1;
    this.Liner2 = -1;
    this.Eff = -1;
    this.Eff2 = -1;
    this.Stroke = -1;
    this.Stroke2 = -1;
    this.TrBlockW = -1;
    this.KellyW = -1;
    this.TDrW = -1;
    this.PitVa = -1;
    this.MW = -1;
    this.YP = -1;
    this.PV = -1;
    this.O600 = -1;
    this.O300 = -1;
    this.O200 = -1;
    this.O100 = -1;
    this.O6 = -1;
    this.O3 = -1;
    this.CasOD = -1;
    this.CasID = -1;
    this.CassetTVD = -1;
    this.CassetMD = -1;
    this.CasWt = -1;
    this.CasCP = -1;
    this.CasBP = -1;
    this.CasTL = -1;
    this.DPOD = -1;
    this.DPID = -1;
    this.DPlength = -1;
    this.DPweight = -1;
    this.HWDPOD = -1;
    this.HWDPID = -1;
    this.HWDPlength = -1;
    this.HWDPweight = -1;
    this.DCOD = -1;
    this.DCID = -1;
    this.DClength = -1;
    this.DCweight = -1;
    this.Type = "undefined";
    this.Dwell = -1;
    this.Qnoz = -1;
    this.Nozzle_size = new Array();
    this.FLTP = -1;
    this.FFP = -1;
    this.PLT = -1;
    this.MWLT = -1;
    this.MAASP = -1;
}

var students = new Array();
var snapshots = new Array();
var simulation = new Simulation();
var sessions = new Array();
// passing to client with ajax async
var s = new Snap();
var socket = null;

// SOCKET JS BEGIN
$(function () {

    // Create a function that the hub can call back to display messages.

    socket = $.connection.trackHub;

    socket.client.notify = function () {
        alert("supervisor joined team");
    }

    // to est' znachenie v method send peredaem (name, message)
    // kotorie on ispoluzet kak argumenti dlya funkcii na cliente.
    // Start the connection.
    $.connection.hub.start().done(function () {
        // TODO: connection started pass values between clients now
        console.log("coonected to hub");
    });
});


function changeInstructorMenuDiv(menuID) {
    if (instructor_current_menu_id != menuID) {
        $("#instructor-menu-" + menuID).find('.instructor_unselected').show();
        $("#instructor-menu-" + menuID).css("background-color", "transparent");
        $("#instructor-menu-" + menuID + " img").attr("src", imagePath + "instructor_menu_" + menuID + "_icon_on.svg");
        $("#instructor-menu-" + menuID + " td").css("color", "#ffffff");

        $("#instructor-menu-" + instructor_current_menu_id).find('.instructor_unselected').hide();
        $("#instructor-menu-" + instructor_current_menu_id).css("background-color", "#2D2D32");
        $("#instructor-menu-" + instructor_current_menu_id + " img").attr("src", imagePath + "instructor_menu_" + instructor_current_menu_id + "_icon_off.svg");
        $("#instructor-menu-" + instructor_current_menu_id + " td").css("color", "#b3b3b3");

        instructor_current_menu_id = menuID;

        switch (instructor_current_menu_id) {

            case '1':
                $(".simulation_creation").css("display", "block");
                $(".rotor_area,.slugging_group,.supervisor_panel,.pvo_equipment,.valves_group,.pumps,.instructor_complications,.instructor_data_settings,.instructor_details,.instructor_page").css("display", "none");
                if (rotorIsOn) repaintRotor(1);
                break;

            case '2':
                $(".instructor_data_settings").css("display", "block");
                $(".rotor_area,.slugging_group,.supervisor_panel,.pvo_equipment,.valves_group,.pumps,.instructor_complications,.simulation_creation,.instructor_details,.instructor_page").css("display", "none");
                if (rotorIsOn) repaintRotor(1);
                break;

            case '3':
                $(".instructor_page").css("display", "block");
                $(".rotor_area,.slugging_group,.supervisor_panel,.pvo_equipment,.valves_group,.pumps,.instructor_complications,.simulation_creation,.instructor_data_settings,.instructor_details").css("display", "none");
                if (rotorIsOn) repaintRotor(1);
                break;

            case '4':
                $(".rotor_area").css("display", "block");
                $(".slugging_group,.supervisor_panel,.pvo_equipment,.valves_group,.pumps,.instructor_data_settings,.instructor_complications,.simulation_creation,.instructor_details,.instructor_page").css("display", "none");
                if (state_of_screen == 0) repaint_window('ready'); else
                    if (state_of_screen == 1) repaint_window('on'); else
                        repaint_window('off');
                if (rotorIsOn) repaintRotor(1);
                break;

            case '7':
                $(".valves_group").css("display", "block");
                $(".rotor_area,.supervisor_panel,.pvo_equipment,.slugging_group,.pumps,.instructor_data_settings,.instructor_complications,.simulation_creation,.instructor_details,.instructor_page").css("display", "none");
                if (!rotorIsOn) repaintRotor(0);
                break;

            case '9':
                $(".supervisor_panel").css("display", "block");
                $(".rotor_area,.valves_group,.pvo_equipment,.slugging_group,.pumps,.instructor_data_settings,.instructor_complications,.simulation_creation,.instructor_details,.instructor_page").css("display", "none");
                if (!rotorIsOn) repaintRotor(0);
                break;

            case '8':
                $(".pvo_equipment").css("display", "block");
                $(".rotor_area,.valves_group,.supervisor_panel,.slugging_group,.pumps,.instructor_data_settings,.instructor_complications,.simulation_creation,.instructor_details,.instructor_page").css("display", "none");
                if (!rotorIsOn) repaintRotor(0);
                break;

            case '5':
                $(".slugging_group").css("display", "block");
                $(".rotor_area,.valves_group,.supervisor_panel,.pvo_equipment,.pumps,.instructor_data_settings,.instructor_complications,.simulation_creation,.instructor_details,.instructor_page").css("display", "none");
                if (!rotorIsOn) repaintRotor(0);
                break;

            case '6':
                $(".pumps").css("display", "block");
                $(".rotor_area,.valves_group,.supervisor_panel,.pvo_equipment,.slugging_group,.instructor_data_settings,.instructor_complications,.simulation_creation,.instructor_details,.instructor_page").css("display", "none");
                if (!rotorIsOn) repaintRotor(0);
                break;

            case '10':
                $(".instructor_complications").css("display", "block");
                $(".rotor_area,.valves_group,.supervisor_panel,.pvo_equipment,.slugging_group,.pumps,.instructor_data_settings,.simulation_creation,.instructor_details,.instructor_page").css("display", "none");
                if (!rotorIsOn) repaintRotor(0);
                break;

            case '11':
                $(".instructor_details").css("display", "block");
                $(".rotor_area,.valves_group,.supervisor_panel,.pvo_equipment,.slugging_group,.pumps,.instructor_data_settings,.simulation_creation,.instructor_complications,.instructor_page").css("display", "none");
                if (!rotorIsOn) repaintRotor(0);
                break;
        }
    }
}

function changeInstructorDataSettingsSection(sectionID) {
    if (instructor_current_section_id != sectionID) {

        $("#instructor_data_settings_header_section-" + sectionID).css("background-color", "#999999");
        $("#instructor_data_settings_header_section-" + instructor_current_section_id).css("background-color", "#444444");

        $(".instructor_data_settings_content_section_" + instructor_current_section_id).css("display", "none");

        switch (sectionID) {
            case '2':
                $(".instructor_data_settings_content_section_" + sectionID).css("display", "block");
                break;
            case '9':
                $(".instructor_data_settings_content_section_9_part_3_down_left_icon").css("display", "block");
                $(".instructor_data_settings_content_section_" + sectionID).css("display", "table");
                break;
            default:
                $(".instructor_data_settings_content_section_" + sectionID).css("display", "table");
                $(".instructor_data_settings_content_section_9_part_3_down_left_icon").css("display", "none");
                break;
        }

        instructor_current_section_id = sectionID;
    }
}

function print_snapshots() {
    for (i = 0; i < snapshots.length; i++) {
        console.log(snapshots[i]);
    }
}

// ajax get snapshots from server db
function get_snapshots() {
    snapshots.length = 0;
    $.ajax({
        type: 'GET',
        url: '/User/GetSnapshotList',
        success: function (data) {
            var len = data.length;
            snapshots.length = len;
            for (i = 0; i < len; i++) {
                snapshots[i] = new Snapshot(data[i].id, data[i].name, data[i].description);
            }
            for (i = 0; i < len; i++) {
                $('#simulation_creation_step_2_selectable_snap').append('<li class="ui-widget-content ui-selectee"><p>' + (parseInt(i, 10) + 1) + '.</p><p class="ui-selectee"> ' + snapshots[i].name + '</p><p class="ui-selectee">' + snapshots[i].description + '</p></li>');
            }
        }
    });
}

function initialization() {
    for (i = 0; i < students.length; i++) {
        if (students[i].role == "И") {
            $('#simulation_creation_step_2_student_list').append('<li class="ui-widget-content"><p>' + (parseInt(i, 10) + 1) + '.</p><p> ' + students[i].name + '</p><p>-</p></li>');
        } else
            if (students[i].isInDistance == 1) // supervisor
                $('#simulation_creation_step_2_student_list').append('<li class="ui-widget-content"><p>' + (parseInt(i, 10) + 1) + '.</p><p> ' + students[i].name + '</p><img src="' + imagePath + 'simulation_creation_distance.svg"><p>' + students[i].role + '</p></li>');
            else $('#simulation_creation_step_2_student_list').append('<li class="ui-widget-content"><p>' + (parseInt(i, 10) + 1) + '.</p><p> ' + students[i].name + '</p><p>' + students[i].role + '</p></li>');
    }
    console.log("snapshots arr len: " + snapshots.length);
    // todo, get shapshots from db        
}



function repaintStudentListSimulationCreation(index) {
    if (students[index].isInDistance == 1)
        $("#simulation_creation_step_2_student_list li").eq(index).html('<p>' + (parseInt(index, 10) + 1) + '.</p><p> ' + students[index].name + '</p><img src="' + imagePath + 'simulation_creation_distance.svg"><p>' + students[index].role + '</p>');
    else $("#simulation_creation_step_2_student_list li").eq(index).html('<p>' + (parseInt(index, 10) + 1) + '.</p><p> ' + students[index].name + '</p><p>' + students[index].role + '</p>');
}

function repaintStepsSimulationCreation(step) {
    $('.simulation_creation_content_right_header div').css('background-color', '#444444');
    $('.simulation_creation_content_right_header div p').css('color', '#999999');
    $('.simulation_creation_content_right_header div:nth-child(' + step + ')').css('background-color', '#999999');
    $('.simulation_creation_content_right_header div:nth-child(' + step + ') p').css('color', '#ffffff');
}

function clearListSimulationCreation() {
    if (simulation_creation_index_of_chosen_driller != -1) {
        $("#simulation_creation_step_2_student_list li").eq(simulation_creation_index_of_chosen_driller).removeClass('ui-selected');
        simulation_creation_index_of_chosen_driller = -1;
    }
    if (simulation_creation_index_of_chosen_supervisor != -1) {
        $("#simulation_creation_step_2_student_list li").eq(simulation_creation_index_of_chosen_supervisor).removeClass('ui-selected');
        simulation_creation_index_of_chosen_supervisor = -1;
    }
    $('#simulation_creation_step_2_selectable_snap .ui-selected').removeClass('ui-selected');
    simulation.snapshot = "undefined";
}

function resetLevelChoiceSimulationCreation() {
    simulation.drillerLevel = 0;
    simulation.supervisorLevel = 0;
    $('.simulation_creation_step_2_content_right_top div:last-child table tr td:nth-child(2) button').css('background-color', '#444444').css('color', '#999999');
}

function resetSimulationCreation() {
    clearListSimulationCreation();
    simulation_creation_index_of_chosen_driller = -1;
    simulation_creation_index_of_chosen_supervisor = -1;
    simulation_creation_index_of_chosen_member_to_edit = -1;
    simulation.team = "undefined";
    simulation.driller = "undefined";
    simulation.drillerLevel = 0;
    simulation.supervisor = "undefined";
    simulation.supervisorLevel = 0;
    simulation.snapshot = "undefined";
    $('#simulation_creation_step_2_selectable_snap .ui-selected').removeClass('ui-selected');
    $('.simulation_creation_step_2_content_right_top div:last-child table tr td:nth-child(2) button').css('background-color', '#444444').css('color', '#999999');
    $('.simulation_creation_content_right_footer button:last-child').hide();
    $('.simulation_creation_content_right_footer button:first-child').css('width', '24%');
    $('.simulation_creation_content_right_footer button:first-child p').text('ДАЛЕЕ');
    $('.simulation_creation_content_right_footer button:first-child img').css('width', '14%');
    $('.simulation_creation_content_right_footer button:nth-child(2)').hide();
    $('.simulation_creation_content_left ul .main').html('<img src="' + imagePath + 'instructor_data_settings_add_equipment.svg"><span class="helper"></span>&nbsp&nbsp<p>СОЗДАТЬ<br>СИМУЛЯЦИЮ</p>');
    $('.simulation_creation_content_right_content_step_3').hide();
    $('.simulation_creation_content_right_content_step_1').show();
}

function updateLevelOfMembersSimulationCreation(memberType, thisObj) {
    switch (memberType) {
        case 0:
            if (simulation_creation_index_of_chosen_supervisor != -1) {
                students[simulation_creation_index_of_chosen_supervisor].level = thisObj.text().slice(-1);
                simulation.supervisorLevel = thisObj.text().slice(-1);
                thisObj.css('background-color', '#999999').css('color', '#ffffff');
            }
            break;
        case 1:
            if (simulation_creation_index_of_chosen_driller != -1) {
                students[simulation_creation_index_of_chosen_driller].level = thisObj.text().slice(-1);
                simulation.drillerLevel = thisObj.text().slice(-1);
                thisObj.css('background-color', '#999999').css('color', '#ffffff');
            }
            break;
    }
}

function updateSimulationInfoSimulationCreation(type, indexSupervisor, indexDriller) {
    if (type == 0) {
        if (indexSupervisor != -1) {
            simulation.supervisor = students[indexSupervisor].name + '<br>' + students[indexSupervisor].passportNumber + '<br>' + students[indexSupervisor].passportBy;
            simulation.supervisor_id = students[indexSupervisor].id;
        } else
            if (indexDriller != -1) {
                simulation.driller = students[indexDriller].name + '<br>' + students[indexDriller].passportNumber + '<br>' + students[indexDriller].passportBy;
                simulation.driller_id = students[indexDriller].id;
            }
    } else {
        if (indexSupervisor != -1) {
            simulation.supervisor = students[indexSupervisor].name + '<br>' + students[indexSupervisor].passportNumber + '<br>' + students[indexSupervisor].passportBy;
            simulation.supervisor_id = students[indexSupervisor].id;
            simulation.driller = "ИНСТРУКТОР";
            simulation.drillerLevel = 5;
        } else
            if (indexDriller != -1) {
                simulation.driller = students[indexDriller].name + '<br>' + students[indexDriller].passportNumber + '<br>' + students[indexDriller].passportBy;
                simulation.driller_id = students[indexDriller].id;
                simulation.supervisor = "ИНСТРУКТОР";
                simulation.supervisorLevel = 5;
            }
    }
}

function changeLevelOfAuqaInDudDru(type, value) {
    $('.instructor_page_' + type + '_div').css("height", "" + value + "%");
    $('.instructor_page_' + type + '_text').text(value + "%");
}

function breakOrRestorPump(pumpID, action) {
    if (action == 'break') {
        $('.pumps_element_icon_' + (parseInt(pumpID, 10) + 7)).attr('src', imagePath + 'instructor_pump_inactive.svg');
        $('.rotor_pump_' + pumpID + '_indicator').css('background-color', '#ff0000').css('border-color', '#ff0000').css('color', '#ffffff');
    } else {
        $('.pumps_element_icon_' + (parseInt(pumpID, 10) + 7)).attr('src', imagePath + 'instructor_pump_active.svg');
        $('.rotor_pump_' + pumpID + '_indicator').css('background-color', 'transparent').css('border-color', '#4d4d4d').css('color', '#4d4d4d');
    }
}

var chartWidth;
var chartHeight;
function setChartHeight() {
    $('.instructor_page').show();
    chartWidth = $('.chart_1').width();
    chartHeight = $('.chart_1').height() - 1;
    $('.instructor_page').hide();
}
var chart;
function addChart(container) {

    instructor_page_charts_data[container.slice(-1)] = [];

    $(container).highcharts({
        chart: {
            width: chartWidth,
            height: chartHeight,
            marginTop: 25,
            events: {
                load: function () {
                    var chart = this;
                    var series = this.series[0];
                    setInterval(function () {
                        var xTime = (new Date()).getTime(); // current time                         
                        var y = Math.round(Math.random() * 70);
                        instructor_page_charts_data[container.slice(-1)].push([xTime, y]);
                        series.setData(instructor_page_charts_data[container.slice(-1)], true);
                        var faktor = ((chart.xAxis[0].max - chart.xAxis[0].min) / 60 / 1000);
                        chart.xAxis[0].setExtremes(chart.xAxis[0].min + faktor, chart.xAxis[0].max + faktor);
                    }, 5000);
                }
            }
        },
        series: [{
            name: 'series',
            color: '#b3b3b3',
            data: instructor_page_charts_data[container.slice(-1)]
        }]
    });
    switch (container) {
        case '.chart_1':
            $(container).highcharts().setTitle({ text: "ДАВЛЕНИЕ НА СТОЯКЕ" });
            break;
        case '.chart_2':
            $(container).highcharts().setTitle({ text: "ПОЛОЖЕНИЕ ШТУЦЕРА" });
            break;
        case '.chart_3':
            $(container).highcharts().setTitle({ text: "ДАВЛЕНИЕ В КП" });
            break;
        case '.chart_4':
            $(container).highcharts().setTitle({ text: "ДОПОЛНИТЕЛЬНЫЙ ПРИТОК" });
            break;
        case '.chart_5':
            $(container).highcharts().setTitle({ text: "ИЗМЕНЕНИЕ УРОВНЯ РАСТВОРА" });
            break;
        case '.chart_6':
            $(container).highcharts().setTitle({ text: "ДАВЛЕНИЕ В КП И ТРУБНОМ" });
            break;
    }
}

$(document).click(function (event) {
    if ($(event.target).attr('class') !== 'instructor_data_settings_content_section_9_part_3_down_left_icon' && $(event.target).attr('class') !== 'instructor_data_settings_content_section_9_drillstring_arrangement' &&
         $(event.target).attr('class') !== 'instructor_data_settings_content_section_9_drillstring_arrangement_left' && $(event.target).attr('class') !== 'drillstring_arrangment' && $(event.target).attr('class') !== 'instructor_data_settings_content_section_select' &&
         $(event.target).attr('class') !== 'instructor_data_settings_content_section_9_input_7' && $.trim($(event.target).attr('class')).substr(0, 15) !== 'drillstring_fil' && event.target.tagName.toLowerCase() !== 'td') {
        $('.instructor_data_settings_content_section_9_part_3_down_left_icon').attr('src', imagePath + 'instructor_data_settings_content_section_9_part_3_down_left_icon_off.svg');
        $('.instructor_data_settings_container').css("opacity", 1);
        $('.instructor_data_settings_container').css("pointer-events", "auto");
        $('.instructor_data_settings_content_section_9_drillstring_arrangement').css("display", "none");
    }
});

function normalize_data(val) {
    var str_num = val.toString();
    if (str_num.includes(",")) {
        str_num = str_num.replace(",", ".");
        return parseFloat(str_num).toFixed(2);
    }
    return val;
}

// TODO: modify 
function get_qnoz() {
    return 6;
}

// TODO: modify
function get_drive() {
    return "rotor_drive";
}

function sync_snapshot() {
    s = new Snap();
    var ht_cur = -1; var vs_cur = -1; var fft_cur = -1; var k_cur = -1; var fpgr_cur = -1;
    s.name = "snp" + new Date().getMinutes();
    for (var i = 0; i < 10; i++) {
        ht_cur = $('.instructor_data_settings_content_section_1_part_1_input').eq(i).val();
        fs_cur = $('.instructor_data_settings_content_section_1_part_3_input').eq(i).val();
        fft_cur = $('.instructor_data_settings_content_section_1_part_5_input').eq(i).val();
        k_cur = $('.instructor_data_settings_content_section_1_part_6_input').eq(i).val();
        fpgr_cur = $('.instructor_data_settings_content_section_1_part_7_input').eq(i).val();
        s.ht[i] = ht_cur;
        s.fs[i] = fs_cur;;
        s.FFT[i] = fft_cur;
        s.k[i] = k_cur;;
        s.FPgr[i] = fpgr_cur;
    }
    console.log("fft len: " + s.FFT.length);
    s.drive = get_drive();
    s.VOpn[0] = -1; s.VCls[0] = -1;
    for (var i = 1; i <= 6; i++) {
        if (i == 5) {
            s.VOpn[i] = -1;
            s.VCls[i] = -1;
            continue;
        }
        s.VOpn[i] = $('#vopn' + i).val();
        s.VCls[i] = $('#vcls' + i).val();
    }
    s.Vmtl = $('#vmtl').val();
    s.APMPi = $('#apmpi').val();
    s.MPi = $('#mpi').val();
    s.Pmrt = $('#pmrt').val();
    s.Liner = $('liner').val();
    s.Liner2 = $('liner2').val();
    s.Eff = $('#eff').val();
    s.Eff2 = $('#eff2').val();
    s.Stroke = $('#stroke').val();
    s.Stroke2 = $('#stroke2').val();
    s.TrBlockW = $('#trblockw').val();
    s.KellyW = $('#kellyw').val();
    s.TDrW = $('#tdrw').val();
    s.PitVa = $('#pitva').val();
    s.MW = $('#mw').val();
    s.YP = $('#yp').val();
    s.PV = $('#pv').val();
    s.O600 = $('#o600').val();
    s.O300 = $('#o300').val();
    s.O200 = $('#o200').val();
    s.O100 = $('#o100').val();
    s.O6 = $('#o6').val();
    s.O3 = $('#o3').val();
    s.CasOD = $('#casod').val();
    s.CasID = $('#casid').val();
    s.CassetTVD = $('#cassettvd').val();
    s.CassetMD = $('#cassetmd').val();
    s.CasWt = $('#caswt').val();
    s.CasCP = $('#cascp').val();
    s.CasBP = $('#casbp').val();
    s.CasTL = $('#castl').val();
    s.DPOD = $('#dpod').val();
    s.DPID = $('#dpid').val();
    s.DPlength = $('#dplength').val();
    s.DPweight = $('#dpweight').val();
    s.HWDPOD = $('#hwdpod').val();
    s.HWDPID = $('#hwdpid').val();
    s.HWDPlength = $('#hwdplength').val();
    s.HWDPweight = $('#hwdpweight').val();
    s.DCOD = $('#dcod').val();
    s.DCID = $('#dcid').val();
    s.DClength = $('#dclength').val();
    s.DCweight = $('#dcweight').val();
    s.Type = "undefined";
    s.Dwell = $('#dwell').val();
    s.Qnoz = get_qnoz(); // kol-vo nasadok
    for (var i = 0; i < s.Qnoz; i++) {
        s.Nozzle_size[i] = $('#nozzle_size' + (i + 1)).val();
    }
    s.FLTP = $('#fltp').val();
    s.FFP = $('#').val();
    s.PLT = $('#').val();
    s.MWLT = $('#').val();
    s.MAASP = $('#').val();

    console.log("some vals: " + s.DClength);
    console.log("some vals: " + s.CassetMD);
    for (var i = 0; i < s.Qnoz; i++) {
        console.log("Nozzle size: " + i + ": " + s.Nozzle_size[i]);
    }
    console.log("Nozzle size len: " + s.Nozzle_size.length);
}


function send_snapshot() {
    sync_snapshot();
    // ajax async, TODO: send var 
    // sending s
    var model = s;
    $.ajax({
        type: 'POST',
        data: model, // #2
        url: 'CreateSnapshot',
        //contentType: 'application/json', #3
        //dataType: 'json', #2
        success: alert('Youhou snap created'),
        error: console.log('sth wrong during ajax request')
    });
}

function debug_value() {
    // eq 0 based index
    // Ht vals
    var val = $(".instructor_data_settings_content_section_3_input").eq(0).val();
    var val2 = $(".instructor_data_settings_content_section_3_input").eq(4).val();
    var val3 = $(".instructor_data_settings_content_section_3_input").eq(5).val();
    alert("!!!VOPN VALS 0th val: " + val + " 4th val: " + val2 + " 5th val: " + val3);
}

function load_wait_list() {
    var list = $("#simulation_creation_step_2_student_list");
    list.empty();
    // async request
    $.ajax({
        type: 'GET',
        url: '/User/GetExamWaitList',
        success: function (data) {
            students[0] = new Student(i, "ИНСТРУКТОР", "00032321", "Мин Юст", "Drilling with Kelly", "127.0.0.1", "И", i % 2);
            for (i = 0; i < data.length; i++) {
                var role = null;
                students[i + 1] = new Student(data[i].id, data[i].name_surname, data[i].pass_num, data[i].issued_by, data[i].course_name, data[i].ip_num, data[i].diff_lvl, 0);
                if (data[i].diff_lvl == "2") {
                    students[i + 1].role = "Б";
                } else {
                    students[i + 1].role = "С";
                    students[i + 1].isInDistance = 1;
                }
                console.log(students[i + 1]);
            }
            initialization();
        }
    });
}


// Sending status to server
function start_simulation() {
    // send ajax request  // id of chosen snapshot,  chosen driller, index of chosen supervisor
    var ids = simulation.snapshot_id + " " + simulation.driller_id + " " + simulation.supervisor_id;
    console.log("ids value: " + ids);
    $.ajax({
        type: 'GET',
        url: '/Account/SetStatus?ids=' + ids,
        success: function () {
            console.log("ids succesfully sent!");
            roomName = simulation.driller_id;
            sessions.push(simulation);
            /*
            Hint: method join room will notify everybody that instructor joined group
            */
            socket.server.joinRoom(roomName, "instructor");
            for (var i = 0; i < sessions.length; i++) {
                console.log(sessions[i]);
            }
        }
    });
    /*
    when load wait list is called again,
    it should refill students from data again
    */
    students.length = 0;
}


$(document).ready(function () {
    // * deubg purposes
    $('#instructor_data_settings_cancel').click(function () {
        debug_value();
    });
    $('#instructor_data_settings_apply').click(function () {
        console.log("apply clicked");
        send_snapshot();
    });

    $("#next").click(function () {
        if (simulation.step == 1) { // after click sim_step++
            // load wait list async
            console.log("ajax load wait list");
            load_wait_list();
        }
    });

    get_snapshots();
    Highcharts.setOptions({
        title: {
            align: 'left',
            y: 5,
            style: { "color": "#b3b3b3", "font-size": "0.9em" }
        },
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        },
        chart: {
            zoomType: 'x',
            backgroundColor: '#2D2D32',
        },
        scrollbar: {
            enabled: true,
            barBackgroundColor: 'gray',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'gray',
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: 'none',
            trackBorderWidth: 1,
            trackBorderRadius: 8,
            trackBorderColor: '#CCC',
            height: 10
        },
        navigator: {
            enabled: false
        },
        tooltip: {
            enabled: true,
            xDateFormat: '%d.%m.%Y %H:%M:%S'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            lineColor: '#ffffff',
            tickColor: '#ffffff',
            gridLineColor: '#666666',
            minorGridLineColor: '#666666',
            gridLineWidth: 1,
            minorTickInterval: 60 * 1000,
            minRange: 5 * 60 * 1000,
            range: 18 * 60 * 1000,
            labels: {
                enabled: true,
                style: {
                    fontSize: '0.8em'
                }
            }
        },
        yAxis: {
            lineColor: '#ffffff',
            tickColor: '#ffffff',
            gridLineColor: '#666666',
            opposite: false,
            lineWidth: 1,
            tickWidth: 1,
            tickInterval: 10,
            minorGridLineColor: '#666666',
            minorTickInterval: 1,
            max: 70,
            min: 0,
            minorGridLineWidth: 0,
            minorTickColor: '#232328',
            minorTickWidth: 1,
            endOnTick: false,
            title: {
                enabled: false
            }
        },
        plotOptions: {
            series: {
                lineWidth: 2,
                turboThreshold: 0,
                threshold: null,
                showInLegend: false,
                marker: {
                    enabled: false,
                    radius: 2
                },
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            }
        }

    });

    changeLevelOfAuqaInDudDru('dud', 20);
    changeLevelOfAuqaInDudDru('dru', 25);
    breakOrRestorPump(1, 'break');
    changeInstructorMenuDiv('1');

    $("#instructor-menu-1,#instructor-menu-2,#instructor-menu-3,#instructor-menu-4,#instructor-menu-5,#instructor-menu-6,#instructor-menu-7,#instructor-menu-8,#instructor-menu-9,#instructor-menu-10,#instructor-menu-11,#instructor-menu-12").click(function () {
        if ($(this).attr('id').length == 17) changeInstructorMenuDiv($(this).attr('id').substr($(this).attr('id').length - 1));
        else changeInstructorMenuDiv($(this).attr('id').substr($(this).attr('id').length - 2));
    });

    $("#instructor_data_settings_header_section-1,#instructor_data_settings_header_section-2,#instructor_data_settings_header_section-3,#instructor_data_settings_header_section-4,#instructor_data_settings_header_section-5,#instructor_data_settings_header_section-6,#instructor_data_settings_header_section-7,#instructor_data_settings_header_section-8,#instructor_data_settings_header_section-9,#instructor_data_settings_header_section-10,#instructor_data_settings_header_section-11").click(function () {
        if ($(this).attr('id').length == 41) changeInstructorDataSettingsSection($(this).attr('id').substr($(this).attr('id').length - 1));
        else changeInstructorDataSettingsSection($(this).attr('id').substr($(this).attr('id').length - 2));
    });

    $('.instructor_data_settings_content_section_1_part_1_input,.instructor_data_settings_content_section_1_part_2_input,.instructor_data_settings_content_section_1_part_6_input,.instructor_data_settings_content_section_1_part_7_input,.instructor_data_settings_content_section_1_part_8_input').on('input', function () {
        $(this).css('width', (($(this).val().length + 1) * 7) + '%');
    });

    $('.instructor_data_settings_content_section_1_part_1_input,.instructor_data_settings_content_section_1_part_2_input,.instructor_data_settings_content_section_1_part_6_input,.instructor_data_settings_content_section_1_part_7_input,.instructor_data_settings_content_section_1_part_8_input').each(function (i, obj) {
        $(this).css('width', (($(this).val().length + 1) * 7) + '%');
    });

    $('#instructor_data_settings_content_section_2_left,#instructor_data_settings_content_section_2_right').click(function () {
        $('#' + $(this).attr('id') + '_up').css("border-color", "#ffffff");
        $('#' + $(this).attr('id') + '_down_text').css("color", "#ffffff");

        if ($(this).attr('id') == 'instructor_data_settings_content_section_2_left') {
            $('#instructor_data_settings_content_section_2_right_up').css("border-color", "#333333");
            $('#instructor_data_settings_content_section_2_right_down_text').css("color", "#4d4d4d");
        } else {
            $('#instructor_data_settings_content_section_2_left_up').css("border-color", "#333333");
            $('#instructor_data_settings_content_section_2_left_down_text').css("color", "#4d4d4d");
        }
    });

    $('.instructor_data_settings_content_section_3_input,.instructor_data_settings_content_section_4_input,.instructor_data_settings_content_section_5_input_1,.instructor_data_settings_content_section_5_input_2,.instructor_data_settings_content_section_6_input,.instructor_data_settings_content_section_7_input,.instructor_data_settings_content_section_8_input,.instructor_data_settings_content_section_9_input_1,.instructor_data_settings_content_section_9_input_2,.instructor_data_settings_content_section_9_input_3,.instructor_data_settings_content_section_9_input_4,.instructor_data_settings_content_section_9_input_5,.instructor_data_settings_content_section_9_input_6,.instructor_data_settings_content_section_9_input_7,.instructor_data_settings_content_section_10_input,.instructor_data_settings_content_section_11_input').on('input', function () {
        switch ($(this).attr('class')) {
            case 'instructor_data_settings_content_section_3_input':
            case 'instructor_data_settings_content_section_3_input':
                $(this).css('width', (($(this).val().length + 1) * 4) + '%');
                break;
            case 'instructor_data_settings_content_section_9_input_7':
                $(this).css('width', (($(this).val().length + 1) * 6) + '%');
                break;
            default:
                $(this).css('width', (($(this).val().length + 1) * 7) + '%');
                break;
        }
    });

    $('.instructor_data_settings_content_section_3_input,.instructor_data_settings_content_section_4_input,.instructor_data_settings_content_section_5_input_1,.instructor_data_settings_content_section_5_input_2,.instructor_data_settings_content_section_6_input,.instructor_data_settings_content_section_7_input,.instructor_data_settings_content_section_8_input,.instructor_data_settings_content_section_9_input_1,.instructor_data_settings_content_section_9_input_2,.instructor_data_settings_content_section_9_input_3,.instructor_data_settings_content_section_9_input_4,.instructor_data_settings_content_section_9_input_5,.instructor_data_settings_content_section_9_input_6,.instructor_data_settings_content_section_9_input_7,.instructor_data_settings_content_section_10_input,.instructor_data_settings_content_section_11_input').each(function (i, obj) {
        switch ($(this).attr('class')) {
            case 'instructor_data_settings_content_section_3_input':
                $(this).css('width', (($(this).val().length + 1) * 4) + '%');
                break;
            case 'instructor_data_settings_content_section_9_input_7':
                $(this).css('width', (($(this).val().length + 1) * 6) + '%');
                break;
            default:
                $(this).css('width', (($(this).val().length + 1) * 7) + '%');
                break;
        }
    });

    $('.instructor_data_settings_content_section_9_part_3_down_left_icon').click(function () {
        $(this).attr('src', imagePath + 'instructor_data_settings_content_section_9_part_3_down_left_icon_on.svg');
        $('.instructor_data_settings_container').css("opacity", 0.2);
        $('.instructor_data_settings_container').css("pointer-events", "none");
        $('.instructor_data_settings_content_section_9_drillstring_arrangement').css("display", "block");
    });

    $('#instructor_data_settings_content_section_9_select').on('change', function () {
        $('#instructor_data_settings_content_section_9_table_6 tr').css('visibility', 'visible');
        $('#instructor_data_settings_content_section_9_table_6 tr:nth-child(n+' + (parseInt(this.value, 10) + 1) + '):nth-last-child(n+1)').css('visibility', 'hidden');
    });

    $('.instructor_complications_content_left_button').click(function () {
        var clickedID = $(this).attr('id').slice(-1);
        $(this).find('img').attr('src', imagePath + 'instructor_complications_button_icon_' + clickedID + '_on.svg');
        $(this).css("color", "#ffffff").css("border-color", "#ffffff");
        $('.instructor_complications_content_right_' + clickedID + '').show();
        if (instructor_previous_complications_id != clickedID && instructor_previous_complications_id != -1) {
            $("#button_" + instructor_previous_complications_id + ".instructor_complications_content_left_button").find('img').attr('src', imagePath + 'instructor_complications_button_icon_' + instructor_previous_complications_id + '_off.svg');
            $("#button_" + instructor_previous_complications_id + ".instructor_complications_content_left_button").css("color", "#808080").css("border-color", "#4d4d4d");
            $('.instructor_complications_content_right_' + instructor_previous_complications_id + '').hide();
        }
        instructor_previous_complications_id = clickedID;
    });

    $('.instructor_complications_content_right_1 table button').click(function () {
        var clickedID = $(this).attr('id').slice(-1);
        switch ($(this).attr('id')) {
            case 'button_activate_1':
            case 'button_activate_2':
                if (instructor_is_complicated_1[clickedID] == 0) {
                    $(this).css('opacity', '1').html('ОСЛОЖНЕНИЕ<br>АКТИВНО');
                    $('.instructor_complications_content_right_1 table button#button_deactivate_' + clickedID + '').css('opacity', '0.3').html('ДЕАКТИВИРОВАТЬ<br>ОСЛОЖНЕНИЯ');
                    instructor_is_complicated_1[clickedID] = 1;
                }
                break;

            case 'button_deactivate_1':
            case 'button_deactivate_2':
                if (instructor_is_complicated_1[clickedID] == 1) {
                    $(this).css('opacity', '1').html('БЕЗ<br>ОСЛОЖНЕНИЙ');
                    $('.instructor_complications_content_right_1 table button#button_activate_' + clickedID + '').css('opacity', '0.3').html('АКТИВИРОВАТЬ<br>ОСЛОЖНЕНИЕ');
                    instructor_is_complicated_1[clickedID] = 0;
                }
                break;
        }

    });

    $('.instructor_complications_content_right_2 table button').click(function () {
        var clickedID = $(this).attr('id').slice(-1);
        switch ($(this).attr('id')) {
            case 'button_activate_1':
            case 'button_activate_2':
            case 'button_activate_3':
            case 'button_activate_4':
                if (instructor_is_complicated_2[clickedID] == 0) {
                    $(this).css('opacity', '1').html('ОСЛОЖНЕНИЕ<br>АКТИВНО');
                    $('.instructor_complications_content_right_2 table button#button_deactivate_' + clickedID + '').css('opacity', '0.3').html('ДЕАКТИВИРОВАТЬ<br>ОСЛОЖНЕНИЯ');
                    instructor_is_complicated_2[clickedID] = 1;
                }
                break;

            case 'button_deactivate_1':
            case 'button_deactivate_2':
            case 'button_deactivate_3':
            case 'button_deactivate_4':
                if (instructor_is_complicated_2[clickedID] == 1) {
                    $(this).css('opacity', '1').html('БЕЗ<br>ОСЛОЖНЕНИЙ');
                    $('.instructor_complications_content_right_2 table button#button_activate_' + clickedID + '').css('opacity', '0.3').html('АКТИВИРОВАТЬ<br>ОСЛОЖНЕНИЕ');
                    instructor_is_complicated_2[clickedID] = 0;
                }
                break;
        }
    });

    $('.instructor_complications_content_right_3 table button').click(function () {
        var clickedID = $(this).attr('id').slice(-1);
        switch ($(this).attr('id')) {
            case 'button_activate_1':
            case 'button_activate_2':
            case 'button_activate_3':
            case 'button_activate_4':
                if (instructor_is_complicated_3[clickedID] == 0) {
                    $(this).css('opacity', '1').html('ОСЛОЖНЕНИЕ<br>АКТИВНО');
                    $('.instructor_complications_content_right_3 table button#button_deactivate_' + clickedID + '').css('opacity', '0.3').html('ДЕАКТИВИРОВАТЬ<br>ОСЛОЖНЕНИЯ');
                    instructor_is_complicated_3[clickedID] = 1;
                }
                break;

            case 'button_deactivate_1':
            case 'button_deactivate_2':
            case 'button_deactivate_3':
            case 'button_deactivate_4':
                if (instructor_is_complicated_3[clickedID] == 1) {
                    $(this).css('opacity', '1').html('БЕЗ<br>ОСЛОЖНЕНИЙ');
                    $('.instructor_complications_content_right_3 table button#button_activate_' + clickedID + '').css('opacity', '0.3').html('АКТИВИРОВАТЬ<br>ОСЛОЖНЕНИЕ');
                    instructor_is_complicated_3[clickedID] = 0;
                }
                break;
        }
    });

    $('.instructor_complications_content_right_4 table button').click(function () {
        var clickedID = $(this).attr('id').slice(-1);
        switch ($(this).attr('id')) {
            case 'button_blockage_1':
            case 'button_blockage_2':
            case 'button_blockage_3':
            case 'button_blockage_4':
            case 'button_blockage_5':
            case 'button_blockage_6':
                $(this).css('opacity', '1');
                $('#button_blur_' + clickedID + '').css('opacity', '0.3');
                $('.instructor_complications_content_right_4 table button#button_deactivate_' + clickedID + '').css('opacity', '0.3').html('ДЕАКТИВИРОВАТЬ<br>ОСЛОЖНЕНИЯ');
                instructor_is_complicated_4[clickedID] = 1;
                break;

            case 'button_blur_1':
            case 'button_blur_2':
            case 'button_blur_3':
            case 'button_blur_4':
            case 'button_blur_5':
            case 'button_blur_6':
                $(this).css('opacity', '1');
                $('#button_blockage_' + clickedID + '').css('opacity', '0.3');
                $('.instructor_complications_content_right_4 table button#button_deactivate_' + clickedID + '').css('opacity', '0.3').html('ДЕАКТИВИРОВАТЬ<br>ОСЛОЖНЕНИЯ');
                instructor_is_complicated_4[clickedID] = 1;
                break;

            case 'button_deactivate_1':
            case 'button_deactivate_2':
            case 'button_deactivate_3':
            case 'button_deactivate_4':
            case 'button_deactivate_5':
            case 'button_deactivate_6':
                if (instructor_is_complicated_4[clickedID] == 1) {
                    $(this).css('opacity', '1').html('БЕЗ<br>ОСЛОЖНЕНИЙ');
                    $('#button_blur_' + clickedID + '').css('opacity', '0.3');
                    $('#button_blockage_' + clickedID + '').css('opacity', '0.3');
                    $('.instructor_complications_content_right_4 table button#button_deactivate_' + clickedID + '').css('opacity', '1').html('БЕЗ<br>ОСЛОЖНЕНИЙ');
                    instructor_is_complicated_4[clickedID] = 0;
                }
                break;
        }
    });



    $('.simulation_creation_content_right_content_step_1 button').hover(function () {
        $(this).css('border-color', '#ffffff').find('table').css('color', '#ffffff');
        if ($(this).attr('id') == "exam") $(this).find('img').attr('src', imagePath + 'simulation_creation_exam_icon_on.svg');
        else $(this).find('img').attr('src', imagePath + 'simulation_creation_instructor_icon_on.svg');
    }, function () {
        if (simulation.type == 0) {
            if ($(this).attr('id') == "instructor_student") {
                $(this).css('border-color', '#808080').find('table').css('color', '#999999');;
                $(this).find('img').attr('src', imagePath + 'simulation_creation_instructor_icon_off.svg');
            }
        } else if (simulation.type == 1) {
            if ($(this).attr('id') == "exam") {
                $(this).css('border-color', '#808080').find('table').css('color', '#999999');;
                $(this).find('img').attr('src', imagePath + 'simulation_creation_exam_icon_off.svg');
            }
        } else {
            $(this).css('border-color', '#808080').find('table').css('color', '#999999');;
            if ($(this).attr('id') == "exam") $(this).find('img').attr('src', imagePath + 'simulation_creation_exam_icon_off.svg');
            else $(this).find('img').attr('src', imagePath + 'simulation_creation_instructor_icon_off.svg');
        }
    });

    $('.simulation_creation_content_right_content_step_1 button').click(function () {
        if ($(this).attr('id') == "exam") {
            $(this).css('border-color', '#ffffff').find('table').css('color', '#ffffff');
            $(this).find('img').attr('src', imagePath + 'simulation_creation_exam_icon_on.svg');
            $('.simulation_creation_content_right_content_step_1 button#instructor_student').css('border-color', '#808080').find('table').css('color', '#999999').find('img').attr('src', imagePath + 'simulation_creation_instructor_icon_off.svg');
            simulation.type = 0;
        } else {
            $(this).css('border-color', '#ffffff').find('table').css('color', '#ffffff');
            $(this).find('img').attr('src', imagePath + 'simulation_creation_instructor_icon_on.svg');
            $('.simulation_creation_content_right_content_step_1 button#exam').css('border-color', '#808080').find('table').css('color', '#999999').find('img').attr('src', imagePath + 'simulation_creation_exam_icon_off.svg');
            simulation.type = 1;
        }
        resetSimulationCreation();
    });

    $(function () {
        $("#simulation_creation_step_2_selectable_snap").selectable({
            stop: function () {
                $(".ui-selected", this).each(function () {
                    simulation_creation_index_of_chosen_snapshot = $("#simulation_creation_step_2_selectable_snap li").index(this);
                    simulation.snapshot = snapshots[simulation_creation_index_of_chosen_snapshot].name;
                    simulation.snapshot_id = snapshots[simulation_creation_index_of_chosen_snapshot].id;
                });
            }
        });
    });

    $('.simulation_creation_step_2_team_member_level_choice_buttons button').click(function () {
        $('.simulation_creation_step_2_team_member_level_choice_buttons #' + $(this).attr('id') + '').css('background-color', '#444444').css('color', '#999999');
        switch (simulation.type) {
            case 0:
                if ($(this).attr('id') == 'top') {
                    updateLevelOfMembersSimulationCreation(0, $(this));
                } else {
                    updateLevelOfMembersSimulationCreation(1, $(this));
                }
                break;
            case 1:
                if ($('.simulation_creation_step_2_content_right_top_supervisor').text() == 'БУРИЛЬЩИК') {
                    updateLevelOfMembersSimulationCreation(1, $(this));
                } else {
                    updateLevelOfMembersSimulationCreation(0, $(this));
                }
                break;
        }
    });

    $('.simulation_creation_step_2_content_right_top div:last-child img').click(function () {
        var tmpString = $('.simulation_creation_step_2_content_right_top_supervisor').text();
        $('.simulation_creation_step_2_content_right_top_supervisor').text($('.simulation_creation_step_2_content_right_top_driller').text());
        $('.simulation_creation_step_2_content_right_top_driller').text(tmpString);
        $('#simulation_creation_step_2_team_member_1').html('ЗАПОЛНИТЬ<br>ДАННЫЕ').css('text-align', 'center');
        clearListSimulationCreation();
        resetLevelChoiceSimulationCreation();
    });

    $('#simulation_creation_step_2_team_member_1,#simulation_creation_step_2_team_member_2').click(function () {
        $('.simulation_creation_content').css('opacity', 0.2).css('pointer-events', 'none');

        if ($(this).attr('id') == 'simulation_creation_step_2_team_member_1') {
            $('.simulation_creatin_form').attr('id', 'simulation_creatin_form_1').show();
            simulation_creation_index_of_chosen_member_to_edit = simulation_creation_index_of_chosen_supervisor;
        } else {
            $('.simulation_creatin_form').attr('id', 'simulation_creatin_form_2').show();
            simulation_creation_index_of_chosen_member_to_edit = simulation_creation_index_of_chosen_driller;
        }
        if (simulation.type == 1) {
            if ($('.simulation_creation_step_2_content_right_top_supervisor').text() == 'БУРИЛЬЩИК') simulation_creation_index_of_chosen_member_to_edit = simulation_creation_index_of_chosen_driller;
            else simulation_creation_index_of_chosen_member_to_edit = simulation_creation_index_of_chosen_supervisor;
        }
        if ($(this).text() != "ЗАПОЛНИТЬДАННЫЕ") {
            $('.simulation_creatin_form #simulator_creation_exam_input_1').val(students[simulation_creation_index_of_chosen_member_to_edit].name);
            $('.simulation_creatin_form #simulator_creation_exam_input_2').val(students[simulation_creation_index_of_chosen_member_to_edit].passportNumber);
            $('.simulation_creatin_form #simulator_creation_exam_input_3').val(students[simulation_creation_index_of_chosen_member_to_edit].passportBy);
            $('.simulation_creatin_form #simulator_creation_exam_input_4').val(students[simulation_creation_index_of_chosen_member_to_edit].nameOfCourse);
            $('.simulation_creatin_form #simulator_creation_exam_input_5').val(students[simulation_creation_index_of_chosen_member_to_edit].ipNumber);
            $('.simulation_creatin_form #simulator_creation_exam_input_6').val(students[simulation_creation_index_of_chosen_member_to_edit].role);
        } else {
            $('.simulation_creatin_form #simulator_creation_exam_input_1').val(' Фамилия и имя');
            $('.simulation_creatin_form #simulator_creation_exam_input_2').val(' № паспорта/ уд. лич.');
            $('.simulation_creatin_form #simulator_creation_exam_input_3').val(' Кем выдано');
            $('.simulation_creatin_form #simulator_creation_exam_input_4').val(' Название курса');
            $('.simulation_creatin_form #simulator_creation_exam_input_5').val(' IP номер');
            $('.simulation_creatin_form #simulator_creation_exam_input_6').val(' РОЛЬ/УРОВЕНЬ');
        }
    });

    $("#simulation_creation_step_2_student_list").on('click', '#simulation_creation_step_2_student_list li', function () {
        if ($(this).index() != 0) {
            if (simulation.type == 0) {
                if ($(this).children('p:last-child').text() == 'С') {
                    if (simulation_creation_index_of_chosen_supervisor != -1) {
                        $("#simulation_creation_step_2_student_list li").eq(simulation_creation_index_of_chosen_supervisor).removeClass('ui-selected');
                    }
                    $('#simulation_creation_step_2_team_member_1').css('text-align', 'left').css('padding-left', '5%').html(students[$(this).index()].name + '<br>' + students[$(this).index()].passportNumber + '<br>' + students[$(this).index()].passportBy);
                    simulation_creation_index_of_chosen_supervisor = $(this).index();
                    updateSimulationInfoSimulationCreation(0, simulation_creation_index_of_chosen_supervisor, -1);
                } else {
                    if (simulation_creation_index_of_chosen_driller != -1) {
                        $("#simulation_creation_step_2_student_list li").eq(simulation_creation_index_of_chosen_driller).removeClass('ui-selected');
                    }
                    $('#simulation_creation_step_2_team_member_2').css('text-align', 'left').css('padding-left', '5%').html(students[$(this).index()].name + '<br>' + students[$(this).index()].passportNumber + '<br>' + students[$(this).index()].passportBy);
                    simulation_creation_index_of_chosen_driller = $(this).index();
                    updateSimulationInfoSimulationCreation(0, -1, simulation_creation_index_of_chosen_driller);
                }
                $(this).toggleClass('ui-selected');
            } else {
                if ($('.simulation_creation_step_2_content_right_top_supervisor').text() == 'БУРИЛЬЩИК') {
                    if ($(this).children('p:last-child').text() == 'Б') {
                        if (simulation_creation_index_of_chosen_driller != -1) {
                            $("#simulation_creation_step_2_student_list li").eq(simulation_creation_index_of_chosen_driller).removeClass('ui-selected');
                        }
                        $('#simulation_creation_step_2_team_member_1').css('text-align', 'left').css('padding-left', '5%').html(students[$(this).index()].name + '<br>' + students[$(this).index()].passportNumber + '<br>' + students[$(this).index()].passportBy);
                        simulation_creation_index_of_chosen_driller = $(this).index();
                        updateSimulationInfoSimulationCreation(1, -1, simulation_creation_index_of_chosen_driller);
                        $(this).toggleClass('ui-selected');
                    }
                } else {
                    if ($(this).children('p:last-child').text() == 'С') {
                        if (simulation_creation_index_of_chosen_supervisor != -1) {
                            $("#simulation_creation_step_2_student_list li").eq(simulation_creation_index_of_chosen_supervisor).removeClass('ui-selected');
                        }
                        $('#simulation_creation_step_2_team_member_1').css('text-align', 'left').css('padding-left', '5%').html(students[$(this).index()].name + '<br>' + students[$(this).index()].passportNumber + '<br>' + students[$(this).index()].passportBy);
                        simulation_creation_index_of_chosen_supervisor = $(this).index();
                        updateSimulationInfoSimulationCreation(1, simulation_creation_index_of_chosen_supervisor, -1);
                        $(this).toggleClass('ui-selected');
                    }
                }
            }
        }
    });

    $('.simulator_creation_exam_button_field button').click(function () {
        if ($(this).attr('id') == 'apply') {
            if (simulation_creation_index_of_chosen_member_to_edit != -1) {
                students[simulation_creation_index_of_chosen_member_to_edit].name = $('.simulation_creatin_form #simulator_creation_exam_input_1').val();
                students[simulation_creation_index_of_chosen_member_to_edit].passportNumber = $('.simulation_creatin_form #simulator_creation_exam_input_2').val();
                students[simulation_creation_index_of_chosen_member_to_edit].passportBy = $('.simulation_creatin_form #simulator_creation_exam_input_3').val();
                students[simulation_creation_index_of_chosen_member_to_edit].nameOfCourse = $('.simulation_creatin_form #simulator_creation_exam_input_4').val();
                $('#simulation_creation_step_2_team_member_' + $('.simulation_creatin_form').attr('id').slice(-1) + '').css('text-align', 'left').css('padding-left', '5%').html(students[simulation_creation_index_of_chosen_member_to_edit].name + '<br>' + students[simulation_creation_index_of_chosen_member_to_edit].passportNumber + '<br>' + students[simulation_creation_index_of_chosen_member_to_edit].passportBy);
                repaintStudentListSimulationCreation(simulation_creation_index_of_chosen_member_to_edit);
                if (simulation_creation_index_of_chosen_member_to_edit == simulation_creation_index_of_chosen_supervisor) {
                    updateSimulationInfoSimulationCreation(simulation.type, simulation_creation_index_of_chosen_member_to_edit, -1);
                } else updateSimulationInfoSimulationCreation(simulation.type, -1, simulation_creation_index_of_chosen_member_to_edit);
            }
        }
        $('.simulation_creation_content').css('opacity', 1).css('pointer-events', 'auto');
        $('.simulation_creatin_form').removeAttr('id').hide();
    });

    $('.simulation_creation_content_right_footer button').click(function () {
        switch ($(this).attr('id')) {
            case 'next':
                switch (simulation.step) {
                    case 1:
                        if (simulation.type != -1) {
                            $('.simulation_creation_content_right_content_step_' + simulation.step + '').hide();
                            simulation.step++;
                            $('.simulation_creation_content_right_content_step_' + simulation.step + '').show();
                            $('.simulation_creation_content_right_footer button:nth-child(2)').show();
                            if (simulation.type == 0) {
                                $('.simulation_creation_content_left ul .main').html('<span class="helper"></span>&nbsp&nbsp<p>СДАЧА<br>ЭКЗАМЕНА</p>');
                                $('.simulation_creation_step_2_team_member_level_choice_buttons#bottom button').css('pointer-events', 'auto');
                                $('.simulation_creation_step_2_content_right_top div:last-child img').hide();
                                $('#simulation_creation_step_2_team_member_1').html('ЗАПОЛНИТЬ<br>ДАННЫЕ').css('text-align', 'center');
                                $('#simulation_creation_step_2_team_member_2').html('ЗАПОЛНИТЬ<br>ДАННЫЕ').css('text-align', 'center').css('pointer-events', 'auto');
                                $('.simulation_creation_step_2_content_right_top_supervisor').text("СУПЕРВАЙЗЕР");
                                $('.simulation_creation_step_2_content_right_top_driller').text("БУРИЛЬЩИК");
                                clearListSimulationCreation();
                            } else {
                                $('.simulation_creation_content_left ul .main').html('<span class="helper"></span>&nbsp&nbsp<p>СТУДЕНТ +<br>ИНСТРУКТОР</p>');
                                $('#simulation_creation_step_2_team_member_2').html('ИНСТРУКТОР').css('text-align', 'center').css('pointer-events', 'none');
                                $('.simulation_creation_step_2_team_member_level_choice_buttons#bottom button').css('color', '#999999').css('background-color', '#444444').css('pointer-events', 'none');
                                $('.simulation_creation_step_2_content_right_top div:last-child img').show();
                                $('#simulation_creation_step_2_team_member_1').html('ЗАПОЛНИТЬ<br>ДАННЫЕ').css('text-align', 'center');
                                clearListSimulationCreation();
                            }
                            resetLevelChoiceSimulationCreation();
                            repaintStepsSimulationCreation(simulation.step);
                        } else alert("Choose Type Of Simulation");
                        break;
                    case 2:
                        simulation.team = $('.simulation_creation_step_2_content_right_top div p').text();
                        if (simulation.team != 'undefined' && simulation.driller != 'undefined' && simulation.drillerLevel != 0 && simulation.supervisor != 'undefined' && simulation.supervisorLevel != 0 && simulation.snapshot != 'undefined') {
                            $('.simulation_creation_content_right_footer button:last-child').show();
                            $('.simulation_creation_content_right_footer button:first-child').css('width', '35%');
                            $('.simulation_creation_content_right_footer button:first-child p').text('НАЧАТЬ СИМУЛЯЦИЮ');
                            $('.simulation_creation_content_right_footer button:first-child img').css('width', '9%');
                            $('.simulation_creation_content_right_content_step_3 table tr:nth-child(1) td:first-child').html(simulation.team);
                            $('.simulation_creation_content_right_content_step_3 table tr:nth-child(2) td:last-child p').html(simulation.driller);
                            $('.simulation_creation_content_right_content_step_3 table tr:nth-child(3) td:last-child p').html(simulation.supervisor);
                            $('.simulation_creation_content_right_content_step_3 table tr:nth-child(4) td:last-child p').html(simulation.snapshot);
                            $('.simulation_creation_content_right_content_step_' + simulation.step + '').hide();
                            simulation.step++;
                            $('.simulation_creation_content_right_content_step_' + simulation.step + '').show();
                            repaintStepsSimulationCreation(simulation.step);
                            console.log(simulation);
                        } else { console.log(simulation); alert('Choose All Things'); }
                        break;
                    case 3:
                        alert("go");
                        start_simulation();
                        $('.simulation_creation_content_left ul .main').next().removeClass('hidden').addClass('main').html('<img src="' + imagePath + 'instructor_data_settings_add_equipment.svg"><span class="helper"></span>&nbsp&nbsp<p>СОЗДАТЬ<br>СИМУЛЯЦИЮ</p>');
                        $('.simulation_creation_content_left ul .main').prev().removeClass('main').addClass('hidden').show().html('<img src="' + imagePath + 'simulation_creation_team_icon.svg"><span class="helper"></span>&nbsp&nbsp<p>' + simulation.team + '<br>' + simulation.supervisor + '</p>');
                        setChartHeight();
                        addChart('.chart_1');
                        addChart('.chart_2');
                        addChart('.chart_3');
                        addChart('.chart_4');
                        addChart('.chart_5');
                        addChart('.chart_6');
                        simulation.step = 1;
                        repaintStepsSimulationCreation(1);
                        resetSimulationCreation();
                        break;
                }
                break;
            case 'back':
                if (simulation.step == 2) {
                    $('.simulation_creation_content_right_footer button:nth-child(2)').hide();
                    $('.simulation_creation_content_left ul .main').html('<img src="' + imagePath + 'instructor_data_settings_add_equipment.svg"><span class="helper"></span>&nbsp&nbsp<p>СОЗДАТЬ<br>СИМУЛЯЦИЮ</p>');
                } else {
                    $('.simulation_creation_content_right_footer button:last-child').hide();
                    $('.simulation_creation_content_right_footer button:first-child').css('width', '24%');
                    $('.simulation_creation_content_right_footer button:first-child p').text('ДАЛЕЕ');
                    $('.simulation_creation_content_right_footer button:first-child img').css('width', '14%');
                }
                $('.simulation_creation_content_right_content_step_' + simulation.step + '').hide();
                simulation.step--;
                $('.simulation_creation_content_right_content_step_' + simulation.step + '').show();
                repaintStepsSimulationCreation(simulation.step);
                break;

            case 'cancel':
                simulation.step = 1;
                repaintStepsSimulationCreation(1);
                resetSimulationCreation();
                break;
        }
    });

    $('.instructor_details_right_content_2 button').click(function () {
        switch ($(this).attr('id')) {
            case 'button_1':
                alert(1);
                break;
            case 'button_2':
                alert(2);
                break;
            case 'button_3':
                alert(3);
                break;
        }
    });

});

$(window).on("fullscreen-on", function () {
    state_of_screen = 1;
});

$(window).on("fullscreen-off", function () {
    state_of_screen = 2;
});
