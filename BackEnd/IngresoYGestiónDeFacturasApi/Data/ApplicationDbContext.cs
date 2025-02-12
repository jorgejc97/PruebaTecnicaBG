
namespace IngresoYGestiónDeFacturasApi.Data
{
    public class ApplicationDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToTable("Users", "SEG");
            modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UsersToken", "SEG");
            modelBuilder.Entity<IdentityRole>().ToTable("Role", "SEG");
            modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaim", "SEG");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRole", "SEG");
            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaim", "SEG");
            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogin", "SEG");
        }


    }
}
