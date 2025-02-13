
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

        public DbSet<Seller> Sellers => Set<Seller>();
        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<PaymentMethod> PaymentMethods => Set<PaymentMethod>();
        public DbSet<PaymentStatus> PaymentStatuses => Set<PaymentStatus>();
        public DbSet<Invoice> Invoices => Set<Invoice>();
        public DbSet<InvoiceDetail> InvoiceDetails => Set<InvoiceDetail>();
    }
}
