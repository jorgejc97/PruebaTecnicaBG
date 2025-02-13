
namespace IngresoYGestiónDeFacturasApi.Endpoint
{
    public class ProductEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet(EndpointsRoutes.BaseProduct, async (ApplicationDbContext context, CancellationToken cancellationToken) =>
                (await context.Products.AsNoTracking()
                .ToListAsync(cancellationToken))
                .ToProductDTOList())
                .WithTags("Product");

            app.MapGet($"{EndpointsRoutes.BaseProduct}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
                (await context.Products.FindAsync([id, cancellationToken],
                cancellationToken) ?? throw new NotFoundException("Producto no encontrado")).ToProductDTO())
            .WithTags("Product");

            app.MapPost(EndpointsRoutes.BaseProduct, async (ProductDTO productDTO, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                var newProduct = Product.Create(
                    productDTO.Code,
                    productDTO.Name,
                    productDTO.Description,
                    productDTO.Quantity,
                    productDTO.UnitPrice);
                await context.Products.AddAsync(
                newProduct
                , cancellationToken);
                await context.SaveChangesAsync(cancellationToken);
                return Results.Created("", newProduct.ToProductDTO());
            }).WithTags("Product");

            app.MapPut(EndpointsRoutes.BaseProduct, async (ProductDTO productDTO, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                if (await context.Products
                        .FirstOrDefaultAsync(p => p.Id == productDTO.Id, cancellationToken)
                    is not { } product)
                    throw new NotFoundException("Producto no encontrado");

                product.Code = productDTO.Code;
                product.Name = productDTO.Name;
                product.Description = productDTO.Description;
                product.Quantity = productDTO.Quantity;
                product.UnitPrice = productDTO.UnitPrice;
                product.Active = productDTO.Active;

                await context.SaveChangesAsync(cancellationToken);
                return Results.NoContent();
            }).WithTags("Product");

            app.MapDelete($"{EndpointsRoutes.BaseProduct}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                if (await context.Products.FindAsync([id], cancellationToken) is not { } product)
                    throw new NotFoundException("Producto no encontrado");
                context.Products.Remove(product);
                await context.SaveChangesAsync(cancellationToken);
                return Results.Ok("Producto eliminado");
            }).WithTags("Product");
        }
    }
}
