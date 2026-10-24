export interface Department {
  id: string;
  name: string;
  shortName: string;
  category: 'critical' | 'specialized' | 'primary' | 'diagnostic';
  iconName: string;
  description: string;
  headDoctor: string;
  floor: string;
  waitTimesAvg: string;
  keyServices: string[];
}

export interface Service {
  id: string;
  title: string;
  department: string;
  description: string;
  features: string[];
  image: string;
  turnaroundTime?: string;
  coverage: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  qualification: string;
  experience: string;
  image: string;
  specialty: string;
  languages: string[];
  education: string;
  availability: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  department: string;
  rating: number;
  date: string;
  quote: string;
  outcome: string;
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'emergency',
    name: 'Emergency Care',
    shortName: 'Emergency',
    category: 'critical',
    iconName: 'Ambulance',
    description: 'Level 1 Trauma capability with 24/7 on-site emergency physicians, rapid triage, and integrated acute resuscitation bays.',
    headDoctor: 'Dr. Elena Rostova, MD',
    floor: 'Ground Floor, Wing A (Direct ER Entrance)',
    waitTimesAvg: '< 10 mins triage',
    keyServices: ['Trauma Resuscitation', 'Acute Cardiac Care', 'Stroke Intervention', 'Pediatric Emergency']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics Department',
    shortName: 'Pediatrics',
    category: 'primary',
    iconName: 'Baby',
    description: 'Compassionate, child-friendly care spanning newborn neonatal care, developmental screenings, and adolescent medicine.',
    headDoctor: 'Dr. Arthur Chen, MD, FAAP',
    floor: '2nd Floor, Wing C (Family Suite)',
    waitTimesAvg: 'On Schedule',
    keyServices: ['Neonatal Care (NICU)', 'Well-Child Checkups', 'Pediatric Pulmonology', 'Child Immunizations']
  },
  {
    id: 'cardiology',
    name: 'Cardiology Center',
    shortName: 'Cardiology',
    category: 'specialized',
    iconName: 'HeartPulse',
    description: 'Advanced cardiovascular diagnosis, catheterization labs, electrophysiology, and non-invasive cardiac rehabilitation.',
    headDoctor: 'Dr. Katherine Jenkins, MD, FACC',
    floor: '3rd Floor, Heart & Vascular Wing',
    waitTimesAvg: 'Prompt appointments',
    keyServices: ['Cardiac Cath Lab', 'Echocardiography & Stress Tests', 'Arrhythmia Management', 'Heart Failure Program']
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    shortName: 'Internal Medicine',
    category: 'primary',
    iconName: 'Stethoscope',
    description: 'Comprehensive adult health management, chronic disease prevention, executive checkups, and diagnostic consultations.',
    headDoctor: 'Dr. William Vance, MD',
    floor: '1st Floor, Outpatient Pavilion',
    waitTimesAvg: 'Same-day slots available',
    keyServices: ['Hypertension & Diabetes Care', 'Annual Physicals', 'Preventive Screenings', 'Infectious Diseases']
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Spine',
    shortName: 'Orthopedics',
    category: 'specialized',
    iconName: 'Bone',
    description: 'Pioneering minimally invasive joint replacements, complex spine surgery, sports trauma recovery, and physical therapy.',
    headDoctor: 'Dr. David Kim, MD, FAAOS',
    floor: '4th Floor, Musculoskeletal Center',
    waitTimesAvg: 'Fast consultations',
    keyServices: ['Robotic Knee & Hip Replacement', 'Arthroscopic Surgery', 'Spine Stabilization', 'Sports Medicine']
  },
  {
    id: 'surgery',
    name: 'General Surgery',
    shortName: 'Surgery',
    category: 'specialized',
    iconName: 'Syringe',
    description: 'State-of-the-art operating suites equipped with 3D laparoscopic and robotic surgical systems for rapid, painless healing.',
    headDoctor: 'Dr. Marcus Sterling, MD, FACS',
    floor: '5th Floor, Surgical Wing',
    waitTimesAvg: 'Pre-op scheduled',
    keyServices: ['Laparoscopic Cholecystectomy', 'Hernia Repair', 'Gastrointestinal Surgery', 'Minimally Invasive Oncology']
  },
  {
    id: 'obgyn',
    name: 'Obstetrics & Gynecology',
    shortName: 'OB/GYN',
    category: 'specialized',
    iconName: 'Sparkles',
    description: 'Holistic women’s healthcare, high-risk obstetric monitoring, private birthing suites, and specialized gynecological surgery.',
    headDoctor: 'Dr. Sophia Patel, MD, FACOG',
    floor: '2nd Floor, Women & Child Pavilion',
    waitTimesAvg: 'Personalized scheduling',
    keyServices: ['Prenatal & High-Risk Births', 'L-D-R Private Suites', 'Laparoscopic Hysterectomy', 'Well-Woman Care']
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Skin',
    shortName: 'Dermatology',
    category: 'specialized',
    iconName: 'ShieldPlus',
    description: 'Clinical skin pathology, mole mapping, skin cancer screening, allergy patch testing, and medical dermatology therapy.',
    headDoctor: 'Dr. Rachel Vance, MD',
    floor: '1st Floor, Suite 108',
    waitTimesAvg: 'Within 2 days',
    keyServices: ['Melanoma & Mole Screening', 'Psoriasis & Eczema Care', 'Dermatosurgery', 'Patch Allergy Diagnostics']
  },
  {
    id: 'ent',
    name: 'ENT & Otolaryngology',
    shortName: 'ENT',
    category: 'specialized',
    iconName: 'Headphones',
    description: 'Precision diagnostic endoscopy, sinus treatment, auditory screening, balance disorders, and pediatric airway care.',
    headDoctor: 'Dr. Sean Martinez, MD',
    floor: '3rd Floor, Suite 305',
    waitTimesAvg: 'Same-week appointments',
    keyServices: ['Endoscopic Sinus Surgery', 'Audiometry & Hearing Aids', 'Tonsillectomy', 'Voice & Swallowing Clinic']
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology & Eye Care',
    shortName: 'Eye Clinic',
    category: 'specialized',
    iconName: 'Eye',
    description: 'Complete ocular diagnostics, computer-guided cataract surgery, glaucoma therapies, and vitreoretinal assessments.',
    headDoctor: 'Dr. Lisa Fong, MD',
    floor: '1st Floor, Suite 112',
    waitTimesAvg: 'Regular clinic hours',
    keyServices: ['Advanced Cataract Phaco', 'Glaucoma Laser Therapy', 'Diabetic Retinopathy Care', 'Corneal Diagnostics']
  },
  {
    id: 'dental',
    name: 'Dental Care & Maxillofacial',
    shortName: 'Dental Care',
    category: 'primary',
    iconName: 'Smile',
    description: 'Full-spectrum oral surgery, preventive hygiene, digital 3D dental scanning, implants, and emergency dental trauma.',
    headDoctor: 'Dr. Anthony Wright, DDS',
    floor: 'Ground Floor, Suite 102',
    waitTimesAvg: 'Walk-ins for emergency',
    keyServices: ['Emergency Tooth Extraction', 'Dental Implants', 'Oral Pathology', 'Pediatric Dentistry']
  },
  {
    id: 'diagnostics',
    name: 'Diagnostic Services & Lab',
    shortName: 'Diagnostics',
    category: 'diagnostic',
    iconName: 'Scan',
    description: 'Fully automated medical imaging and accredited clinical pathology lab providing rapid, ultra-precise test results.',
    headDoctor: 'Dr. Aaron Meyer, MD',
    floor: 'Basement Level 1 & Ground Floor',
    waitTimesAvg: 'Results within 2-4 hrs',
    keyServices: ['3T High-Field MRI', '128-Slice Low-Dose CT', 'Digital 3D Mammography', 'Full Clinical Pathology']
  }
];

