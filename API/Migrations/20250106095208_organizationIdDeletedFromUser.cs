using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class organizationIdDeletedFromUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Organizations_Admin_OrganizationId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Admin_OrganizationId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Admin_OrganizationId",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "Organizations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Organizations_AdminId",
                table: "Organizations",
                column: "AdminId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Organizations_Users_AdminId",
                table: "Organizations",
                column: "AdminId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Organizations_Users_AdminId",
                table: "Organizations");

            migrationBuilder.DropIndex(
                name: "IX_Organizations_AdminId",
                table: "Organizations");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Organizations");

            migrationBuilder.AddColumn<int>(
                name: "Admin_OrganizationId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Admin_OrganizationId",
                table: "Users",
                column: "Admin_OrganizationId",
                unique: true,
                filter: "[Admin_OrganizationId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Organizations_Admin_OrganizationId",
                table: "Users",
                column: "Admin_OrganizationId",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
