using Microsoft.EntityFrameworkCore;
using Team7WebApp.Data;
using Team7WebApp.Models;

namespace Team7WebApp.Services
{
    public class AbsenceTypeRepository : IAppRepository<AbsenceType>
    {
        private AppDbContext _context;
        public AbsenceTypeRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<AbsenceType> AddAsync(AbsenceType neawEntity)
        {
            var result = await _context.AbsenceTypes.AddAsync(neawEntity);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<AbsenceType> DeleteAsync(int Id)
        {
            var result = await _context.AbsenceTypes.FirstOrDefaultAsync(x => x.id == Id);
            if (result != null)
            {
                _context.AbsenceTypes.Remove(result);
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public async Task<IEnumerable<AbsenceType>> GetAllAsync()
        {
            var result = await _context.AbsenceTypes.ToListAsync();
            return result;
        }

        public async Task<AbsenceType> GetAllFromSingleAsync(int Id)
        {
            return await _context.AbsenceTypes.FirstOrDefaultAsync(x => x.id == Id);
        }

        public async Task<AbsenceType> UpdateAsync(AbsenceType newEntity)
        {
            var result = await _context.AbsenceTypes.FirstOrDefaultAsync(x => x.id == newEntity.id);
            if (result != null)
            {
                result.typeName = newEntity.typeName;
                result.days = newEntity.days;
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }
    }
}
