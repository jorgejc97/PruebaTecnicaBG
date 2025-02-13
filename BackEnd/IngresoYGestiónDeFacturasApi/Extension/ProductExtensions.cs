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
            Description = p.Description,
            Quantity = p.Quantity,
            UnitPrice = p.UnitPrice,
            Active = p.Active!.Value
        });

        public static ProductDTO ToProductDTO(this Product product) =>
            new()
            {
                Id = product.Id,
                Code = product.Code,
                Name = product.Name,
                Description = product.Description,
                Quantity = product.Quantity,
                UnitPrice = product.UnitPrice,
                Active = product.Active!.Value
            };
    }
}
