# OrthoCare - Portfolio Project Description  
  
**Live site:** https://orthocare-dentist.vercel.app  
**Stack:** Next.js 14 / React / TypeScript / TailwindCSS  
**Author:** Muneer Raja (2025)  
**Hosting:** Vercel  
  
---  
  
  
## Project Overview  
  
OrthoCare is a polished, production-grade business website for an orthodontic and dental care clinic. It is a modern responsive marketing and booking site built entirely with Next.js 14 and TailwindCSS. The site helps patients book appointments online, view dental services, browse before-and-after treatment photos, read testimonials, and find clinic details.  
  
---  
  
  
## Core Features  
  
- Fully functional online appointment booking system with a multi-step form and downloadable receipt.  
- Before-and-after image comparison slider to showcase real treatment results.  
- Three service categories: General, Cosmetic, and Surgical dentistry.  
- Comprehensive clinic, about, team, testimonials, pricing, and contact pages.  
- Mobile-first responsive layout with a mobile navigation toggle.  
- Clean professional branding with custom fonts, pattern backgrounds, and smooth hover transitions.  
- SEO-friendly setup with a dynamic sitemap, robots.txt, and canonical metadata.  
  
---  
  
  
## Site Structure and Pages  
  
- Home (/) - hero, care highlights, patient transformations, transparent pricing, visit-us, certifications, and a book-appointment call to action.  
- About (/about) - story, team, and testimonials.  
- Services (/services) - overview of three dental service categories.  
- Services / Cosmetic (/services/cosmetic) - Invisalign, veneers, whitening, bonding, implants, Botox.  
- Services / General (/services/general) - exams, cleanings, hygiene, fluoride, sealants, children's dentistry, mouthguards, sedation, TMJ/TMD treatment.  
- Services / Surgical (/services/surgical) - implants, root canals, extractions, dentures, bridges, inlays and onlays, same-day crowns.  
- Book Appointment (/book-appointment) - multi-step booking form plus a success page.  
- Contact Us (/contact-us) - contact form, clinic information, and FAQs.  
  
---  
  
  
## Booking System Details  
  
The booking flow is a three-step multi-step form:  
  
1. Reason and provider selection - for example, New patient cleaning and exam, Dental implant consult, or Invisalign consult, plus a provider selector.  
2. Patient info - first name, last name, email, cell phone, date of birth, and payment method (self-pay, RAMQ, or other).  
3. Confirmation and receipt - a review step and a result screen where patients can download the appointment receipt as PNG, JPG, PDF, or print it.  
  
The receipt generation uses the html-to-image library to produce a downloadable copy of the completed booking.  
  
---  
  
  
## Tech Stack  
  
- Framework and language: Next.js 14 (App Router), React 18, TypeScript  
- Styling: TailwindCSS, custom fonts (Inter and Merriweather via next/font/google), CSS custom properties  
- UI libraries: MUI, MUI date and time pickers, Font Awesome react icons  
- PDF and image export: html-to-image and jsPDF  
- Date and time: dayjs  
- Image comparison: react-compare-slider  
- Icons: Font Awesome free brands and solid icons  
  
---  
 
  
## Key Components  
  
- Navbar and MobileNavbar - desktop and mobile responsive navigation with a toggle.  
- Hero - branded hero section with a call to action.  
- Care - three service cards linking to General, Cosmetic, and Surgical services.  
- PatientTransformations - before-and-after comparison slider.  
- Pricing - transparent pricing with insurance information.  
- VisitUs - clinic address and directions with an embedded Google map.  
- Certifications - OHDQ, ACQ, and ODQ professional logos.  
- BookAppointmentForm - multi-step booking form.  
- AppointmentReceiptModal - receipt display and export options.  
- ReviewBox - patient testimonial display.  
- ServiceCardLinks, CosmeticServices, GeneralServices, SurgicalServices - service listings.  
  
---  
  
  
## Media and Assets  
  
All images live under public/media:  
  
- before-after - before and after teeth comparison images (teeth-a through teeth-e).  
- care - patient care photos.  
- services - cosmetic, general, and surgical treatment images.  
- team - dentist photos.  
- visit-us - clinic exterior photos.  
  
Branding and social icons are stored under public/svgs, including the OrthoCare logo and price and insurance icons.  
  
---  
  
  
## Hosting and Deployment  
  
- Deployed on Vercel.  
- Production URL: https://orthocare-dentist.vercel.app  
- Environment variable BASE_URL is set to the production URL and is used for canonical metadata and the sitemap.  
  
---  
  
  
## What I Learned  
  
- Built a Next.js 14 application with server-rendered routes and interactive client components for the booking experience.  
- Designed and implemented a multi-step booking form with client-side state and dynamic receipt generation.  
- Integrated and composed several third-party libraries into one coherent user experience.  
- Styled a responsive, accessible, conversion-focused marketing site with TailwindCSS.  
- Strengthened production workflow with linting, TypeScript, and Vercel deployment.  
  
---  
  
  
## Future Improvements  
  
- Connect the booking form to a backend or email service for real confirmation emails.  
- Add appointment reminders via SMS or email.  
- Add a blog section with educational content about dental care.  
- Run a WCAG 2.1 AA accessibility audit and improve compliance.  
- Add dark and light mode plus a richer animation library.  
  
---  
  
  
## Credits  
  
- Project made by Muneer Raja (2025).  
- Logo and website assets created by the project author. 
