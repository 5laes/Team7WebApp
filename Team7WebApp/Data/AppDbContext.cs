using Microsoft.EntityFrameworkCore;
using Team7WebApp.Models;

namespace Team7WebApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Absence> Absences { get; set; }
        public DbSet<AbsenceType> AbsenceTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Person>().HasData(
                new Person()
                {
                    id = 1,
                    name = "Claes",
                    password = "123123",
                    isAdmin = true,
                    email = "claes@mail.com",
                    age = 25
                });
            modelBuilder.Entity<Person>().HasData(
                new Person()
                {
                    id = 2,
                    name = "Daniel",
                    password = "321321",
                    isAdmin = true,
                    email = "daniel@mail.com",
                    age = 25
                });
            modelBuilder.Entity<Person>().HasData(
                new Person()
                {
                    id = 3,
                    name = "Elin",
                    password = "456456",
                    isAdmin = true,
                    email = "elin@mail.com",
                    age = 25
                });
            modelBuilder.Entity<Person>().HasData(
                new Person()
                {
                    id = 4,
                    name = "Zanefina",
                    password = "789789",
                    isAdmin = true,
                    email = "zanefina@mail.com",
                    age = 25
                });
            modelBuilder.Entity<AbsenceType>().HasData(
                new AbsenceType()
                {
                    id = 1,
                    typeName = "Vacation",
                    days = 25
                });
        }
    }
}
