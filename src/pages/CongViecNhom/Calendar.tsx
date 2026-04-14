import { Card } from 'antd';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useModel } from 'umi';
import { useMemo } from 'react';

const localizer = momentLocalizer(moment);

const CongViecCalendar = () => {
  const { filteredList } = useModel('CongViecNhom.congviecnhom');

  // Chuyển đổi danh sách công việc thành events cho Calendar
  const events = useMemo(() => {
    return filteredList.map((item) => ({
      id: item.id,
      title: `${item.tenCongViec} - ${item.nguoiDuocGiao}`,
      start: new Date(item.deadline),
      end: new Date(item.deadline),
      resource: item,
    }));
  }, [filteredList]);

  // Tùy chỉnh màu sắc event theo trạng thái
  const eventStyleGetter = (event: any) => {
    const { trangThai, mucDoUuTien } = event.resource;
    
    let backgroundColor = '#3174ad';
    
    if (trangThai === 'Đã xong') {
      backgroundColor = '#52c41a';
    } else if (trangThai === 'Đang làm') {
      backgroundColor = '#1890ff';
    } else if (mucDoUuTien === 'Cao') {
      backgroundColor = '#ff4d4f';
    } else if (mucDoUuTien === 'Trung bình') {
      backgroundColor = '#fa8c16';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <Card title="Lịch công việc" style={{ marginTop: 16 }}>
      <div style={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
          messages={{
            next: 'Sau',
            previous: 'Trước',
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
            agenda: 'Lịch trình',
            date: 'Ngày',
            time: 'Thời gian',
            event: 'Công việc',
            noEventsInRange: 'Không có công việc nào trong khoảng thời gian này',
          }}
        />
      </div>
    </Card>
  );
};

export default CongViecCalendar;
