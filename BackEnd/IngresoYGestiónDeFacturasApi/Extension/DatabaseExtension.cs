
namespace IngresoYGestiónDeFacturasApi.Extension
{
    public static class DatabaseExtension
    {

        public static async Task InitializeDatabaseAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
            await context.Database.MigrateAsync();
            await SeedAsync(context, userManager);
        }

        private static async Task SeedAsync(ApplicationDbContext context, UserManager<User> userManager)
        {
            await SeedUsersAsync(context, userManager);
            await SeedSellersAsync(context);
            await SeedCustomersAsync(context);
            await SeedProductsAsync(context);
        }

        private static async Task SeedUsersAsync(ApplicationDbContext context, UserManager<User> userManager)
        {
            if (!await userManager.Users.AnyAsync())
            {
                var user = new User
                {
                    UserName = "admin",
                    Email = "admin@correo.com",
                    EmailConfirmed = true,
                    FirstName = "Jorge",
                    LastName = "Crespo",
                    NameCompany = "Custom Chocolate",
                    PhoneNumber = "+593923456787",
                    PhoneNumberConfirmed = true,
                    Iva = 15,
                    City = "Guayaquil",
                    RegionProvince = "Guayas",
                    Address = "Avenida 123",
                    Zipcode = 880204
                    // Otros campos según tu modelo de usuario
                };
                await userManager.CreateAsync(user, "Abc123*+");
            }

        }


        private static async Task SeedSellersAsync(ApplicationDbContext context)
        {
            if (!await context.Sellers.AnyAsync())
            {
                var sellers = new List<Seller>
        {
           new Seller
                {
                    Identification = "0987654321",
                    Name = "Carlos",
                    LastName = "Ramírez",
                    Phone = "+593998877665",
                    Email = "carlos.ramirez@empresa.com",
                    Address = "Barrio Norte, Guayaquil"
                },
                new Seller
                {
                    Identification = "0123456789",
                    Name = "Ana",
                    LastName = "Torres",
                    Phone = "+593987654321",
                    Email = "ana.torres@empresa.com",
                    Address = "Centro Histórico, Quito"
                },
                new Seller
                {
                    Identification = "1234567890",
                    Name = "Jorge",
                    LastName = "Fernández",
                    Phone = "+593999112233",
                    Email = "jorge.fernandez@empresa.com",
                    Address = "La Floresta, Quito"
                },
                new Seller
                {
                    Identification = "2345678901",
                    Name = "María",
                    LastName = "Gómez",
                    Phone = "+593995544332",
                    Email = "maria.gomez@empresa.com",
                    Address = "Urdesa, Guayaquil"
                },
                new Seller
                {
                    Identification = "3456789012",
                    Name = "Luis",
                    LastName = "Mendoza",
                    Phone = "+593991122334",
                    Email = "luis.mendoza@empresa.com",
                    Address = "El Batán, Quito"
                },
                new Seller
                {
                    Identification = "4567890123",
                    Name = "Gabriela",
                    LastName = "Cordero",
                    Phone = "+593998877554",
                    Email = "gabriela.cordero@empresa.com",
                    Address = "La Aurora, Daule"
                },
                new Seller
                {
                    Identification = "5678901234",
                    Name = "Fernando",
                    LastName = "Ortega",
                    Phone = "+593993322110",
                    Email = "fernando.ortega@empresa.com",
                    Address = "Sauces, Guayaquil"
                },
                new Seller
                {
                    Identification = "6789012345",
                    Name = "Andrea",
                    LastName = "Vásquez",
                    Phone = "+593997766554",
                    Email = "andrea.vasquez@empresa.com",
                    Address = "Carcelén, Quito"
                },
                new Seller
                {
                    Identification = "7890123456",
                    Name = "Diego",
                    LastName = "Castillo",
                    Phone = "+593994433221",
                    Email = "diego.castillo@empresa.com",
                    Address = "Ceibos, Guayaquil"
                },
                new Seller
                {
                    Identification = "8901234567",
                    Name = "Verónica",
                    LastName = "Suárez",
                    Phone = "+593996655443",
                    Email = "veronica.suarez@empresa.com",
                    Address = "Los Chillos, Quito"
                },
                new Seller
                {
                    Identification = "9012345678",
                    Name = "Ricardo",
                    LastName = "Jiménez",
                    Phone = "+593995533221",
                    Email = "ricardo.jimenez@empresa.com",
                    Address = "Milagro, Guayas"
                },
                new Seller
                {
                    Identification = "0123456781",
                    Name = "Paola",
                    LastName = "Salazar",
                    Phone = "+593993322556",
                    Email = "paola.salazar@empresa.com",
                    Address = "La Joya, Daule"
                },
                new Seller
                {
                    Identification = "1123456789",
                    Name = "Esteban",
                    LastName = "Navarro",
                    Phone = "+593999887766",
                    Email = "esteban.navarro@empresa.com",
                    Address = "Kennedy, Guayaquil"
                },
                new Seller
                {
                    Identification = "2123456789",
                    Name = "Diana",
                    LastName = "Peña",
                    Phone = "+593998866554",
                    Email = "diana.pena@empresa.com",
                    Address = "Iñaquito, Quito"
                },
                new Seller
                {
                    Identification = "3123456789",
                    Name = "Santiago",
                    LastName = "Reyes",
                    Phone = "+593997755443",
                    Email = "santiago.reyes@empresa.com",
                    Address = "Miraflores, Guayaquil"
                }

        };
                await context.Sellers.AddRangeAsync(sellers);
                await context.SaveChangesAsync();
            }
        }


