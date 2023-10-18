namespace Team7WebApp.Services
{
    public interface IPersonRepository<T>
    {
        Task<T> GetPersonByEmailAsync(string email);
    }
}
