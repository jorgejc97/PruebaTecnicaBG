using AutoMapper;
using BibliotecaAPI.Datos;
using BibliotecaAPI.DTO;
using BibliotecaAPI.Entidades;
using BibliotecaAPI.Servicios;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BibliotecaAPI.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly UserManager<Usuario> userManager;
        private readonly IConfiguration configuration;
        private readonly SignInManager<Usuario> signInManager;
        private readonly IServiciosUsuarios serviciosUsuarios;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public UsuariosController(UserManager<Usuario> userManager, IConfiguration configuration,
            SignInManager<Usuario> signInManager, IServiciosUsuarios serviciosUsuarios,
            ApplicationDbContext context, IMapper mapper)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.signInManager = signInManager;
            this.serviciosUsuarios = serviciosUsuarios;
            this.context = context;
            this.mapper = mapper;
        }


        [HttpPost("registro")]
        public async Task<ActionResult<RespuestaAutentificacionDTO>> Registrar(
            CredencialesUsuariosDTO credencialesUsuariosDTO)
        {
            var usuario = new Usuario
            {
                UserName = credencialesUsuariosDTO.Email,
                Email = credencialesUsuariosDTO.Email
            };

            var resultado = await userManager.CreateAsync(usuario, credencialesUsuariosDTO.Password!);

            if (resultado.Succeeded)
            {
                var respuestaAutentificacion = await ConstruirToken(credencialesUsuariosDTO);
                return respuestaAutentificacion;
            }
            else
            {
                foreach (var error in resultado.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return ValidationProblem();
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<RespuestaAutentificacionDTO>> Login(CredencialesUsuariosDTO credencialesUsuariosDTO)
        {
            var usuario = await userManager.FindByEmailAsync(credencialesUsuariosDTO.Email);

            if (usuario is null)
            {
                return RetornarLoginIncorrecto();
            }

            var resultado = await signInManager.CheckPasswordSignInAsync(usuario,
                credencialesUsuariosDTO.Password!, lockoutOnFailure: false);

            if (resultado.Succeeded)
            {
                return await ConstruirToken(credencialesUsuariosDTO);
            }
            else
            {
                return RetornarLoginIncorrecto();
            }
        }

        [HttpGet("renovar-token")]
        [Authorize]
        public async Task<ActionResult<RespuestaAutentificacionDTO>> RenovarToken()
        {
            var usuario = await serviciosUsuarios.ObtenerUsuario();

            if (usuario is null)
            {
                return NotFound();
            }

            var credencialesUsuarioDTO = new CredencialesUsuariosDTO { Email = usuario.Email! };
            var respuestaAutenticacion = await ConstruirToken(credencialesUsuarioDTO);

            return respuestaAutenticacion;
        }


        private ActionResult RetornarLoginIncorrecto()
        {
            ModelState.AddModelError(string.Empty, "Login Incorrecto");
            return ValidationProblem();
        }


        private async Task<RespuestaAutentificacionDTO> ConstruirToken(
            CredencialesUsuariosDTO credencialesUsuariosDTO)
        {
            var claims = new List<Claim>
            {
                new Claim("email", credencialesUsuariosDTO.Email),
                new Claim("lo que yo quiera", "cualquier valor")
            };

            var usuario = await userManager.FindByEmailAsync(credencialesUsuariosDTO.Email);
            var claimsDB = await userManager.GetClaimsAsync(usuario!);

            claims.AddRange(claimsDB);

            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llavejwt"]!));
            var credenciales = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

            var expiracion = DateTime.UtcNow.AddDays(1);

            var tokenDeSeguridad = new JwtSecurityToken(issuer: null, audience: null,
                claims: claims, expires: expiracion, signingCredentials: credenciales);

            var token = new JwtSecurityTokenHandler().WriteToken(tokenDeSeguridad);

            return new RespuestaAutentificacionDTO
            {
                Token = token,
                Expiracion = expiracion
            };
        }


    }
}
