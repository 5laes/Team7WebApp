using AutoMapper;
using BCrypt.Net;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Security.Claims;
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
            //adding cors policy! 
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CORSPolicy",
                    builder =>
                    {
                        builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins("http://localhost:3000")
                        .WithOrigins("https://localhost:7139");//route of local react application
                    });
            });

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add the database for context
            builder.Services.AddDbContext<AppDbContext>(
                options => options.UseSqlServer(builder.Configuration.GetConnectionString("Connection")));

            builder.Services.AddScoped<IAppRepository<Person>, PersonRepository>();
            builder.Services.AddScoped<IAbsenceRepository<Absence>, AbsenceRepository>();
            builder.Services.AddScoped<IPersonRepository<Person>, PersonRepository>();
            builder.Services.AddScoped<IAppRepository<Absence>, AbsenceRepository>();
            builder.Services.AddScoped<IAppRepository<AbsenceType>, AbsenceTypeRepository>();

            // This is for Mapper and Validator to work
            builder.Services.AddValidatorsFromAssemblyContaining<AbsenceCreateDTO>();
            builder.Services.AddValidatorsFromAssemblyContaining<PersonCreateDTO>();
            builder.Services.AddAutoMapper(typeof(Program).Assembly);

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("CORSPolicy");

            app.UseAuthorization();


            //----------------------------------------------------------------------------------------------------------------------
            //ENDPOINTS FOR PERSON START

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



            app.MapPost("/api/Person/Login",
            async (
            [FromBody] PersonLoginDTO L_person_DTO,
            IPersonRepository<Person> repository) =>
            {
                ApiResponse response = new ApiResponse();
                response.Result = await repository.GetPersonByEmailAsync(L_person_DTO.email);

                if (response.Result == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = System.Net.HttpStatusCode.BadRequest;
					response.ErrorMessages.Add($"{L_person_DTO.email} is not registered");
					return Results.BadRequest(response);
				}

                Person person = (Person)response.Result;
                person.password = BCrypt.Net.BCrypt.HashPassword(person.password);

                if (!BCrypt.Net.BCrypt.Verify(L_person_DTO.password, person.password))
                {
                    return Results.BadRequest("Wrong password");
                }

                return Results.Ok(person);
            });



            app.MapGet("/api/Person/Email", async (string email, IPersonRepository<Person> repository) =>
            {
                ApiResponse response = new ApiResponse();
                response.Result = await repository.GetPersonByEmailAsync(email);

                if (response.Result == null)
                {
                    response.IsSuccess = false;
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    response.ErrorMessages.Add($"{email} is not registered");
                    return Results.NotFound(response);
                }

                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Produces<ApiResponse>(200).Produces(404);



            app.MapPost("/api/Person",
            async (
            [FromServices] IValidator<PersonCreateDTO> validator,
            [FromServices] IMapper _mapper,
            [FromBody] PersonCreateDTO C_person_DTO,
            IAppRepository<Person> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

                var validateInput = await validator.ValidateAsync(C_person_DTO);
                if (!validateInput.IsValid)
                {
                    foreach (var err in validateInput.Errors.ToList())
                    {
                        response.ErrorMessages.Add(err.ToString());
                    }
                    return Results.BadRequest(response);
                }

                Person person = _mapper.Map<Person>(C_person_DTO);
                person.isAdmin = false;

                response.Result = await repository.AddAsync(person);

                if (response.Result == null)
                {
                    response.ErrorMessages.Add($"ERROR: '{person.email}' is already registered");
                    response.StatusCode = System.Net.HttpStatusCode.Conflict;
                    return Results.Conflict(response);
                }

                response.Result = _mapper.Map<PersonCreateDTO>(person);
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;

                return Results.Ok(response);
            }).Accepts<PersonCreateDTO>("application/json").Produces<ApiResponse>(201).Produces(400).Produces(409);



            app.MapPut("/api/Person",
            async (
            [FromServices] IValidator<PersonUpdateDTO> validator,
            [FromServices] IMapper _mapper,
            [FromBody] PersonUpdateDTO U_person_DTO,
            IAppRepository<Person> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

                var validateInput = await validator.ValidateAsync(U_person_DTO);
                if (!validateInput.IsValid)
                {
                    foreach (var err in validateInput.Errors.ToList())
                    {
                        response.ErrorMessages.Add(err.ToString());
                    }
                    return Results.BadRequest(response);
                }

                Person person = _mapper.Map<Person>(U_person_DTO);

                response.Result = await repository.UpdateAsync(person);

                if (response.Result == null)
                {
                    response.ErrorMessages.Add("ERROR: Failed adding person to DB");
                    return Results.BadRequest(response);
                }

                response.Result = _mapper.Map<PersonCreateDTO>(person);
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;

                return Results.Ok(response);
            }).Accepts<PersonUpdateDTO>("application/json").Produces<ApiResponse>(200).Produces(400);



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

            app.MapGet("/api/Absence/PersonID/{id:int}", async (int id, IAbsenceRepository<Absence> repository) =>
            {
                ApiResponse response = new ApiResponse();
                response.Result = await repository.GetAbsencesByPersonID(id);
                var amount = await repository.GetAbsencesByPersonID(id);
                if (response.Result == null || !amount.Any()) //checks is IEnumerable is empty
                {
                    response.IsSuccess = false;
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    response.ErrorMessages.Add($"No person found with this PersonID :{id}");
                    return Results.NotFound(response);
                }
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.OK;
                return Results.Ok(response);
            }).Produces<ApiResponse>(200).Produces(404);

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


            app.MapPost("/api/AbsenceType",
            async (
            [FromServices] IValidator<AbsenceTypeCreateDTO> validator,
            [FromServices] IMapper _mapper,
            [FromBody] AbsenceTypeCreateDTO C_AbsenceType_DTO,
            IAppRepository<AbsenceType> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

                var validateInput = await validator.ValidateAsync(C_AbsenceType_DTO);
                if (!validateInput.IsValid)
                {
                    foreach (var err in validateInput.Errors.ToList())
                    {
                        response.ErrorMessages.Add(err.ToString());
                    }
                    return Results.BadRequest(response);
                }

                AbsenceType absenceType = _mapper.Map<AbsenceType>(C_AbsenceType_DTO);

                response.Result = await repository.AddAsync(absenceType);

                if (response.Result == null)
                {
                    response.ErrorMessages.Add("Error: Failed to add absence to DB");
                    return Results.BadRequest(response);
                }

                response.Result = _mapper.Map<AbsenceTypeCreateDTO>(absenceType);
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.Created;
                return Results.Ok(response);

            }).Accepts<AbsenceTypeCreateDTO>("application/json").Produces<ApiResponse>(201).Produces(400);



            app.MapPut("/api/AbsenceType",
            async (
            [FromServices] IValidator<AbsenceTypeUpdateDTO> validator,
            [FromServices] IMapper _mapper,
            [FromBody] AbsenceTypeUpdateDTO U_AbsenceType_DTO,
            IAppRepository<AbsenceType> repository) =>
            {
                ApiResponse response = new ApiResponse() { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest };

                var validateInput = await validator.ValidateAsync(U_AbsenceType_DTO);
                if (!validateInput.IsValid)
                {
                    foreach (var err in validateInput.Errors.ToList())
                    {
                        response.ErrorMessages.Add(err.ToString());
                    }
                    return Results.BadRequest(response);
                }

                AbsenceType absenceType = _mapper.Map<AbsenceType>(U_AbsenceType_DTO);

                response.Result = await repository.UpdateAsync(absenceType);

                if (response.Result == null)
                {
                    response.ErrorMessages.Add("Error: Failed to add absence to DB");
                    return Results.BadRequest(response);
                }

                response.Result = _mapper.Map<AbsenceTypeUpdateDTO>(absenceType);
                response.IsSuccess = true;
                response.StatusCode = System.Net.HttpStatusCode.Created;
                return Results.Ok(response);

            }).Accepts<AbsenceTypeUpdateDTO>("application/json").Produces<ApiResponse>(201).Produces(400);



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



            app.Run();
        }
    }
}