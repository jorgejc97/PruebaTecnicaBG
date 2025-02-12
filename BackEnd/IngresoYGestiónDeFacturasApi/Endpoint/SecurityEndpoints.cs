namespace IngresoYGestiónDeFacturasApi.Endpoints;

public class SecurityEndpoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/login", async (LoginInfoDTO loginInfo,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            CreateTokenService createTokenService
            ) =>
        {
            var result = await signInManager.PasswordSignInAsync(
                loginInfo.Email,
                loginInfo.Password,
                isPersistent: false,
                lockoutOnFailure: false);
            if (!result.Succeeded) throw new NotFoundException("Usuario no encontrado");
            var tokenResponse = await createTokenService.CreateTokenCreateToken(loginInfo.Email);
            return Results.Ok(tokenResponse);
        }).WithTags("Security").AllowAnonymous();
    }
}

