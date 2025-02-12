namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(PaymentMetod), Schema = "DBO")]
    public class PaymentMetod : Entity<Guid>
    {
        public required string Description { get; set; }
    }
}
