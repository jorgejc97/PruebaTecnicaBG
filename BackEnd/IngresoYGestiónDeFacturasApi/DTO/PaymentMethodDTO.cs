namespace IngresoYGestiónDeFacturasApi.DTO
{
    public class PaymentMethodDTO
    {
        public Guid? Id { get; set; }
        public string Description { get; set; } = default!;
    }
}
