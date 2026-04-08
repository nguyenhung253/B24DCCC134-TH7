declare module CongViecNhom {
  export interface CongViec {
    id: string;
    tenCongViec: string;
    nguoiDuocGiao: string;
    mucDoUuTien: 'Thấp' | 'Trung bình' | 'Cao';
    deadline: string;
    trangThai: 'Chưa làm' | 'Đang làm' | 'Đã xong';
  }

  export interface User {
    username: string;
  }
}
