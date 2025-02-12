namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(PaymentStatus), Schema = "DBO")]
    public class PaymentStatus : Entity<Guid>
    {
        public required string Description { get; set; }
    }
}