        private static async Task SeedCustomersAsync(ApplicationDbContext context)
        {
            if (!await context.Customers.AnyAsync())
            {
                var customers = new List<Customer>
        {
            new Customer
                    {
                        Identification = "0901234567",
                        Name = "Juan",
                        LastName = "Pérez",
                        Phone = "+593987654321",
                        Email = "juan.perez@email.com",
                        Address = "Calle 10 y Av. Principal, Quito"
                    },
                    new Customer
                    {
                        Identification = "0807654321",
                        Name = "María",
                        LastName = "González",
                        Phone = "+593923456789",
                        Email = "maria.gonzalez@email.com",
                        Address = "Av. Central #123, Guayaquil"
                    },
                    new Customer
                    {
                        Identification = "0709876543",
                        Name = "Carlos",
                        LastName = "Ramírez",
                        Phone = "+593921345678",
                        Email = "carlos.ramirez@email.com",
                        Address = "Barrio Norte, Cuenca"
                    },
                    new Customer
                    {
                        Identification = "0602345678",
                        Name = "Ana",
                        LastName = "Torres",
                        Phone = "+593925678901",
                        Email = "ana.torres@email.com",
                        Address = "Calle Bolívar #56, Loja"
                    },
                    new Customer
                    {
                        Identification = "0508765432",
                        Name = "Luis",
                        LastName = "Mendoza",
                        Phone = "+593926543210",
                        Email = "luis.mendoza@email.com",
                        Address = "Sector La Kennedy, Guayaquil"
                    },
                    new Customer
                    {
                        Identification = "0403456789",
                        Name = "Gabriela",
                        LastName = "Cordero",
                        Phone = "+593928901234",
                        Email = "gabriela.cordero@email.com",
                        Address = "Urbanización La Joya, Daule"
                    },
                    new Customer
                    {
                        Identification = "0306543210",
                        Name = "Fernando",
                        LastName = "Ortega",
                        Phone = "+593929876543",
                        Email = "fernando.ortega@email.com",
                        Address = "Avenida 6 de Diciembre, Quito"
                    },
                    new Customer
                    {
                        Identification = "0209871234",
                        Name = "Andrea",
                        LastName = "Vásquez",
                        Phone = "+593930123456",
                        Email = "andrea.vasquez@email.com",
                        Address = "Sector Los Ceibos, Guayaquil"
                    },
                    new Customer
                    {
                        Identification = "0101234569",
                        Name = "Diego",
                        LastName = "Castillo",
                        Phone = "+593931987654",
                        Email = "diego.castillo@email.com",
                        Address = "Calle Rocafuerte, Ambato"
                    },
                    new Customer
                    {
                        Identification = "0112345678",
                        Name = "Verónica",
                        LastName = "Suárez",
                        Phone = "+593932654321",
                        Email = "veronica.suarez@email.com",
                        Address = "Avenida del Estadio, Manta"
                    },
                    new Customer
                    {
                        Identification = "0213456789",
                        Name = "Ricardo",
                        LastName = "Jiménez",
                        Phone = "+593933789012",
                        Email = "ricardo.jimenez@email.com",
                        Address = "Centro Comercial Iñaquito, Quito"
                    },
                    new Customer
                    {
                        Identification = "0312345670",
                        Name = "Paola",
                        LastName = "Salazar",
                        Phone = "+593934567890",
                        Email = "paola.salazar@email.com",
                        Address = "Ciudadela La Garzota, Guayaquil"
                    },
                    new Customer
                    {
                        Identification = "0419876543",
                        Name = "Esteban",
                        LastName = "Navarro",
                        Phone = "+593935432109",
                        Email = "esteban.navarro@email.com",
                        Address = "Av. Amazonas, Quito"
                    },
                    new Customer
                    {
                        Identification = "0512345678",
                        Name = "Diana",
                        LastName = "Peña",
                        Phone = "+593936210987",
                        Email = "diana.pena@email.com",
                        Address = "Urbanización San Marino, Samborondón"
                    },
                    new Customer
                    {
                        Identification = "0610987654",
                        Name = "Santiago",
                        LastName = "Reyes",
                        Phone = "+593937654321",
                        Email = "santiago.reyes@email.com",
                        Address = "Barrio Bellavista, Quito"
                    }

        };
                await context.Customers.AddRangeAsync(customers);
                await context.SaveChangesAsync();
            }
        }


