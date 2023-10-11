using AutoMapper;
using Team7WebApp.Models;
using Team7WebApp.Models.DTOs;

namespace Team7WebApp
{
	public class MappingConfig : Profile
	{
		public MappingConfig()
		{
			CreateMap<Absence, AbsenceCreateDTO>().ReverseMap();
		}
	}
}
