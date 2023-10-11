using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Team7WebApp.Data;
using Team7WebApp.Models;
using Team7WebApp.Models.DTOs;
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

			// This is for Mapper and Validator to work
			builder.Services.AddValidatorsFromAssemblyContaining<AbsenceCreateDTO>();
			builder.Services.AddAutoMapper(typeof(Program).Assembly);

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



            //Kan fixa error handling vid tid=> validation f�r namn osv
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
            app.MapGet("/api/Absence", async (IAppRepository<Absence> repository) =>
            {
                ApiResponse response = new ApiResponse();
                response.Result = await repository.GetAllAsync();
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Produces<ApiResponse>(200);



            app.MapGet("/api/Absence/{id:int}", async (int id, IAppRepository<Absence> repository) =>
            {
                ApiResponse response = new ApiResponse();
                response.Result = await repository.GetAllFromSingleAsync(id);


                if (response.Result == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    response.ErrorMessages.Add($"No Absence-raport found with this id :{id}");
                    return Results.NotFound(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Produces<ApiResponse>(200).Produces(404);


            // ADD ABSENCE
            app.MapPost("/api/Absence",
            async (
            [FromServices] IValidator<AbsenceCreateDTO> validator,
            [FromServices] IMapper _mapper,
            [FromBody] AbsenceCreateDTO C_Absense_DTO,
            IAppRepository<Absence> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

                var validateInput = await validator.ValidateAsync(C_Absense_DTO);
                if (!validateInput.IsValid)
                {
                    foreach (var err in validateInput.Errors.ToList())
                    {
                        response.ErrorMessages.Add(err.ToString());
                    }
                    return Results.BadRequest(response);
                }

                Absence absence = _mapper.Map<Absence>(C_Absense_DTO);
                absence.dayRequested = DateTime.Now;
                absence.days = (int)(absence.leaveEnd - absence.leaveStart).TotalDays; // counts weekend days as well (NOT GOOD)
                absence.pending = true;
                absence.approved = false;

                response.Result = await repository.AddAsync(absence);

                if (response.Result == null)
                {
                    response.ErrorMessages.Add("Error: Failed to add absence to DB");
                    return Results.BadRequest(response);
                }

                response.Result = _mapper.Map<AbsenceCreateDTO>(absence);
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.Created;
                return Results.Ok(response);

            }).Accepts<AbsenceCreateDTO>("application/json").Produces<ApiResponse>(201).Produces(400);


            // UPDATE ABSENCE
            app.MapPut("/api/Absence", 
            async (
			[FromServices] IValidator<AbsenceUpdateDTO> validator,
			[FromServices] IMapper _mapper,
			[FromBody] AbsenceUpdateDTO U_Absense_DTO,
			IAppRepository<Absence> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

				var validateInput = await validator.ValidateAsync(U_Absense_DTO);
				if (!validateInput.IsValid)
				{
					foreach (var err in validateInput.Errors.ToList())
					{
						response.ErrorMessages.Add(err.ToString());
					}
					return Results.BadRequest(response);
				}

                Absence absence = _mapper.Map<Absence>(U_Absense_DTO);

                response.Result = await repository.UpdateAsync(absence);

                if (response.Result == null)
                {
                    response.ErrorMessages.Add($"ERROR: Failed updating absence! No absence with id {U_Absense_DTO.id} found!");
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    return Results.NotFound(response);
                }

                response.Result = _mapper.Map<AbsenceUpdateDTO>(absence);
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;

                return Results.Ok(response);
			}).Accepts<AbsenceUpdateDTO>("Application/json").Produces<ApiResponse>(200).Produces(400);



            app.MapDelete("/api/Absence/{id:int}", async (int id, IAppRepository<Absence> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.NotFound };

                response.Result = await repository.DeleteAsync(id);
                if (response.Result == null)
                {
                    response.ErrorMessages.Add("No Absence-raport with thid Id exists!");
                    return Results.NotFound(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.NoContent;
                return Results.Ok(response);
            }).Produces<ApiResponse>(204).Produces(404);
            // ENDPOINT FOR Absence END
            //----------------------------------------------------------------------------------------------------------------------
            //ENDPOINT FOR ABSENCETYPES START
            //-------------------------------------------------------------------------------------------
            app.MapGet("/api/AbsenceType", async (IAppRepository<AbsenceType> repository) =>
            {
                ApiResponse response = new ApiResponse();
                response.Result = await repository.GetAllAsync();
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Produces<ApiResponse>(200);



            app.MapGet("/api/AbsenceType/{id:int}", async (int id, IAppRepository<AbsenceType> repository) =>
            {
                ApiResponse response = new ApiResponse();
                response.Result = await repository.GetAllFromSingleAsync(id);

                if (response.Result == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    response.ErrorMessages.Add($"No AbsenceType found with this id :{id}");
                    return Results.NotFound(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Produces<ApiResponse>(200).Produces(404);



            app.MapPost("/api/AbsenceType", async (AbsenceType absence, IAppRepository<AbsenceType> respository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

                response.Result = await respository.AddAsync(absence);
                if (response.Result == null)
                {
                    response.ErrorMessages.Add("Not valid addition");
                    return Results.BadRequest(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.Created;
                return Results.Ok(response);
            }).Accepts<AbsenceType>("Application/json").Produces<ApiResponse>(201).Produces(400);



            app.MapPut("/api/AbsenceType", async (AbsenceType absence, IAppRepository<AbsenceType> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

                response.Result = await repository.UpdateAsync(absence);
                if (response.Result == null)
                {
                    response.ErrorMessages.Add("No AbsenceType with thid Id exists!");
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    return Results.NotFound(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Accepts<AbsenceType>("Application/json").Produces<ApiResponse>(200).Produces(400);



            app.MapDelete("/api/AbsenceType/{id:int}", async (int id, IAppRepository<AbsenceType> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.NotFound };

                response.Result = await repository.DeleteAsync(id);
                if (response.Result == null)
                {
                    response.ErrorMessages.Add("No AbsenceType with thid Id exists!");
                    return Results.NotFound(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.NoContent;
                return Results.Ok(response);
            }).Produces<AbsenceType>(204).Produces(404);







            //Validation f�r post , put 
            //DTO f�r absence och absencetypes
            //days caculation osv
            app.Run();
        }
    }
}