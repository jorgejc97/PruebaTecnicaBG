using IngresoYGestiónDeFacturasApi.Entity;

namespace IngresoYGestiónDeFacturasApi.Endpoint
{
    public class CustomerEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet(EndpointsRoutes.BaseCustomer, async (ApplicationDbContext context, CancellationToken cancellationToken) =>
                (await context.Customers.AsNoTracking()
                .ToListAsync(cancellationToken))
                .ToCustomerDTOList())
                .WithTags("Customer");

            app.MapGet($"{EndpointsRoutes.BaseCustomer}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
                (await context.Customers.FindAsync([id, cancellationToken],
                cancellationToken) ?? throw new NotFoundException("Cliente no encontrado")).ToCustomerDTO())
            .WithTags("Customer");

            app.MapPost(EndpointsRoutes.BaseCustomer, async (CustomerDTO customerDTO, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                var newCustomer = Customer.Create(
                    customerDTO.Identification,
                    customerDTO.Name,
                    customerDTO.LastName,
                    customerDTO.Phone,
                    customerDTO.Email,
                    customerDTO.Address);
                await context.Customers.AddAsync(
                newCustomer
                , cancellationToken);
                await context.SaveChangesAsync(cancellationToken);
                return Results.Created("", newCustomer.ToCustomerDTO());
            }).WithTags("Customer");

            app.MapPut(EndpointsRoutes.BaseCustomer, async (CustomerDTO customerDTO, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                if (await context.Customers
                        .FirstOrDefaultAsync(p => p.Id == customerDTO.Id, cancellationToken)
                    is not { } customer)
                    throw new NotFoundException("Cliente no encontrado");

                customer.Identification = customerDTO.Identification;
                customer.Name = customerDTO.Name;
                customer.LastName = customerDTO.LastName;
                customer.Phone = customerDTO.Phone;
                customer.Email = customerDTO.Email;
                customer.Address = customerDTO.Address;
                customer.Active = customerDTO.Active;

                await context.SaveChangesAsync(cancellationToken);
                return Results.NoContent();
            }).WithTags("Customer");

            app.MapDelete($"{EndpointsRoutes.BaseCustomer}/{{id:guid}}", async (Guid id, ApplicationDbContext context, CancellationToken cancellationToken) =>
            {
                if (await context.Customers.FindAsync([id], cancellationToken) is not { } customer)
                    throw new NotFoundException("Cliente no encontrado");
                context.Customers.Remove(customer);
                await context.SaveChangesAsync(cancellationToken);
                return Results.Ok("Cliente eliminado");
            }).WithTags("Customer");
        }
    }
}
