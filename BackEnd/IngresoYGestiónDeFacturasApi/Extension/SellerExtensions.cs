namespace IngresoYGestiónDeFacturasApi.Extension
{
    public static class SellerExtensions
    {
        public static IEnumerable<SellerDTO> ToSellerDTOList(this IEnumerable<Seller> sellers) =>
       sellers.Select(s => new SellerDTO
       {
           Id = s.Id,
           Identification = s.Identification,
           Name = s.Name,
           LastName = s.LastName,
           Phone = s.Phone,
           Email = s.Email,
           Address = s.Address,
           CreatedAt = s.CreatedAt,
           Active = s.Active!.Value
       });

        public static SellerDTO ToSellerDTO(this Seller seller) =>
            new()
            {
                Id = seller.Id,
                Identification = seller.Identification,
                Name = seller.Name,
                LastName = seller.LastName,
                Phone = seller.Phone,
                Email = seller.Email,
                Address = seller.Address,
                CreatedAt = seller.CreatedAt,
                Active = seller.Active!.Value
            };
    }
}
