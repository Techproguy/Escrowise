import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => 
    Object.values(item).map(val => 
      typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
    ).join(',')
  );
  
  const csvContent = [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
};

export const exportToPNG = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  html2canvas(element).then(canvas => {
    canvas.toBlob(blob => {
      if (blob) {
        saveAs(blob, `${elementId}-${new Date().toISOString().split('T')[0]}.png`);
      }
    });
  });
};
