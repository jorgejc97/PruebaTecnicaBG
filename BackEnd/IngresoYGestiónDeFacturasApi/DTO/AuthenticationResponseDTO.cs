namespace IngresoYGestiónDeFacturasApi.DTO
{
    public class AuthenticationResponseDTO
    {
        public string Token { get; set; } = default!;
        public DateTime Expiracion { get; set; }
    }
}
