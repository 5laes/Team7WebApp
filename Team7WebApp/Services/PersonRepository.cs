using Microsoft.EntityFrameworkCore;
using Team7WebApp.Data;
using Team7WebApp.Models;

namespace Team7WebApp.Services
{
    public class PersonRepository : IAppRepository<Person>
    {
        private readonly AppDbContext _context;

        public PersonRepository( AppDbContext context)
        {
            this._context = context;
        }

        public async Task<Person> AddAsync(Person newPerson)
        {
            var result = await _context.Persons.AddAsync(newPerson);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Person> DeleteAsync(int Id)
        {
            var result = await _context.Persons.FirstOrDefaultAsync(p => p.id == Id);
            if (result != null)
            {
                _context.Persons.Remove(result);
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public async Task<IEnumerable<Person>> GetAllAsync()
        {
            return (IEnumerable<Person>)await _context.Persons.ToListAsync();
        }

        public async Task<Person> GetAllFromSingleAsync(int Id)
        {
            return await _context.Persons.FirstOrDefaultAsync(p => p.id == Id);
        }

        public async Task<Person> UpdateAsync(Person updatedPerson)
        {
            var result= await _context.Persons.FirstOrDefaultAsync(p =>p.id == updatedPerson.id);
            if(result != null)
            {
                result.name=updatedPerson.name;
                result.password = updatedPerson.password;
                result.isAdmin= updatedPerson.isAdmin;
                result.email=updatedPerson.email;
                result.age=updatedPerson.age;

                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }
    }
}
