import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { useNavigate, useLocation } from 'react-router-dom';
import BackIcon from '../assets/icon/back-icon.svg';

export default function CapturePage() {
    const location = useLocation();
    const { missionTitle } = location.state || {}; // 전달된 missionTitle 가져오기

    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isMissionSuccess, setIsMissionSuccess] = useState(null);
    const navigate = useNavigate();

    // 사진 촬영
    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc); // 캡처한 이미지를 저장
    };

    // 서버로 이미지 전송
    const submitImage = async () => {
        if (!capturedImage) return;

        try {
            const response = await fetch('https://example.com/api/mission/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: capturedImage }),
            });

            const result = await response.json();
            setIsMissionSuccess(result.success);
        } catch (error) {
            console.error('서버 전송 오류:', error);
            setIsMissionSuccess(false);
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
                    {isMissionSuccess === null ? (
                        <SubmitButton onClick={submitImage}>미션 제출</SubmitButton>
                    ) : isMissionSuccess ? (
                        <SuccessMessage>미션 성공!</SuccessMessage>
                    ) : (
                        <FailMessage>미션 실패</FailMessage>
                    )}
                </PreviewContainer>
            ) : (
                <WebcamContainer>
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            facingMode: 'environment', // 후면 카메라
                        }}
                    />
                    <CaptureButton onClick={captureImage}>촬영</CaptureButton>
                </WebcamContainer>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #000; /* 어두운 톤 */
    color: #fff;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    background: var(--Gray-1, #333);
    padding: 10px 20px;
    color: #fff;
`;

const BackButton = styled.div`
    cursor: pointer;
`;

const BackIconImg = styled.img`
    width: 24px;
    height: 24px;
`;

const MissionName = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
`;

const WebcamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const CaptureButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #3ee187;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
`;

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const PreviewImage = styled.img`
    max-width: 100%;
    max-height: 70vh;
    margin-bottom: 20px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #3ee187;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
`;

const SuccessMessage = styled.div`
    color: #3ee187;
    font-size: 18px;
    font-weight: bold;
`;

const FailMessage = styled.div`
    color: #ff4f4f;
    font-size: 18px;
    font-weight: bold;
`;
