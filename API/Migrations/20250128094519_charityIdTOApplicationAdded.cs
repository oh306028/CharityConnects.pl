using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class charityIdTOApplicationAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CharityProjectId",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_CharityProjectId",
                table: "Applications",
                column: "CharityProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_CharityProjects_CharityProjectId",
                table: "Applications",
                column: "CharityProjectId",
                principalTable: "CharityProjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_CharityProjects_CharityProjectId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_CharityProjectId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "CharityProjectId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Applications");
        }
    }
}
