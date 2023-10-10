namespace Team7WebApp.Services
{
    public interface IAppRepository <T>
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetAllFromSingleAsync(int Id);
        Task<T> UpdateAsync(T newEntity);
        Task<T> DeleteAsync(int Id);
        Task<T> AddAsync(T newEntity);

    }
}
