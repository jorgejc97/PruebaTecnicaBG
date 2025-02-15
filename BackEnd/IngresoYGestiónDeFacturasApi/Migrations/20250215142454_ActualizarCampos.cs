using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IngresoYGestiónDeFacturasApi.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarCampos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                schema: "DBO",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Code",
                schema: "DBO",
                table: "Invoice");

            migrationBuilder.AddColumn<long>(
                name: "Number",
                schema: "DBO",
                table: "Invoice",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                schema: "DBO",
                table: "Invoice");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "DBO",
                table: "Product",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                schema: "DBO",
                table: "Invoice",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
