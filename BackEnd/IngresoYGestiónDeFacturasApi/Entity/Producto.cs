namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(Producto), Schema = "DBO")]
    public class Producto : Entity<Guid>
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required long Quantity { get; set; }
        public required decimal Price { get; set; }

    }
}
