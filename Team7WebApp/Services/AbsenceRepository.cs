using Microsoft.EntityFrameworkCore;
using Team7WebApp.Data;
using Team7WebApp.Models;

namespace Team7WebApp.Services
{
    public class AbsenceRepository : IAppRepository<Absence>, IAbsenceRepository<Absence>
    {
        private AppDbContext _context;
        public AbsenceRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Absence> AddAsync(Absence newEntity)
        {
            var result = await _context.Absences.AddAsync(newEntity);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Absence> DeleteAsync(int Id)
        {
            var result = await _context.Absences.FirstOrDefaultAsync(x => x.id == Id);
            if (result != null)
            {
                _context.Absences.Remove(result);
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public async Task<IEnumerable<Absence>> GetAbsencesByPersonID(int id)
        {
            return await _context.Absences.Where(x => x.personID == id).ToListAsync();
        }

        public async Task<IEnumerable<Absence>> GetAllAsync()
        {
            return await _context.Absences.ToListAsync();
        }

        public async Task<Absence> GetAllFromSingleAsync(int Id)
        {
            return await _context.Absences.FirstOrDefaultAsync(x => x.id == Id);
        }

        public async Task<Absence> UpdateAsync(Absence newEntity)
        {
            var result = await _context.Absences.FirstOrDefaultAsync(x => x.id == newEntity.id);
            if (result != null)
            {
                result.pending = newEntity.pending;
                result.approved = newEntity.approved;
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

    }
}
