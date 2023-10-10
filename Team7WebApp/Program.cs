
using Microsoft.EntityFrameworkCore;
using Team7WebApp.Data;
using Team7WebApp.Models;
using Team7WebApp.Services;

namespace Team7WebApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            ////adding cors policy! 
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("CORSPolicy",
            //        builder =>
            //        {
            //            builder
            //            .AllowAnyMethod()
            //            .AllowAnyHeader()
            //            .WithOrigins("http://localhost:3000");//route of local react application
            //        });
            //});

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add the database for context
            builder.Services.AddDbContext<AppDbContext>(
                options => options.UseSqlServer(builder.Configuration.GetConnectionString("Connection")));

            builder.Services.AddScoped<IAppRepository<Person>, PersonRepository>();
            builder.Services.AddScoped<IAppRepository<Absence>, AbsenceRepository>();
            builder.Services.AddScoped<IAppRepository<AbsenceType>, AbsenceTypeRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            //ENDPOINTS FOR PERSON START
            //----------------------------------------------------------------------------------------------------------------------

            app.MapGet("/api/Person", async (IAppRepository<Person> repository) =>
            {
                ApiResponse response = new ApiResponse();
                response.Result = await repository.GetAllAsync();
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Produces<ApiResponse>(200);

            app.MapGet("/api/Person/{id:int}", async (int id, IAppRepository<Person> repository) =>
            {
                ApiResponse response = new ApiResponse();
                response.Result = await repository.GetAllFromSingleAsync(id);


                if (response.Result == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    response.ErrorMessages.Add($"No person found with this id :{id}");
                    return Results.NotFound(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Produces<ApiResponse>(200).Produces(404);


            //Kan fixa error handling vid tid=> validation för namn osv
            //
            app.MapPost("/api/Person", async (Person person, IAppRepository<Person> respository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

                response.Result = await respository.AddAsync(person);
                if (response.Result == null)
                {
                    response.ErrorMessages.Add("Not valid addition");
                    return Results.BadRequest(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.Created;
                return Results.Ok(response);
            }).Accepts<Person>("Application/json").Produces<ApiResponse>(201).Produces(400);

            app.MapPut("/api/Person", async (Person person, IAppRepository<Person> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

                response.Result = await repository.UpdateAsync(person);
                if (response.Result == null)
                {
                    response.ErrorMessages.Add("No person with thid Id exists!");
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    return Results.NotFound(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Accepts<Person>("Application/json").Produces<ApiResponse>(200).Produces(400);

            app.MapDelete("/api/Person/{id:int}", async (int id, IAppRepository<Person> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.NotFound };

                response.Result = await repository.DeleteAsync(id);
                if (response.Result == null)
                {
                    response.ErrorMessages.Add("No person with thid Id exists!");
                    return Results.NotFound(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.NoContent;
                return Results.Ok(response);
            }).Produces<ApiResponse>(204).Produces(404);
            // ENDPOINT FOR PERSON END
            //----------------------------------------------------------------------------------------------------------------------
            //ENDPOINT FOR ABSENCE START







            app.Run();
        }
    }
}