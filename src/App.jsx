import React, { useState } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import './App.css';

function App() {
    const [birthDate, setBirthDate] = useState('');
    const [daysLeft, setDaysLeft] = useState(null);
    const [batteryStatus, setBatteryStatus] = useState(null);

    const calculateDaysLeft = () => {
        const [day, month] = birthDate.split('/').map(Number);
        const today = new Date();
        const currentYear = today.getFullYear();

        let nextBirthday = new Date(currentYear, month - 1, day);
        if (today > nextBirthday) {
            nextBirthday.setFullYear(currentYear + 1);
        }

        const timeDiff = nextBirthday - today;
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        setDaysLeft(days);

        LocalNotifications.schedule({
            notifications: [
                {
                    title: 'Đếm ngược sinh nhật',
                    body: `Còn ${days} ngày đến sinh nhật của bạn!`,
                    id: 1,
                    schedule: { at: new Date(Date.now() + 1000) },
                },
            ],
        });
    };

    const shareResult = async () => {
        if (daysLeft !== null) {
            await Share.share({
                title: 'Đếm ngược sinh nhật',
                text: `Còn ${daysLeft} ngày đến sinh nhật của tôi!`,
                dialogTitle: 'Chia sẻ kết quả',
            });
        } else {
            alert('Vui lòng tính số ngày trước khi chia sẻ!');
        }
    };

    const getBatteryStatus = async () => {
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            setBatteryStatus({
                level: battery.level * 100,
                charging: battery.charging ? 'Đang sạc' : 'Không sạc',
            });

            battery.onchargingchange = () => updateBatteryStatus(battery);
            battery.onlevelchange = () => updateBatteryStatus(battery);
        } else {
            setBatteryStatus('Battery API không được hỗ trợ trên thiết bị này.');
        }
    };

    const updateBatteryStatus = (battery) => {
        setBatteryStatus({
            level: battery.level * 100,
            charging: battery.charging ? 'Đang sạc' : 'Không sạc',
        });
    };

    return (
        <div className='app-container'>
            <h1 className='app-title'>Đếm Ngược Sinh Nhật</h1>
            <div className='input-section'>
                <input
                    type='text'
                    placeholder='Nhập ngày sinh (dd/mm)'
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className='input-field'
                />
                <button onClick={calculateDaysLeft} className='action-btn primary-btn'>
                    Tính Ngày
                </button>
            </div>
            {daysLeft !== null && (
                <div className='result-section'>
                    <p className='result-text'>
                        Còn <span className='highlight'>{daysLeft}</span> ngày đến sinh
                        nhật tiếp theo!
                    </p>
                    <button onClick={shareResult} className='action-btn secondary-btn'>
                        Chia Sẻ Kết Quả
                    </button>
                </div>
            )}
            <div className='battery-section'>
                <button onClick={getBatteryStatus} className='action-btn battery-btn'>
                    Kiểm Tra Pin
                </button>
                {batteryStatus && (
                    <p className='battery-text'>
                        Pin: <span className='highlight'>{batteryStatus.level}%</span> -{' '}
                        {batteryStatus.charging}
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;
