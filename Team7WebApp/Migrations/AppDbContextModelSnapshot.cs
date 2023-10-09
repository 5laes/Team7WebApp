﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Team7WebApp.Data;

#nullable disable

namespace Team7WebApp.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Team7WebAPI.Models.Abscence", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<bool>("approved")
                        .HasColumnType("bit");

                    b.Property<int>("days")
                        .HasColumnType("int");

                    b.Property<int>("daysRequested")
                        .HasColumnType("int");

                    b.Property<DateTime>("leaveEnd")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("leaveStart")
                        .HasColumnType("datetime2");

                    b.Property<bool>("pending")
                        .HasColumnType("bit");

                    b.Property<int>("personID")
                        .HasColumnType("int");

                    b.Property<int>("typeID")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("Abscences");
                });

            modelBuilder.Entity("Team7WebAPI.Models.AbscenceType", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("days")
                        .HasColumnType("int");

                    b.Property<string>("typeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("AbscenceTypes");

                    b.HasData(
                        new
                        {
                            id = 1,
                            days = 25,
                            typeName = "Vacation"
                        });
                });

            modelBuilder.Entity("Team7WebAPI.Models.Person", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("age")
                        .HasColumnType("int");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Persons");

                    b.HasData(
                        new
                        {
                            id = 1,
                            age = 25,
                            email = "claes@mail.com",
                            isAdmin = true,
                            name = "Claes",
                            password = "123123"
                        },
                        new
                        {
                            id = 2,
                            age = 25,
                            email = "daniel@mail.com",
                            isAdmin = true,
                            name = "Daniel",
                            password = "321321"
                        },
                        new
                        {
                            id = 3,
                            age = 25,
                            email = "elin@mail.com",
                            isAdmin = true,
                            name = "Elin",
                            password = "456456"
                        },
                        new
                        {
                            id = 4,
                            age = 25,
                            email = "zanefina@mail.com",
                            isAdmin = true,
                            name = "Zanefina",
                            password = "789789"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
