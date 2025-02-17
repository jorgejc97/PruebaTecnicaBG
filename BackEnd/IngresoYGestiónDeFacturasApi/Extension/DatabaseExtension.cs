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
            await SeedInvoicesAsync(context);
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
    Identification = "0175679841",
    Name = "Carlos",
    LastName = "González",
    Phone = "+593982345678",
    Email = "carlos.gonzalez@empresa.com",
    Address = "Av. del Sol, Guayaquil"
},
new Seller
{
    Identification = "0198765432",
    Name = "Ana",
    LastName = "Ramírez",
    Phone = "+593997654321",
    Email = "ana.ramirez@empresa.com",
    Address = "Calle 12, Quito"
},
new Seller
{
    Identification = "0212345678",
    Name = "Luis",
    LastName = "Mendoza",
    Phone = "+593984563211",
    Email = "luis.mendoza@empresa.com",
    Address = "Av. 9 de Octubre, Guayaquil"
},
new Seller
{
    Identification = "0223456789",
    Name = "María",
    LastName = "Paredes",
    Phone = "+593992345678",
    Email = "maria.paredes@empresa.com",
    Address = "Rocafuerte, Loja"
},
new Seller
{
    Identification = "0312345678",
    Name = "Sofía",
    LastName = "García",
    Phone = "+593984562345",
    Email = "sofia.garcia@empresa.com",
    Address = "Las Acacias, Cuenca"
},
new Seller
{
    Identification = "0412345679",
    Name = "Pedro",
    LastName = "Hernández",
    Phone = "+593998765432",
    Email = "pedro.hernandez@empresa.com",
    Address = "Calle Comercio, Manta"
},
new Seller
{
    Identification = "0512345670",
    Name = "Cecilia",
    LastName = "Almeida",
    Phone = "+593992234567",
    Email = "cecilia.almenda@empresa.com",
    Address = "Colón, Quito"
},
new Seller
{
    Identification = "0612345678",
    Name = "David",
    LastName = "Torres",
    Phone = "+593987654321",
    Email = "david.torres@empresa.com",
    Address = "Cumbayá, Quito"
},
new Seller
{
    Identification = "0712345678",
    Name = "Lorena",
    LastName = "Castro",
    Phone = "+593988765432",
    Email = "lorena.castro@empresa.com",
    Address = "Centro Histórico, Quito"
},
new Seller
{
    Identification = "0812345670",
    Name = "Fernando",
    LastName = "Vera",
    Phone = "+593995432167",
    Email = "fernando.vera@empresa.com",
    Address = "Durán, Guayas"
},
new Seller
{
    Identification = "0912345670",
    Name = "Carla",
    LastName = "Vega",
    Phone = "+593982345679",
    Email = "carla.vega@empresa.com",
    Address = "Esmeraldas, Ecuador"
},
new Seller
{
    Identification = "1023456789",
    Name = "Raúl",
    LastName = "Moreno",
    Phone = "+593993245678",
    Email = "raul.moreno@empresa.com",
    Address = "Montañita, Santa Elena"
},
new Seller
{
    Identification = "1123456790",
    Name = "Marta",
    LastName = "Sánchez",
    Phone = "+593990123456",
    Email = "marta.sanchez@empresa.com",
    Address = "Bahía de Caráquez, Manabí"
},
new Seller
{
    Identification = "1212345678",
    Name = "Isabel",
    LastName = "Muñoz",
    Phone = "+593991234567",
    Email = "isabel.munoz@empresa.com",
    Address = "Salinas, Santa Elena"
},
new Seller
{
    Identification = "1312345678",
    Name = "Javier",
    LastName = "López",
    Phone = "+593982378456",
    Email = "javier.lopez@empresa.com",
    Address = "Cuenca, Azuay"
},
new Seller
{
    Identification = "1412345678",
    Name = "Lucía",
    LastName = "Vásquez",
    Phone = "+593998765432",
    Email = "lucia.vasquez@empresa.com",
    Address = "Santo Domingo de los Tsáchilas"
},
new Seller
{
    Identification = "1512345678",
    Name = "Iván",
    LastName = "Martínez",
    Phone = "+593977654321",
    Email = "ivan.martinez@empresa.com",
    Address = "Machala, El Oro"
},
new Seller
{
    Identification = "1612345678",
    Name = "Verónica",
    LastName = "Ortíz",
    Phone = "+593986547432",
    Email = "veronica.ortiz@empresa.com",
    Address = "Riobamba, Chimborazo"
},
new Seller
{
    Identification = "1712345678",
    Name = "Alberto",
    LastName = "Ramírez",
    Phone = "+593995678435",
    Email = "alberto.ramirez@empresa.com",
    Address = "Ibarra, Imbabura"
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
    Identification = "2123456790",
    Name = "Carlos",
    LastName = "González",
    Phone = "+593987654321",
    Email = "carlos.gonzalez@empresa.com",
    Address = "Centro, Guayaquil"
},
new Seller
{
    Identification = "3123456791",
    Name = "Ana",
    LastName = "Mendoza",
    Phone = "+593977654321",
    Email = "ana.mendoza@empresa.com",
    Address = "Samborondón, Guayas"
},
new Seller
{
    Identification = "4123456792",
    Name = "Luis",
    LastName = "Pérez",
    Phone = "+593966654321",
    Email = "luis.perez@empresa.com",
    Address = "Los Ceibos, Guayaquil"
},
new Seller
{
    Identification = "5123456793",
    Name = "María",
    LastName = "Rodríguez",
    Phone = "+593955654321",
    Email = "maria.rodriguez@empresa.com",
    Address = "Duran, Guayas"
},
new Seller
{
    Identification = "6123456794",
    Name = "Javier",
    LastName = "Sánchez",
    Phone = "+593944654321",
    Email = "javier.sanchez@empresa.com",
    Address = "Batan, Guayaquil"
},
new Seller
{
    Identification = "7123456795",
    Name = "Lucía",
    LastName = "Torres",
    Phone = "+593933654321",
    Email = "lucia.torres@empresa.com",
    Address = "Alborada, Guayaquil"
},
new Seller
{
    Identification = "8123456796",
    Name = "Ricardo",
    LastName = "Díaz",
    Phone = "+593922654321",
    Email = "ricardo.diaz@empresa.com",
    Address = "Puerto Marítimo, Guayaquil"
},
new Seller
{
    Identification = "9123456797",
    Name = "Raúl",
    LastName = "García",
    Phone = "+593911654321",
    Email = "raul.garcia@empresa.com",
    Address = "Olón, Santa Elena"
},
new Seller
{
    Identification = "1023456798",
    Name = "Verónica",
    LastName = "Vargas",
    Phone = "+593900654321",
    Email = "veronica.vargas@empresa.com",
    Address = "Chongón, Guayas"
},
new Seller
{
    Identification = "1123456799",
    Name = "Felipe",
    LastName = "Méndez",
    Phone = "+593899654321",
    Email = "felipe.mendez@empresa.com",
    Address = "Esmeraldas, Esmeraldas"
},
new Seller
{
    Identification = "1223456800",
    Name = "Sandra",
    LastName = "Gómez",
    Phone = "+593888654321",
    Email = "sandra.gomez@empresa.com",
    Address = "Milagro, Guayas"
},
new Seller
{
    Identification = "1323456801",
    Name = "Antonio",
    LastName = "Jiménez",
    Phone = "+593877654321",
    Email = "antonio.jimenez@empresa.com",
    Address = "Cañar, Cañar"
},
new Seller
{
    Identification = "1423456802",
    Name = "Gabriela",
    LastName = "Serrano",
    Phone = "+593866654321",
    Email = "gabriela.serrano@empresa.com",
    Address = "Loja, Loja"
},
new Seller
{
    Identification = "1523456803",
    Name = "José",
    LastName = "Fernández",
    Phone = "+593855654321",
    Email = "jose.fernandez@empresa.com",
    Address = "Ambato, Tungurahua"
},
new Seller
{
    Identification = "1623456804",
    Name = "Raquel",
    LastName = "Castillo",
    Phone = "+593844654321",
    Email = "raquel.castillo@empresa.com",
    Address = "Manta, Manabí"
},
new Seller
{
    Identification = "1723456805",
    Name = "Carlos",
    LastName = "Vásquez",
    Phone = "+593833654321",
    Email = "carlos.vasquez@empresa.com",
    Address = "Portoviejo, Manabí"
},
new Seller
{
    Identification = "1823456806",
    Name = "Paola",
    LastName = "Serrano",
    Phone = "+593822654321",
    Email = "paola.serrano@empresa.com",
    Address = "Quito, Pichincha"
},
new Seller
{
    Identification = "1923456807",
    Name = "Esteban",
    LastName = "Gómez",
    Phone = "+593811654321",
    Email = "esteban.gomez@empresa.com",
    Address = "Cuenca, Azuay"
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
    Identification = "0123456781",
    Name = "Paola",
    LastName = "Salazar",
    Phone = "+593993322556",
    Email = "paola.salazar@empresa.com",
    Address = "La Joya, Daule"
},
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
    Identification = "0912345678",
    Name = "Ana",
    LastName = "Martínez",
    Phone = "+593987654322",
    Email = "ana.martinez@email.com",
    Address = "Av. del Parque, Guayaquil"
},
new Customer
{
    Identification = "0923456789",
    Name = "Luis",
    LastName = "Vega",
    Phone = "+593988765433",
    Email = "luis.vega@email.com",
    Address = "Calle San Martín, Cuenca"
},
new Customer
{
    Identification = "0934567890",
    Name = "Marta",
    LastName = "Ramírez",
    Phone = "+593996543210",
    Email = "marta.ramirez@email.com",
    Address = "Centro Histórico, Quito"
},
new Customer
{
    Identification = "0945678901",
    Name = "Pedro",
    LastName = "González",
    Phone = "+593993214567",
    Email = "pedro.gonzalez@email.com",
    Address = "Zona Industrial, Guayaquil"
},
new Customer
{
    Identification = "0956789012",
    Name = "Cecilia",
    LastName = "Sánchez",
    Phone = "+593997654321",
    Email = "cecilia.sanchez@email.com",
    Address = "Avenida Río Amazonas, Quito"
},
new Customer
{
    Identification = "0967890123",
    Name = "Carlos",
    LastName = "Hernández",
    Phone = "+593999876543",
    Email = "carlos.hernandez@email.com",
    Address = "San Blas, Cuenca"
},
new Customer
{
    Identification = "0978901234",
    Name = "Lucía",
    LastName = "Pérez",
    Phone = "+593989876543",
    Email = "lucia.perez@email.com",
    Address = "Los Cerezos, Guayaquil"
},
new Customer
{
    Identification = "0989012345",
    Name = "Iván",
    LastName = "Moreno",
    Phone = "+593982345678",
    Email = "ivan.moreno@email.com",
    Address = "Calle El Sol, Loja"
},
new Customer
{
    Identification = "0990123456",
    Name = "Verónica",
    LastName = "Ríos",
    Phone = "+593990987654",
    Email = "veronica.rios@email.com",
    Address = "Calle Rosa, Manta"
},
new Customer
{
    Identification = "1001234567",
    Name = "Fernando",
    LastName = "Vera",
    Phone = "+593988543210",
    Email = "fernando.vera@email.com",
    Address = "Av. la Paz, Quito"
},
new Customer
{
    Identification = "1012345678",
    Name = "David",
    LastName = "López",
    Phone = "+593993765432",
    Email = "david.lopez@email.com",
    Address = "Puerto López, Manabí"
},
new Customer
{
    Identification = "1023456789",
    Name = "Raúl",
    LastName = "García",
    Phone = "+593999876543",
    Email = "raul.garcia@email.com",
    Address = "Malecón, Guayaquil"
},
new Customer
{
    Identification = "1034567890",
    Name = "Sofía",
    LastName = "Salazar",
    Phone = "+593995432109",
    Email = "sofia.salazar@email.com",
    Address = "Avenida Libertador, Quito"
},
new Customer
{
    Identification = "1045678901",
    Name = "Javier",
    LastName = "Torres",
    Phone = "+593987654322",
    Email = "javier.torres@email.com",
    Address = "Calle Bolívar, Cuenca"
},
new Customer
{
    Identification = "1056789012",
    Name = "María",
    LastName = "González",
    Phone = "+593994567432",
    Email = "maria.gonzalez@email.com",
    Address = "Paseo 24 de Mayo, Loja"
},
new Customer
{
    Identification = "1067890123",
    Name = "Carlos",
    LastName = "Ramos",
    Phone = "+593997654321",
    Email = "carlos.ramos@email.com",
    Address = "Calle Quito, Guayaquil"
},
new Customer
{
    Identification = "1078901234",
    Name = "Marta",
    LastName = "Vega",
    Phone = "+593993478543",
    Email = "marta.vega@email.com",
    Address = "El Carmen, Manabí"
},
new Customer
{
    Identification = "1089012345",
    Name = "Pedro",
    LastName = "Suárez",
    Phone = "+593996542678",
    Email = "pedro.suarez@email.com",
    Address = "Parque Central, Cuenca"
},

