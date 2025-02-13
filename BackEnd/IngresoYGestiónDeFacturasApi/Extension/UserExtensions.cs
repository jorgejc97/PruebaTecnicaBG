namespace IngresoYGestiónDeFacturasApi.Extension
{
    public static class UserExtensions
    {
        public static UserDTO ToUserDTO(this User user) =>
           new()
           {
               Id = user.Id,
               NameCompany = user.NameCompany,
               PhoneNumber = user.PhoneNumber ?? string.Empty,
               Email = user.Email,
               Iva = user.Iva,
               City = user.City,
               RegionProvince = user.RegionProvince,
               Address = user.Address,
               Zipcode = user.Zipcode
           };
    }
}
