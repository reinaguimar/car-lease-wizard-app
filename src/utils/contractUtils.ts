
export const generateContractNumber = (): string => {
  // Format: YYYY-MM-NNNN (Year-Month-Random)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  
  return `${year}-${month}-${random}`;
};

export const getContractStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'canceled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatCurrency = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numValue);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return dateString;
  }
};

export const openPDFViewer = (pdfUrl: string | null | undefined): void => {
  if (!pdfUrl) {
    console.error('URL do PDF não disponível');
    return;
  }
  
  // Abre o PDF em uma nova janela
  window.open(pdfUrl, '_blank');
};
