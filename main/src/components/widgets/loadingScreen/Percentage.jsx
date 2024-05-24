import React, { useEffect, useState } from 'react';
import Styles from './HomeLoading.module.scss';

export default function Percentage() {

    const [progress, setProgress] = useState(0);
    const simulateLoading = () => {
        let percentage = 0;
        const interval = setInterval(() => {
            percentage += 5;
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(interval);
            }
            setProgress(prev => prev = percentage);
        }, 280);
    };

    useEffect(() => {
        simulateLoading();
    }, [])
    return (
        <div className={`${Styles.percentage}`}>
            {progress}%
        </div>
    )
}
