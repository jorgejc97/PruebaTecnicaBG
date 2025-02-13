using IngresoYGestiónDeFacturasApi.Endpoint;

namespace IngresoYGestiónDeFacturasApi.Endpoints;

public class SecurityEndpoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(EndpointsRoutes.BaseUser, async (LoginInfoDTO loginInfo,
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

        app.MapPut(EndpointsRoutes.BaseUpdateUser, async (UserDTO userDTO, ApplicationDbContext context, CancellationToken cancellationToken) =>
        {
            if (await context.Users
                    .FirstOrDefaultAsync(p => p.Id == userDTO.Id, cancellationToken)
                is not { } user)
                throw new NotFoundException("Usuario no encontrado");

            user.NameCompany = userDTO.NameCompany;
            user.PhoneNumber = userDTO.PhoneNumber;
            user.Iva = userDTO.Iva;
            user.City = userDTO.City;
            user.RegionProvince = userDTO.RegionProvince;
            user.Address = userDTO.Address;
            user.Zipcode = userDTO.Zipcode;

            await context.SaveChangesAsync(cancellationToken);
            return Results.NoContent();
        }).WithTags("Security");

    }
}

