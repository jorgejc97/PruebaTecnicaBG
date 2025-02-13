namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(PaymentMethod), Schema = "DBO")]
    public class PaymentMethod : Entity<Guid>
    {
        public required string Description { get; set; }
        public List<Invoice> Invoice { get; set; } = [];
    }
}
