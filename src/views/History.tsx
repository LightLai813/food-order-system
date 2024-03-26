import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useTranslation } from 'react-i18next';

import { buyAgain, showCartList } from '@/store/cartSlice';
import { setAlert } from '@/store/alertSlice';
import { setLoading } from '@/store/loadingSlice';
import { uniqueID } from '@/utils/services/uniqueID';

import Button from '@/components/Button';

type OrderProp = {
    id: string,
    quantity: number
}

type HistoryProp = {
    timestamp: number,
    order: Array<OrderProp>
}

function HistoryBlock({ 
    timestamp, 
    order,
    triggerReloadData
}: {
    timestamp: number,
    order: Array<OrderProp>,
    triggerReloadData: () => void
}) {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.item.items);

    const handleRemoveHistory = async () => {
        dispatch(
            setLoading(true)
        );

        const response = await fetch(`${API_URL}?act=delete_history`, {
            //method: 'DELETE',
            method: 'POST',
            headers: {
                'content-type': 'text/plain'
            },
            body: JSON.stringify({
                userId: uniqueID(),
                timestamp
            })
        });

        const result = await response.json();

        dispatch(
            setLoading(false)
        );

        if (result.message === 'success') {
            dispatch(
                setAlert(t('msg_removeHistoruSuccess'))
            );
            triggerReloadData();
        } else {
            dispatch(
                setAlert(result.message)
            );
        }
    }

    const handleBuyAgain = () => {
        dispatch(
            buyAgain(order)
        );

        dispatch(
            showCartList(true)
        );
    }

    return (
        <div 
            className="historyBlock"
        >
            <p className="historyID">#{timestamp}</p>
            <ul>
                {
                    order.map((orderItem) => {
                        const targetItem = items.find((item) => item.id === orderItem.id);

                        if (!targetItem) return null;
                        return (
                            <li key={orderItem.id}>
                                <span className="historyItemName">{targetItem.name[i18n.language]}</span>
                                <span className="historyItemQuantity">x{orderItem.quantity}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="historyButtons">
                <Button color="gray" onClick={handleRemoveHistory}>{t('button_remove')}</Button>
                <Button onClick={handleBuyAgain}>{t('button_buyAgain')}</Button>
            </div>
        </div>
    )
}

export default () => {
    const dispatch = useAppDispatch();
    const [histories, setHistories] = useState([]);
    const [reloadDataSignal, setReloadDataSignal] = useState(0);

    const getHistory = async () => {
        dispatch(
            setLoading(true)
        );
        const response = await fetch(`${API_URL}?act=histories&user_id=${uniqueID()}`);
        const data = await response.json();
        setHistories(data);
        dispatch(
            setLoading(false)
        );
    }
    
    useEffect(() => {
        getHistory();
    }, [reloadDataSignal]);

    return (
        <div className="history">
        {
            histories.map((history: HistoryProp) => (
                <HistoryBlock 
                    key={history.timestamp} 
                    {...history} 
                    triggerReloadData={() => {
                        setReloadDataSignal(Date.now())
                    }}
                />
            ))
        }
        </div>
    )
}