import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Services.css';
import '../styles/Profile.css';
import { useAuth } from '../context/AuthContext';

const BookingFormContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    description: '',
    paymentMethod: 'card'
  });

  const service = location.state?.service;

  if (!service) {
    return (
      <div className="profile-page-container" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>No service selected.</h2>
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/services')}>Browse Services</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.time || !bookingData.address) {
      alert('Please fill in all required fields.');
      return;
    }
    // TODO: Replace with real API call to create booking
    setStep(4);
  };

  return (
    <div className="profile-page-container">
      <div className="profile-section-header" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '10px' }}>
          Step {step} of 3
        </div>
        <h2>{step === 1 ? 'Booking Details' : step === 2 ? 'Secure Payment' : step === 3 ? 'Review & Confirm' : 'Confirmed!'}</h2>
        <p style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '700', marginTop: '10px' }}>
          {service.name} <span style={{ color: 'var(--text-dim)', fontWeight: '400' }}>• Provided by {service.proName}</span>
        </p>
      </div>

      <div className="profile-card" style={{ maxWidth: '600px', margin: '0 auto', borderTop: `4px solid var(--primary)` }}>
        {step === 1 && (
          <form className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Service Date</label>
                <input type="date" name="date" required onChange={handleChange} value={bookingData.date} />
              </div>
              <div className="form-group">
                <label>Arrival Time</label>
                <input type="time" name="time" required onChange={handleChange} value={bookingData.time} />
              </div>
            </div>
            <div className="form-group">
              <label>Service Address</label>
              <input type="text" name="address" placeholder="e.g. 123 Modern Ave, Suite 400" required onChange={handleChange} value={bookingData.address} />
            </div>
            <div className="form-group">
              <label>Special Instructions</label>
              <textarea 
                name="description" 
                placeholder="Any specific tools needed or entry instructions?"
                onChange={handleChange}
                value={bookingData.description}
                style={{ minHeight: '120px' }}
              />
            </div>
            <button type="button" className="btn btn-primary" style={{ marginTop: '10px' }} onClick={nextStep}>Continue to Payment</button>
          </form>
        )}

        {step === 2 && (
          <form className="profile-form">
            <div className="form-group">
              <label>Payment Method</label>
              <select name="paymentMethod" onChange={handleChange} value={bookingData.paymentMethod}>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI / Instant Pay</option>
                <option value="netbanking">Net Banking</option>
              </select>
            </div>
            {bookingData.paymentMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="***" />
                  </div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button type="button" className="btn" style={{ background: 'rgba(255,255,255,0.05)', flex: 1 }} onClick={prevStep}>Back</button>
              <button type="button" className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep}>Review Summary</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="profile-form">
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: 'var(--text-dim)' }}>
                <span>{service.name}</span>
                <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{service.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: 'var(--text-dim)' }}>
                <span>Processing & Platform Fee</span>
                <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>$5.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '10px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>Total Amount</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--success)' }}>${parseFloat(service.price.replace('$', '')) + 5}.00</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button type="button" className="btn" style={{ background: 'rgba(255,255,255,0.05)', flex: 1 }} onClick={prevStep}>Edit Details</button>
              <button type="button" className="btn btn-primary" style={{ flex: 2 }} onClick={handleSubmit}>Pay & Confirm Booking</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '30px', animation: 'fadeIn 0.5s ease-out' }}>✨</div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Booking Confirmed!</h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: '30px', lineHeight: '1.6' }}>
              A notification has been sent to <strong>{service.proName}</strong>. They will arrive on <strong>{bookingData.date}</strong> at <strong>{bookingData.time}</strong>.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button className="btn btn-primary" onClick={() => navigate('/bookings')}>Go to My Bookings</button>
              <button className="btn" style={{ background: 'rgba(255,255,255,0.05)' }} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BookingForm = () => (
  <Layout>
    <BookingFormContent />
  </Layout>
);

export default BookingForm;
