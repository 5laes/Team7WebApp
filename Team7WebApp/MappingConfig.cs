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
			CreateMap<Absence, AbsenceUpdateDTO>().ReverseMap();
			CreateMap<AbsenceType, AbsenceTypeCreateDTO>().ReverseMap();
			CreateMap<AbsenceType, AbsenceTypeUpdateDTO>().ReverseMap();
			CreateMap<Person, PersonCreateDTO>().ReverseMap();
			CreateMap<Person, PersonUpdateDTO>().ReverseMap();
			CreateMap<Person, PersonLoginDTO>().ReverseMap();
		}
	}
}
