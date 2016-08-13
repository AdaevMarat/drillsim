$(document).ready(function () {
    console.log("Drill math connected");
    var kelly_w = document.getElementById("KellyW");
    console.log(kelly_w.value);
    var s = {
        Dwell: parseFloat(document.getElementById("Dwell").value.replace(",", ".")),
        TVD: parseFloat(document.getElementById("TVD").value.replace(",", ".")),
        MD: parseFloat(document.getElementById("MD").value.replace(",", ".")),
        BitPos: parseFloat(document.getElementById("BitPos").value.replace(",", ".")),
        PLT: parseFloat(document.getElementById("PLT").value.replace(",", ".")),
        MWLT: parseFloat(document.getElementById("MWLT").value.replace(",", ".")),
        CasOD: parseFloat(document.getElementById("CasOD").value.replace(",", ".")),
        CasID: parseFloat(document.getElementById("CasID").value.replace(",", ".")),
        SD_TVD: parseFloat(document.getElementById("SD_TVD").value.replace(",", ".")),
        CassetMD: parseFloat(document.getElementById("CassetMD").value.replace(",", ".")),
        DPOD: parseFloat(document.getElementById("DPOD").value.replace(",", ".")),
        DPID: parseFloat(document.getElementById("DPID").value.replace(",", ".")),

        DpLength: parseFloat(document.getElementById("DpLength").value.replace(",", ".")),
        DpWeight: parseFloat(document.getElementById("DpWeight").value.replace(",", ".")),
        HWDPOD: parseFloat(document.getElementById("HWDPOD").value.replace(",", ".")),
        HWDPID: parseFloat(document.getElementById("HWDPID").value.replace(",", ".")),
        HWDP_len: parseFloat(document.getElementById("HWDP_len").value.replace(",", ".")),
        HWDP_weight: parseFloat(document.getElementById("HWDP_weight").value.replace(",", ".")),
        DCOD: parseFloat(document.getElementById("DCOD").value.replace(",", ".")),
        DCID: parseFloat(document.getElementById("DCID").value.replace(",", ".")),

        DC_len: parseFloat(document.getElementById("DC_len").value.replace(",", ".")),
        DC_weight: parseFloat(document.getElementById("DC_weight").value.replace(",", ".")),
        Type: parseFloat(document.getElementById("Type").value.replace(",", ".")),
        BitD: parseFloat(document.getElementById("BitD").value.replace(",", ".")),

        Nozzle_size: parseFloat(document.getElementById("Nozzle_size").value.replace(",", ".")),
        YP: parseFloat(document.getElementById("YP").value.replace(",", ".")),
        PV: parseFloat(document.getElementById("PV").value.replace(",", ".")),
        MW: parseFloat(document.getElementById("MW").value.replace(",", ".")),

        O600: parseFloat(document.getElementById("O600").value.replace(",", ".")),
        O300: parseFloat(document.getElementById("O300").value.replace(",", ".")),
        O200: parseFloat(document.getElementById("O200").value.replace(",", ".")),
        O100: parseFloat(document.getElementById("O100").value.replace(",", ".")),
        O6: parseFloat(document.getElementById("O6").value.replace(",", ".")),
        O3: parseFloat(document.getElementById("O3").value.replace(",", ".")),
        PowerLaw: parseFloat(document.getElementById("PowerLaw").value.replace(",", ".")),
        Binghman: parseFloat(document.getElementById("Binghman").value.replace(",", ".")),
        Herschel: parseFloat(document.getElementById("Herschel").value.replace(",", ".")),
        pump_no: parseFloat(document.getElementById("pump_no").value.replace(",", ".")),

        Liner: parseFloat(document.getElementById("Liner").value.replace(",", ".")),
        Stroke: parseFloat(document.getElementById("Stroke").value.replace(",", ".")),
        Eff: parseFloat(document.getElementById("Eff").value.replace(",", ".")),
        PumpSpeed: parseFloat(document.getElementById("PumpSpeed").value.replace(",", ".")),
        case_no: parseFloat(document.getElementById("case_no").value.replace(",", ".")),
        TrBLockW: parseFloat(document.getElementById("TrBlockW").value.replace(",", ".")),
        KellyW: parseFloat(document.getElementById("KellyW").value.replace(",", ".")),
        TDW: parseFloat(document.getElementById("TDW").value.replace(",", ".")),
        Mbitspf: parseFloat(document.getElementById("Mbitspf").value.replace(",", ".")),
        Mwkm3: parseFloat(document.getElementById("MWkm3").value.replace(",", ".")),
        BF: 0,
        SHL: 0
    };

    
    /*
 * object.watch polyfill
 */

    // object.watch
    if (!Object.prototype.watch) {
        Object.defineProperty(Object.prototype, "watch", {
            enumerable: false
			, configurable: true
			, writable: false
			, value: function (prop, handler) {
			    var
				  oldval = this[prop]
				, newval = oldval
				, getter = function () {
				    return newval;
				}
				, setter = function (val) {
				    oldval = newval;
				    return newval = handler.call(this, prop, oldval, val);
				}
			    ;

			    if (delete this[prop]) { // can't watch constants
			        Object.defineProperty(this, prop, {
			            get: getter
						, set: setter
						, enumerable: true
						, configurable: true
			        });
			    }
			}
        });
    }

    // object.unwatch
    if (!Object.prototype.unwatch) {
        Object.defineProperty(Object.prototype, "unwatch", {
            enumerable: false
			, configurable: true
			, writable: false
			, value: function (prop) {
			    var val = this[prop];
			    delete this[prop]; // remove accessors
			    this[prop] = val;
			}
        });
    }

    //TODO: calculations

    // faktor plavu4esti
    function calc_bf() {
        s.BF = (65.5 - s.MW) / 65.5;
    }

    // dp.len zavisit ot bitpos, to est' kogda opuskaem trubu bitpos += 0.1, recalculate(dp.len), if dp len val changed calculate calc_shl
    function calc_dplen() {
        s.DpLength = s.BitPos - s.DC_len - s.HWDP_len;
    }
    
    
    function set_watchers() {
        s.watch('BitPos', function (id, oldval, newval) {
            calc_dplen(); // peres4itat' dplen esli izmenili bitpos
            return newval;
        });
        s.watch('DpLength', function (id, oldval, newval) {
            // esli izmenilsya dplen nado peres4itat' shl
            calc_shl();
            return newval;
        });
    }

    // pervona4alniy ves na kryuke
    // if bf changes recalculate SHL through watcher
    // Это значение будет 
    // появлятся сразу после загрузки программы, 
    // или при выполнении условия MD > BitPos и RPM=0 и BitPos=статичное
    function calc_shl() {
        s.SHL = (s.TrBLockW + s.KellyW + (s.DpWeight * s.DpLength + s.HWDP_weight * s.HWDP_len + s.DC_weight * s.DC_len) / 2204.62) * s.BF;
        document.getElementById("part_indicator_text2").innerHTML = s.SHL.toFixed(3);
    }

    // shitaem faktor plavuchesti
    calc_bf();
    set_watchers();
    calc_dplen();

    
    // pri spuske s.BitPos += 0.1

});