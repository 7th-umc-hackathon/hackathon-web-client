import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../components/Modal';
import CustomColumn from '../components/CustomColumn';
import CustomFont from '../components/CustomFont';
import CustomButton from '../components/CustomButton';
import StyledImg from '../components/StyledImg';

import failIcon from '../../../assets/icon_mission_fail.svg';

const FailureModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const navigate = useNavigate();

    const handleRetry = () => {
        onClose();
        navigate('/main');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CustomColumn $width="100%" $alignItems="center" $justifyContent="center" $gap="6rem">
                <CustomColumn $width="100%" $alignItems="center" $justifyContent="center" $gap="1rem">
                    <StyledImg src={failIcon} $width="40%" />
                    <CustomFont $font="2rem" $color="black" $fontWeight="bold">
                        미션 실패...
                    </CustomFont>
                    <CustomFont $font="1rem" $color="#666666" $fontWeight="bold">
                        아직 시간이 있어요, 다시 시도해보아요!
                    </CustomFont>
                </CustomColumn>

                <CustomButton $width="90%" $backgroundColor="#3ee187" $padding="1rem" onClick={handleRetry}>
                    <CustomFont $color="white" $font="1rem" $fontWeight="bold">
                        다시 시도하기
                    </CustomFont>
                </CustomButton>
            </CustomColumn>
        </Modal>
    );
};

export default FailureModal;
