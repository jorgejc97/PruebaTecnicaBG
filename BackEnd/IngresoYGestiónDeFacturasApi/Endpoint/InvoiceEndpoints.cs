namespace IngresoYGestiónDeFacturasApi.Endpoint
{
    public class InvoiceEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet(EndpointsRoutes.BaseInvoice, async (ApplicationDbContext context, CancellationToken cancellationToken) =>
                (await context.Invoices.Include(p => p.InvoiceDetails).AsNoTracking()
                    .ToListAsync(cancellationToken))
                .ToInvoiceDTOList())
                .WithTags("Invoice");

            app.MapGet($"{EndpointsRoutes.BaseInvoice}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
            (await context.Invoices.Include(d => d.InvoiceDetails).FirstOrDefaultAsync(i => i.Id == id, cancellationToken)
            ?? throw new NotFoundException("Factura no encontrada")).ToInvoiceDTO())
            .WithTags("Invoice");

            app.MapPost(EndpointsRoutes.BaseInvoice, async (InvoiceDTO invoiceDTO, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                var newInvoice = Invoice.Create(
                    invoiceDTO.Number,
                    invoiceDTO.CompanyId,
                    invoiceDTO.CustomerId,
                    invoiceDTO.SellerId,
                    invoiceDTO.PaymentMethodId,
                    invoiceDTO.PaymentStatusId,
                    invoiceDTO.SubTotal,
                    invoiceDTO.Iva,
                    invoiceDTO.Total,
                    invoiceDTO.InvoiceDetails
                    );
                await context.Invoices.AddAsync(
                newInvoice
                , cancellationToken);
                await context.SaveChangesAsync(cancellationToken);
                return Results.Created("", newInvoice.ToInvoiceDTO());
            }).WithTags("Invoice");

            app.MapPut(EndpointsRoutes.BaseInvoice, async (InvoiceDTO invoiceDTO, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {

                if (await context.Invoices
                        .Include(i => i.InvoiceDetails)
                        .FirstOrDefaultAsync(i => i.Id == invoiceDTO.Id, cancellationToken)
                    is not { } invoice)
                    throw new NotFoundException("Factura no encontrado");

                invoice.Number = invoiceDTO.Number;
                invoice.CompanyId = invoiceDTO.CompanyId;
                invoice.SellerId = invoiceDTO.SellerId;
                invoice.CustomerId = invoiceDTO.CustomerId;
                invoice.PaymentMethodId = invoiceDTO.PaymentMethodId;
                invoice.PaymentStatusId = invoiceDTO.PaymentStatusId;
                invoice.SubTotal = invoiceDTO.SubTotal;
                invoice.Iva = invoiceDTO.Iva;
                invoice.Total = invoiceDTO.Total;

                var dtoDetailIds = invoiceDTO.InvoiceDetails.Select(ii => ii.Id).ToList();
                var detailsToRemove = invoice.InvoiceDetails
                    .Where(pp => !dtoDetailIds.Contains(pp.Id))
                    .ToList();
                context.InvoiceDetails.RemoveRange(detailsToRemove);
                var newPrices = new List<InvoiceDetail>();
                foreach (var detailDto in invoiceDTO.InvoiceDetails.Where(pp => !dtoDetailIds.Contains(pp.Id))
                             .ToList())
                {
                    if (invoice.InvoiceDetails
                            .FirstOrDefault(pp => pp.Id == detailDto.Id) is { } existingDetail)
                    {
                        existingDetail.ProductId = detailDto.ProductId;
                        existingDetail.Quantity = detailDto.Quantity;
                        existingDetail.UnitPrice = detailDto.UnitPrice;
                        existingDetail.Total = detailDto.Total;
                    }
                    else
                    {
                        newPrices.Add(InvoiceDetail.Create(invoice.Id, detailDto.ProductId, detailDto.Quantity, detailDto.UnitPrice, detailDto.Total));
                    }
                }
                await context.InvoiceDetails.AddRangeAsync(newPrices, cancellationToken);
                await context.SaveChangesAsync(cancellationToken);
                return Results.NoContent();
            })
                .WithTags("Invoice");

            app.MapDelete($"{EndpointsRoutes.BaseInvoice}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                if (await context.Invoices.Include(d => d.InvoiceDetails).FirstOrDefaultAsync(i => i.Id == id, cancellationToken) is not { } invoice)
                    throw new NotFoundException("Factura no encontrada");

                context.Invoices.Remove(invoice);

                await context.SaveChangesAsync(cancellationToken);
                return Results.Ok("Factura eliminada");
            }).WithTags("Invoice");
        }
    }
}