new Customer
{
    Identification = "1123456789",
    Name = "Esteban",
    LastName = "Navarro",
    Phone = "+593999887766",
    Email = "esteban.navarro@empresa.com",
    Address = "Kennedy, Guayaquil"
},
new Customer
{
    Identification = "2123456790",
    Name = "Carlos",
    LastName = "González",
    Phone = "+593987654321",
    Email = "carlos.gonzalez@empresa.com",
    Address = "Centro, Guayaquil"
},
new Customer
{
    Identification = "3123456791",
    Name = "Ana",
    LastName = "Mendoza",
    Phone = "+593977654321",
    Email = "ana.mendoza@empresa.com",
    Address = "Samborondón, Guayas"
},
new Customer
{
    Identification = "4123456792",
    Name = "Luis",
    LastName = "Pérez",
    Phone = "+593966654321",
    Email = "luis.perez@empresa.com",
    Address = "Los Ceibos, Guayaquil"
},
new Customer
{
    Identification = "5123456793",
    Name = "María",
    LastName = "Rodríguez",
    Phone = "+593955654321",
    Email = "maria.rodriguez@empresa.com",
    Address = "Duran, Guayas"
},
new Customer
{
    Identification = "6123456794",
    Name = "Javier",
    LastName = "Sánchez",
    Phone = "+593944654321",
    Email = "javier.sanchez@empresa.com",
    Address = "Batan, Guayaquil"
},
new Customer
{
    Identification = "7123456795",
    Name = "Lucía",
    LastName = "Torres",
    Phone = "+593933654321",
    Email = "lucia.torres@empresa.com",
    Address = "Alborada, Guayaquil"
},
new Customer
{
    Identification = "8123456796",
    Name = "Ricardo",
    LastName = "Díaz",
    Phone = "+593922654321",
    Email = "ricardo.diaz@empresa.com",
    Address = "Puerto Marítimo, Guayaquil"
},
new Customer
{
    Identification = "9123456797",
    Name = "Raúl",
    LastName = "García",
    Phone = "+593911654321",
    Email = "raul.garcia@empresa.com",
    Address = "Olón, Santa Elena"
},
new Customer
{
    Identification = "1023456798",
    Name = "Verónica",
    LastName = "Vargas",
    Phone = "+593900654321",
    Email = "veronica.vargas@empresa.com",
    Address = "Chongón, Guayas"
},
new Customer
{
    Identification = "1123456799",
    Name = "Felipe",
    LastName = "Méndez",
    Phone = "+593899654321",
    Email = "felipe.mendez@empresa.com",
    Address = "Esmeraldas, Esmeraldas"
},
new Customer
{
    Identification = "1223456800",
    Name = "Sandra",
    LastName = "Gómez",
    Phone = "+593888654321",
    Email = "sandra.gomez@empresa.com",
    Address = "Milagro, Guayas"
},
new Customer
{
    Identification = "1323456801",
    Name = "Antonio",
    LastName = "Jiménez",
    Phone = "+593877654321",
    Email = "antonio.jimenez@empresa.com",
    Address = "Cañar, Cañar"
},
new Customer
{
    Identification = "1423456802",
    Name = "Gabriela",
    LastName = "Serrano",
    Phone = "+593866654321",
    Email = "gabriela.serrano@empresa.com",
    Address = "Loja, Loja"
},
new Customer
{
    Identification = "1523456803",
    Name = "José",
    LastName = "Fernández",
    Phone = "+593855654321",
    Email = "jose.fernandez@empresa.com",
    Address = "Ambato, Tungurahua"
},
new Customer
{
    Identification = "1623456804",
    Name = "Raquel",
    LastName = "Castillo",
    Phone = "+593844654321",
    Email = "raquel.castillo@empresa.com",
    Address = "Manta, Manabí"
},
new Customer
{
    Identification = "1723456805",
    Name = "Carlos",
    LastName = "Vásquez",
    Phone = "+593833654321",
    Email = "carlos.vasquez@empresa.com",
    Address = "Portoviejo, Manabí"
},
new Customer
{
    Identification = "1823456806",
    Name = "Paola",
    LastName = "Serrano",
    Phone = "+593822654321",
    Email = "paola.serrano@empresa.com",
    Address = "Quito, Pichincha"
},
new Customer
{
    Identification = "1923456807",
    Name = "Esteban",
    LastName = "Gómez",
    Phone = "+593811654321",
    Email = "esteban.gomez@empresa.com",
    Address = "Cuenca, Azuay"
},
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
    Identification = "0901234568",
    Name = "María",
    LastName = "López",
    Phone = "+593976543210",
    Email = "maria.lopez@email.com",
    Address = "Av. Simón Bolívar, Guayaquil"
},
new Customer
{
    Identification = "0901234569",
    Name = "Carlos",
    LastName = "Ramírez",
    Phone = "+593965432109",
    Email = "carlos.ramirez@email.com",
    Address = "Las Peñas, Guayaquil"
},
new Customer
{
    Identification = "0901234570",
    Name = "Lucía",
    LastName = "Sánchez",
    Phone = "+593954321098",
    Email = "lucia.sanchez@email.com",
    Address = "Centro Histórico, Quito"
},
new Customer
{
    Identification = "0901234571",
    Name = "Pedro",
    LastName = "Martínez",
    Phone = "+593943210987",
    Email = "pedro.martinez@email.com",
    Address = "La Alborada, Guayaquil"
},
new Customer
{
    Identification = "0901234572",
    Name = "Ana",
    LastName = "Torres",
    Phone = "+593932109876",
    Email = "ana.torres@email.com",
    Address = "Samborondón, Guayas"
},
new Customer
{
    Identification = "0901234573",
    Name = "Raúl",
    LastName = "González",
    Phone = "+593921098765",
    Email = "raul.gonzalez@email.com",
    Address = "Puerto Marítimo, Guayaquil"
},
new Customer
{
    Identification = "0901234574",
    Name = "Paola",
    LastName = "Vega",
    Phone = "+593910987654",
    Email = "paola.vega@email.com",
    Address = "Duran, Guayas"
},
new Customer
{
    Identification = "0901234575",
    Name = "Ricardo",
    LastName = "Cáceres",
    Phone = "+593909876543",
    Email = "ricardo.caceres@email.com",
    Address = "Batan, Guayaquil"
},
new Customer
{
    Identification = "0901234576",
    Name = "Verónica",
    LastName = "Gómez",
    Phone = "+593898765432",
    Email = "veronica.gomez@email.com",
    Address = "Milagro, Guayas"
},
new Customer
{
    Identification = "0901234577",
    Name = "Antonio",
    LastName = "Fuentes",
    Phone = "+593887654321",
    Email = "antonio.fuentes@email.com",
    Address = "Loja, Loja"
},
new Customer
{
    Identification = "0901234578",
    Name = "Gabriela",
    LastName = "Morales",
    Phone = "+593876543210",
    Email = "gabriela.morales@email.com",
    Address = "Ambato, Tungurahua"
},
new Customer
{
    Identification = "0901234579",
    Name = "Felipe",
    LastName = "Jiménez",
    Phone = "+593865432109",
    Email = "felipe.jimenez@email.com",
    Address = "Cuenca, Azuay"
},
new Customer
{
    Identification = "0901234580",
    Name = "Sandra",
    LastName = "Lara",
    Phone = "+593854321098",
    Email = "sandra.lara@email.com",
    Address = "Manta, Manabí"
},
new Customer
{
    Identification = "0901234581",
    Name = "José",
    LastName = "Castillo",
    Phone = "+593843210987",
    Email = "jose.castillo@email.com",
    Address = "Portoviejo, Manabí"
},
new Customer
{
    Identification = "0901234582",
    Name = "Raquel",
    LastName = "Rivera",
    Phone = "+593832109876",
    Email = "raquel.rivera@email.com",
    Address = "Quito, Pichincha"
},
new Customer
{
    Identification = "0901234583",
    Name = "Carlos",
    LastName = "Díaz",
    Phone = "+593821098765",
    Email = "carlos.diaz@email.com",
    Address = "Esmeraldas, Esmeraldas"
},
new Customer
{
    Identification = "0901234584",
    Name = "Lucía",
    LastName = "Cordero",
    Phone = "+593810987654",
    Email = "lucia.cordero@email.com",
    Address = "La Tacunga, Cotopaxi"
},
new Customer
{
    Identification = "0901234585",
    Name = "Esteban",
    LastName = "Vásquez",
    Phone = "+593809876543",
    Email = "esteban.vasquez@email.com",
    Address = "Quito, Pichincha"
},

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
    Code = "R2901",
    Name = "Refrigerador Samsung 450L",
    Quantity = 90,
    UnitPrice = 799.99m
},
new Product
{
    Code = "B3645",
    Name = "Batería Solar SunPower",
    Quantity = 200,
    UnitPrice = 149.99m
},
new Product
{
    Code = "T8129",
    Name = "Teclado Mecánico Corsair K95",
    Quantity = 150,
    UnitPrice = 189.99m
},
new Product
{
    Code = "L4103",
    Name = "Lente Canon EF 50mm f/1.8 STM",
    Quantity = 120,
    UnitPrice = 125.99m
},
new Product
{
    Code = "M6245",
    Name = "Monitor LG 24 pulgadas Full HD",
    Quantity = 180,
    UnitPrice = 169.99m
},
new Product
{
    Code = "C2103",
    Name = "Cámara GoPro Hero 10",
    Quantity = 75,
    UnitPrice = 399.99m
},
new Product
{
    Code = "S5892",
    Name = "Smartphone Xiaomi Redmi 10",
    Quantity = 250,
    UnitPrice = 249.99m
},
new Product
{
    Code = "V7845",
    Name = "Ventilador Orbegozo 3 velocidades",
    Quantity = 500,
    UnitPrice = 29.99m
},
new Product
{
    Code = "A7032",
    Name = "Auriculares Sony WH-1000XM4",
    Quantity = 100,
    UnitPrice = 349.99m
},
new Product
{
    Code = "J5463",
    Name = "Juguete LEGO Star Wars",
    Quantity = 400,
    UnitPrice = 49.99m
},
new Product
{
    Code = "P5873",
    Name = "Proyector Epson EF-100",
    Quantity = 85,
    UnitPrice = 699.99m
},
new Product
{
    Code = "G2395",
    Name = "GPS Garmin Forerunner 945",
    Quantity = 110,
    UnitPrice = 599.99m
},
new Product
{
    Code = "H4382",
    Name = "Hoverboard Bluetooth 8\"",
    Quantity = 150,
    UnitPrice = 199.99m
},
new Product
{
    Code = "E3236",
    Name = "Electrodoméstico Philips licuadora",
    Quantity = 220,
    UnitPrice = 59.99m
},
new Product
{
    Code = "F2207",
    Name = "Funda de teléfono iPhone 13",
    Quantity = 500,
    UnitPrice = 12.99m
},
new Product
{
    Code = "T5562",
    Name = "Televisor Samsung 55 pulgadas UHD",
    Quantity = 90,
    UnitPrice = 649.99m
},
new Product
{
    Code = "D5643",
    Name = "Drone DJI Mavic Mini",
    Quantity = 65,
    UnitPrice = 399.99m
},
new Product
{
    Code = "S4903",
    Name = "Silla Gaming Corsair",
    Quantity = 85,
    UnitPrice = 279.99m
},
new Product
{
    Code = "P9825",
    Name = "Purificador de aire Dyson",
    Quantity = 180,
    UnitPrice = 499.99m
},
new Product
{
    Code = "L8952",
    Name = "Lámpara LED de escritorio",
    Quantity = 600,
    UnitPrice = 19.99m
},
new Product
{
    Code = "M7609",
    Name = "Mochila Eastpak",
    Quantity = 300,
    UnitPrice = 39.99m
},
new Product
{
    Code = "F3284",
    Name = "Fitness Tracker Fitbit",
    Quantity = 220,
    UnitPrice = 129.99m
},
new Product
{
    Code = "C2746",
    Name = "Cámara de Seguridad Ring",
    Quantity = 200,
    UnitPrice = 199.99m
},
new Product
{
    Code = "P1675",
    Name = "Pizza Hut Combo",
    Quantity = 400,
    UnitPrice = 10.99m
},
new Product
{
    Code = "B2125",
    Name = "Bolsas ecológicas recicladas",
    Quantity = 500,
    UnitPrice = 0.99m
},
new Product
{
    Code = "V1256",
    Name = "Vino Malbec 750ml",
    Quantity = 200,
    UnitPrice = 9.99m
},
new Product
{
    Code = "K3187",
    Name = "Kettle Tefal 1.5L",
    Quantity = 300,
    UnitPrice = 29.99m
},
new Product
{
    Code = "S2904",
    Name = "Sartén antiadherente T-fal",
    Quantity = 250,
    UnitPrice = 35.99m
},
new Product
{
    Code = "T2237",
    Name = "Tableta Samsung Galaxy Tab A7",
    Quantity = 100,
    UnitPrice = 229.99m
},
new Product
{
    Code = "R1497",
    Name = "Radio Sony portátil",
    Quantity = 450,
    UnitPrice = 39.99m
},
new Product
{
    Code = "C3745",
    Name = "Cámara Nikon D5600",
    Quantity = 60,
    UnitPrice = 699.99m
},
new Product
{
    Code = "P2356",
    Name = "Pluma estilográfica Montblanc",
    Quantity = 100,
    UnitPrice = 179.99m
},
new Product
{
    Code = "S5874",
    Name = "Sofá de 3 puestos",
    Quantity = 40,
    UnitPrice = 499.99m
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
    Code = "PRD-1001",
    Name = "Smartphone Samsung Galaxy S23",
    Quantity = 120,
    UnitPrice = 999.99m
},
new Product
{
    Code = "A1023",
    Name = "Teclado Mecánico Razer",
    Quantity = 75,
    UnitPrice = 149.99m
},
new Product
{
    Code = "X4-560",
    Name = "Monitor LG 27\" 4K",
    Quantity = 30,
    UnitPrice = 399.99m
},
new Product
{
    Code = "ST-8866",
    Name = "Auriculares Sony WH-1000XM4",
    Quantity = 60,
    UnitPrice = 349.99m
},
new Product
{
    Code = "G1281",
    Name = "Cámara Digital Canon EOS 90D",
    Quantity = 45,
    UnitPrice = 1299.99m
},
new Product
{
    Code = "B3433",
    Name = "Bocina Bluetooth JBL Flip 5",
    Quantity = 150,
    UnitPrice = 119.99m
},
new Product
{
    Code = "F8762",
    Name = "Impresora HP LaserJet Pro",
    Quantity = 200,
    UnitPrice = 189.99m
},
new Product
{
    Code = "A3472",
    Name = "Placa Base MSI B450",
    Quantity = 80,
    UnitPrice = 109.99m
},
new Product
{
    Code = "T2121",
    Name = "Mouse Gaming SteelSeries Rival 600",
    Quantity = 90,
    UnitPrice = 69.99m
},
new Product
{
    Code = "K5093",
    Name = "SSD Kingston A2000 500GB",
    Quantity = 160,
    UnitPrice = 49.99m
},
new Product
{
    Code = "E9123",
    Name = "Lámpara de Escritorio LED",
    Quantity = 250,
    UnitPrice = 39.99m
},
new Product
{
    Code = "Z5674",
    Name = "Router Wi-Fi TP-Link Archer AX50",
    Quantity = 110,
    UnitPrice = 129.99m
},
new Product
{
    Code = "V7432",
    Name = "Portátil Lenovo ThinkPad X1",
    Quantity = 50,
    UnitPrice = 1799.99m
},
new Product
{
    Code = "M6501",
    Name = "Microondas Samsung 30L",
    Quantity = 200,
    UnitPrice = 159.99m
},
new Product
{
    Code = "R3587",
    Name = "Smartwatch Garmin Fenix 6",
    Quantity = 120,
    UnitPrice = 349.99m
},
new Product
{
    Code = "C9034",
    Name = "Ratón Inalámbrico Logitech MX Master 3",
    Quantity = 80,
    UnitPrice = 99.99m
},
new Product
{
    Code = "D2678",
    Name = "Lentes de Sol Ray-Ban Aviator",
    Quantity = 150,
    UnitPrice = 199.99m
},
new Product
{
    Code = "P4875",
    Name = "Altavoces Sonos One",
    Quantity = 100,
    UnitPrice = 229.99m
},
new Product
{
    Code = "L1024",
    Name = "Teclado Logitech G Pro X",
    Quantity = 70,
    UnitPrice = 129.99m
},
new Product
{
    Code = "H2365",
    Name = "Cargador Anker PowerPort 6",
    Quantity = 180,
    UnitPrice = 39.99m
},
new Product
{
    Code = "V1152",
    Name = "Parlantes Logitech Z313",
    Quantity = 150,
    UnitPrice = 69.99m
},
new Product
{
    Code = "P6359",
    Name = "Silla Ergonómica FlexiSpot",
    Quantity = 40,
    UnitPrice = 159.99m
},
new Product
{
    Code = "K3802",
    Name = "Batería Externa Anker PowerCore 20100",
    Quantity = 200,
    UnitPrice = 45.99m
},
new Product
{
    Code = "F8273",
    Name = "Lámpara de Escritorio Xiaomi Mi",
    Quantity = 300,
    UnitPrice = 29.99m
},
new Product
{
    Code = "C5631",
    Name = "Cámara Web Logitech C920",
    Quantity = 120,
    UnitPrice = 79.99m
},
new Product
{
    Code = "D2468",
    Name = "Audífonos Bluetooth Jabra Elite 75t",
    Quantity = 180,
    UnitPrice = 129.99m
},
new Product
{
    Code = "W2984",
    Name = "Tablet Samsung Galaxy Tab S6",
    Quantity = 50,
    UnitPrice = 649.99m
},
new Product
{
    Code = "Z1098",
    Name = "Mochila para Laptop SwissGear 1900",
    Quantity = 110,
    UnitPrice = 89.99m
},
new Product
{
    Code = "Q2147",
    Name = "Cámara de Seguridad Arlo Pro 4",
    Quantity = 90,
    UnitPrice = 249.99m
},
new Product
{
    Code = "T4513",
    Name = "Aspiradora Robot Roomba 675",
    Quantity = 65,
    UnitPrice = 249.99m
},
new Product
{
    Code = "B5679",
    Name = "Silla de Oficina AmazonBasics",
    Quantity = 200,
    UnitPrice = 99.99m
},
new Product
{
    Code = "G4310",
    Name = "Luces LED Philips Hue Starter Kit",
    Quantity = 120,
    UnitPrice = 199.99m
},
new Product
{
    Code = "M8723",
    Name = "Cámara Instantánea Fujifilm Instax Mini 11",
    Quantity = 150,
    UnitPrice = 69.99m
},
new Product
{
    Code = "J9401",
    Name = "Tetera Eléctrica Hamilton Beach",
    Quantity = 250,
    UnitPrice = 24.99m
},
new Product
{
    Code = "H6247",
    Name = "Juego de Ollas Tefal Ingenio",
    Quantity = 80,
    UnitPrice = 129.99m
},
new Product
{
    Code = "R9825",
    Name = "Reloj Smartwatch Amazfit GTR 2",
    Quantity = 70,
    UnitPrice = 139.99m
},
new Product
{
    Code = "S5278",
    Name = "Set de 4 Lentes de Sol Oakley",
    Quantity = 100,
    UnitPrice = 149.99m
},
new Product
{
    Code = "A3490",
    Name = "Consola PlayStation 5",
    Quantity = 45,
    UnitPrice = 499.99m
},
new Product
{
    Code = "N6725",
    Name = "Microondas Panasonic 25L",
    Quantity = 150,
    UnitPrice = 99.99m
},
new Product
{
    Code = "L8342",
    Name = "Impresora Epson EcoTank ET-2720",
    Quantity = 130,
    UnitPrice = 179.99m
}
,
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

        private static async Task SeedInvoicesAsync(ApplicationDbContext context)
        {
            if (!await context.Invoices.AnyAsync())
            {
                var company = await context.Users.Select(u => new { u.Id, u.Iva }).FirstOrDefaultAsync();
                var customerIds = await context.Customers.Select(c => c.Id).ToListAsync();
                var sellerIds = await context.Sellers.Select(s => s.Id).ToListAsync();
                var availableProducts = await context.Products.Select(p => new { p.Id, p.UnitPrice }).ToListAsync();

                if (company == null || customerIds.Count == 0 || sellerIds.Count == 0 || availableProducts.Count == 0)
                {
                    throw new InvalidOperationException("No hay datos en la tabla de Customers o Sellers");
                }

                var paymentMethods = new List<string> { "Efectivo", "Tarjeta de Crédito", "Transferencia Bancaria", "Cheque" };
                var paymentStatuses = new List<string> { "Pagado ", "Pendiente ", "Anulado" };
                var random = new Random();

                var companyId = Guid.Parse(company.Id);

                for (int i = 0; i < 30; i++)
                {
                    var customerId = customerIds[random.Next(customerIds.Count)];
                    var sellerId = sellerIds[random.Next(sellerIds.Count)];
                    string paymentMethod = paymentMethods[random.Next(paymentMethods.Count)];
                    string paymentStatus = paymentStatuses[random.Next(paymentStatuses.Count)];
                    int numberOfDetails = random.Next(1, 6);
                    var invoiceDetails = new List<InvoiceDetailDTO>();
                    decimal subTotal = 0;

                    for (int j = 0; j < numberOfDetails; j++)
                    {
                        var selectedProduct = availableProducts[random.Next(availableProducts.Count())];
                        var quantity = random.Next(1, 50);
                        var total = Math.Round(selectedProduct.UnitPrice * quantity, 2);

                        invoiceDetails.Add(new InvoiceDetailDTO
                        {
                            ProductId = selectedProduct.Id,
                            Quantity = quantity,
                            UnitPrice = selectedProduct.UnitPrice,
                            Total = total
                        });

                        subTotal = Math.Round(subTotal + total, 2);
                    }

                    decimal iva = Math.Round((subTotal * company.Iva) / 100, 2);
                    decimal totalInvoice = Math.Round(subTotal + iva, 2);

                    long invoiceNumber = random.Next(1000, 10000);

                    var invoice = new Invoice
                    {

                        Number = invoiceNumber,
                        CompanyId = companyId,
                        CustomerId = customerId,
                        SellerId = sellerId,
                        PaymentMethod = paymentMethod,
                        PaymentStatus = paymentStatus,
                        SubTotal = subTotal,
                        Iva = iva,
                        Total = totalInvoice,
                        CreatedAt = GetRandomDate(),
                        InvoiceDetails = new List<InvoiceDetail>()
                    };

                    await context.Invoices.AddAsync(invoice);
                    await context.SaveChangesAsync();

                    var invoiceId = invoice.Id;

                    foreach (var invoiceDetail in invoiceDetails)
                    {
                        invoiceDetail.InvoiceId = invoiceId;
                    }

                    var invoiceDetailEntities = invoiceDetails.Select(id => new InvoiceDetail
                    {
                        InvoiceId = invoice.Id,
                        ProductId = id.ProductId,
                        Quantity = id.Quantity,
                        UnitPrice = id.UnitPrice,
                        Total = id.Total
                    }).ToList();

                    await context.InvoiceDetails.AddRangeAsync(invoiceDetailEntities);
                    await context.SaveChangesAsync();

                }
            }
        }

        private static DateTime GetRandomDate()
        {
            var startDate = new DateTime(2025, 1, 1);
            var endDate = DateTime.UtcNow.Date;

            var random = new Random();
            var range = (endDate - startDate).Days;
            var randomDays = random.Next(range);

            return startDate.AddDays(randomDays);
        }
    }
}
