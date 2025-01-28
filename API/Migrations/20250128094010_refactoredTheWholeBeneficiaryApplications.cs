using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class refactoredTheWholeBeneficiaryApplications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationBeneficiaries");

            migrationBuilder.AddColumn<int>(
                name: "BeneficiaryId",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_BeneficiaryId",
                table: "Applications",
                column: "BeneficiaryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Users_BeneficiaryId",
                table: "Applications",
                column: "BeneficiaryId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Users_BeneficiaryId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_BeneficiaryId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "BeneficiaryId",
                table: "Applications");

            migrationBuilder.CreateTable(
                name: "ApplicationBeneficiaries",
                columns: table => new
                {
                    ApplicationId = table.Column<int>(type: "int", nullable: false),
                    BeneficiaryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationBeneficiaries", x => new { x.ApplicationId, x.BeneficiaryId });
                    table.ForeignKey(
                        name: "FK_ApplicationBeneficiaries_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApplicationBeneficiaries_Users_BeneficiaryId",
                        column: x => x.BeneficiaryId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationBeneficiaries_BeneficiaryId",
                table: "ApplicationBeneficiaries",
                column: "BeneficiaryId");
        }
    }
}
