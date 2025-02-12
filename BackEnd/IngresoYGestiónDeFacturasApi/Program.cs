
var builder = WebApplication.CreateBuilder(args);

// area de servicios
builder.Services.AddCarter();
builder.Services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
builder.Services.AddDbContext<ApplicationDbContext>((sp, options) =>
{
    options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
}
);
builder.Services.AddExceptionHandler<CustomExceptionHandler>();
builder.Services.AddTransient<HashService>();
builder.Services.AddScoped<CreateTokenService>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllers().AddNewtonsoftJson();


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opciones =>
{
    opciones.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JWTKey"]!)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();
builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build());


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Ingreso y Gestion de Facturas API", Version = "v1" });

    // Configuración de seguridad para JWT
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description =
            "Ingrese 'Bearer' [espacio] y luego su token en el campo de texto. \n\nEjemplo: \"Bearer abcdef12345\""
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            []
        }
    });
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policyBuilder =>
    {
        policyBuilder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});



var app = builder.Build();


// area de middlewares

// Configure the HTTPs request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ingreso y Gestion de Facturas API V1");
    });
    await app.InitializeDatabaseAsync();
}

app.MapCarter();
app.UseCors("CorsPolicy");
app.UseExceptionHandler(options => { });
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
