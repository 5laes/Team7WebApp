using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Team7WebApp.Migrations
{
    /// <inheritdoc />
    public partial class spellingFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Abscences");

            migrationBuilder.DropTable(
                name: "AbscenceTypes");

            migrationBuilder.AlterColumn<string>(
                name: "password",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Absences",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    typeID = table.Column<int>(type: "int", nullable: false),
                    days = table.Column<int>(type: "int", nullable: false),
                    dayRequested = table.Column<DateTime>(type: "datetime2", nullable: false),
                    personID = table.Column<int>(type: "int", nullable: false),
                    pending = table.Column<bool>(type: "bit", nullable: false),
                    approved = table.Column<bool>(type: "bit", nullable: false),
                    leaveStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    leaveEnd = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Absences", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "AbsenceTypes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    typeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    days = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AbsenceTypes", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "AbsenceTypes",
                columns: new[] { "id", "days", "typeName" },
                values: new object[] { 1, 25, "Vacation" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Absences");

            migrationBuilder.DropTable(
                name: "AbsenceTypes");

            migrationBuilder.AlterColumn<string>(
                name: "password",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Abscences",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    approved = table.Column<bool>(type: "bit", nullable: false),
                    days = table.Column<int>(type: "int", nullable: false),
                    daysRequested = table.Column<int>(type: "int", nullable: false),
                    leaveEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    leaveStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    pending = table.Column<bool>(type: "bit", nullable: false),
                    personID = table.Column<int>(type: "int", nullable: false),
                    typeID = table.Column<int>(type: "int", nullable: false)
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
                    days = table.Column<int>(type: "int", nullable: false),
                    typeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AbscenceTypes", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "AbscenceTypes",
                columns: new[] { "id", "days", "typeName" },
                values: new object[] { 1, 25, "Vacation" });
        }
    }
}