export const SERVICES: Service[] = [
  {
    id: 'emergency-critical',
    title: 'Emergency and Critical Care',
    department: 'Emergency Care',
    description: 'Round-the-clock emergency medical response with direct ambulance bay access, Level 1 trauma facilities, and rapid cardiac resuscitation units.',
    features: ['24/7 Immediate Board-Certified Physician Access', 'Dedicated Trauma ICU Bays', 'Rapid Stroke & Infarct Protocol', 'Integrated Pediatric ER'],
    image: '/src/assets/images/hospital_hero_consultation_1792823508472.jpg',
    coverage: 'Covered by all major insurance networks'
  },
  {
    id: 'diagnostic-imaging',
    title: 'Diagnostic Imaging & Radiology',
    department: 'Diagnostic Services',
    description: 'High-resolution imaging including 3-Tesla silent MRI, 128-slice CT scans, 4D ultrasound, and digital fluoroscopy for pinpoint diagnosis.',
    features: ['Ultra-Low Radiation CT Scanner', 'Silent 3T Wide-Bore MRI', 'Same-Day Digital Reports', 'Sub-specialist Radiologist Reading'],
    image: '/public/assets/aistudio/image_9b76aa39.png',
    turnaroundTime: 'Under 2 hours for urgent cases',
    coverage: 'Direct billing available'
  },
  {
    id: 'specialized-surgeries',
    title: 'Specialized & Robotic Surgeries',
    department: 'General Surgery',
    description: 'Next-generation laminar airflow operating theaters with 4K robotic surgical platforms for minimally invasive procedures and swift patient recovery.',
    features: ['Robotic-Assisted Precision Surgery', 'HEPA Laminar Flow Sterile Suites', 'Dedicated Post-Anesthesia Care (PACU)', 'Same-Day Laparoscopic Procedures'],
    image: '/public/assets/aistudio/image_9b76aa39.png',
    coverage: 'Inpatient and outpatient surgery benefits apply'
  },
  {
    id: 'laboratory-testing',
    title: 'Laboratory Testing & Pathology',
    department: 'Diagnostic Services',
    description: 'Accredited automated clinical laboratories offering complete biochemistry, microbiology, hematology, immunology, and molecular testing.',
    features: ['Automated Track Testing Systems', 'Online Secure Portal Result Access', 'Routine Labs in 60 Minutes', 'Molecular PCR & Genetics'],
    image: '/src/assets/images/hospital_interior_hall_1792823509439.jpg',
    turnaroundTime: 'Routine results in 1-2 hours',
    coverage: '100% covered under preventative health plans'
  },
  {
    id: 'inpatient-outpatient',
    title: 'Inpatient and Outpatient Care',
    department: 'General Medicine',
    description: 'Spacious, sunlit private rooms designed for healing, complete with 24/7 dedicated nursing, telemetry monitoring, and comfortable family sleeper amenities.',
    features: ['Private En-suite Patient Rooms', 'Individual Nurse Call & Monitoring', 'Nutritional Chef-Crafted Menus', 'Quiet Therapeutic Environment'],
    image: '/src/assets/images/hospital_interior_hall_1792823509439.jpg',
    coverage: 'Direct admission coordination'
  },
  {
    id: 'pharmacy',
    title: '24/7 On-Site Licensed Pharmacy',
    department: 'Pharmacy',
    description: 'Comprehensive inpatient dispensary and retail pharmacy stocking essential prescriptions, specialized oncology therapies, and surgical supplies.',
    features: ['24-Hour Walk-up & Drive-Thru', 'Pharmacist Medication Counseling', 'Automated Refill Program', 'Direct Bedside Discharge Delivery'],
    image: '/src/assets/images/hospital_hero_consultation_1792823508472.jpg',
    coverage: 'Accepts all major prescription cards'
  },
  {
    id: 'ambulance-services',
    title: 'Ambulance & Mobile ICU Services',
    department: 'Emergency Care',
    description: 'GPS-tracked, ALS-equipped mobile intensive care ambulances staffed by certified emergency paramedics and flight-ready medical transport teams.',
    features: ['On-board Ventilators & Defibrillators', 'Telemetry Broadcast to ER En Route', 'Average 7.4 Minute Urban Response', 'Inter-Facility ICU Transfer'],
    image: '/public/assets/aistudio/image_9b76aa39.png',
    turnaroundTime: 'Immediate dispatch 24/7',
    coverage: 'Emergency coverage accepted'
  },
  {
    id: 'preventive-checkups',
    title: 'Preventive Health Checkups',
    department: 'General Medicine',
    description: 'Tailored preventative wellness packages including cardiac risk profiles, metabolic panels, cancer markers, and full clinical consultations.',
    features: ['Customized Age & Gender Packages', 'Same-Day Comprehensive Physician Review', 'Actionable Lifestyle Wellness Roadmap', 'Early Warning Risk Detection'],
    image: '/src/assets/images/hospital_interior_hall_1792823509439.jpg',
    turnaroundTime: 'Complete assessment in half a day',
    coverage: 'Eligible for annual health plans'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-jenkins',
    name: 'Dr. Katherine Jenkins',
    title: 'Chief Interventional Cardiologist',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    qualification: 'MD, FACC, FSCAI',
    experience: '15+ Years Experience',
    specialty: 'Coronary Interventions, Angioplasty & Heart Failure',
    image: '/src/assets/images/doctor_cardiologist_1792823509513.jpg',
    languages: ['English', 'Spanish'],
    education: 'Johns Hopkins School of Medicine, Fellow of American College of Cardiology',
    availability: 'Mon, Wed, Fri (9:00 AM - 4:00 PM)'
  },
  {
    id: 'dr-chen',
    name: 'Dr. Arthur Chen',
    title: 'Director of Pediatric Medicine',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics Department',
    qualification: 'MD, FAAP',
    experience: '18+ Years Experience',
    specialty: 'Neonatal Critical Care & Pediatric Immunology',
    image: '/src/assets/images/doctor_pediatrician_1792823509640.jpg',
    languages: ['English', 'Mandarin'],
    education: 'Harvard Medical School, Boston Children’s Hospital Residency',
    availability: 'Mon - Thu (8:30 AM - 5:00 PM)'
  },
  {
    id: 'dr-sterling',
    name: 'Dr. Marcus Sterling',
    title: 'Head of Surgical Services',
    departmentId: 'surgery',
    departmentName: 'General Surgery',
    qualification: 'MD, FACS',
    experience: '20+ Years Experience',
    specialty: 'Robotic Laparoscopy & Gastrointestinal Surgery',
    image: '/src/assets/images/hospital_hero_consultation_1792823508472.jpg',
    languages: ['English', 'French'],
    education: 'Mayo Clinic College of Medicine, Chief Resident at Cleveland Clinic',
    availability: 'Tue, Thu, Sat (8:00 AM - 2:00 PM)'
  },
  {
    id: 'dr-rostova',
    name: 'Dr. Elena Rostova',
    title: 'Lead Emergency Physician',
    departmentId: 'emergency',
    departmentName: 'Emergency Care',
    qualification: 'MD, FACEP',
    experience: '12+ Years Experience',
    specialty: 'Trauma Life Support & Resuscitative Medicine',
    image: '/src/assets/images/doctor_cardiologist_1792823509513.jpg',
    languages: ['English', 'Russian'],
    education: 'Columbia University Vagelos College of Physicians and Surgeons',
    availability: 'Emergency Department Rota (24/7 Coverage)'
  },
  {
    id: 'dr-kim',
    name: 'Dr. David Kim',
    title: 'Senior Orthopedic Surgeon',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Spine',
    qualification: 'MD, FAAOS',
    experience: '16+ Years Experience',
    specialty: 'Minimally Invasive Joint Replacement & Sports Injuries',
    image: '/src/assets/images/doctor_pediatrician_1792823509640.jpg',
    languages: ['English', 'Korean'],
    education: 'Stanford University School of Medicine, Hospital for Special Surgery Fellow',
    availability: 'Mon, Wed, Fri (10:00 AM - 5:30 PM)'
  },
  {
    id: 'dr-patel',
    name: 'Dr. Sophia Patel',
    title: 'Lead Obstetrician & Gynecologist',
    departmentId: 'obgyn',
    departmentName: 'Obstetrics & Gynecology',
    qualification: 'MD, FACOG',
    experience: '14+ Years Experience',
    specialty: 'Maternal-Fetal Health & Minimally Invasive Gynecologic Surgery',
    image: '/src/assets/images/doctor_cardiologist_1792823509513.jpg',
    languages: ['English', 'Hindi', 'Gujarati'],
    education: 'Penn Medicine Perelman School of Medicine',
    availability: 'Tue, Wed, Fri (9:00 AM - 4:30 PM)'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Eleanor Vance',
    location: 'Metro City, West End',
    department: 'Cardiology Center',
    rating: 5,
    date: 'Two weeks ago',
    quote: 'The cardiac team under Dr. Jenkins was exceptional from the minute I stepped into the diagnostic center. The nurses explained every monitor reading, putting my family at total ease. The facilities are as serene and immaculate as a five-star retreat.',
    outcome: 'Successful stent placement with discharge in 36 hours'
  },
  {
    id: 'test-2',
    author: 'David & Sarah Henderson',
    location: 'Pinecrest Valley',
    department: 'Pediatrics Department',
    rating: 5,
    date: 'Last month',
    quote: 'Dr. Arthur Chen has been an incredible blessing for our 4-year-old son Lucas. The pediatric wing has games, gentle lighting, and an atmosphere that eliminated all fear. Their rapid diagnosis and gentle bedside care make CarePlus the only hospital we trust.',
    outcome: 'Full recovery from acute pediatric bronchitis'
  },
  {
    id: 'test-3',
    author: 'Robert MacIntyre',
    location: 'Riverside District',
    department: 'Orthopedics & Spine',
    rating: 5,
    date: '3 weeks ago',
    quote: 'I underwent a robotic total knee replacement with Dr. David Kim. Three days post-op I was walking comfortably with the physical therapists. The digital scheduling and attentive care nurses were flawless.',
    outcome: 'Restored full mobility without pain'
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: 'Stethoscope',
    title: 'Experienced Medical Professionals',
    description: 'Over 120 board-certified physicians, senior surgeons, and specialized nurses with decades of combined clinical excellence.'
  },
  {
    icon: 'Cpu',
    title: 'Modern Medical Equipment',
    description: 'Equipped with 3T MRI, 128-slice CT scanners, 4K robotic surgery arms, and automated laboratory diagnostics.'
  },
  {
    icon: 'Clock',
    title: '24/7 Emergency Support',
    description: 'Level 1 Trauma capability, direct ambulance bays, and around-the-clock emergency surgical and resuscitation teams.'
  },
  {
    icon: 'HeartHandshake',
    title: 'Patient-Centered Care',
    description: 'Transparent communication, private recovery rooms, zero-stress intake, and personalized care coordination from day one.'
  },
  {
    icon: 'Building2',
    title: 'Comprehensive Medical Services',
    description: '12 dedicated departments covering every medical specialty from pediatrics and cardiology to diagnostic pathology and rehab.'
  },
  {
    icon: 'Sparkles',
    title: 'Clean and Comfortable Facilities',
    description: 'Hospital environments built with hospital-grade HEPA filtration, natural light architecture, and private family lounges.'
  }
];

export const HOSPITAL_INFO = {
  name: 'CarePlus Medical',
  tagline: 'Compassionate Care for You and Your Family',
  address: '1450 Meadowbrook Boulevard, Health Pavilion Suite 100, Metro City, MC 90210',
  phone: '+1 (800) 427-3758',
  phoneDisplay: '(800) 427-PLUS',
  emergencyHotline: '+1 (800) 999-CARE',
  emergencyDisplay: '911 or (800) 999-2273',
  email: 'care@careplusmedical.org',
  appointmentsEmail: 'appointments@careplusmedical.org',
  hours: {
    emergency: 'Open 24 Hours / 7 Days a Week',
    outpatient: 'Monday – Friday: 7:30 AM – 8:00 PM',
    weekend: 'Saturday: 8:00 AM – 6:00 PM | Sunday: 9:00 AM – 4:00 PM',
    visitingHours: 'Daily: 10:00 AM – 8:00 PM (Private suites open 24/7 for immediate family)'
  }
};
