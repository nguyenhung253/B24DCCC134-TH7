const STORAGE_KEY = 'congviec_list';
const USER_KEY = 'current_user';

const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getCurrentUser = (): CongViecNhom.User | null => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const saveUser = (username: string): void => {
  const user: CongViecNhom.User = { username };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const getCongViecList = (): CongViecNhom.CongViec[] => {
  const dataStr = localStorage.getItem(STORAGE_KEY);
  return dataStr ? JSON.parse(dataStr) : [];
};

export const saveCongViecList = (list: CongViecNhom.CongViec[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const addCongViec = (congviec: Omit<CongViecNhom.CongViec, 'id'>): CongViecNhom.CongViec => {
  const newCongViec: CongViecNhom.CongViec = {
    ...congviec,
    id: generateId(),
  };
  const list = getCongViecList();
  const newList = [newCongViec, ...list];
  saveCongViecList(newList);
  return newCongViec;
};

export const updateCongViec = (id: string, congviec: Partial<CongViecNhom.CongViec>): void => {
  const list = getCongViecList();
  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...congviec };
    saveCongViecList(list);
  }
};

export const deleteCongViec = (id: string): void => {
  const list = getCongViecList();
  const newList = list.filter((item) => item.id !== id);
  saveCongViecList(newList);
};
