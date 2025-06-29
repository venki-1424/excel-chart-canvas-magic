
import * as XLSX from 'xlsx';

export const downloadChart = async (chartRef: HTMLCanvasElement, filename: string, format: 'png' | 'pdf') => {
  if (!chartRef) return;

  if (format === 'png') {
    const url = chartRef.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = url;
    link.click();
  } else if (format === 'pdf') {
    // For PDF, we'll use jsPDF (need to install it)
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    const imgData = chartRef.toDataURL('image/png');
    
    const imgWidth = 190;
    const imgHeight = (chartRef.height * imgWidth) / chartRef.width;
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`${filename}.pdf`);
  }
};

export const downloadExcelData = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
