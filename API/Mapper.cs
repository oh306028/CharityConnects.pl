using API.Dtos;
using API.Models;
using AutoMapper;

namespace API
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<ProjectRequirement, ProjectRequirementDto>()
                .ForMember(a => a.Name, otp => otp.MapFrom(src => src.Requirement));

            CreateMap<Beneficiary, BeneficiaryDto>();

            CreateMap<Donor, DonorDto>();

            CreateMap<CharityProject, CharityProjectDto>()
                .ForMember(a => a.Donors, otp => otp.MapFrom(src => src.Donors.Select(d => d.Donor)))
                .ForMember(a => a.Beneficiaries, otp => otp.MapFrom(src => src.Beneficiaries.Select(d => d.Beneficiary)));

            CreateMap<CreateProjectDto, CharityProject>();

            CreateMap<User, UserDto>();

        }
    }
}
