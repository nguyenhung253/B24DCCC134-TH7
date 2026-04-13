import {
  addCongViec,
  deleteCongViec,
  getCongViecList,
  getCurrentUser,
  logout,
  saveUser,
  updateCongViec,
} from '@/services/CongViecNhom';
import { useState, useMemo } from 'react';

export default () => {
  const [congViecList, setCongViecList] = useState<CongViecNhom.CongViec[]>([]);
  const [currentUser, setCurrentUser] = useState<CongViecNhom.User | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedCongViec, setSelectedCongViec] = useState<CongViecNhom.CongViec | undefined>();

  // Thêm các state cho Bộ lọc và Tìm kiếm
  const [searchText, setSearchText] = useState<string>('');
  const [filterTrangThai, setFilterTrangThai] = useState<string | undefined>(undefined);
  const [filterNguoiGiao, setFilterNguoiGiao] = useState<string | undefined>(undefined);

  // Khởi tạo data
  const loadCongViecList = () => {
    const list = getCongViecList();
    setCongViecList(list);
  };

  const loadCurrentUser = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
  };

  const login = (username: string) => {
    saveUser(username);
    loadCurrentUser();
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  const themCongViec = (congviec: Omit<CongViecNhom.CongViec, 'id'>) => {
    addCongViec(congviec);
    loadCongViecList();
  };

  const suaCongViec = (id: string, congviec: Partial<CongViecNhom.CongViec>) => {
    updateCongViec(id, congviec);
    loadCongViecList();
  };

  const xoaCongViec = (id: string) => {
    deleteCongViec(id);
    loadCongViecList();
  };

  // Logic tự động tính toán danh sách hiển thị dựa trên bộ lọc
  const filteredList = useMemo(() => {
    return congViecList.filter((item) => {
      const matchText = item.tenCongViec.toLowerCase().includes(searchText.toLowerCase());
      const matchTrangThai = filterTrangThai ? item.trangThai === filterTrangThai : true;
      const matchNguoiGiao = filterNguoiGiao ? item.nguoiDuocGiao === filterNguoiGiao : true;
      return matchText && matchTrangThai && matchNguoiGiao;
    });
  }, [congViecList, searchText, filterTrangThai, filterNguoiGiao]);

  // Logic thống kê công việc
  const thongKe = useMemo(() => {
    return {
      tongSo: congViecList.length,
      daHoanThanh: congViecList.filter((item) => item.trangThai === 'Đã xong').length,
      cuaToi: congViecList.filter((item) => item.nguoiDuocGiao === currentUser?.username).length,
    };
  }, [congViecList, currentUser]);

  return {
    congViecList,
    filteredList, // Xuất danh sách đã lọc ra để dùng ở Table
    thongKe,      // Xuất dữ liệu thống kê
    currentUser,
    visible,
    isEdit,
    selectedCongViec,
    searchText,
    filterTrangThai,
    filterNguoiGiao,
    setVisible,
    setIsEdit,
    setSelectedCongViec,
    setSearchText,
    setFilterTrangThai,
    setFilterNguoiGiao,
    loadCongViecList,
    loadCurrentUser,
    login,
    handleLogout,
    themCongViec,
    suaCongViec,
    xoaCongViec,
  };
};