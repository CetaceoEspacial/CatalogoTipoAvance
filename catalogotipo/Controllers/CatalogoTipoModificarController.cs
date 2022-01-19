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
        public JsonResult ModificarTipo(SqlConnection con, string clavealfanumerica, string tipodeproducto, string descripciondeproducto)
        {
            try
            {
				SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "UPDATE tca_tipodeproducto SET clave_alfanumerica = @clave_alfanumerica, tipo_de_producto = @tipo_de_producto, descripcion_de_producto = @descripcion_de_producto WHERE clave = @clave;";
               
                cmd.Parameters.Add("@clavealfanumerica", SqlDbType.VarChar).Value = clavealfanumerica;
                cmd.Parameters.Add("@tipodeproducto", SqlDbType.VarChar).Value = tipodeproducto;
                cmd.Parameters.Add("@descripciondeproducto", SqlDbType.VarChar).Value = descripciondeproducto;
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                {
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                return Json("failure", JsonRequestBehavior.AllowGet);
            }

        }
    }
}