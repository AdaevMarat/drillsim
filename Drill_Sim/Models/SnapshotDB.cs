using System.Data.Entity;
using System.Collections.Generic;

namespace Drill_Sim.Models
{
    public class SnapshotDB
    {
        // snapshot vals
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string drive { get; set; }
        public string ht { get; set; }
        public string fs { get; set; }
        public string fft { get; set; }
        public string k { get; set; }
        public string fpgr { get; set; }

        public double Dwell { get; set; }
        public double TVD { get; set; }
        public double MD { get; set; }
        public double BitPos { get; set; }
        public double PLT { get; set; }
        public double MWLT { get; set; }
        public double CasOD { get; set; }
        public double CasID { get; set; }
        public double SD_TVD { get; set; }
        public double CassetTVD { get; set; }
        public double CassetMD { get; set; }
        public double CasWt { get; set; }
        public double CasCP { get; set; }
        public double CasBP { get; set; }
        public double CasTL { get; set; }
        public double DPOD { get; set; }
        public double DPID { get; set; }
        public double DpLength { get; set; }
        public double DpWeight { get; set; }
        public double HWDPOD { get; set; }
        public double HWDPID { get; set; }
        public double HWDP_len { get; set; }
        public double HWDP_weight { get; set; }
        public double DCOD { get; set; }
        public double DCID { get; set; }
        public double DC_len { get; set; }
        public double DC_weight { get; set; }
        // tip dolota
        public double Type { get; set; }
        public double BitD { get; set; }
        public double Nozzle_num { get; set; }
        public string Nozzle_size { get; set; }
        public double YP { get; set; }
        public double PV { get; set; }
        public double MW { get; set; }
        public double O600 {get; set;}
        public double O300 { get; set; }
        public double O200 { get; set; }
        public double O100 { get; set; }
        public double O6 { get; set; }
        public double O3 { get; set; }
        public double PowerLaw { get; set; }
        public double Binghman { get; set; }
        public double Herschel { get; set; }
        public double PitVi { get; set; }
        public double PitVa { get; set; }
        public double Vr { get; set; }
        // nomer nasosa
        public double pump_no { get; set; }
        public double Liner { get; set; }
        public double Liner2 { get; set; }
        public double Stroke { get; set; }
        public double Stroke2 { get; set; }
        public double Eff { get; set; }
        public double Eff2 { get; set; }
        public double PumpSpeed { get; set; }
        // nomer case
        public double case_no { get; set; }
        public double TrBlockW { get; set; }
        public double KellyW { get; set; }
        public double TDW { get; set; }
        public double TDrW { get; set; }
        public double Mbitspf { get; set; }
        public double MWkm3 { get; set; }

        // rashety po PVO
        public double VCls1 { get; set; }
        public double VCls2 { get; set; }
        public double VCls3 { get; set; }
        public double VCls4 { get; set; }
        public double VCls5 { get; set; }
        public double VCls6 { get; set; }

