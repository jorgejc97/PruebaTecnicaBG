namespace IngresoYGestiónDeFacturasApi.Endpoint
{
    public class PaymentEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet(EndpointsRoutes.BasePaymentMethod, async (ApplicationDbContext context, CancellationToken cancellationToken) =>
               (await context.PaymentMethods.AsNoTracking()
               .ToListAsync(cancellationToken))
               .ToPaymentMethodDTOList())
               .WithTags("Payment");

            app.MapGet($"{EndpointsRoutes.BasePaymentMethod}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
                (await context.PaymentMethods.FindAsync([id, cancellationToken],
                cancellationToken) ?? throw new NotFoundException("Metodo de pago no encontrado")).ToPaymentMethodDTO())
            .WithTags("Payment");

            app.MapGet(EndpointsRoutes.BasePaymentStatus, async (ApplicationDbContext context, CancellationToken cancellationToken) =>
               (await context.PaymentStatuses.AsNoTracking()
               .ToListAsync(cancellationToken))
               .ToPaymentStatusDTOList())
               .WithTags("Payment");

            app.MapGet($"{EndpointsRoutes.BasePaymentStatus}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
                (await context.PaymentStatuses.FindAsync([id, cancellationToken],
                cancellationToken) ?? throw new NotFoundException("Estado de pago no encontrado")).ToPaymentStatusDTO())
            .WithTags("Payment");

        }


    }
}
