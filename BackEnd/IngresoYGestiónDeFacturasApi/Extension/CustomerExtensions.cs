namespace IngresoYGestiónDeFacturasApi.Extension
{
    public static class CustomerExtensions
    {
        public static IEnumerable<CustomerDTO> ToCustomerDTOList(this IEnumerable<Customer> customers) =>
        customers.Select(c => new CustomerDTO
        {
            Id = c.Id,
            Identification = c.Identification,
            Name = c.Name,
            LastName = c.LastName,
            Phone = c.Phone,
            Email = c.Email,
            Address = c.Address,
            CreatedAt = c.CreatedAt,
            Active = c.Active!.Value
        });

        public static CustomerDTO ToCustomerDTO(this Customer customer) =>
            new()
            {
                Id = customer.Id,
                Identification = customer.Identification,
                Name = customer.Name,
                LastName = customer.LastName,
                Phone = customer.Phone,
                Email = customer.Email,
                Address = customer.Address,
                CreatedAt = customer.CreatedAt,
                Active = customer.Active!.Value
            };
    }
}
