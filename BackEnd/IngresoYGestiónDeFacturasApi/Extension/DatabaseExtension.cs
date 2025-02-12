
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
                    LastName = "Crespo"
                    // Otros campos según tu modelo de usuario
                };
                await userManager.CreateAsync(user, "Abc123*+");
            }

        }

    }
}