        public double VOpn1 { get; set; }
        public double VOpn2 { get; set; }
        public double VOpn3 { get; set; }
        public double VOpn4 { get; set; }
        public double VOpn5 { get; set; }
        public double VOpn6 { get; set; }
        public double APMPi { get; set; }
        public double MPi { get; set; }
        public double APi { get; set; }
        public double Pmrt { get; set; }
        public double Vmi { get; set; }
        public double init_MD { get; set; }
        public double init_SHL { get; set; }
        public double BF { get; set; }
        public double SHL { get; set; }
        public double WOB { get; set; }
        public double DHL { get; set; }
        public double Mbit { get; set; }
        public double Nx1 { get; set; }
        public double Mvs { get; set; }
        public double Mtotal { get; set; }
        public double POgpm { get; set; }
        public double Vn { get; set; }
        public double BPL { get; set; }
        public double Vdp { get; set; }
        public double Vhwdp { get; set; }
        public double Vdc { get; set; }
        public double Vadc { get; set; }
        public double Vahwdp { get; set; }
        public double Vadpo { get; set; }
        public double Vadpc { get; set; }
        public double SRaDC { get; set; }
        public double SRaHWDP { get; set; }
        public double SRaDPo { get; set; }
        public double SRaDPc { get; set; }
        public double Nmadc { get; set; }
        public double Nmahwdp { get; set; }
        public double Nmadpo { get; set; }
        public double Nmadpc { get; set; }
        public double Kmadc { get; set; }
        public double Kmahwdp { get; set; }
        public double Kmadpo { get; set; }
        public double Kmadpc { get; set; }
        public double Vcadc { get; set; }
        public double Vcahwdp { get; set; }
        public double Vcadpo { get; set; }
        public double Vcadpc { get; set; }
        public double Zadc { get; set; }
        public double Zahwdp { get; set; }
        public double Zadpo { get; set; }
        public double Zadpc { get; set; }
        public double uedp { get; set; }
        public double uehwdp { get; set; }
        public double uedc { get; set; }
        public double uedca { get; set; }
        public double uehwdpa { get; set; }
        public double uedpao { get; set; }
        public double uedpac { get; set; }
        public double DPV { get; set; }
        public double HWDPV { get; set; }
        public double DCV { get; set; }
        public double DSV { get; set; }
        public double DCaV { get; set; }
        public double HWDPaV { get; set; }
        public double DPaoV { get; set; }
        public double DPacV { get; set; }
        public double DPcap { get; set; }
        public double HWDPcap { get; set; }
        public double DCcap { get; set; }
        public double DCAcap { get; set; }
        public double HWDPAcap { get; set; }
        public double DPAocap { get; set; }
        public double DPAccap { get; set; }
        public double Vma { get; set; }
        public double Vga { get; set; }
        public double APMPa { get; set; }
        public double APa { get; set; }
        public double Vmap { get; set; }
        public double Mpa { get; set; }
        public double CumMV1 { get; set; }
        public double CumMV2 { get; set; }
        public double DPiPL { get; set; }
        public double HWDPiPL { get; set; }
        public double DCiPL { get; set; }
        public double DSiPL { get; set; }
        public double DCaPL { get; set; }
        public double HWDPaPL { get; set; }
        public double DPaPLo { get; set; }
        public double DPaPLc { get; set; }
        public double APL { get; set; }
        public double SPL { get; set; }
        public double cs { get; set; } // 0.36
        public double DCaPLT { get; set; }
        public double HWDPaPLT { get; set; }
        public double DPaPLTo { get; set; }
        public double DPaPLTc { get; set; }
        public double Ki1 { get; set; }
        public double Ki2 {get; set;}
        public double ROP { get; set; }
        public double HPml { get; set; }
        public double BHPd { get; set; }
        public double ECD { get; set; }
        public double FLAL { get; set; }
        public double SLV { get; set; }
        public double MWgas { get; set; }
        public double hmv2 { get; set; }
        public double hmva2 { get; set; }
        public double Vmtl { get; set; }
        public double FLTP { get; set; }
        public double FFP { get; set; }
        public double MAASP { get; set; }
        public double KHID { get; set; }