        private static async Task SeedProductsAsync(ApplicationDbContext context)
        {
            if (!await context.Products.AnyAsync())
            {
                var products = new List<Product>
        {
           new Product
                {
                    Code = "P001",
                    Name = "Laptop HP Pavilion",
                    Quantity = 10,
                    UnitPrice = 899.99m
                },
                new Product
                {
                    Code = "P002",
                    Name = "Mouse Inalámbrico Logitech",
                    Quantity = 50,
                    UnitPrice = 29.99m
                },
                new Product
                {
                    Code = "P003",
                    Name = "Monitor LG 24''",
                    Quantity = 15,
                    UnitPrice = 199.99m
                },
                new Product
                {
                    Code = "P004",
                    Name = "Teclado Mecánico Redragon",
                    Quantity = 30,
                    UnitPrice = 69.99m
                },
                new Product
                {
                    Code = "P005",
                    Name = "Silla Ergonómica",
                    Quantity = 20,
                    UnitPrice = 249.99m
                },
                new Product
                {
                    Code = "P006",
                    Name = "Disco Duro Externo 1TB Seagate",
                    Quantity = 25,
                    UnitPrice = 59.99m
                },
                new Product
                {
                    Code = "P007",
                    Name = "Memoria RAM 16GB Corsair",
                    Quantity = 40,
                    UnitPrice = 79.99m
                },
                new Product
                {
                    Code = "P008",
                    Name = "Tarjeta Gráfica RTX 3060",
                    Quantity = 10,
                    UnitPrice = 499.99m
                },
                new Product
                {
                    Code = "P009",
                    Name = "Auriculares Gamer Razer",
                    Quantity = 35,
                    UnitPrice = 89.99m
                },
                new Product
                {
                    Code = "P010",
                    Name = "Impresora Multifuncional Epson",
                    Quantity = 12,
                    UnitPrice = 179.99m
                },
                new Product
                {
                    Code = "P011",
                    Name = "Router WiFi 6 TP-Link",
                    Quantity = 20,
                    UnitPrice = 99.99m
                },
                new Product
                {
                    Code = "P012",
                    Name = "Cámara Web Logitech 1080p",
                    Quantity = 18,
                    UnitPrice = 74.99m
                },
                new Product
                {
                    Code = "P013",
                    Name = "Smartwatch Xiaomi Mi Band 7",
                    Quantity = 50,
                    UnitPrice = 49.99m
                },
                new Product
                {
                    Code = "P014",
                    Name = "Tablet Samsung Galaxy Tab A7",
                    Quantity = 15,
                    UnitPrice = 229.99m
                },
                new Product
                {
                    Code = "P015",
                    Name = "Cargador Rápido USB-C 65W",
                    Quantity = 30,
                    UnitPrice = 39.99m
                }

        };
                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
            }
        }

    }
}
