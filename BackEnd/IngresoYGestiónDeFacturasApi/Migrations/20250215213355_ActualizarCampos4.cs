using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IngresoYGestiónDeFacturasApi.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarCampos4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Iva",
                schema: "DBO",
                table: "Invoice",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Iva",
                schema: "DBO",
                table: "Invoice",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }
    }
}
