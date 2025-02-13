namespace IngresoYGestiónDeFacturasApi.DTO
{
    public class AuthenticationResponseDTO
    {
        public string Token { get; set; } = default!;
        public DateTime Expiracion { get; set; }
        public required UserDTO UserInfo { get; set; }
    }
}
