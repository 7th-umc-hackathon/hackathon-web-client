import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import CustomColumn from '../components/CustomColumn';
import CustomFont from '../components/CustomFont';
import CustomButton from '../components/CustomButton';
import StyledImg from '../components/StyledImg';

import successIcon from '../../../assets/icon_mission_success.svg';

const mockRelayId = '12';
const accessToken = localStorage.getItem('accessToken');

const SuccessModal = ({ isOpen, onClose }) => {
    const [showCountrySelector, setShowCountrySelector] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (showCountrySelector) {
            fetch(`http://test2.shop:42021/relays/${mockRelayId}/next/countries`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success && data.success.country) {
                        setCountries(data.success.country);
                    } else {
                        console.error('데이터 구조가 다름:', data);
                    }
                })
                .catch((error) => console.error('국가 못 불러옴:', error));
        }
    }, [showCountrySelector]);

    const handleSelectCountry = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleSubmit = async () => {
        const selectedCountryId = countries.find(country => country.common_name === selectedCountry)?.country_id;

        if (!selectedCountryId) {
            console.error('선택한 국가를 찾을 수 없습니다.');
            return;
        }

        try {
            const response = await fetch(`http://test2.shop:42021/relays/${mockRelayId}/next`, {
                method: 'POST',
                headers: {
                    'Authorization': `${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ next_country_id: selectedCountryId })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // console.log('국가 지목 완료');
            alert('성공적으로 지목되었습니다!');
            navigate('/premain');
            onClose();
        } catch (error) {
            console.log(selectedCountryId);
            console.log(accessToken);
            console.error('국가 지목 실패:', error);
        }
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
                        <select value={selectedCountry} onChange={handleSelectCountry}>
                            <option value="">국가 고르기</option>
                            {countries.map((country) => (
                                <option key={country.country_id} value={country.common_name}>
                                    {country.common_name}
                                </option>
                            ))}
                        </select>
                        <CustomButton $width='90%' $backgroundColor='#3ee187' onClick={handleSubmit} $padding='1rem' disabled={!selectedCountry}>
                            <CustomFont $color='white' $font='1rem' $fontWeight='bold'>넘겨주기</CustomFont>
                        </CustomButton>
                    </CustomColumn>
                )}
            </CustomColumn>
        </Modal>
    );
};

export default SuccessModal;
