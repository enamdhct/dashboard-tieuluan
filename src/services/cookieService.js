export function getCookie(cookieName) {
  // Kiểm tra xem có tồn tại `document` không
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});
    return cookies[cookieName];
  } else {
    // Xử lý trong trường hợp không có DOM
    console.warn('Không có DOM, không thể sử dụng document.cookie.');
    return null; // hoặc giá trị mặc định phù hợp với logic của bạn
  }
}