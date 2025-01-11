import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { useNavigate, useLocation } from 'react-router-dom';
import BackIcon from '../../assets/icon/back-icon.svg';
import CaptureButtonIcon from '../../assets/icon/capture-button.svg';

import StyledImg from './components/StyledImg';

export default function CapturePage() {
    const location = useLocation();
    const { missionTitle } = location.state || {}; // 전달된 missionTitle 가져오기

    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    // const [isMissionSuccess, setIsMissionSuccess] = useState(null);
    const isMissionSuccess = true;
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
            const response = await fetch('http://test2.shop:42021/relays/mission/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: capturedImage }),
            });

            const result = await response.json();
            // setIsMissionSuccess(result.success);
        } catch (error) {
            console.error('서버 전송 오류:', error);
            // setIsMissionSuccess(false);
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
                <>
                    <WebcamContainer>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                width: 400,
                                height: 600,
                                facingMode: 'environment', // 후면 카메라 우선
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
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #000; /* 어두운 톤 */
    color: #fff;
    height: 100vh;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    background: var(--Gray-1, #333);
    display: flex;
    height: 7rem;
    padding: 1rem;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
    color: #fff;
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
