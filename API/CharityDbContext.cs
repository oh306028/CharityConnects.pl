using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class CharityDbContext  : DbContext
    {
        public CharityDbContext(DbContextOptions options) : base(options)
        {           
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<ApplicationBeneficiary> ApplicationBeneficiaries { get; set; }
        public DbSet<Beneficiary> Beneficiaries { get; set; }
        public DbSet<CharityProject> CharityProjects { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Donor> Donors { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<ProjectBeneficiary> ProjectBeneficiaries { get; set; }
        public DbSet<ProjectDonor> ProjectDonors { get; set; }
        public DbSet<ProjectRequirement> ProjectRequirements { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasDiscriminator(r => r.Role)
                .HasValue<Admin>(Role.Admin)
                .HasValue<Employee>(Role.Employee)
                .HasValue<Beneficiary>(Role.Beneficiary)
                .HasValue<Donor>(Role.Donor);


            modelBuilder.Entity<ApplicationBeneficiary>()
                .HasKey(ab => new { ab.ApplicationId, ab.BeneficiaryId });

            modelBuilder.Entity<ApplicationBeneficiary>()
                 .HasOne(ab => ab.Application)
                 .WithMany(a => a.ApplicationBeneficiary)
                 .HasForeignKey(ab => ab.ApplicationId)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ApplicationBeneficiary>()
                .HasOne(ab => ab.Beneficiary)
                .WithMany(b => b.ApplicationBeneficiary)
                .HasForeignKey(ab => ab.BeneficiaryId)
                .OnDelete(DeleteBehavior.Restrict);



            modelBuilder.Entity<ProjectBeneficiary>()
                .HasKey(pb => new { pb.CharityProjectId, pb.BeneficiaryId });

            modelBuilder.Entity<ProjectBeneficiary>()
                .HasOne(pb => pb.CharityProject)
                .WithMany(cp => cp.Beneficiaries)
                .HasForeignKey(pb => pb.CharityProjectId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ProjectBeneficiary>()
                .HasOne(pb => pb.Beneficiary)
                .WithMany(b => b.Projects)
                .HasForeignKey(pb => pb.BeneficiaryId)
                .OnDelete(DeleteBehavior.Restrict);



            modelBuilder.Entity<ProjectDonor>()
                .HasKey(pd => new { pd.CharityProjectId, pd.DonorId });

            modelBuilder.Entity<ProjectDonor>()
                 .HasOne(pd => pd.CharityProject)
                 .WithMany(cp => cp.Donors)
                 .HasForeignKey(pd => pd.CharityProjectId)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ProjectDonor>()
                .HasOne(pd => pd.Donor)
                .WithMany(d => d.Projects)
                .HasForeignKey(pd => pd.DonorId)
                .OnDelete(DeleteBehavior.Restrict);




            modelBuilder.Entity<Organization>()
                .HasOne(o => o.Admin)
                .WithOne(a => a.Organization)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Organization>()
                .HasMany(e => e.Employees)
                .WithOne(o => o.Organization)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Organization)
                .WithMany(o => o.Employees)
                .HasForeignKey(e => e.OrganizationId);


            modelBuilder.Entity<CharityProject>()
                .HasMany(r => r.Requirements)
                .WithOne(p => p.CharityProject);

            modelBuilder.Entity<CharityProject>()
                .HasOne(e => e.Employee)
                .WithMany(p => p.CreatedProjects);


            modelBuilder.Entity<Application>()
                .HasMany(d => d.Documents)
                .WithOne(a => a.Application);

            modelBuilder.Entity<Application>()
                .HasOne(e => e.Employee)
                .WithMany(a => a.Applications);
        }

    }
}
