## Hướng dẫn chạy ứng dụng trên điện thoại thật qua dây Type-C

### 1. Cài đặt dependencies
Chạy lệnh sau trong terminal tại thư mục dự án: npm install

### 2. Kết nối điện thoại
Cắm điện thoại Android vào máy tính qua dây Type-C.
Bật USB Debugging trên điện thoại (Settings > Developer Options).

### 3. Build ứng dụng web
Build mã React: npm run build

### 4. Đồng bộ với Capacitor
Đồng bộ mã với Android: npx cap sync.

### 5. Chạy ứng dụng trên điện thoại
Chạy ứng dụng trực tiếp trên điện thoại: npx cap run android
Chọn thiết bị của bạn từ danh sách (ví dụ: "Samsung Galaxy A50") và nhấn OK.
