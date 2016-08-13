using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Drill_Sim.Models
{
    // DESC: Client-To-Server param model
    public class SnapshotClientModel
    {
        public string name { get; set; }
        public string drive { get; set; }
        public List<double> ht { get; set; }
        public List<double> fs { get; set; }
        public List<string> FFT { get; set; }
        public List<double> k { get; set; }
        public List<double> FPgr { get; set; }
        public List<double> VOpn { get; set; }
        public List<double> VCls { get; set; }
        public List<double> Nozzle_size { get; set; }
        public double Vmtl { get; set; }
        public double APMPi { get; set; }
        public double MPi { get; set; }
        public double Pmrt { get; set; }
        public double Liner { get; set; }
        public double Liner2 { get; set; }
        public double Eff { get; set; }
        public double Eff2 { get; set; }
        public double Stroke { get; set; }
        public double Stroke2 { get; set; }
        public double TrBlockW { get; set; }
        public double KellyW { get; set; }
        public double TDrW { get; set; }
        public double PitVa { get; set; }
        public double MW { get; set; }
        public double YP { get; set; }
        public double PV { get; set; }
        public double O600 { get; set; }
        public double O300 { get; set; }
        public double O200 { get; set; }
        public double O100 { get; set; }
        public double O6 { get; set; }
        public double O3 { get; set; }
        public double CasOD { get; set; }
        public double CasID { get; set; }
        public double CassetTVD { get; set; }
        public double CassetMD { get; set; }
        public double CasWt { get; set; }
        public double CasCP { get; set; }
        public double CasBP { get; set; }
        public double CasTL { get; set; }
        public double DPOD { get; set; }
        public double DPID { get; set; }
        public double DPlength { get; set; }
        public double DPweight { get; set; }
        public double HWDPOD { get; set; }
        public double HWDPID { get; set; }
        public double HWDPlength { get; set; }
        public double HWDPweight { get; set; }
        public double DCOD { get; set; }
        public double DCID { get; set; }
        public double DClength { get; set; }
        public double DCweight { get; set; }
        public double Dwell { get; set; }
        public double Qnoz { get; set; }
        public double FLTP { get; set; }
        public double FFP { get; set; }
        public double PLT { get; set; }
        public double MWLT { get; set; }
        public double MAASP { get; set; }
    }
}