        public SnapshotDB()
        {
            ht = ""; fs = ""; fft = ""; k = ""; fpgr = ""; Nozzle_size = "";
        }
        // init snapshot by name from db
        public void init_snapshot(string str)
        {
            // method to find str from db that returns snp
            if (str.Equals("Snapshot_test2"))
            {
                // init with consts
                this.name = "Snapshot_test2";
                this.description = "Sea232";
                this.Dwell = 8.5;
                this.TVD = 5626.64;
                this.MD = 5626.64;
                this.BitPos = 5610.01;
                // undef
                this.PLT = 0.0;
                this.MWLT = 0.0;
                this.CasOD = 9.625;
                this.CasID = 8.68;
                // shoe depth tvd
                this.SD_TVD = 3950;
                this.CassetMD = 3950;
                this.DPOD = 5;
                this.DPID = 4.276;
                this.DpLength = 0.0;
                this.DpWeight = 19.5;
                this.HWDPOD = 5;
                this.HWDPID = 3;
                this.HWDP_len = 797.24;
                this.HWDP_weight = 49.30;
                this.DCOD = 6.25;
                this.DCID = 2.5;
                this.DC_len = 590.55;
                this.DC_weight = 87.35;
                this.Type = 0.0;
                this.BitD = 8.5;
                // kol-vo nasadok - undef
                this.Nozzle_num = 3;
                this.YP = 20;
                this.PV = 10;
                this.MW = 10.014;
                this.O600 = 40;
                this.O300 = 30;
                // undef in snp
                this.O200 = 22;
                this.O100 = 15;
                this.O6 = 5;
                this.O3 = 3;
                this.PowerLaw = 0.0;
                this.Binghman = 0.0;
                this.Herschel = 0.0;
                this.PitVi = 13152.07;
                this.PitVa = 12797.55;
                this.Vr = 354.52;
                this.pump_no = 1;
                this.Liner = 6;
                this.Stroke = 12;
                this.Eff = 0.98;
                this.PumpSpeed = 120;
                // undef in snp
                this.case_no = 0.0;
                this.TrBlockW = 15.88;
                this.KellyW = 0.9;
                this.TDW = 17;
                this.Mbitspf = 11;
                this.MWkm3 = 1.40;
                // MWKM val undef;
                // PVO vals
                this.VCls1 = 68;
                this.VCls2 = 22;
                this.VCls3 = 22;
                this.VCls4 = 22;
                this.VCls5 = 12;
                this.VCls6 = 12;
                this.VOpn1 = 59;
                this.VOpn2 = 20;
                this.VOpn3 = 20;
                this.VOpn4 = 20;
                this.VOpn5 = 10;
                this.VOpn6 = 10;

                this.APMPi = 69;
                this.MPi = 104;
                this.APi = 207;
                this.Pmrt = 3;
                this.Vmi = 946;
                // 0
                this.init_MD = 0;
                this.init_SHL = 0;
                this.PV = 10;
                this.YP = 20;
                this.BF = 0;
                this.SHL = 0;
                this.WOB = 0;
                this.DHL = 0;
                this.Mbit = 0;
                this.Nx1 = 0;
                this.Mvs = 0;
                this.Mtotal = 0;
                this.POgpm = 0;
                this.Vn = 0;
                this.BPL = 0;
                this.Vdp = 0;
                this.Vhwdp = 0;
                this.Vdc = 0;
                this.Vadc = 0;
                this.Vahwdp = 0;
                this.Vadpo = 0;
                this.Vadpc = 0;

                this.SRaDC = 0;
                this.SRaHWDP = 0;
                this.SRaDPo = 0;
                this.SRaDPc = 0;
                this.Nmadc = 0;
                this.Nmahwdp = 0;
                this.Nmadpo = 0;
                this.Nmadpc = 0;
                this.Kmadc = 0;
                this.Kmahwdp = 0;
                this.Kmadpo = 0;
                this.Kmadpc = 0;
                this.Vcadc = 0;
                this.Vcahwdp = 0;
                this.Vcadpo = 0;
                this.Vcadpc = 0;
                this.Zadc = 0;
                this.Zahwdp = 0;
                this.Zadpo = 0;
                this.Zadpc = 0;
                this.uedp = 0;
                this.uehwdp = 0;
                this.uedc = 0;
                this.uedca = 0;
                this.uehwdpa = 0;
                this.uedpao = 0;
                this.uedpac = 0;
                this.DPV = 0;
                this.HWDPV = 0;
                this.DCV = 0;
                this.DSV = 0;
                this.DCaV = 0;
                this.HWDPaV = 0;
                this.DPaoV = 0;
                this.DPacV = 0;
                this.DPcap = 0;
                this.HWDPcap = 0;
                this.DCcap = 0;
                this.DCAcap = 0;
                this.HWDPAcap = 0;
                this.DPAocap = 0;
                this.DPAccap = 0;
                this.Vma = 0;
                this.Vga = 0;
                this.APMPa = 0;
                this.APa = 0;
                this.Vmap = 0;
                this.Mpa = 0;
                this.CumMV1 = 0;
                this.CumMV2 = 0;
                this.DPiPL = 0;
                this.HWDPiPL = 0;
                this.DCiPL = 0;
                this.DSiPL = 0;
                this.DCaPL = 0;
                this.HWDPaPL = 0;
                this.DPaPLo = 0;
                this.DPaPLc = 0;
                this.APL = 0;
                this.SPL = 0;
                this.cs = 0.36;
                this.DCaPLT = 0;
                this.HWDPaPLT = 0;
                this.DPaPLTo = 0;
                this.DPaPLTc = 0;
                this.Ki1 = 0;
                this.Ki2 = 0;
                this.ROP = 0;
                this.HPml = 0;
                this.BHPd = 0;
                this.ECD = 0;
                this.FLAL = 0;
                this.MWgas = 2;
                this.SLV = 400;
                this.hmv2 = 0;
                this.hmva2 = 0;
            }
        }

