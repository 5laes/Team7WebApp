using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Team7WebApp.Migrations
{
    /// <inheritdoc />
    public partial class initialmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Abscences",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    typeID = table.Column<int>(type: "int", nullable: false),
                    days = table.Column<int>(type: "int", nullable: false),
                    daysRequested = table.Column<int>(type: "int", nullable: false),
                    personID = table.Column<int>(type: "int", nullable: false),
                    pending = table.Column<bool>(type: "bit", nullable: false),
                    approved = table.Column<bool>(type: "bit", nullable: false),
                    leaveStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    leaveEnd = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Abscences", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "AbscenceTypes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    typeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    days = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AbscenceTypes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isAdmin = table.Column<bool>(type: "bit", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    age = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "AbscenceTypes",
                columns: new[] { "id", "days", "typeName" },
                values: new object[] { 1, 25, "Vacation" });

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "id", "age", "email", "isAdmin", "name", "password" },
                values: new object[,]
                {
                    { 1, 25, "claes@mail.com", true, "Claes", "123123" },
                    { 2, 25, "daniel@mail.com", true, "Daniel", "321321" },
                    { 3, 25, "elin@mail.com", true, "Elin", "456456" },
                    { 4, 25, "zanefina@mail.com", true, "Zanefina", "789789" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Abscences");

            migrationBuilder.DropTable(
                name: "AbscenceTypes");

            migrationBuilder.DropTable(
                name: "Persons");
        }
    }
}
