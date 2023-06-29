// using System;
// using System.Threading.Tasks;
// using API.Data;
// using API.Entities;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Microsoft.Extensions.Logging;

// public class Program
// {
//     public static void Main(string[] args)
//     {
//         var host = CreateHostBuilder(args).Build();
//         using var scope = host.Services.CreateScope();
//         var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
//         var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
//         try
//         {
//             context.Database.MigrateAsync();
//             DbInitializer.Initialize(context);
//         }
//         catch (Exception ex)
//         {
//             logger.LogError(ex, "Problem migrating data");
//         }

//         host.RunAsync();
//     }

//     public static IHostBuilder CreateHostBuilder(string[] args) =>
//         Host.CreateDefaultBuilder(args)
//         .ConfigureWebHostDefaults(WebBuilder =>
//         {
//             WebBuilder.UseStartup<Startup>();
//         });

// }

using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
});

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMidelware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

app.Run();