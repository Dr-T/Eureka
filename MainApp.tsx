import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Eureka from './Eureka';
import LandingPage from './LandingPage';
import EurekaLesson from './EurekaLesson';
import EurekaLessonChemistry from './EurekaLesson-Chemistry';
import StardustPage from './StardustPage';

export default function MainApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<Eureka />} />
                <Route path="/lesson" element={<EurekaLesson />} />
                <Route path="/lesson-chemistry" element={<EurekaLessonChemistry />} />
                <Route path="/stardust" element={<StardustPage />} />
            </Routes>
        </BrowserRouter>
    );
}
