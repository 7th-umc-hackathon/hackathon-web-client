import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import CustomColumn from '../components/CustomColumn';
import CustomFont from '../components/CustomFont';
import CustomButton from '../components/CustomButton';
import StyledImg from '../components/StyledImg';

import successIcon from '../../../assets/icon_mission_success.svg';

const mockRelayId = '12';

const SuccessModal = ({ isOpen, onClose }) => {
    const [showCountrySelector, setShowCountrySelector] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        if (showCountrySelector) {
            fetch(`http://test2.shop:42021/relays/${mockRelayId}/next/contrires`) // TODO: 여기서 404 나는 중
                .then((response) => response.json())
                .then((data) => setCountries(data.contries))
                .catch((error) => console.error('국가 못 불러옴:', error));
        }
    }, [showCountrySelector]);

    const handleSelectCountry = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleSubmit = () => {
        console.log('넘겨주기');
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CustomColumn $width='100%' $alignItems='center' $justifyContent='center' $gap='6rem'>
                {!showCountrySelector ? (
                    <>
                        <CustomColumn $width='100%' $alignItems='center' $justifyContent='center' $gap='1rem'>
                            <StyledImg src={successIcon} $width='40%' />
                            <CustomFont $font='2rem' $color='black' $fontWeight='bold'>미션 성공!</CustomFont>
                            <CustomFont $font='1rem' $color='#666666' $fontWeight='bold'>시간 내에 미션을 완료했어요.</CustomFont>
                        </CustomColumn>

                        <CustomButton $width='90%' $backgroundColor='#3ee187' onClick={() => setShowCountrySelector(true)} $padding='1rem'>
                            <CustomFont $color='white' $font='1rem' $fontWeight='bold'>다음 타자 지정하기</CustomFont>
                        </CustomButton>
                    </>
                ) : (
                    <CustomColumn $width='100%' $alignItems='center' $justifyContent='center' $gap='1rem'>
                        <CustomFont $font='1.5rem' $color='black' $fontWeight='bold'>다음 타자의 국가는?</CustomFont>
                        {countries.length > 0 ? (
                            countries.map((country) => (
                                <CustomButton key={country.country_id} $width='90%' $backgroundColor='#3ee187' onClick={() => handleSelectCountry(country.common_name)} $padding='1rem'>
                                    <CustomFont $color='white' $font='1rem' $fontWeight='bold'>{country.common_name}</CustomFont>
                                </CustomButton>
                            ))
                        ) : (
                            <CustomFont $font='1rem' $color='red'>국가를 불러오는 중...</CustomFont>
                        )}
                        <CustomButton $width='90%' $backgroundColor='#3ee187' onClick={handleSubmit} $padding='1rem'>
                            <CustomFont $color='white' $font='1rem' $fontWeight='bold'>넘겨주기</CustomFont>
                        </CustomButton>
                    </CustomColumn>
                )}
            </CustomColumn>
        </Modal>
    );
};

export default SuccessModal;
