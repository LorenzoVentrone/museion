'use client';

import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

// generatePdf: generates a PDF ticket for an order, including user info, ticket details, and a QR code
export default async function generatePdf(orderId, orderItems, user) {
  const doc = new jsPDF();
  let y = 20;

  // Museum header
  doc.setFontSize(18);
  doc.setFont('times', 'bold');
  doc.text('Museion', 105, y, { align: 'center' });
  y += 10;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Order Ticket #${orderId}`, 105, y, { align: 'center' });
  y += 10;

  doc.setDrawColor(200);
  doc.line(20, y, 190, y);
  y += 8;

  // User information
  if (user) {
    doc.setFontSize(12);
    doc.text(`First name: ${user.first_name}`, 20, y);
    doc.text(`Last name: ${user.last_name}`, 105, y);
    y += 6;
    doc.text(`Email: ${user.email}`, 20, y);
    y += 10;
  }

  // Order date
  const formattedDate = new Date(orderItems[0]?.order_date || new Date()).toLocaleDateString('en-GB');
  doc.text(`Order date: ${formattedDate}`, 20, y);
  y += 10;

  doc.line(20, y, 190, y);
  y += 8;

  // Ticket details section
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Ticket Details', 20, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  let total = 0;

  // List each ticket item
  for (const item of orderItems) {
    const textLines = [
      `• Type: ${item.type}`,
      `Visit Date: ${new Date(item.date).toLocaleDateString('en-GB')}`,
      `Quantity: ${item.quantity}`,
      `Unit price: €${Number(item.price).toFixed(2)}`
    ];

    for (const line of textLines) {
      doc.text(line, 25, y);
      y += 6;
    }

    total += Number(item.quantity) * Number(item.price);

    y += 4;

    // Add a new page if content exceeds the page height
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
  }

  doc.line(20, y, 190, y);
  y += 10;

  // Total paid
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Total Paid: €${total.toFixed(2)}`, 160, y, { align: 'right' });
  y += 10;

  // Dashed line (simulates a tear-off area)
  doc.setDrawColor(150);
  doc.setLineDash([2, 2], 0);
  doc.line(20, y, 190, y);
  y += 8;

  // Generate QR code (fake URL for validation)
  const qrData = `https://museion.example.com/validate/${orderId}`;
  const qrCodeDataUrl = await QRCode.toDataURL(qrData);

  // Insert QR code image
  doc.addImage(qrCodeDataUrl, 'PNG', 150, y, 40, 40);

  doc.setFontSize(10);
  doc.setFont('times', 'italic');
  doc.setTextColor(100);
  doc.text('Scan the QR at the entrance or show the printed ticket.', 25, y + 20);

  y += 50;

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text('Thank you for choosing our museum.', 105, y, { align: 'center' });

  doc.save(`order_${orderId}.pdf`);
}