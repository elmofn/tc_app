export const formatDate = (date) => {
    // Verifica se o parâmetro é uma instância de Date; caso contrário, cria uma nova instância
    const d = date instanceof Date ? date : new Date(date);
    const now = new Date();
    
    const today = now.getDate();
    const todayMonth = now.getMonth();
    const todayYear = now.getFullYear();
  
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    
    // Obtém horas e minutos e formata para dois dígitos
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
  
    // Checa se a data é hoje
    if (today === day && todayMonth === month && todayYear === year) {
      return `${hours}:${minutes}`;
    }
  
    // Checa se a data é ontem
    if (today === day + 1 && todayMonth === month && todayYear === year) {
      return 'Ontem';
    }
  
    // Formata a data como DD/MM/YY
    return `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year.toString().slice(-2)}`;
  };