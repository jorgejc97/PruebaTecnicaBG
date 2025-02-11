using BibliotecaAPI.Entidades;
using Microsoft.AspNetCore.Identity;

namespace BibliotecaAPI.Servicios
{
    public class ServiciosUsuarios : IServiciosUsuarios
    {
        private readonly UserManager<Usuario> userManager;
        private readonly IHttpContextAccessor contextAccessor;

        public ServiciosUsuarios(UserManager<Usuario> userManager, IHttpContextAccessor contextAccessor)
        {
            this.userManager = userManager;
            this.contextAccessor = contextAccessor;
        }

        public async Task<Usuario?> ObtenerUsuario()
        {
            var emailClain = contextAccessor.HttpContext!.User.Claims.Where(x => x.Type == "email").FirstOrDefault();

            if (emailClain is null)
            {
                return null;
            }

            var email = emailClain.Value;
            return await userManager.FindByEmailAsync(email);
        }
    }
}
