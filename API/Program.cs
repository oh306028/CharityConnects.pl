using API.Dtos;
using API.Middlewares;
using API.Services;
using API.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

namespace API
{
    //TO DO:
    // 

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
          

            builder.Services.AddDbContext<CharityDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<ICharityProjectService, CharityProjectService>();
            builder.Services.AddScoped<IUserContextService, UserContextService>();

            builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

            builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();
            builder.Services.AddScoped<IValidator<CreateProjectDto>, CreateProjectDtoValidator>();
            builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();

            builder.Services.AddScoped<ExceptionHandlingMiddleware>();
            builder.Services.AddHttpContextAccessor();

            var jwtOptionSection = builder.Configuration.GetRequiredSection("Jwt");
            builder.Services.Configure<JwtOptions>(jwtOptionSection);


            var jwtOptions = new JwtOptions();
            jwtOptionSection.Bind(jwtOptions);
            builder.Services.AddSingleton(jwtOptions);


            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(jwtOptions =>
            {
                var configKey = jwtOptionSection["Key"];
                var key = Encoding.UTF8.GetBytes(configKey);



                jwtOptions.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = jwtOptionSection["Issuer"],
                    ValidAudience = jwtOptionSection["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                };
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("FrontEndClient", policy =>
                        policy.AllowAnyHeader()
                        .AllowAnyMethod()
                         .AllowAnyHeader()
                        .WithExposedHeaders("Location")
                         .WithOrigins("http://localhost:5174", "https://localhost:7292", "http://localhost:5213", "http://localhost:5173")

                );
            });


            var app = builder.Build();

            app.UseCors("FrontEndClient");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseMiddleware<ExceptionHandlingMiddleware>();

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
