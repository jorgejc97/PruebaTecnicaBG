using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IngresoYGestiónDeFacturasApi.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarCampos3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IVA",
                schema: "DBO",
                table: "Invoice",
                newName: "Iva");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Iva",
                schema: "DBO",
                table: "Invoice",
                newName: "IVA");
        }
    }
}
