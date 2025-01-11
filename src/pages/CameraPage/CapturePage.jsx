import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { useNavigate, useLocation } from 'react-router-dom';

import BackIcon from '../../assets/icon/back-icon.svg';
import CaptureButtonIcon from '../../assets/icon/capture-button.svg';

import StyledImg from './components/StyledImg';
import FailureModal from './Modal/FailureModal';
import SuccessModal from './Modal/SuccessModal';

export default function CapturePage() {
    const location = useLocation();
    const { missionTitle } = location.state || {};

    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isFailModalOpen, setIsFailModalOpen] = useState(false);
    const [isOkModalOpen, setIsOkModalOpen] = useState(false);

    const handleCloseFailModal = () => setIsFailModalOpen(false);
    const handleCloseOkModal = () => setIsOkModalOpen(false);

    const navigate = useNavigate();

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const submitImage = async () => {
        if (!capturedImage) return;

        try {
            const formData = new FormData();

            formData.append('image', capturedImage);
            formData.append('mission', '페트병 3개 줍기'); // TODO: localStorage로 사용자의가장 최근 미션 내용 꺼내서 삽입하여 요청 보내기

            const response = await fetch('http://test2.shop:42021/relays/mission/complete', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            // 정확하게 result 값을 비교
            if (result.success && result.success.result === "True") {
                setIsOkModalOpen(true);
            } else {
                setIsFailModalOpen(true);
                // setIsOkModalOpen(true);
            }
        } catch (error) {
            console.error('서버 전송 오류:', error);
            setIsFailModalOpen(true);
        }
    };


    return (
        <Container>
            <TopBar>
                <BackButton onClick={() => navigate(-1)}>
                    <BackIconImg src={BackIcon} alt="Back Icon" />
                </BackButton>
                <MissionName>{missionTitle}</MissionName>
            </TopBar>
            {capturedImage ? (
                <PreviewContainer>
                    <PreviewImage src={capturedImage} alt="Captured" />
                    <SubmitButton onClick={submitImage}>미션 제출</SubmitButton>
                </PreviewContainer>
            ) : (
                <>
                    <WebcamContainer>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                width: 400,
                                height: 600,
                                facingMode: 'environment',
                            }}
                        />
                    </WebcamContainer>
                    <BottomBar>
                        <CaptureButton onClick={captureImage}>
                            <StyledImg src={CaptureButtonIcon} width='5rem' height='5rem' />
                        </CaptureButton>
                    </BottomBar>
                </>
            )}

            {isFailModalOpen && (
                <FailureModal isOpen={isFailModalOpen} onClose={handleCloseFailModal} />
            )}

            {isOkModalOpen && (
                <SuccessModal isOpen={isOkModalOpen} onClose={handleCloseOkModal} />
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #000;
    color: #fff;
    height: 100vh;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    background: var(--Gray-1, #333);
    height: 7rem;
    padding: 1rem;
    gap: 1rem;
`;

const BackButton = styled.div`
    cursor: pointer;
`;

const BackIconImg = styled.img`
    margin-top: 2px;
`;

const MissionName = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
`;

const WebcamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const BottomBar = styled.div`
    width: 100%;
    height: 7rem;
    background: var(--Gray-1, #333);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CaptureButton = styled.button`
    width: 100%;
    height: 7rem;
    padding: 0;
`;

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const PreviewImage = styled.img`
    width: 400px;
    height: 600px;
`;

const SubmitButton = styled.button`
    padding: 1rem;
    background-color: #3ee187;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 2rem;
`;
