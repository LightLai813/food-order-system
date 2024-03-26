import { useAppDispatch, useAppSelector } from '@/hooks';
import React from 'react';
import PopUpWindow from './PopUpWindow';
import { setAlert } from '@/store/alertSlice';
import Button from './Button';
import { useTranslation } from 'react-i18next';

export default () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const alertMsg = useAppSelector((state) => state.alert.msg);

    const handleCloseAlert = () => {
        dispatch(
            setAlert(null)
        );
    }

    if (!alertMsg) return null;

    return (
        <PopUpWindow
            className="alert"
            closeWindow={handleCloseAlert}
        >
            <p>{alertMsg}</p>
            <Button
                onClick={handleCloseAlert}
            >{t('button_confirm')}</Button>
        </PopUpWindow>
    )
}