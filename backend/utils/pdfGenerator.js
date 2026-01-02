import PDFDocument from "pdfkit";

export const generateExpensePDF = (expenses, companyName) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.fontSize(18).text(`${companyName} - Daily Expense Report`, {
      align: "center"
    });

    doc.moveDown();

    expenses.forEach((e, i) => {
      doc.fontSize(12).text(
        `${i + 1}. ${e.title} | ₹${e.amount} | ${e.category}`
      );
    });

    doc.end();
  });
};
