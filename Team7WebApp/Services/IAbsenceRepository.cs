namespace Team7WebApp.Services
{
    public interface IAbsenceRepository<T>
    {
        Task<IEnumerable<T>> GetAbsencesByPersonID(int id);
    }
}
