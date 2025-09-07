import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'th' | 'es';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Default translations
const translations: Record<string, { en: string; th: string; es?: string }> = {
  'applyNow': {
    en: 'Apply Now Madrid Porn Audition',
    th: 'สมัครตอนนี้ การออดิชั่นหนังโป๊มาดริด',
    es: 'Aplique ahora para la audición de porno en Madrid'
  },
  'successStories': {
    en: 'Success Stories from Our Talent in Madrid',
    th: 'เรื่องราวความสำเร็จของนักแสดงของเราในมาดริด',
    es: 'Historias de éxito de nuestro talento en Madrid'
  },
  'faq': {
    en: 'Frequently Asked Questions',
    th: 'คำถามที่พบบ่อย',
    es: 'Preguntas Frecuentes'
  },
  'contactUs': {
    en: 'Contact Us Now in Madrid',
    th: 'ติดต่อเราเดี๋ยวนี้ในมาดริด',
    es: 'Contáctanos ahora en Madrid'
  },
  'startYourJourney': {
    en: 'Start Your Career in Madrid Today',
    th: 'เริ่มต้นอาชีพของคุณในมาดริดวันนี้',
    es: 'Comienza tu carrera en Madrid hoy'
  },
  'namePlaceholder': {
    en: 'Your Full Name',
    th: 'ชื่อ-นามสกุลของคุณ',
    es: 'Tu nombre completo'
  },
  'agePlaceholder': {
    en: 'Your Age',
    th: 'อายุของคุณ',
    es: 'Tu edad'
  },
  'cityPlaceholder': {
    en: 'Your City in Spain',
    th: 'เมืองที่คุณอยู่ในสเปน',
    es: 'Tu ciudad en España'
  },
  'emailPlaceholder': {
    en: 'Your Email Address',
    th: 'ที่อยู่อีเมลของคุณ',
    es: 'Tu dirección de correo electrónico'
  },
  'socialMediaPlaceholder': {
    en: 'Social Media and telephone number (Optional)',
    th: 'โซเชียลมีเดียและหมายเลขโทรศัพท์ (ไม่จำเป็น)',
    es: 'Redes sociales y número de teléfono (Opcional)'
  },
  'messagePlaceholder': {
    en: 'Tell us about yourself and why you want to join Madrid\'s adult industry',
    th: 'บอกเราเกี่ยวกับตัวคุณและเหตุผลที่ต้องการเข้าร่วมอุตสาหกรรมสำหรับผู้ใหญ่ของมาดริด',
    es: 'Cuéntanos sobre ti y por qué quieres unirte a la industria para adultos de Madrid'
  },
  'submitButton': {
    en: 'Apply Now',
    th: 'สมัครเลย',
    es: 'Aplicar Ahora'
  },
  'submitting': {
    en: 'Submitting...',
    th: 'กำลังส่ง...',
    es: 'Enviando...'
  },
  'submitted': {
    en: 'Thank you! We\'ll be in touch soon.',
    th: 'ขอบคุณ! เราจะติดต่อคุณเร็วๆ นี้',
    es: '¡Gracias! Nos pondremos en contacto contigo pronto.'
  },
  'errorSubmitting': {
    en: 'Error submitting form. Please try again.',
    th: 'เกิดข้อผิดพลาดในการส่งแบบฟอร์ม โปรดลองอีกครั้ง',
    es: 'Error al enviar el formulario. Por favor, inténtalo de nuevo.'
  },
  'couldBeNext': {
    en: 'Could you be our next success story in Madrid?',
    th: 'คุณจะเป็นเรื่องราวความสำเร็จถัดไปของเราในมาดริดหรือไม่?'
  },
  'mainTitle': {
    en: 'MADRID CASTING PORN AUDITION',
    th: 'การคัดเลือกนักแสดงหนังโป๊มาดริด',
    es: 'CASTING DE PELÍCULAS PARA ADULTOS EN MADRID'
  },
  'mainSubtitle': {
    en: 'Start your career in Madrid\'s adult entertainment industry today',
    th: 'เริ่มต้นอาชีพของคุณในอุตสาหกรรมสำหรับผู้ใหญ่ของมาดริดวันนี้'
  },
  'faqQuestion1': {
    en: 'I have no experience. Can I still apply in Madrid?',
    th: 'ฉันไม่มีประสบการณ์ ยังสมัครได้ไหมในมาดริด?'
  },
  'faqAnswer1': {
    en: 'Absolutely! Many successful performers in Madrid\'s adult industry started with no prior experience. We work with production companies that provide training and support for newcomers. Your willingness to learn and positive attitude are what matter most. We believe in your potential!',
    th: 'แน่นอน! นักแสดงหลายคนในวงการผู้ใหญ่ของมาดริดเริ่มต้นจากไม่มีประสบการณ์มาก่อน เราทำงานกับบริษัทผลิตที่ให้การฝึกอบรมและสนับสนุนผู้เริ่มต้น ความตั้งใจที่จะเรียนรู้และทัศนคติที่ดีของคุณคือสิ่งที่สำคัญที่สุด เราเชื่อในศักยภาพของคุณ!'
  },
  'faqQuestion2': {
    en: 'What body types and looks are you looking for in Madrid?',
    th: 'คุณมองหาลักษณะรูปร่างแบบไหนบ้างในมาดริด?'
  },
  'faqAnswer2': {
    en: 'The adult entertainment industry in Madrid values diversity! There is demand for all body types, ages, and looks. What matters most is your confidence, professionalism, and enthusiasm. Whether you\'re curvy, slim, tall, or petite, there are opportunities for you. Your unique qualities are what make you stand out.',
    th: 'วงการบันเทิงสำหรับผู้ใหญ่ในมาดริดให้คุณค่ากับความหลากหลาย! มีความต้องการทุกรูปร่าง ทุกวัย และทุกรูปลักษณ์ สิ่งสำคัญที่สุดคือความมั่นใจ ความเป็นมืออาชีพ และความกระตือรือร้นของคุณ ไม่ว่าคุณจะรูปร่างแบบไหน มีโอกาสสำหรับคุณทั้งนั้น คุณสมบัติเฉพาะตัวของคุณคือสิ่งที่ทำให้คุณโดดเด่น'
  },
  'faqQuestion3': {
    en: 'What kind of income can I expect in Madrid?',
    th: 'ฉันสามารถคาดหวังรายได้เท่าไหร่ในมาดริด?'
  },
  'faqAnswer3': {
    en: 'Earnings in Madrid\'s adult entertainment industry can be very lucrative, often far exceeding traditional job opportunities. Your income will depend on various factors including the type of work, your experience level, and your dedication. Many of our talents earn significantly more than they could in conventional jobs, with the potential for six-figure annual incomes for top performers.',
    th: 'รายได้ในวงการบันเทิงสำหรับผู้ใหญ่ในมาดริดอาจทำเงินได้มาก มักจะสูงกว่างานทั่วไปหลายเท่า รายได้ของคุณจะขึ้นอยู่กับหลายปัจจัยรวมถึงประเภทของงาน ระดับประสบการณ์ และความทุ่มเท ของเราหลายคนมีรายได้มากกว่าการทำงานทั่วไปอย่างมาก โดยมีศักยภาพในการสร้างรายได้หลักล้านต่อปีสำหรับนักแสดงที่ประสบความสำเร็จสูงสุด'
  },
  'faqQuestion4': {
    en: 'What kind of schedule will I have in Madrid?',
    th: 'ฉันจะมีตารางงานแบบไหนในมาดริด?'
  },
  'faqAnswer4': {
    en: 'We offer flexible scheduling to accommodate your needs in Madrid. Many of our talents work part-time or choose their own hours. Whether you\'re looking for full-time work or just want to supplement your income, we can help find opportunities that fit your schedule. Some projects may require specific time commitments, but we\'ll always be upfront about expectations.',
    th: 'เรามีตารางเวลาที่ยืดหยุ่นเพื่อตอบสนองความต้องการของคุณในมาดริด นักแสดงหลายคนของเราทำงานพาร์ทไทม์หรือเลือกชั่วโมงทำงานของตัวเอง ไม่ว่าคุณกำลังมองหางานเต็มเวลาหรือเพียงแค่อยากหารายได้เสริม เราสามารถช่วยหาส่วนที่เหมาะกับตารางเวลาของคุณได้ โครงการบางโครงการอาจต้องใช้เวลาเฉพาะ แต่เราจะบอกความคาดหวังล่วงหน้าเสมอ'
  },
  'faqQuestion5': {
    en: 'Is it safe to work in the adult industry in Madrid?',
    th: '¿Es seguro trabajar en la industria para adultos en Madrid?'
  },
  'faqAnswer5': {
    en: 'Your safety is our top priority in Madrid\'s regulated adult entertainment industry. We work exclusively with licensed, professional production companies that maintain the highest European standards of safety and discretion. All our partners are thoroughly vetted to ensure they provide safe working conditions and strictly respect performers\' boundaries. We also provide comprehensive guidance on best practices for maintaining privacy and security in this industry.',
    th: 'Tu seguridad es nuestra máxima prioridad en la industria del entretenimiento para adultos de Madrid, que está regulada. Trabajamos exclusivamente con productoras profesionales con licencia que mantienen los más altos estándares europeos de seguridad y discreción. Todos nuestros socios son minuciosamente evaluados para garantizar que ofrecen condiciones de trabajo seguras y respetan estrictamente los límites de los artistas. También ofrecemos orientación completa sobre las mejores prácticas para mantener la privacidad y seguridad en esta industria.'
  },
  'faqQuestion6': {
    en: 'What is the lifestyle like as an adult performer in Madrid?',
    th: '¿Cómo es el estilo de vida de un artista para adultos en Madrid?'
  },
  'faqAnswer6': {
    en: 'Working in Madrid\'s adult entertainment industry offers an exciting European lifestyle with a perfect work-life balance. Many of our talents enjoy flexible schedules that allow them to explore Spain\'s rich cultural heritage, beautiful cities, and stunning Mediterranean coastline during their free time. You\'ll be part of a professional community of like-minded individuals in one of Europe\'s most vibrant capitals. The work can be demanding but is also incredibly rewarding both personally and financially, with opportunities to travel throughout Spain and Europe.',
    th: 'Trabajar en la industria del entretenimiento para adultos en Madrid ofrece un emocionante estilo de vida europeo con un perfecto equilibrio entre trabajo y vida personal. Muchos de nuestros artistas disfrutan de horarios flexibles que les permiten explorar la rica herencia cultural de España, sus hermosas ciudades y la impresionante costa mediterránea durante su tiempo libre. Formarás parte de una comunidad profesional de personas con intereses similares en una de las capitales más vibrantes de Europa. El trabajo puede ser exigente, pero también es increíblemente gratificante tanto a nivel personal como económico, con oportunidades para viajar por toda España y Europa.'
  },
  'faqQuestion7': {
    en: 'How quickly can I start working in Madrid?',
    th: 'ฉันจะเริ่มงานได้เร็วแค่ไหนในมาดริด?'
  },
  'faqAnswer7': {
    en: 'The process is quick and straightforward. Once you contact us, we will guide you through every step, from preparing for your audition to connecting you with production companies looking for talent like yours. Our goal is to get you ready for your first shift as soon as possible, so you can start enjoying the benefits of your new career without delay.',
    th: 'กระบวนการนี้รวดเร็วและตรงไปตรงมา เมื่อคุณติดต่อเรา เราจะแนะนำคุณในทุกขั้นตอน ตั้งแต่การเตรียมตัวสำหรับการออดิชัน ไปจนถึงการเชื่อมต่อคุณกับบริษัทผลิตที่กำลังมองหาคนที่มีความสามารถแบบคุณ เป้าหมายของเราคือเตรียมความพร้อมให้คุณสำหรับกะแรกให้เร็วที่สุด เพื่อที่คุณจะได้เริ่มต้นใช้ประโยชน์จากอาชีพใหม่ของคุณโดยไม่ชักช้า'
  },
  'faqQuestion8': {
    en: 'How do I get started in Madrid?',
    th: 'ฉันจะเริ่มต้นได้อย่างไรในมาดริด?'
  },
  'faqAnswer8': {
    en: 'It\'s simple! All you need to do is reach out to us. We will guide you through the process, answer all your questions, and connect you with the best opportunities in Madrid. Your dream career is just a message away. Contact us now to take the first step!',
    th: '¡Es muy sencillo! Todo lo que necesitas es contactarnos. Te guiaremos a través del proceso, responderemos todas tus preguntas y te conectaremos con las mejores oportunidades en Madrid. La carrera de tus sueños está a solo un mensaje de distancia. ¡Contáctanos ahora para dar el primer paso!'
  },
  'welcomeText': {
    en: 'Welcome to Madrid\'s premier adult entertainment casting platform! Are you looking for an exciting new opportunity in Madrid\'s adult industry? We connect talented individuals with top production companies and agencies across Madrid. Whether you\'re experienced or new to the industry, our platform provides everything you need to start your career. Begin your journey with us today!',
    th: 'ยินดีต้อนรับสู่แพลตฟอร์มการคัดเลือกนักแสดงสำหรับผู้ใหญ่ชั้นนำของมาดริด! คุณกำลังมองหาโอกาสใหม่ที่น่าตื่นเต้นในอุตสาหกรรมสำหรับผู้ใหญ่ของมาดริดหรือไม่? เราเชื่อมต่อบุคคลที่มีพรสวรรค์กับบริษัทผลิตและเอเจนซี่ชั้นนำทั่วมาดริด ไม่ว่าคุณจะมีประสบการณ์หรือเพิ่งเริ่มต้นในอุตสาหกรรม แพลตฟอร์มของเรามีทุกสิ่งที่คุณต้องการเพื่อเริ่มต้นอาชีพของคุณ เริ่มต้นการเดินทางของคุณกับเราวันนี้!',
    es: '¡Bienvenido a la principal plataforma de casting para adultos de Madrid! ¿Buscas una nueva y emocionante oportunidad en la industria del entretenimiento para adultos de Madrid? Conectamos a personas talentosas con las mejores productoras y agencias de Madrid. Ya seas experimentado o nuevo en la industria, nuestra plataforma te ofrece todo lo que necesitas para comenzar tu carrera. ¡Comienza tu viaje con nosotros hoy mismo!'
  },
  'findYourPerfectJob': {
    en: 'Explore Exciting Opportunities in Madrid',
    th: 'ค้นหาโอกาสที่น่าตื่นเต้นในมาดริด',
    es: 'Explora emocionantes oportunidades en Madrid'
  },
  'job1': {
    en: 'Adult Film Talent: Various roles available in Madrid',
    th: 'นักแสดงภาพยนตร์ผู้ใหญ่: รับสมัครหลายบทบาทในมาดริด',
    es: 'Talento para cine para adultos: varios papeles disponibles en Madrid'
  },
  'job2': {
    en: 'Webcam Model: Work from home in Madrid',
    th: 'นางแบบเว็บแคม: ทำงานจากที่บ้านในมาดริด',
    es: 'Modelo de webcam: Trabaja desde casa en Madrid'
  },
  'job3': {
    en: 'Content Creator: Create your own content in Madrid',
    th: 'ผู้สร้างเนื้อหา: สร้างเนื้อหาของคุณเองในมาดริด',
    es: 'Creador de contenido: Crea tu propio contenido en Madrid'
  },
  'job4': {
    en: 'Featured Performer: High-profile projects in Madrid',
    th: 'นักแสดงนำ: โครงการระดับไฮเอนด์ในมาดริด',
    es: 'Artista destacado: Proyectos de alto perfil en Madrid'
  },
  'whyChooseUs': {
    en: 'Why Choose Madrid Casting?',
    th: 'ทำไมต้องเลือกมาดริดแคสติ้ง?',
    es: '¿Por qué elegir Madrid Casting?'
  },
  'benefit1': {
    en: 'Direct connections with top Spanish production companies',
    th: 'การเชื่อมต่อโดยตรงกับบริษัทผลิตชั้นนำของสเปน',
    es: 'Conexiones directas con las mejores productoras españolas'
  },
  'benefit2': {
    en: 'Competitive compensation in Euros',
    th: 'ค่าตอบแทนเป็นยูโรที่แข่งขันได้',
    es: 'Compensación competitiva en euros'
  },
  'benefit3': {
    en: 'Safe and professional environment in Madrid',
    th: 'สภาพแวดล้อมที่ปลอดภัยและเป็นมืออาชีพในมาดริด',
    es: 'Entorno seguro y profesional en Madrid'
  },
  'benefit4': {
    en: 'Opportunities to work across Europe',
    th: 'โอกาสในการทำงานทั่วยุโรป',
    es: 'Oportunidades de trabajar en toda Europa'
  },
  'benefit5': {
    en: 'Support throughout your professional journey',
    th: 'การสนับสนุนตลอดเส้นทางอาชีพของคุณ',
    es: 'Apoyo durante toda tu trayectoria profesional'
  },
  'dontWait': {
    en: "Don't Wait, Your Opportunity in Spain's Adult Industry is Here! Madrid Casting Porn Audition",
    th: 'อย่ารอช้า โอกาสของคุณในวงการผู้ใหญ่ของสเปนอยู่ที่นี่แล้ว! การคัดเลือกนักแสดงหนังโป๊มาดริด',
    es: '¡No esperes más, aquí está tu oportunidad en la industria del entretenimiento para adultos de España! Casting de Porno en Madrid'
  },
  'browseListings': {
    en: 'Browse our latest opportunities and take the first step toward a new, exciting career in Spain\'s adult entertainment industry.',
    th: 'ค้นหาโอกาสล่าสุดของเราและก้าวแรกสู่เส้นทางอาชีพใหม่ที่น่าตื่นเต้นในวงการบันเทิงสำหรับผู้ใหญ่ของสเปน',
    es: 'Explora nuestras últimas oportunidades y da el primer paso hacia una nueva y emocionante carrera en la industria del entretenimiento para adultos de España.'
  },
  'nowHiring': {
    en: 'Now Casting: Top Production Companies Are Looking for New Talent in Madrid! • Ready to Begin? Start Your Career in Spain\'s Adult Industry',
    th: 'ตอนนี้กำลังรับสมัคร: บริษัทผลิตชั้นนำกำลังมองหาคนเก่งในมาดริด! • พร้อมเริ่มต้นหรือยัง? เริ่มต้นอาชีพของคุณในวงการผู้ใหญ่ของสเปน',
    es: 'Ahora haciendo casting: ¡Las mejores productoras buscan nuevo talento en Madrid! • ¿Listo para empezar? Comienza tu carrera en la industria del entretenimiento para adultos de España'
  },
  'nokName': {
    en: 'Nuria',
    th: 'นูเรีย',
    es: 'Nuria'
  },
  'nokReview': {
    en: 'Working in the adult industry in Madrid has completely transformed my life. The financial freedom is incredible - I can support my family back in Andalusia and still have plenty left for myself. The team has been incredibly supportive, making sure I feel safe and respected at all times. This opportunity has given me confidence I never knew I had!',
    th: 'การทำงานในอุตสาหกรรมสำหรับผู้ใหญ่ที่มาดริดได้เปลี่ยนชีวิตฉันไปอย่างสิ้นเชิง เสรีภาพทางการเงินนั้นเหลือเชื่อ ฉันสามารถสนับสนุนครอบครัวที่อันดาลูเซียและยังเหลือเงินเก็บส่วนตัวอีกมาก ทีมงานให้การสนับสนุนอย่างไม่น่าเชื่อ ทำให้ฉันรู้สึกปลอดภัยและได้รับการเคารพตลอดเวลา โอกาสนี้ทำให้ฉันมีความมั่นใจที่ไม่เคยรู้มาก่อนว่ามีอยู่!',
    es: 'Trabajar en la industria para adultos en Madrid ha transformado completamente mi vida. La libertad financiera es increíble: puedo mantener a mi familia en Andalucía y aún me sobra para mí. El equipo ha sido increíblemente solidario, asegurándose de que me sienta segura y respetada en todo momento. ¡Esta oportunidad me ha dado una confianza que nunca supe que tenía!'
  },
  'nokLocation': {
    en: 'Madrid, Spain',
    th: 'มาดริด สเปน',
    es: 'Madrid, España'
  },
  'sofiaName': {
    en: 'Sofía',
    th: 'โซเฟีย',
    es: 'Sofía'
  },
  'sofiaReview': {
    en: 'I was nervous at first about working in Madrid\'s adult industry, but the team made me feel so comfortable. The pay is excellent compared to other jobs in Spain, and I\'ve been able to save up for my future. The best part is the flexibility - I can work around my university schedule. I\'ve met amazing people and gained so much confidence through this experience.',
    th: 'ตอนแรกฉันกังวลเกี่ยวกับการทำงานในอุตสาหกรรมสำหรับผู้ใหญ่ที่มาดริด แต่ทีมงานทำให้ฉันรู้สึกสบายใจมาก ค่าตอบแทนดีกว่างานอื่นๆ ในสเปนมาก และฉันสามารถเก็บออมเพื่ออนาคตได้ ส่วนที่ดีที่สุดคือความยืดหยุ่น - ฉันสามารถทำงานควบคู่ไปกับการเรียนในมหาวิทยาลัยได้ ฉันได้พบคนที่น่าทึ่งและมีความมั่นใจมากขึ้นมากจากประสบการณ์นี้',
    es: 'Al principio estaba nerviosa por trabajar en la industria para adultos de Madrid, pero el equipo me hizo sentir muy cómoda. El pago es excelente en comparación con otros trabajos en España, y he podido ahorrar para mi futuro. La mejor parte es la flexibilidad: puedo compaginar el trabajo con mis estudios universitarios. He conocido a gente increíble y he ganado mucha confianza con esta experiencia.'
  },
  'sofiaLocation': {
    en: 'Barcelona, Spain',
    th: 'บาร์เซโลนา สเปน',
    es: 'Barcelona, España'
  },
  'luciaName': {
    en: 'Lucía',
    th: 'ลูเซีย',
    es: 'Lucía'
  },
  'luciaReview': {
    en: 'Working in Madrid\'s adult film industry has been life-changing. The income is more than I ever made in my previous jobs in Spain, and I love the creative aspect of the work. The production teams here are professional and respectful, and I always feel valued. I\'ve been able to travel across Spain and experience so much since starting in this industry.',
    th: 'การทำงานในอุตสาหกรรมภาพยนตร์สำหรับผู้ใหญ่ที่มาดริดได้เปลี่ยนชีวิตของฉัน รายได้มากกว่าที่ฉันเคยทำได้จากงานก่อนหน้านี้ในสเปน และฉันรักแง่มุมที่สร้างสรรค์ของงาน ทีมงานผลิตที่นี่เป็นมืออาชีพและให้ความเคารพ และฉันรู้สึกว่ามีคุณค่าอยู่เสมอ ฉันได้เดินทางไปทั่วยุโรปและได้รับประสบการณ์มากมายนับตั้งแต่เริ่มทำงานในอุตสาหกรรมนี้',
    es: 'Trabajar en la industria del cine para adultos en Madrid ha cambiado mi vida. Los ingresos son superiores a los de mis trabajos anteriores en España, y me encanta el aspecto creativo del trabajo. Los equipos de producción son profesionales y respetuosos, y siempre me siento valorada. He podido viajar por toda Europa y vivir experiencias increíbles desde que empecé en esta industria.'
  },
  'luciaLocation': {
    en: 'Valencia, Spain',
    th: 'บาเลนเซีย สเปน',
    es: 'Valencia, España'
  },
  'elenaName': {
    en: 'Elena',
    th: 'เอเลน่า',
    es: 'Elena'
  },
  'elenaReview': {
    en: 'I was hesitant at first about working in Spain\'s adult industry, but joining was the best decision I ever made. The financial stability has allowed me to pursue my dreams in Madrid, and I\'ve grown so much as a person. The team is like family, and I\'ve made friends for life. The work is empowering and has given me confidence I never knew I had!',
    th: 'ตอนแรกฉันลังเลที่จะทำงานในอุตสาหกรรมสำหรับผู้ใหญ่ของสเปน แต่การเข้าร่วมเป็นสิ่งที่ดีที่สุดที่ฉันเคยทำ ความมั่นคงทางการเงินทำให้ฉันสามารถไล่ตามความฝันในมาดริดได้ และฉันเติบโตขึ้นมากในฐานะบุคคล ทีมงานเป็นเหมือนครอบครัว และฉันได้เพื่อนไปตลอดชีวิต งานนี้ให้พลังและทำให้ฉันมีความมั่นใจที่ไม่เคยรู้มาก่อนว่ามีอยู่!',
    es: 'Al principio dudaba en trabajar en la industria para adultos de España, pero unirme fue la mejor decisión que he tomado. La estabilidad económica me ha permitido perseguir mis sueños en Madrid y he crecido mucho como persona. El equipo es como una familia y he hecho amigos para toda la vida. ¡El trabajo es empoderador y me ha dado una confianza que nunca supe que tenía!'
  },
  'elenaLocation': {
    en: 'Sevilla, Spain',
    th: 'เซบียา สเปน',
    es: 'Sevilla, España'
  },
  'carmenName': {
    en: 'Carmen',
    th: 'คาร์เมน',
    es: 'Carmen'
  },
  'carmenReview': {
    en: 'Working in Madrid\'s adult entertainment industry has been an incredibly empowering experience. The financial rewards have allowed me to achieve goals I never thought possible in Spain, and the professional environment is both supportive and respectful. The production companies here ensure we have everything we need to succeed while maintaining our privacy and well-being.',
    th: 'การทำงานในอุตสาหกรรมบันเทิงสำหรับผู้ใหญ่ที่มาดริดเป็นประสบการณ์ที่ให้พลังอย่างไม่น่าเชื่อ รางวัลทางการเงินทำให้ฉันบรรลุเป้าหมายที่คิดไม่ถึงว่าจะเป็นไปได้ในสเปน และสภาพแวดล้อมการทำงานให้ทั้งการสนับสนุนและความเคารพ บริษัทผลิตที่นี่ทำให้แน่ใจว่าเรามีทุกอย่างที่ต้องการเพื่อความสำเร็จในขณะที่ยังคงความเป็นส่วนตัวและความเป็นอยู่ที่ดีของเรา',
    es: 'Trabajar en la industria del entretenimiento para adultos en Madrid ha sido una experiencia increíblemente enriquecedora. Las recompensas económicas me han permitido alcanzar metas que nunca creí posibles en España, y el entorno profesional es a la vez solidario y respetuoso. Las productoras aquí se aseguran de que tengamos todo lo necesario para triunfar, manteniendo siempre nuestra privacidad y bienestar.'
  },
  'carmenLocation': {
    en: 'Madrid, Spain',
    th: 'มาดริด สเปน',
    es: 'Madrid, España'
  },
  'googleReview': {
    en: 'Google Review',
    th: 'รีวิวจาก Google',
    es: 'Reseña de Google'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else if (navigator.language.startsWith('es')) {
      setLanguage('es');
    } else if (navigator.language.startsWith('th')) {
      setLanguage('th');
    }
  }, []);

  const toggleLanguage = () => {
    let newLang: Language;
    switch (language) {
      case 'en': newLang = 'es'; break;
      case 'es': newLang = 'th'; break;
      case 'th': newLang = 'en'; break;
      default: newLang = 'en';
    }
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
