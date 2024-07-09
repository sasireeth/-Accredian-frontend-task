import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import logo from './utils/logo.png';
import main from './utils/main.png';
import notepad from './utils/notepad.png';
import add_friend from './utils/add_friend.png';
import wallet from './utils/wallet.png';
import hat from './utils/hat.png';
import headphone from './utils/headphone.png';
import i1 from './utils/i1.png';
import i2 from './utils/i2.png';
import i3 from './utils/i3.png';
import i4 from './utils/i4.png';
import i5 from './utils/i5.png';

import './App.css';

const App = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: ''
  });
  const [errors, setErrors] = useState({});
  const form = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.referrerName) tempErrors.referrerName = 'Required';
    if (!formData.referrerEmail) tempErrors.referrerEmail = 'Required';
    if (!formData.refereeName) tempErrors.refereeName = 'Required';
    if (!formData.refereeEmail) tempErrors.refereeEmail = 'Required';
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    if (Object.keys(tempErrors).length === 0) {
      try {
        console.log('Form data:', formData);
        const response = await fetch('https://accredian-backend-task-96vj.onrender.com/api/referrals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const emailData = {
          service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
          template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          user_id: process.env.REACT_APP_EMAILJS_USER_ID,
          template_params: {
            referrerName: formData.referrerName,
            referrerEmail: formData.referrerEmail,
            refereeName: formData.refereeName,
            refereeEmail: formData.refereeEmail,
          },
        };

        emailjs.send('service_qq8vm7k', 'template_zin3ixk', emailData.template_params, 'RVBCGYkLE6KJghV8_')
          .then((emailResponse) => {
            console.log('Email sent successfully:', emailResponse);
            alert('Referral submitted successfully!');
            handleClose();
          })
          .catch((emailError) => {
            console.error('Error sending email:', emailError);
            alert('Failed to send the referral email. Please try again later.');
          });
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again later.');
      }
    } else {
      setErrors(tempErrors);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center w-screen p-5 md:ml-10 md:w-11/12">
      <section className='w-full p-2'>
        <nav className='flex flex-row md:justify-between w-full'>
          <div className='flex flex-row items-center'>
            <img src={logo} className='h-10'/>
            <button
                className="hidden md:display bg-blue-700 text-white p-1 rounded ml-2"
              >
                Courses  v
              </button>
          </div>
          <div className='md:flex flex-row items-center gap-2 sm: hidden'>
            <h1>Refer&Earn</h1>
            <h1>Resource</h1>
            <h1>About Us</h1>
            <button className="bg-gray-300 text-white p-1 rounded ml-2">
                Login
              </button>
              <button className="bg-blue-700 text-white p-1 rounded ml-2">
                Try For Free
              </button>
          </div>
        </nav>
      </section>
      <section className='flex flex-row justify-between w-fit gap-5 bg-blue-50 p-3 rounded-full md:w-2/3 md:gap-10 shadow-lg shadow-blue-500/50'>
          <h1>Refer</h1>
          <h1>Benefits</h1>
          <h1>FAQs</h1>
          <h1>Support</h1>
      </section>
      <section className='flex flex-row justify-between bg-blue-100 rounded shadow-md p-3 w-full items-center h-1/4'>
          <div className="flex flex-col p-2 gap-2 h-full md:w-1/4">
              <h1 className="text-2xl font-bold mb-4 md:text-6xl">Let’s Learn & Earn</h1>
              <p className=" text-md mb-4 md:text-2xl">Get a chance to win up-to <span className='text-xl md:text-4xl text-blue-700'>Rs. 15,000</span></p> 
              <button
                onClick={handleOpen}
                className="bg-blue-700 text-white px-2 py-2 rounded w-full"
              >
                Refer Now
              </button>
          </div>
          <img src={main} className='w-2/4 h-full md:w-3/4'/>
      </section>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Refer a Friend</h2>
            <form ref={form} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="referrerName" className="block text-gray-700">Your Name</label>
                <input
                  id="referrerName"
                  name="referrerName"
                  type="text"
                  onChange={handleChange}
                  value={formData.referrerName}
                  className="mt-1 p-2 w-full border rounded"
                />
                {errors.referrerName && (
                  <div className="text-red-500 text-sm">{errors.referrerName}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="referrerEmail" className="block text-gray-700">Your Email</label>
                <input
                  id="referrerEmail"
                  name="referrerEmail"
                  type="email"
                  onChange={handleChange}
                  value={formData.referrerEmail}
                  className="mt-1 p-2 w-full border rounded"
                />
                {errors.referrerEmail && (
                  <div className="text-red-500 text-sm">{errors.referrerEmail}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="refereeName" className="block text-gray-700">Friend's Name</label>
                <input
                  id="refereeName"
                  name="refereeName"
                  type="text"
                  onChange={handleChange}
                  value={formData.refereeName}
                  className="mt-1 p-2 w-full border rounded"
                />
                {errors.refereeName && (
                  <div className="text-red-500 text-sm">{errors.refereeName}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="refereeEmail" className="block text-gray-700">Friend's Email</label>
                <input
                  id="refereeEmail"
                  name="refereeEmail"
                  type="email"
                  onChange={handleChange}
                  value={formData.refereeEmail}
                  className="mt-1 p-2 w-full border rounded"
                />
                {errors.refereeEmail && (
                  <div className="text-red-500 text-sm">{errors.refereeEmail}</div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <section className='flex flex-col items-center gap-5 p-3 w-screen bg-blue-200 my-4 md:gap-15'>
          <h1 className='text-3xl font-bold'>How Do I Refer?</h1>
          <div className='flex flex-row justify-center gap-5 items-center w-full h-1/3 md:w-10/12 md:gap-24'>
            <div className='text-center rounded-full bg-white p-3 flex flex-col items-center h-1/5 w-1/5 md:p-5 md:h-3/4 shadow-lg shadow-blue-500/50'>
              <img src={add_friend}/>
              <h1 className='hidden word-wrap md:flex break-words'>Submit referrals easily via our website’s referral section.</h1>
            </div>
            <div className='text-center rounded-full bg-white p-3 flex flex-col items-center h-1/5 w-1/5 md:p-5 md:h-3/4 shadow-lg shadow-blue-500/50'>
              <img src={notepad}/>
              <h1 className='hidden word-wrap md:flex break-words'>Earn rewards once your referral joins an Accredian program.</h1>
            </div>
            <div className='text-center rounded-full bg-white p-3 flex flex-col items-center h-1/5 w-1/5 md:p-5 md:h-3/4 shadow-lg shadow-blue-500/50'>
              <img src={wallet}/>
              <h1 className='hidden word-wrap md:flex break-words'>Both parties receive a bonus 30 days after program enrollment.</h1>
            </div>
            
          </div> 
          <button
                onClick={handleOpen}
                className="bg-blue-700 text-white px-2 py-2 rounded"
              >
                Refer Now
              </button>
      </section>
      <section className='flex flex-col items-center gap-5 p-3 w-screen mb-4 md:gap-15'>
          <h1 className='text-3xl font-bold'>What Are The Referral Benefits?</h1>
          <div className='flex flex-col justify-center gap-5 items-center w-full h-1/2 md:w-10/12 md:gap-24 md:flex-row'>
            <table className='border divide-solid border-blue-950 text-left rounded-sm shadow-lg shadow-blue-500/50 h-full'>
              <tr className='bg-blue-600'>
                <th className='p-2'>ALL PROGRAMS</th>
              </tr>
              <tr><td className='border border-blue-950 p-1'>PRODUCT MANAGEMENT </td></tr>
              <tr><td className='border border-blue-950 p-1'>PRODUCT MANAGEMENT </td></tr>
              <tr><td className='border border-blue-950 p-1'>PRODUCT MANAGEMENT </td></tr>
              <tr><td className='border border-blue-950 p-1'>PRODUCT MANAGEMENT </td></tr>
              <tr><td className='border border-blue-950 p-1'>PRODUCT MANAGEMENT </td></tr>
              <tr><td className='border border-blue-950 p-1'>PRODUCT MANAGEMENT </td></tr>
              <tr><td className='border border-blue-950 p-1'>PRODUCT MANAGEMENT </td></tr>
              <tr><td className='border border-blue-950 p-1'>PRODUCT MANAGEMENT </td></tr>
            </table>
            <table className='text-center border divide-solid border-blue-950 rounded-sm shadow-lg shadow-blue-500/50'>
              <tr className='bg-blue-600'>
                <th className='p-1 border-r-2 border-r-slate-900'>Programs</th>
                <th className='p-1 border-r-2 border-r-slate-900'>Referrer Bonus</th>
                <th className='p-1'>Referee Bonus</th>
              </tr>
              <tr><td className='p-1 flex border-r-2 border-r-slate-900'><img src={hat} className='h-1/2 mr-2'/><p>Professional Certificate Program in Product Management</p></td><td className='border-r-2 border-r-slate-900'>₹ 7,000</td><td>₹ 9,000</td></tr>
              <tr><td className='p-1 flex border-r-2 border-r-slate-900'><img src={hat} className='h-1/2 mr-2'/><p>Professional Certificate Program in Product Management</p></td><td className='border-r-2 border-r-slate-900'>₹ 7,000</td><td>₹ 9,000</td></tr>
              <tr><td className='p-1 flex border-r-2 border-r-slate-900'><img src={hat} className='h-1/2 mr-2'/><p>Professional Certificate Program in Product Management</p></td><td className='border-r-2 border-r-slate-900'>₹ 7,000</td><td>₹ 9,000</td></tr>
              <tr><td className='p-1 flex border-r-2 border-r-slate-900'><img src={hat} className='h-1/2 mr-2'/><p>Professional Certificate Program in Product Management</p></td><td className='border-r-2 border-r-slate-900'>₹ 7,000</td><td>₹ 9,000</td></tr>
              <tr><td className='p-1 flex border-r-2 border-r-slate-900'><img src={hat} className='h-1/2 mr-2'/><p>Professional Certificate Program in Product Management</p></td><td className='border-r-2 border-r-slate-900'>₹ 7,000</td><td>₹ 9,000</td></tr>
              <tr><td className='p-1 flex border-r-2 border-r-slate-900'><img src={hat} className='h-1/2 mr-2'/><p>Professional Certificate Program in Product Management</p></td><td className='border-r-2 border-r-slate-900'>₹ 7,000</td><td>₹ 9,000</td></tr>
              <tr><td className='p-1 flex border-r-2 border-r-slate-900'><img src={hat} className='h-1/2 mr-2'/><p>Professional Certificate Program in Product Management</p></td><td className='border-r-2 border-r-slate-900'>₹ 7,000</td><td>₹ 9,000</td></tr>
              <tr><td className='p-1 flex border-r-2 border-r-slate-900'><img src={hat} className='h-1/2 mr-2'/><p>Professional Certificate Program in Product Management</p></td><td className='border-r-2 border-r-slate-900'>₹ 7,000</td><td>₹ 9,000</td></tr>
            </table>
            
          </div> 
          <button
                onClick={handleOpen}
                className="bg-blue-700 text-white px-2 py-2 rounded"
              >
                Refer Now
              </button>
      </section>
      <section className='flex flex-col items-center gap-5 p-3 w-screen my-4 md:gap-15'>
          <h1 className='text-3xl font-bold'>Frequently Asked Questions</h1>
          <div className='flex flex-row justify-center gap-5 items-center w-full h-1/3 md:w-10/12 md:gap-24'>
              <div className='flex flex-col gap-4 w-1/2'>
                <button className="bg-white-700 text-blue-600 px-10 py-2 rounded w-full shadow-md shadow-slate-900">Eligibility</button>
                <button className="bg-white-700 text-black px-10 py-2 rounded w-full border-black border border-solid">How To Use?</button>
                <button className="bg-white-700 text-black px-10 py-2 rounded w-full border-black border border-solid">Terms & Conditions</button>
              </div>
              <div className='flex flex-col gap-4'>
                <h1 className='text-blue-500'>Do I need to have prior Product Management and Project Management experience to enroll in the program?</h1>
                <p>No, the program is designed to be inclusive of all levels of experience. All topics will be covered from the basics, making it
                suitable for individuals from any field of work.</p>
                <h1 className='font-bold'>What is the minimum system configuration required?</h1>
              </div>
          </div> 
      </section>
      <section className='flex flex-col md:flex-row items-center gap-5 p-10 bg-blue-800 rounded-lg w-11/12 my-4'>
          <img src={headphone}/>
          <div className='flex flex-col  gap-5 items-center w-full h-1/3 md:w-10/12'>
          <h1 className='md:text-3xl font-bold text-white'>Want to delve deeper into the program?</h1>
          <p className='text-white'>Share your details to receive expert insights from our program team!</p>
          </div> 
          <button className="bg-white text-blue-600 rounded shadow-md shadow-slate-900 text-xl p-2">Get in Touch</button>
      </section>
      <section className='flex flex-col text-white gap-5 items-center bg-stone-900 p-4 w-screen h-fit'>
        <div className='flex justify-between items-center w-full md:w-10/12'>
          <img src={logo} className='h-20 w-20 mr-2'/>
          <button className='rounded h-15 bg-blue-500 border-white border text-white p-2 md:px-10'>Schedule 1-on-1 call Now</button>
        </div>
        <hr/>
        <div className='flex flex-wrap gap-14'>
          <div className='flex flex-col gap-2'>
            <h1>Programs</h1>
            <p>Data Science & AI</p>
            <p>Data Science & AI</p>
            <p>Data Science & AI</p>
            <p>Data Science & AI</p>
            <p>Data Science & AI</p>
            <p>Data Science & AI</p>
            <p>Data Science & AI</p>
            <p>Data Science & AI</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h1>Contact Us</h1>
            <p>Email us (For Data Science Queries): admissions@accredian.com</p>
            <p>Email us (For Data Science Queries): admissions@accredian.com</p>
            <p>Email us (For Data Science Queries): admissions@accredian.com</p>
            <p>Email us (For Data Science Queries): admissions@accredian.com</p>
            <p>Email us (For Data Science Queries): admissions@accredian.com</p>
            <p>Email us (For Data Science Queries): admissions@accredian.com</p>
            <p>Why Accredian</p>
            <p>Follow Us</p>
            <div className='flex'>
              <img src={i1} className='h-8 w-8 mr-2'/>
              <img src={i2} className='h-8 w-8 mr-2'/>
              <img src={i3} className='h-8 w-8 mr-2'/>
              <img src={i4} className='h-8 w-8 mr-2'/>
              <img src={i5} className='h-8 w-8'/>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h1>Accredian</h1>
            <p>About</p>
            <p>Carrer</p>
            <p>Blog</p>
            <p>Admission Policy</p>
            <p>Referral Policy</p>
            <p>Privacy Policy</p>
            <p>Terms Of Service</p>
            <p>MAster FAQs</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
