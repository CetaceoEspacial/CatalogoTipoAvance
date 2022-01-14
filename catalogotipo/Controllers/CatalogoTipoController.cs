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
    public class CatalogoTipoController : Controller
    {
        // GET: CatalogoTipo(Index es la vista)
        private CORRESPONDENCIAContext db = new CORRESPONDENCIAContext();
        //public Database Database { get; }
        public ActionResult Index()
        {
            return View();
			
        }
        //Metodo que recupera listado de pantallas
        [HttpPost]
        public JsonResult consultaTipos()
        {
            DbProviderFactory dbFactory = DbProviderFactories.GetFactory(db.Database.Connection);
            string query = null;
            query = "SELECT * FROM tca_tipodeproducto ";
            var cmd = dbFactory.CreateCommand();
            cmd.Connection = db.Database.Connection;
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = query;

            DbDataAdapter adapter = dbFactory.CreateDataAdapter();

            adapter.SelectCommand = cmd;

            DataTable pantalla = new DataTable();
            adapter.Fill(pantalla);


            return Json(DataTableToJson(pantalla));

        }
        /*Convierte DataTable en Json Ini*/
        public string DataTableToJson(DataTable pantalla)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(pantalla);
            return JSONString;
        }
    }
}