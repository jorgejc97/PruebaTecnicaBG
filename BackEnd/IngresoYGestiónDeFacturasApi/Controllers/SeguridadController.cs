using BibliotecaAPI.Servicios;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaAPI.Controllers
{
    [ApiController]
    [Route("api/seguridad")]
    public class SeguridadController : ControllerBase
    {
        private readonly IDataProtector protector;
        private readonly ITimeLimitedDataProtector protectorLimitadoPorTiempo;
        private readonly IServicioHash servicioHash;

        public SeguridadController(IDataProtectionProvider protectionProvider, IServicioHash servicioHash)
        {
            protector = protectionProvider.CreateProtector("SeguridadCOntroller");
            protectorLimitadoPorTiempo = protector.ToTimeLimitedDataProtector();
            this.servicioHash = servicioHash;
        }

        [HttpGet("hash")]
        public ActionResult Hash(string textoPlano)
        {
            var hash1 = servicioHash.Hash(textoPlano);
            var hash2 = servicioHash.Hash(textoPlano);
            var hash3 = servicioHash.Hash(textoPlano, hash2.Sal);

            var resultado = new { textoPlano, hash1, hash2, hash3 };

            return Ok(resultado);
        }

        [HttpGet("encriptar-limitado-por-tiemo")]
        public ActionResult EncriptarLimitadoPorTiempo(string textoPLano)
        {
            string textoCifrado = protectorLimitadoPorTiempo.Protect(textoPLano,
                lifetime: TimeSpan.FromSeconds(30));
            return Ok(new { textoCifrado });

        }

        [HttpGet("desencriptar-limitado-por-tiemo")]
        public ActionResult DesencriptarLimitadoPorTiempo(string textoCifrado)
        {
            string textopLano = protectorLimitadoPorTiempo.Unprotect(textoCifrado);
            return Ok(new { textopLano });

        }

        [HttpGet("encriptar")]
        public ActionResult Encriptar(string textoPLano)
        {
            string textoCifrado = protector.Protect(textoPLano);
            return Ok(new { textoCifrado });

        }

        [HttpGet("desencriptar")]
        public ActionResult Desencriptar(string textoCifrado)
        {
            string textopLano = protector.Unprotect(textoCifrado);
            return Ok(new { textopLano });

        }
    }
}
