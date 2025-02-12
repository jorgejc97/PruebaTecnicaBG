namespace IngresoYGestiónDeFacturasApi.Services;

public class CreateTokenService(UserManager<User> userManager, IConfiguration configuration)
{
    public async Task<AuthenticationResponseDTO> CreateTokenCreateToken(string username)
    {
        var claims = new List<Claim>
        {
            new ("email", username)
        };
        if (await userManager.FindByNameAsync(username) is not { } user)
            throw new NotFoundException("Usuario no encontrado");
        var claimsDB = await userManager.GetClaimsAsync(user);
        claims.AddRange(claimsDB);
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWTKey"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiration = DateTime.UtcNow.AddYears(1);
        var securtityToken = new JwtSecurityToken(issuer: null,
            audience: null,
            claims: claims,
            expires: expiration,
            signingCredentials: creds);
        return new AuthenticationResponseDTO
        {
            Token = new JwtSecurityTokenHandler().WriteToken(securtityToken),
            Expiracion = expiration
        };
    }
}