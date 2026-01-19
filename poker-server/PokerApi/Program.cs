using PokerApi.Endpoints;
using PokerApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddPokerCors();
builder.Services.AddPokerServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Use CORS
app.UseCors("AllowReactApp");

// Map endpoints
app.MapHealthEndpoints();
app.MapTableEndpoints();

app.Run();
