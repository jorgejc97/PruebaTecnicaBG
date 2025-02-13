
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
            await SeedPaymentMethodsAsync(context);
            await SeedPaymentStatusesAsync(context);
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
                    UserName = "admin@correo.com",
                    Email = "admin@correo.com",
                    EmailConfirmed = true,
                    FirstName = "Jorge",
                    LastName = "Crespo",
                    NameCompany = "Custom Chocolate",
                    PhoneNumber = "+59392345678",
                    PhoneNumberConfirmed = true,
                    Iva = 15,
                    City = "GUayaquil",
                    RegionProvince = "Guayas",
                    Address = "Avenida 123",
                    Zipcode = 080204
                    // Otros campos según tu modelo de usuario
                };
                await userManager.CreateAsync(user, "Abc123*+");
            }

        }


        private static async Task SeedPaymentMethodsAsync(ApplicationDbContext context)
        {
            if (!await context.PaymentMethods.AnyAsync())
            {
                var methods = new List<PaymentMethod>
        {
            new PaymentMethod { Description = "Efectivo" },
            new PaymentMethod { Description = "Tarjeta de Crédito" },
            new PaymentMethod { Description = "Transferencia Bancaria" },
            new PaymentMethod { Description = "Cheque" }
        };
                await context.PaymentMethods.AddRangeAsync(methods);
                await context.SaveChangesAsync();
            }
        }


        private static async Task SeedPaymentStatusesAsync(ApplicationDbContext context)
        {
            if (!await context.PaymentStatuses.AnyAsync())
            {
                var statuses = new List<PaymentStatus>
        {
            new PaymentStatus { Description = "Pagado" },
            new PaymentStatus { Description = "Pendiente" },
            new PaymentStatus { Description = "Anulado" }
        };
                await context.PaymentStatuses.AddRangeAsync(statuses);
                await context.SaveChangesAsync();
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
                Description = "Laptop HP con procesador Intel i7 y 16GB RAM",
                Quantity = 10,
                UnitPrice = 899.99m
            },
            new Product
            {
                Code = "P002",
                Name = "Mouse Inalámbrico Logitech",
                Description = "Mouse inalámbrico con sensor óptico y batería recargable",
                Quantity = 50,
                UnitPrice = 29.99m
            },
            new Product
            {
                Code = "P003",
                Name = "Monitor LG 24''",
                Description = "Monitor LG Full HD con tecnología IPS",
                Quantity = 15,
                UnitPrice = 199.99m
            },
            new Product
            {
                Code = "P004",
                Name = "Teclado Mecánico Redragon",
                Description = "Teclado mecánico para gaming con retroiluminación RGB",
                Quantity = 30,
                UnitPrice = 69.99m
            },
            new Product
            {
                Code = "P005",
                Name = "Silla Ergonómica",
                Description = "Silla ergonómica con soporte lumbar y ajustable",
                Quantity = 20,
                UnitPrice = 249.99m
            }
        };
                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
            }
        }

    }
}
