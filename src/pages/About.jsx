import useIntersectionObserver from '../Hook/useIntersectionObserver';

const SectionTitle = ({ subtitle, title, description }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });
  const baseTransition = 'transition-all duration-700 ease-out';
  const initialStyle = 'opacity-0 translate-y-5';
  const finalStyle = 'opacity-100 translate-y-0';

  return (
    <div
      ref={ref}
      className={`mb-12 text-center md:mb-16 ${baseTransition} ${
        isVisible ? finalStyle : initialStyle
      }`}
    >
      {subtitle && (
        <span
          className={`inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-blue-700 uppercase bg-blue-100 rounded-full ${baseTransition} delay-100 ${
            isVisible ? finalStyle : initialStyle
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl ${baseTransition} delay-200 ${
          isVisible ? finalStyle : initialStyle
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl mx-auto mt-4 text-lg text-gray-600 md:text-xl ${baseTransition} delay-300 ${
            isVisible ? finalStyle : initialStyle
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, children, imageUrl, imageAlt, index }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });
  const animationDelay = isVisible ? `${index * 150}ms` : '0ms';
  const baseTransition = 'transition-all duration-500 ease-out transform';
  const initialStyle = 'opacity-0 translate-y-10';
  const finalStyle = 'opacity-100 translate-y-0';

  return (
    <div
      ref={ref}
      className={`flex flex-col p-6 bg-white shadow-lg md:p-8 rounded-xl hover:shadow-2xl hover:-translate-y-1 ${baseTransition} ${
        isVisible ? finalStyle : initialStyle
      }`}
      style={{ transitionDelay: animationDelay }}
    >
      {icon && !imageUrl && (
        <div className="flex items-center justify-center w-12 h-12 mb-5 text-blue-600 bg-blue-100 rounded-full">
          {icon}
        </div>
      )}
      {imageUrl && (
        <div className="w-full h-40 mb-5 overflow-hidden rounded-md">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <h3 className="mb-3 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="flex-grow leading-relaxed text-gray-600">{children}</p>
    </div>
  );
};

// Contoh Ikon SVG
const MissionIconSvg = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    ></path>
  </svg>
);

const ValuesIconSvg = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    ></path>
  </svg>
);

const About = () => {
  const [heroRef, isHeroVisible] = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [introContentRef, isIntroContentVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [introImageRef, isIntroImageVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const baseTransition = 'transition-all duration-1000 ease-out';
  const initialFadeInUp = 'opacity-0 translate-y-10';
  const visibleStyle = 'opacity-100 translate-y-0';

  return (
    <div className="antialiased text-gray-700 bg-slate-50">
      {/* Bagian Hero */}
      <section
        ref={heroRef}
        className={`relative py-20 text-white bg-gradient-to-r from-blue-600 to-indigo-700 md:py-28 ${baseTransition} ${
          isHeroVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 opacity-10"></div>
        <div className="container relative px-6 mx-auto text-center md:px-12 lg:px-16">
          <h1
            className={`mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl ${baseTransition} delay-200 ${
              isHeroVisible ? visibleStyle : initialFadeInUp
            }`}
          >
            <span className="text-blue-300">SIRESITA</span>
          </h1>
          <p
            className={`max-w-3xl mx-auto text-lg leading-relaxed md:text-xl text-indigo-100 ${baseTransition} delay-300 ${
              isHeroVisible ? visibleStyle : initialFadeInUp
            }`}
          >
            Memahami lebih dalam bagaimana SIRESITA hadir untuk merevolusi
            pengalaman perjalanan wisata Anda di Sumatera dengan sentuhan
            teknologi AI yang personal.
          </p>
        </div>
      </section>

      {/* Bagian Pengenalan SIRESITA */}
      <section className="py-16 md:py-24">
        <div className="container px-6 mx-auto md:px-12 lg:px-16">
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
            <div
              ref={introContentRef}
              className={`prose prose-lg max-w-none prose-slate ${baseTransition} ${
                isIntroContentVisible ? visibleStyle : initialFadeInUp
              }`}
            >
              <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                Lebih Dari Sekadar Rekomendasi
              </h2>
              <p>
                SIRESITA adalah platform perencanaan wisata berbasis Kecerdasan
                Buatan (AI) yang dirancang khusus untuk mempermudah Anda
                menjelajahi keindahan dan keragaman Pulau Sumatera. Kami percaya
                bahwa setiap orang berhak mendapatkan pengalaman perjalanan yang
                unik dan disesuaikan dengan preferensi pribadi.
              </p>
              <p>
                Dengan SIRESITA, lupakan kerumitan riset destinasi yang memakan
                waktu. Sistem cerdas kami akan menganalisis minat Anda, gaya
                perjalanan, dan anggaran untuk memberikan rekomendasi yang
                paling relevan dan menarik, mulai dari permata tersembunyi
                hingga ikon pariwisata populer.
              </p>
            </div>
            <div
              ref={introImageRef}
              className={`${baseTransition} delay-200 ${
                isIntroImageVisible
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsJTIwYmVhdXRpZnVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                alt="Pemandangan danau yang menakjubkan dengan pegunungan di Sumatera"
                className="object-cover w-full h-auto shadow-xl rounded-xl aspect-video md:aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Misi dan Visi */}
      <section className="py-16 bg-white md:py-24">
        <div className="container px-6 mx-auto md:px-12 lg:px-16">
          <SectionTitle
            subtitle="Fondasi Kami"
            title="Misi & Visi SIRESITA"
            description="Bagaimana kami berupaya memberikan dampak positif bagi para traveler dan pariwisata Sumatera."
          />
          <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-2 lg:gap-10">
            <FeatureCard
              icon={<MissionIconSvg />}
              title="Misi Utama Kami"
              index={0}
            >
              Menyediakan platform rekomendasi wisata yang cerdas, personal, dan
              mudah diakses untuk semua orang. Kami bertujuan untuk
              menginspirasi lebih banyak orang menjelajahi kekayaan Sumatera
              sambil mendukung ekosistem pariwisata lokal secara berkelanjutan.
            </FeatureCard>
            <FeatureCard
              icon={<ValuesIconSvg />}
              title="Visi Jangka Panjang"
              index={1}
            >
              Menjadi aplikasi pendamping perjalanan nomor satu untuk destinasi
              Sumatera, dikenal karena akurasi rekomendasi, kemudahan
              penggunaan, dan kontribusi nyata dalam memajukan pariwisata daerah
              melalui teknologi inovatif.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* (Keunggulan) */}
      <section className="py-16 bg-slate-100 md:py-24">
        <div className="container px-6 mx-auto md:px-12 lg:px-16">
          <SectionTitle
            subtitle="Keunggulan Kami"
            title="Mengapa Memilih SIRESITA?"
            description="Fitur dan nilai lebih yang kami tawarkan untuk perjalanan Anda."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Rekomendasi Cerdas AI"
              imageUrl="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWklMjB0ZWNobm9sb2d5fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
              imageAlt="Ilustrasi teknologi Kecerdasan Buatan"
              index={0}
            >
              Sistem AI kami belajar dari preferensi Anda untuk memberikan saran
              destinasi yang paling personal dan relevan.
            </FeatureCard>
            <FeatureCard
              title="Database Destinasi Lengkap"
              imageUrl="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsJTIwbWFwfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
              imageAlt="Peta dengan berbagai pin destinasi wisata"
              index={1}
            >
              Jelajahi ribuan pilihan wisata terkurasi di seluruh Sumatera, dari
              yang populer hingga yang tersembunyi.
            </FeatureCard>
            <FeatureCard
              title="Perencanaan Mudah & Cepat"
              imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBsYW5uaW5nJTIwdHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
              imageAlt="Seseorang merencanakan perjalanan di depan laptop"
              index={2}
            >
              Hemat waktu dengan alat perencanaan perjalanan intuitif dan
              informasi yang komprehensif di satu tempat.
            </FeatureCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
