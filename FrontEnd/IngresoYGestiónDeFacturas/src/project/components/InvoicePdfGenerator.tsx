import { Invoice } from "../interface";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  useAuthStore,
  useCustomerStore,
  useProductStore,
  useSellerStore,
} from "../../shared";

export const InvoicePdfGenerator = () => {
  const {
    jwtInfo: { userInfo },
  } = useAuthStore();
  const { customers } = useCustomerStore();
  const { products } = useProductStore();
  const { sellers } = useSellerStore();

  const generatePDF = (invoiceParams: Invoice) => {
    const doc = new jsPDF();

    const img = "/logo.png";
    doc.addImage(img, "PNG", 15, 10, 35, 35);

    doc.setFont("helvetica", "bold").setFontSize(14);
    doc.text("INVOICE SYSTEM", 83, 15);

    doc.setFontSize(10);
    doc.text(
      `${userInfo.address}, ${userInfo.city}, ${userInfo.regionProvince}`,
      80,
      19
    );
    doc.setFontSize(10);
    doc.text(`Teléfono: ${userInfo.phoneNumber}`, 83.5, 23);
    doc.setFontSize(10);
    doc.text(`Email: ${userInfo.email}`, 83.5, 27);

    doc.setFontSize(15);
    doc.text(`Factura N° ${invoiceParams.number}`, 156, 15);

    autoTable(doc, {
      startY: 50,
      head: [["FACTURAR A"]],
      body: [
        [
          `Identificación: ${
            customers.find(
              (customer) => customer.id == invoiceParams.customerId
            )?.identification || ""
          }`,
        ],
        [
          `${
            customers.find(
              (customer) => customer.id == invoiceParams.customerId
            )?.name || ""
          } ${
            customers.find(
              (customer) => customer.id == invoiceParams.customerId
            )?.lastName || ""
          }`,
        ],
        [
          `Teléfono: ${
            customers.find(
              (customer) => customer.id == invoiceParams.customerId
            )?.phone || ""
          }`,
        ],
        [
          customers.find((customer) => customer.id == invoiceParams.customerId)
            ?.email || "",
        ],
        [
          customers.find((customer) => customer.id == invoiceParams.customerId)
            ?.address || "",
        ],
      ],
      columnStyles: {
        0: { cellWidth: 90 },
      },
      styles: {
        cellPadding: 1,
        fontSize: 10,
      },
    });
    autoTable(doc, {
      startY: 100,
      head: [["VENDEDOR", "FECHA", "Metodo de Pago"]],
      body: [
        [
          `${
            sellers.find((seller) => seller.id === invoiceParams.sellerId)
              ?.name || ""
          } ${
            sellers.find((seller) => seller.id === invoiceParams.sellerId)
              ?.lastName || ""
          }`,
          new Date(invoiceParams.createdAt!).toLocaleDateString(),
          invoiceParams.paymentMethod,
        ],
      ],
    });
    autoTable(doc, {
      startY: 130,
      head: [["Code", "Descripción", "Cantidad", "Precio Unitario", "Total"]],
      body: invoiceParams.invoiceDetails.map((detail) => [
        products.find((product) => product.id === detail.productId)?.code || "",
        products.find((product) => product.id === detail.productId)?.name || "",
        detail.quantity,
        detail.unitPrice,
        detail.total,
      ]),
    });
    const finalY = (doc as any).lastAutoTable.finalY || 110;
    autoTable(doc, {
      startY: finalY + 1,
      head: [["", ""]],
      body: [
        ["SubTotal $ ", invoiceParams.subTotal],
        [`IVA (${userInfo.iva}) $ `, invoiceParams.iva],
        ["Total $ ", invoiceParams.total],
      ],
      columnStyles: {
        0: { cellWidth: 25 },
      },
      theme: "plain",
      styles: {
        cellPadding: 0.5,
        fontSize: 12,
        halign: "right",
      },
      margin: { left: 150 },
    });
    doc.text("Gracias por su compra!", 80, finalY + 30);
    return doc;
  };

  const viewPDF = (invoiceParams: Invoice) => {
    const doc = generatePDF(invoiceParams);
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const pdfWindow = window.open(
      pdfUrl,
      "_blank",
      "width=1000,height=700,scrollbars=yes,menubar=no,location=no,status=no,resizable=yes"
    );

    pdfWindow!.document.body.style.margin = "10px";
  };

  const downloadPDF = (invoiceParams: Invoice) => {
    const doc = generatePDF(invoiceParams);
    const randomNumber = String(Math.floor(Math.random() * 10000)).padStart(
      4,
      "0"
    );
    doc.save(`factura${randomNumber}.pdf`);
  };

  return { viewPDF, downloadPDF };
};
