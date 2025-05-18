'use client';

import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export default async function generatePdf(orderId, orderItems, user) {
  const doc = new jsPDF();
  let y = 20;

  // Header museo
  doc.setFontSize(18);
  doc.setFont('times', 'bold');
  doc.text('Museion', 105, y, { align: 'center' });
  y += 10;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Biglietto Ordine #${orderId}`, 105, y, { align: 'center' });
  y += 10;

  doc.setDrawColor(200);
  doc.line(20, y, 190, y);
  y += 8;

  if (user) {
    doc.setFontSize(12);
    doc.text(`Nome: ${user.first_name}`, 20, y);
    doc.text(`Cognome: ${user.last_name}`, 105, y);
    y += 6;
    doc.text(`Email: ${user.email}`, 20, y);
    y += 10;
  }

  const formattedDate = new Date(orderItems[0]?.order_date || new Date()).toLocaleDateString('it-IT');
  doc.text(`Data ordine: ${formattedDate}`, 20, y);
  y += 10;

  doc.line(20, y, 190, y);
  y += 8;

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Dettagli Biglietti', 20, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  let total = 0;

  for (const item of orderItems) {
    const textLines = [
      `• Tipo: ${item.type}`,
      `Data Visita: ${new Date(item.date).toLocaleDateString('it-IT')}`,
      `Quantità: ${item.quantity}`,
      `Prezzo unitario: €${Number(item.price).toFixed(2)}`
    ];

    for (const line of textLines) {
      doc.text(line, 25, y);
      y += 6;
    }

    total += Number(item.quantity) * Number(item.price);

    y += 4;

    if (y > 250) {
      doc.addPage();
      y = 20;
    }
  }

  doc.line(20, y, 190, y);
  y += 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Totale Pagato: €${total.toFixed(2)}`, 160, y, { align: 'right' });
  y += 10;

  // Linea tratteggiata (simula zona staccabile)
  doc.setDrawColor(150);
  doc.setLineDash([2, 2], 0); // tratteggio
  doc.line(20, y, 190, y);
  y += 8;

  // Generazione QR code
  const qrData = `https://museion.example.com/validate/${orderId}`; // URL fittizio
  const qrCodeDataUrl = await QRCode.toDataURL(qrData);

  // Inserimento QR
  doc.addImage(qrCodeDataUrl, 'PNG', 150, y, 40, 40);

  doc.setFontSize(10);
  doc.setFont('times', 'italic');
  doc.setTextColor(100);
  doc.text('Scansiona il QR all’ingresso o mostra il biglietto stampato.', 25, y + 20);

  y += 50;

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text('Grazie per aver scelto il nostro museo.', 105, y, { align: 'center' });

  doc.save(`ordine_${orderId}.pdf`);
}
