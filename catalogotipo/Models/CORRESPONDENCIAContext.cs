using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace catalogotipo.Models
{
        public partial class CORRESPONDENCIAContext : DbContext
        {
            private string armarCadena(string strLinea)
            {
                string strBase, strServidor;
                string[] strParametros;
                char[] split = { ';' };
                string retorno = String.Empty;
                //strLinea = desencripta(strLinea);
                strParametros = strLinea.Split(split);

                strBase = strParametros[3].Trim();
                strServidor = strParametros[0].Trim();

                retorno += "Data Source = " + strParametros[0].Trim() + ";";
                retorno += "User ID = " + strParametros[1].Trim() + "; ";
                retorno += "Password = " + strParametros[2].Trim() + "; ";
                retorno += "Initial Catalog = " + strParametros[3].Trim();

                return retorno;
            }
            public CORRESPONDENCIAContext()
            {
                string strConexion = string.Empty;
                string strRutaArchivoConfiguracion = "C:\\conf\\conn_correspondencia.ini"; ;
                StreamReader objReader = new StreamReader(strRutaArchivoConfiguracion);
                string strLine = String.Empty;
                strLine = objReader.ReadLine();
                if (strLine != null)
                    strConexion = armarCadena(strLine);
                objReader.Close();
                Database.Connection.ConnectionString = strConexion;
        }
        public virtual DbSet<CapaDeModelo> CapaDeModelo { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CapaDeModelo>().ToTable("tca_tipodeproducto");          
        }

       // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }

    }
