namespace IngresoYGestiónDeFacturasApi.Endpoint
{
    public class SellerEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet(EndpointsRoutes.BaseSeller, async (ApplicationDbContext context, CancellationToken cancellationToken) =>
                (await context.Sellers.AsNoTracking()
                .ToListAsync(cancellationToken))
                .ToSellerDTOList())
                .WithTags("Seller");

            app.MapGet($"{EndpointsRoutes.BaseSeller}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
                (await context.Sellers.FindAsync([id, cancellationToken],
                cancellationToken) ?? throw new NotFoundException("Vendedor no encontrado")).ToSellerDTO())
            .WithTags("Seller");

            app.MapPost(EndpointsRoutes.BaseSeller, async (SellerDTO sellerDTO, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                var newSeller = Seller.Create(
                    sellerDTO.Identification,
                    sellerDTO.Name,
                    sellerDTO.LastName,
                    sellerDTO.Phone,
                    sellerDTO.Email,
                    sellerDTO.Address);
                await context.Sellers.AddAsync(
                newSeller
                , cancellationToken);
                await context.SaveChangesAsync(cancellationToken);
                return Results.Created("", newSeller.ToSellerDTO());
            }).WithTags("Seller");

            app.MapPut(EndpointsRoutes.BaseSeller, async (SellerDTO sellerDTO, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                if (await context.Sellers
                        .FirstOrDefaultAsync(p => p.Id == sellerDTO.Id, cancellationToken)
                    is not { } seller)
                    throw new NotFoundException("Cliente no encontrado");

                seller.Identification = sellerDTO.Identification;
                seller.Name = sellerDTO.Name;
                seller.LastName = sellerDTO.LastName;
                seller.Phone = sellerDTO.Phone;
                seller.Email = sellerDTO.Email;
                seller.Address = sellerDTO.Address;
                seller.Active = sellerDTO.Active;

                await context.SaveChangesAsync(cancellationToken);
                return Results.NoContent();
            }).WithTags("Seller");

            app.MapDelete($"{EndpointsRoutes.BaseSeller}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                if (await context.Sellers.FindAsync([id], cancellationToken) is not { } seller)
                    throw new NotFoundException("Cliente no encontrado");
                context.Sellers.Remove(seller);
                await context.SaveChangesAsync(cancellationToken);
                return Results.Ok("Vendedor eliminado");
            }).WithTags("Seller");
        }
    }

}
