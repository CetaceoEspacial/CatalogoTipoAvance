using catalogotipo.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace catalogotipo.Controllers
{
    public class CatalogoTipoModificarController : Controller
    {
        private CORRESPONDENCIAContext db = new CORRESPONDENCIAContext();
        //public Database Database { get; }
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ModificarTipo(SqlConnection con,int clave, string clave_alfanumerica, string tipo_de_producto, string descripcion_de_producto)
        {
            try
            {
                DbProviderFactory dbFactory = DbProviderFactories.GetFactory(db.Database.Connection);
                string query = null;
                query = "UPDATE tca_productos SET " + "',clave_alfanumerica= " + clave_alfanumerica + "'tipo_de_producto=" + tipo_de_producto + "'descripcion_de_producto=" + descripcion_de_producto + "";

                var cmd = dbFactory.CreateCommand();
                cmd.Connection = db.Database.Connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = query;


                return Json("success", JsonRequestBehavior.AllowGet);


            }


            catch (Exception e)
            {
                return Json("failure", JsonRequestBehavior.AllowGet);


            }

        }
    }
}