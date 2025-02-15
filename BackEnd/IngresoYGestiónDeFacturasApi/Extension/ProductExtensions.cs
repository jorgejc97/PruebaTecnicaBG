namespace IngresoYGestiónDeFacturasApi.Extension
{
    public static class ProductExtensions
    {
        public static IEnumerable<ProductDTO> ToProductDTOList(this IEnumerable<Product> products) =>
        products.Select(p => new ProductDTO
        {
            Id = p.Id,
            Code = p.Code,
            Name = p.Name,
            Quantity = p.Quantity,
            UnitPrice = p.UnitPrice,
            CreatedAt = p.CreatedAt,
            Active = p.Active!.Value
        });

        public static ProductDTO ToProductDTO(this Product product) =>
            new()
            {
                Id = product.Id,
                Code = product.Code,
                Name = product.Name,
                Quantity = product.Quantity,
                UnitPrice = product.UnitPrice,
                CreatedAt = product.CreatedAt,
                Active = product.Active!.Value
            };
    }
}
