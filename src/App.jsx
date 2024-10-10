import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Help from './pages/Help'
import './index.css'
import Booking from './pages/Booking'
import ExecBusSeat from './pages/ExecBusSeat'
import OrdBusSeat from './pages/OrdBusSeat'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PageNotFound from './pages/PageNotFound'
import TicketPage from './pages/TicketPage'
import InvoicePage from './pages/InvoicePage'
import PaymentsPage from './pages/PaymentsPage'
import PaymentMethods from './pages/PaymentMethods'

function Layout({children}){
    return (
        <>
        <Navbar />
        {children}
        <Footer />
        </>
    )
}

function App(){
    return (
            <Routes>
                <Route element={<Layout />} />
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Help" element={<Help />} />
                <Route path="/Booking" element={<Booking />}/>
                <Route path="/ExecBusSeat" element={<ExecBusSeat />} />
                <Route path="/select-seat/:id" element={<OrdBusSeat />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/TicketPage" element={<TicketPage />} />
                <Route path="/InvoicePage" element={<InvoicePage />} />
                <Route path="/PaymentsPage" element={<PaymentsPage />} />
                <Route path="/PaymentMethods" element={<PaymentMethods />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
    )
}

export default App;
