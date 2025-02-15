using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IngresoYGestiónDeFacturasApi.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarCampos2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_PaymentStatus_PaymentStatusId",
                schema: "DBO",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "PaymantStatusId",
                schema: "DBO",
                table: "Invoice");

            migrationBuilder.AlterColumn<Guid>(
                name: "PaymentStatusId",
                schema: "DBO",
                table: "Invoice",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_PaymentStatus_PaymentStatusId",
                schema: "DBO",
                table: "Invoice",
                column: "PaymentStatusId",
                principalSchema: "DBO",
                principalTable: "PaymentStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_PaymentStatus_PaymentStatusId",
                schema: "DBO",
                table: "Invoice");

            migrationBuilder.AlterColumn<Guid>(
                name: "PaymentStatusId",
                schema: "DBO",
                table: "Invoice",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "PaymantStatusId",
                schema: "DBO",
                table: "Invoice",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_PaymentStatus_PaymentStatusId",
                schema: "DBO",
                table: "Invoice",
                column: "PaymentStatusId",
                principalSchema: "DBO",
                principalTable: "PaymentStatus",
                principalColumn: "Id");
        }
    }
}
