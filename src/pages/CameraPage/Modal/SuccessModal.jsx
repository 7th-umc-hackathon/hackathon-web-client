import React from 'react';
import Modal from '../components/Modal';
import CustomColumn from '../components/CustomColumn';
import CustomFont from '../components/CustomFont';
import CustomButton from '../components/CustomButton';
import StyledImg from '../components/StyledImg';

import successIcon from '../../../assets/icon_mission_success.svg';

const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CustomColumn $width='100%' $alignItems='center' $justifyContent='center' $gap='6rem'>
                <CustomColumn $width='100%' $alignItems='center' $justifyContent='center' $gap='1rem'>
                    <StyledImg src={successIcon} $width='40%' />
                    <CustomFont $font='2rem' $color='black' $fontWeight='bold'>미션 성공!</CustomFont>
                    <CustomFont $font='1rem' $color='#666666' $fontWeight='bold'>시간 내에 미션을 완료했어요.</CustomFont>
                </CustomColumn>

                <CustomButton $width='90%' $backgroundColor='#3ee187' onClick={onClose} $padding='1rem'>
                    <CustomFont $color='white' $font='2rem' $fontWeight='bold'>다음 타자 지정하기</CustomFont>
                </CustomButton>
            </CustomColumn>
        </Modal>
    );
};

export default SuccessModal;
