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
    public class CatalogoTipoAgregarController : Controller
    {
        // GET: CatalogoTipo(Index es la vista)
        private CORRESPONDENCIAContext db = new CORRESPONDENCIAContext();
        //public Database Database { get; }
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult AgregarTipo(string clavealfanumerica, string tipodeproducto, string descripciondeproducto)
        {
            try
            {
                SqlConnection con = new SqlConnection(db.Database.Connection.ConnectionString);       
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "INSERT INTO tca_tipodeproducto(clave_alfanumerica,tipo_de_producto,descripcion_de_producto) VALUES (@clavealfanumerica,@tipodeproducto,@descripciondeproducto) ";   
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
        public JsonResult BorrarTipo(string clavealfanumerica, string tipodeproducto, string descripciondeproducto)
        {
            try
            {
                SqlConnection con = new SqlConnection(db.Database.Connection.ConnectionString);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "DELETE tca_tipodeproducto(clave_alfanumerica,tipo_de_producto,descripcion_de_producto) WHERE clave_alfanumerica = @clavealfanumerica;";
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