        // sync with Client Snapshot Model
        public void sync_snapshot(SnapshotClientModel m)
        {
            this.name = m.name;
            this.drive = m.drive;
            System.Diagnostics.Debug.WriteLine("Nozzle_size COUNT: " + m.Nozzle_size.Count);
            for (var i = 0; i < m.ht.Count; i++)
            {
                ht += m.ht[i] + " ";
                fs += m.fs[i] + " ";
                fft += m.FFT[i] + " ";
                k += m.k[i] + " ";
                fpgr += m.FPgr[i] + " ";
                if(i < m.Qnoz)
                {
                    Nozzle_size += m.Nozzle_size[i] + " ";
                }
            }
            this.VOpn1 = m.VOpn[1];
            this.VOpn2 = m.VOpn[2];
            this.VOpn3 = m.VOpn[3];
            this.VOpn4 = m.VOpn[4];
            // VOpn5 and Vcl5 set by default
            this.VOpn6 = m.VOpn[6];
            this.VCls1 = m.VCls[1];
            this.VCls2 = m.VCls[2];
            this.VCls3 = m.VCls[3];
            this.VCls4 = m.VCls[4];
            this.VCls6 = m.VCls[6];
            this.Nozzle_num = m.Qnoz;
            this.Vmtl = m.Vmtl;
            this.APMPi = m.APMPi;
            this.MPi = m.MPi;
            this.Pmrt = m.Pmrt;
            this.Liner = m.Liner;
            this.Liner2 = m.Liner2;
            this.Eff = m.Eff;
            this.Eff2 = m.Eff2;
            this.Stroke = m.Stroke;
            this.Stroke2 = m.Stroke2;
            this.TrBlockW = m.TrBlockW;
            this.KellyW = m.KellyW;
            this.TDrW = m.TDrW;
            this.PitVa = m.PitVa;
            this.MW = m.MW;
            this.YP = m.YP;
            this.PV = m.PV;
            this.O600 = m.O600;
            this.O300 = m.O300;
            this.O200 = m.O200;
            this.O100 = m.O100;
            this.O6 = m.O6;
            this.O3 = m.O3;
            this.CasOD = m.CasOD;
            this.CasID = m.CasID;
            this.CassetTVD = m.CassetTVD;
            this.CassetMD = m.CassetMD;
            this.CasWt = m.CasWt;
            this.CasCP = m.CasCP;
            this.CasBP = m.CasBP;
            this.CasTL = m.CasTL;
            this.DPOD = m.DPOD;
            this.DPID = m.DPID;
            this.DpLength = m.DPlength;
            this.DpWeight = m.DPweight;
            this.HWDPOD = m.HWDPOD;
            this.HWDPID = m.HWDPID;
            this.HWDP_len = m.HWDPlength;
            this.HWDP_weight = m.HWDPweight;
            this.DCOD = m.DCOD;
            this.DCID = m.DCID;
            this.DC_len = m.DClength;
            this.DC_weight = m.DCweight;
            this.Dwell = m.Dwell;
            this.Nozzle_num = m.Qnoz;
            this.FLTP = m.FLTP;
            this.FFP = m.FFP;
            this.PLT = m.PLT;
            this.MWLT = m.MWLT;
            this.MAASP = m.MAASP;
        }
    }

    // initialize snapshot witch const values "snp_test" -> custom snp from 

    public class SnapshotDBContext : DbContext
    {
        public DbSet<SnapshotDB> Snapshots { get; set; }
    }
}