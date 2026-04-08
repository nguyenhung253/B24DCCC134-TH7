import {
  addCongViec,
  deleteCongViec,
  getCongViecList,
  getCurrentUser,
  logout,
  saveUser,
  updateCongViec,
} from '@/services/CongViecNhom';
import { useState } from 'react';

export default () => {
  const [congViecList, setCongViecList] = useState<CongViecNhom.CongViec[]>([]);
  const [currentUser, setCurrentUser] = useState<CongViecNhom.User | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedCongViec, setSelectedCongViec] = useState<CongViecNhom.CongViec | undefined>();

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

  return {
    congViecList,
    currentUser,
    visible,
    isEdit,
    selectedCongViec,
    setVisible,
    setIsEdit,
    setSelectedCongViec,
    loadCongViecList,
    loadCurrentUser,
    login,
    handleLogout,
    themCongViec,
    suaCongViec,
    xoaCongViec,
  };
};
