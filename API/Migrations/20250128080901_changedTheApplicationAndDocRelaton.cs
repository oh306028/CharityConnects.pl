using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class changedTheApplicationAndDocRelaton : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Applications_ApplicationId",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_ApplicationId",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "ApplicationId",
                table: "Documents");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Documents",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<int>(
                name: "DocumentId",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_DocumentId",
                table: "Applications",
                column: "DocumentId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Documents_DocumentId",
                table: "Applications",
                column: "DocumentId",
                principalTable: "Documents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Documents_DocumentId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_DocumentId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "DocumentId",
                table: "Applications");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Documents",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "ApplicationId",
                table: "Documents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Documents_ApplicationId",
                table: "Documents",
                column: "ApplicationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Applications_ApplicationId",
                table: "Documents",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
