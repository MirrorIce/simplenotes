using System.Net;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SimpleNotes.Data;
using SimpleNotes.Interfaces;
using SimpleNotes.Repositories;
using SimpleNotes.Models;
using SimpleNotes.Helpers;
using SimpleNotes.Authorization;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<INoteRepository,NoteRepository>();
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>{
                    options.Events.OnRedirectToAccessDenied = options.Events.OnRedirectToLogin = c =>
                    {
                        c.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        return Task.FromResult<object>(null);
                    };
                    options.AccessDeniedPath = "/";
                    options.LoginPath = "/";
                    options.ExpireTimeSpan = new TimeSpan(6,0,0);
                    options.Cookie.SameSite = SameSiteMode.None;
                    options.Cookie.HttpOnly = true;
                    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                });
builder.Services.AddAuthorization(options => {
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
                                .RequireAuthenticatedUser()
                                .Build();

});
builder.Services.AddSingleton<IAuthorizationHandler, NoteAuthorizationCRUDHandler>();
builder.Services.Configure<PasswordHasherOptions>(options =>{
    options.IterationCount = 310000;
});
builder.Services.AddScoped<IPasswordHasher<LoginModel>,PasswordHasher<LoginModel>>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
