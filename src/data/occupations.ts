import { Occupation } from '../types';

export const OCCUPATIONS: Occupation[] = [
  // Community Helpers
  {
    id: 'teacher',
    nameEn: 'Teacher',
    nameEs: 'Profesor / Profesora',
    category: 'community',
    categoryLabelEn: 'Community Helper',
    categoryLabelEs: 'Ayudante de la Comunidad',
    pronunciation: '/ˈtiːtʃər/',
    phoneticTip: 'TII-cher',
    color: '#3B82F6',
    accentBg: 'bg-blue-50',
    textColor: 'text-blue-600',
    workplace: { en: 'School', es: 'Escuela / Colegio', icon: 'School' },
    tools: [
      { en: 'Books', es: 'Libros' },
      { en: 'Blackboard & Chalk', es: 'Pizarra y tizas' },
      { en: 'Pencils', es: 'Lápices' }
    ],
    descriptionEn: 'A teacher helps children learn reading, math, and new ideas every day.',
    descriptionEs: 'Un profesor o profesora ayuda a los niños a aprender a leer, matemáticas y cosas nuevas.',
    clueEn: 'I work in a school. I help children learn to read and write. Who am I?',
    clueEs: 'Trabajo en una escuela. Ayudo a los niños a leer y escribir. ¿Quién soy?',
    sentences: [
      { en: 'She is a teacher.', es: 'Ella es profesora.' },
      { en: 'A teacher works in a school.', es: 'Un profesor trabaja en una escuela.' },
      { en: 'The teacher writes on the board.', es: 'El profesor escribe en el tablero.' }
    ],
    colombianContext: 'Los maestros y maestras en las escuelas públicas de Colombia enseñan con cariño y dedicación en cada rincón del país.',
    svgIconKey: 'GraduationCap'
  },
  {
    id: 'doctor',
    nameEn: 'Doctor',
    nameEs: 'Médico / Doctora',
    category: 'community',
    categoryLabelEn: 'Community Helper',
    categoryLabelEs: 'Ayudante de la Comunidad',
    pronunciation: '/ˈdɒktər/',
    phoneticTip: 'DOK-ter',
    color: '#06B6D4',
    accentBg: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    workplace: { en: 'Hospital / Clinic', es: 'Hospital / Puesto de Salud', icon: 'Hospital' },
    tools: [
      { en: 'Stethoscope', es: 'Estetoscopio' },
      { en: 'Thermometer', es: 'Termómetro' },
      { en: 'Medicine', es: 'Medicamentos' }
    ],
    descriptionEn: 'A doctor cures sickness, examines patients, and keeps families healthy.',
    descriptionEs: 'El médico examina a los pacientes, receta medicamentos y cuida la salud de las familias.',
    clueEn: 'I work in a hospital. I wear a white coat and listen to your heart. Who am I?',
    clueEs: 'Trabajo en un hospital. Uso bata blanca y escucho tu corazón. ¿Quién soy?',
    sentences: [
      { en: 'He is a doctor.', es: 'Él es médico.' },
      { en: 'A doctor works in a hospital.', es: 'Un doctor trabaja en un hospital.' },
      { en: 'The doctor helps sick people.', es: 'El doctor ayuda a las personas enfermas.' }
    ],
    colombianContext: 'En los hospitales y puestos de salud comunitarios en Colombia, los médicos atienden a niños y abuelos.',
    svgIconKey: 'Stethoscope'
  },
  {
    id: 'nurse',
    nameEn: 'Nurse',
    nameEs: 'Enfermero / Enfermera',
    category: 'community',
    categoryLabelEn: 'Community Helper',
    categoryLabelEs: 'Ayudante de la Comunidad',
    pronunciation: '/nɜːrs/',
    phoneticTip: 'NERS',
    color: '#EC4899',
    accentBg: 'bg-pink-50',
    textColor: 'text-pink-600',
    workplace: { en: 'Hospital', es: 'Hospital / Clínica', icon: 'HeartPulse' },
    tools: [
      { en: 'Syringe & Bandages', es: 'Jeringa y vendajes' },
      { en: 'Blood pressure cuff', es: 'Tensiómetro' },
      { en: 'First aid kit', es: 'Botiquín' }
    ],
    descriptionEn: 'A nurse takes care of sick people, gives vaccines, and checks vital signs.',
    descriptionEs: 'Una enfermera cuida a las personas enfermas, aplica vacunas y revisa los signos vitales.',
    clueEn: 'I help the doctor, give you vaccines, and take care of you in bed. Who am I?',
    clueEs: 'Ayudo al médico, te aplico las vacunas y te cuido en el hospital. ¿Quién soy?',
    sentences: [
      { en: 'She is a nurse.', es: 'Ella es enfermera.' },
      { en: 'A nurse takes care of patients.', es: 'Una enfermera cuida a los pacientes.' },
      { en: 'The nurse works day and night.', es: 'La enfermera trabaja de día y de noche.' }
    ],
    colombianContext: 'Las enfermeras en Colombia son fundamentales en las jornadas de vacunación de los colegios.',
    svgIconKey: 'HeartPulse'
  },
  {
    id: 'police_officer',
    nameEn: 'Police officer',
    nameEs: 'Policía',
    category: 'community',
    categoryLabelEn: 'Community Helper',
    categoryLabelEs: 'Ayudante de la Comunidad',
    pronunciation: '/pəˈliːs ˈɒfɪsər/',
    phoneticTip: 'puh-LEES OFF-i-ser',
    color: '#1E40AF',
    accentBg: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    workplace: { en: 'Police station & Streets', es: 'Estación de policía y calles', icon: 'ShieldCheck' },
    tools: [
      { en: 'Badge & Uniform', es: 'Placa y uniforme verde' },
      { en: 'Whistle', es: 'Silbato' },
      { en: 'Radio', es: 'Radio de comunicación' }
    ],
    descriptionEn: 'A police officer protects people, directs traffic, and maintains peace.',
    descriptionEs: 'Un policía protege a la comunidad, ayuda con el tráfico y mantiene la seguridad.',
    clueEn: 'I wear a uniform and a badge. I protect our neighborhood and direct cars. Who am I?',
    clueEs: 'Uso uniforme y placa. Protejo nuestro barrio y ayudo con el tráfico. ¿Quién soy?',
    sentences: [
      { en: 'He is a police officer.', es: 'Él es oficial de policía.' },
      { en: 'Police officers protect our city.', es: 'Los policías protegen nuestra ciudad.' },
      { en: 'The police officer helps lost children.', es: 'El policía ayuda a niños perdidos.' }
    ],
    colombianContext: 'En Colombia los vemos en los CAI barriales y ayudando a los peatones en las avenidas.',
    svgIconKey: 'ShieldCheck'
  },
  {
    id: 'firefighter',
    nameEn: 'Firefighter',
    nameEs: 'Bombero / Bombera',
    category: 'community',
    categoryLabelEn: 'Community Helper',
    categoryLabelEs: 'Ayudante de la Comunidad',
    pronunciation: '/ˈfaɪərˌfaɪtər/',
    phoneticTip: 'FAYR-fay-ter',
    color: '#EF4444',
    accentBg: 'bg-red-50',
    textColor: 'text-red-600',
    workplace: { en: 'Fire station', es: 'Estación de bomberos', icon: 'Flame' },
    tools: [
      { en: 'Fire hose', es: 'Manguera de agua' },
      { en: 'Helmet & Boots', es: 'Casco y botas de fuego' },
      { en: 'Fire truck & Ladder', es: 'Carro de bomberos y escalera' }
    ],
    descriptionEn: 'A firefighter rescues people and animals, puts out dangerous fires, and drives red fire trucks.',
    descriptionEs: 'Un bombero apaga incendios, rescata a personas y gatitos, y conduce camiones rojos con sirena.',
    clueEn: 'I drive a big red truck with a loud siren. I use water to put out fires. Who am I?',
    clueEs: 'Conduzco un camión rojo con sirena fuerte. Uso agua para apagar el fuego. ¿Quién soy?',
    sentences: [
      { en: 'He is a firefighter.', es: 'Él es bombero.' },
      { en: 'A firefighter puts out fires.', es: 'Un bombero apaga incendios.' },
      { en: 'The firefighter is very brave.', es: 'El bombero es muy valiente.' }
    ],
    colombianContext: 'El cuerpo de bomberos voluntarios en los municipios de Colombia apaga incendios forestales y rescata mascotas.',
    svgIconKey: 'Flame'
  },
  {
    id: 'chef',
    nameEn: 'Chef',
    nameEs: 'Cocinero / Chef',
    category: 'community',
    categoryLabelEn: 'Community Helper',
    categoryLabelEs: 'Ayudante de la Comunidad',
    pronunciation: '/ʃɛf/',
    phoneticTip: 'SHEF',
    color: '#F97316',
    accentBg: 'bg-orange-50',
    textColor: 'text-orange-600',
    workplace: { en: 'Restaurant / Kitchen', es: 'Restaurante / Cocina', icon: 'Utensils' },
    tools: [
      { en: 'Cooking pot & Pans', es: 'Ollas y sartenes' },
      { en: 'Chef hat & Apron', es: 'Gorro blanco y delantal' },
      { en: 'Wooden spoon', es: 'Cuchara de palo' }
    ],
    descriptionEn: 'A chef prepares delicious traditional meals, soups, and dishes for hungry customers.',
    descriptionEs: 'El chef prepara deliciosas comidas, sopas como ajiaco o sancocho, y postres.',
    clueEn: 'I wear a white hat and an apron. I cook delicious food in a kitchen. Who am I?',
    clueEs: 'Uso gorro blanco y delantal. Cocino rica comida en una cocina. ¿Quién soy?',
    sentences: [
      { en: 'She is a chef.', es: 'Ella es chef.' },
      { en: 'A chef works in a restaurant kitchen.', es: 'Un chef trabaja en la cocina de un restaurante.' },
      { en: 'The chef cooks delicious soup.', es: 'La chef cocina una sopa deliciosa.' }
    ],
    colombianContext: 'Nuestros cocineros preparan la mejor bandeja paisa, ajiaco santafereño, arepas y pescado frito en toda Colombia.',
    svgIconKey: 'Utensils'
  },
  {
    id: 'dentist',
    nameEn: 'Dentist',
    nameEs: 'Odontólogo / Dentista',
    category: 'community',
    categoryLabelEn: 'Community Helper',
    categoryLabelEs: 'Ayudante de la Comunidad',
    pronunciation: '/ˈdɛntɪst/',
    phoneticTip: 'DEN-tist',
    color: '#14B8A6',
    accentBg: 'bg-teal-50',
    textColor: 'text-teal-600',
    workplace: { en: 'Dental clinic', es: 'Consultorio odontológico', icon: 'Smile' },
    tools: [
      { en: 'Toothbrush & Floss', es: 'Cepillo y seda dental' },
      { en: 'Dental mirror', es: 'Espejo bucal' },
      { en: 'Fluoride toothpaste', es: 'Crema con flúor' }
    ],
    descriptionEn: 'A dentist cleans teeth, fixes cavities, and ensures everyone has a bright healthy smile.',
    descriptionEs: 'El odontólogo cuida los dientes, cura las caries y enseña a cepillarse correctamente.',
    clueEn: 'I count your teeth and help you have a bright, cavity-free smile. Who am I?',
    clueEs: 'Cuento tus dientes y te ayudo a tener una sonrisa brillante sin caries. ¿Quién soy?',
    sentences: [
      { en: 'He is a dentist.', es: 'Él es dentista.' },
      { en: 'A dentist cleans your teeth.', es: 'Un odontólogo limpia tus dientes.' },
      { en: 'The dentist reminds us to brush daily.', es: 'El dentista nos recuerda cepillarnos a diario.' }
    ],
    colombianContext: 'En las brigadas escolares de salud oral en Colombia, los odontólogos aplican flúor a los estudiantes.',
    svgIconKey: 'Smile'
  },
  {
    id: 'driver',
    nameEn: 'Driver',
    nameEs: 'Conductor / Conductora',
    category: 'community',
    categoryLabelEn: 'Community Helper',
    categoryLabelEs: 'Ayudante de la Comunidad',
    pronunciation: '/ˈdraɪvər/',
    phoneticTip: 'DRAY-ver',
    color: '#EAB308',
    accentBg: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    workplace: { en: 'Bus, Taxi, or Chiva', es: 'Autobús, taxi o chiva típica', icon: 'Bus' },
    tools: [
      { en: 'Steering wheel', es: 'Volante / Timón' },
      { en: 'Keys & Horn', es: 'Llaves y bocina' },
      { en: 'Route map', es: 'Mapa de rutas' }
    ],
    descriptionEn: 'A driver takes passengers safely to school, work, or different towns in buses, taxis, and chivas.',
    descriptionEs: 'El conductor lleva a las personas a la escuela, al trabajo o entre pueblos en buses, taxis o chivas.',
    clueEn: 'I hold the steering wheel and drive students and passengers safely along the road. Who am I?',
    clueEs: 'Tomo el volante y conduzco a estudiantes y pasajeros seguros por la carretera. ¿Quién soy?',
    sentences: [
      { en: 'She is a bus driver.', es: 'Ella es conductora de autobús.' },
      { en: 'A driver stops at the red light.', es: 'Un conductor se detiene en el semáforo en rojo.' },
      { en: 'The driver takes us to school.', es: 'El conductor nos lleva al colegio.' }
    ],
    colombianContext: 'Los conductores de chivas tradicionales y buses de TransMilenio, Metro o MIO conectan a Colombia cada día.',
    svgIconKey: 'Bus'
  },

  // Other Professions
  {
    id: 'engineer',
    nameEn: 'Engineer',
    nameEs: 'Ingeniero / Ingeniera',
    category: 'professions',
    categoryLabelEn: 'Professional',
    categoryLabelEs: 'Profesión Creativa y Técnica',
    pronunciation: '/ˌɛndʒɪˈnɪər/',
    phoneticTip: 'en-ji-NEER',
    color: '#0284C7',
    accentBg: 'bg-sky-50',
    textColor: 'text-sky-600',
    workplace: { en: 'Construction site / Office', es: 'Obra de construcción / Oficina', icon: 'HardHat' },
    tools: [
      { en: 'Blueprint', es: 'Plano de construcción' },
      { en: 'Hard hat', es: 'Casco de seguridad' },
      { en: 'Computer & Measuring tape', es: 'Computador y cinta métrica' }
    ],
    descriptionEn: 'An engineer designs bridges, buildings, machines, and computer software to solve problems.',
    descriptionEs: 'Un ingeniero diseña puentes, carreteras, edificios y programas para resolver problemas.',
    clueEn: 'I design tall buildings and strong bridges using blueprints and computers. Who am I?',
    clueEs: 'Diseño edificios altos y puentes fuertes usando planos y computadores. ¿Quién soy?',
    sentences: [
      { en: 'He is an engineer.', es: 'Él es ingeniero.' },
      { en: 'An engineer builds bridges.', es: 'Un ingeniero construye puentes.' },
      { en: 'The engineer wears a yellow hard hat.', es: 'El ingeniero usa un casco amarillo.' }
    ],
    colombianContext: 'Los ingenieros colombianos construyen viaductos y túneles increíbles a través de las cordilleras andinas.',
    svgIconKey: 'HardHat'
  },
  {
    id: 'scientist',
    nameEn: 'Scientist',
    nameEs: 'Científico / Científica',
    category: 'professions',
    categoryLabelEn: 'Professional',
    categoryLabelEs: 'Profesión Creativa y Técnica',
    pronunciation: '/ˈsaɪəntɪst/',
    phoneticTip: 'SY-en-tist',
    color: '#8B5CF6',
    accentBg: 'bg-purple-50',
    textColor: 'text-purple-600',
    workplace: { en: 'Laboratory', es: 'Laboratorio científico', icon: 'FlaskConical' },
    tools: [
      { en: 'Microscope', es: 'Microscopio' },
      { en: 'Test tubes', es: 'Tubos de ensayo' },
      { en: 'Lab coat & Goggles', es: 'Bata y gafas de protección' }
    ],
    descriptionEn: 'A scientist explores nature, does experiments in laboratories, and discovers new knowledge.',
    descriptionEs: 'Un científico investiga la naturaleza, hace experimentos en el laboratorio e investiga la biodiversidad.',
    clueEn: 'I look through a microscope and mix liquids to make new scientific discoveries. Who am I?',
    clueEs: 'Miro a través de un microscopio y mezclo sustancias para hacer descubrimientos. ¿Quién soy?',
    sentences: [
      { en: 'She is a scientist.', es: 'Ella es científica.' },
      { en: 'A scientist works in a laboratory.', es: 'Un científico trabaja en un laboratorio.' },
      { en: 'The scientist studies Colombian butterflies.', es: 'La científica estudia las mariposas colombianas.' }
    ],
    colombianContext: 'Científicos e investigadoras del Instituto Humboldt estudian la maravillosa fauna y flora de Colombia.',
    svgIconKey: 'FlaskConical'
  },
  {
    id: 'artist',
    nameEn: 'Artist',
    nameEs: 'Artista / Pintor',
    category: 'professions',
    categoryLabelEn: 'Professional',
    categoryLabelEs: 'Profesión Creativa y Técnica',
    pronunciation: '/ˈɑːrtɪst/',
    phoneticTip: 'AR-tist',
    color: '#D946EF',
    accentBg: 'bg-fuchsia-50',
    textColor: 'text-fuchsia-600',
    workplace: { en: 'Art studio', es: 'Taller de arte / Estudio', icon: 'Palette' },
    tools: [
      { en: 'Paintbrushes', es: 'Pinceles' },
      { en: 'Palette & Colors', es: 'Paleta y pinturas' },
      { en: 'Canvas & Easel', es: 'Lienzo y caballete' }
    ],
    descriptionEn: 'An artist paints pictures, sculpts statues, and expresses beauty with vibrant colors.',
    descriptionEs: 'Un artista pinta cuadros, hace esculturas y llena el mundo de hermosos colores.',
    clueEn: 'I mix colors on a palette and paint beautiful landscapes on canvas. Who am I?',
    clueEs: 'Mezclo colores en una paleta y pinto bellos paisajes en lienzos. ¿Quién soy?',
    sentences: [
      { en: 'He is an artist.', es: 'Él es artista.' },
      { en: 'An artist paints with bright colors.', es: 'Un artista pinta con colores vivos.' },
      { en: 'The artist draws the Colombian mountains.', es: 'El artista dibuja las montañas colombianas.' }
    ],
    colombianContext: 'Inspirados en grandes maestros como Fernando Botero y Débora Arango, los artistas llenan a Colombia de arte.',
    svgIconKey: 'Palette'
  },
  {
    id: 'singer',
    nameEn: 'Singer',
    nameEs: 'Cantante',
    category: 'professions',
    categoryLabelEn: 'Professional',
    categoryLabelEs: 'Profesión Creativa y Técnica',
    pronunciation: '/ˈsɪŋər/',
    phoneticTip: 'SING-er',
    color: '#F43F5E',
    accentBg: 'bg-rose-50',
    textColor: 'text-rose-600',
    workplace: { en: 'Concert stage / Studio', es: 'Escenario de concierto / Estudio', icon: 'Mic' },
    tools: [
      { en: 'Microphone', es: 'Micrófono' },
      { en: 'Headphones', es: 'Audífonos' },
      { en: 'Guitar & Sheet music', es: 'Guitarra y partituras' }
    ],
    descriptionEn: 'A singer performs songs, sings joyful rhythms like cumbia and vallenato, and shares music.',
    descriptionEs: 'Un cantante interpreta canciones, ritmos como el vallenato o la cumbia y alegra los corazones.',
    clueEn: 'I hold a microphone and use my voice to sing joyful melodies on stage. Who am I?',
    clueEs: 'Tomo el micrófono y uso mi voz para cantar melodías alegres en el escenario. ¿Quién soy?',
    sentences: [
      { en: 'She is a singer.', es: 'Ella es cantante.' },
      { en: 'A singer sings beautiful songs.', es: 'Un cantante canta hermosas canciones.' },
      { en: 'The singer performs on the stage.', es: 'La cantante se presenta en el escenario.' }
    ],
    colombianContext: 'Colombia es tierra de grandes cantantes de vallenato, cumbia, salsa y pop reconocidos mundialmente como Shakira y Carlos Vives.',
    svgIconKey: 'Mic'
  },
  {
    id: 'football_player',
    nameEn: 'Football player',
    nameEs: 'Futbolista',
    category: 'professions',
    categoryLabelEn: 'Professional',
    categoryLabelEs: 'Profesión Creativa y Técnica',
    pronunciation: '/ˈfʊtbɔːl ˈpleɪər/',
    phoneticTip: 'FOOT-bawl PLAY-er',
    color: '#10B981',
    accentBg: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    workplace: { en: 'Stadium / Football pitch', es: 'Estadio / Cancha de fútbol', icon: 'Trophy' },
    tools: [
      { en: 'Soccer ball', es: 'Balón de fútbol' },
      { en: 'Cleats & Shin guards', es: 'Guayos y canilleras' },
      { en: 'Team jersey', es: 'Camiseta de la selección' }
    ],
    descriptionEn: 'A football player trains hard, runs on the pitch, passes the ball, and scores exciting goals.',
    descriptionEs: 'Un futbolista entrena con pasión, corre en la cancha y anota goles para su equipo y la Selección.',
    clueEn: 'I wear cleats, kick a ball into the goal, and play in big stadiums. Who am I?',
    clueEs: 'Uso guayos, pateo el balón al arco y juego en grandes estadios. ¿Quién soy?',
    sentences: [
      { en: 'He is a football player.', es: 'Él es futbolista.' },
      { en: 'A football player scores goals.', es: 'Un futbolista anota goles.' },
      { en: 'The player wears the yellow jersey.', es: 'El jugador viste la camiseta amarilla.' }
    ],
    colombianContext: 'Los futbolistas de la Selección Colombia como Linda Caicedo y Luis Díaz inspiran a todos los niños en las canchas de barrio.',
    svgIconKey: 'Trophy'
  },
  {
    id: 'veterinarian',
    nameEn: 'Veterinarian',
    nameEs: 'Veterinario / Veterinaria',
    category: 'professions',
    categoryLabelEn: 'Professional',
    categoryLabelEs: 'Profesión Creativa y Técnica',
    pronunciation: '/ˌvɛtərɪˈnɛəriən/',
    phoneticTip: 'vet-rin-AIR-ee-an (Vet)',
    color: '#10B981',
    accentBg: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    workplace: { en: 'Veterinary clinic / Farm', es: 'Clínica veterinaria / Finca', icon: 'Dog' },
    tools: [
      { en: 'Small animal stethoscope', es: 'Estetoscopio animal' },
      { en: 'Pet bandages & Medicine', es: 'Vendajes y medicinas para mascotas' },
      { en: 'Pet carrier', es: 'Guacal / Transportador' }
    ],
    descriptionEn: 'A veterinarian cares for dogs, cats, cows, horses, and wild animals when they are hurt.',
    descriptionEs: 'El veterinario atiende a perritos, gatitos, vacas, caballos y cuida su bienestar con amor.',
    clueEn: 'I examine dogs, cats, and farm animals to help them feel healthy again. Who am I?',
    clueEs: 'Examino perros, gatos y animales de granja para ayudarlos a sanar. ¿Quién soy?',
    sentences: [
      { en: 'She is a veterinarian.', es: 'Ella es veterinaria.' },
      { en: 'A veterinarian helps sick animals.', es: 'Un veterinario ayuda a los animales enfermos.' },
      { en: 'The vet cares for our lovely dog.', es: 'El veterinario cuida a nuestro querido perro.' }
    ],
    colombianContext: 'Los veterinarios en Colombia cuidan tanto a las mascotas de la ciudad como al ganado y caballos en las veredas.',
    svgIconKey: 'Dog'
  },
  {
    id: 'photographer',
    nameEn: 'Photographer',
    nameEs: 'Fotógrafo / Fotógrafa',
    category: 'professions',
    categoryLabelEn: 'Professional',
    categoryLabelEs: 'Profesión Creativa y Técnica',
    pronunciation: '/fəˈtɒɡrəfər/',
    phoneticTip: 'fuh-TOG-ruh-fer',
    color: '#6366F1',
    accentBg: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    workplace: { en: 'Photo studio / Outdoors', es: 'Estudio fotográfico / Aire libre', icon: 'Camera' },
    tools: [
      { en: 'Digital camera', es: 'Cámara fotográfica' },
      { en: 'Lenses & Tripod', es: 'Lentes y trípode' },
      { en: 'Flash light', es: 'Flash de iluminación' }
    ],
    descriptionEn: 'A photographer captures special moments, wildlife, and landscapes using cameras.',
    descriptionEs: 'El fotógrafo captura recuerdos inolvidables, aves coloridas y paisajes con su cámara.',
    clueEn: 'I click a button on my camera to capture beautiful pictures. Smile! Who am I?',
    clueEs: 'Presiono un botón en mi cámara para capturar fotos hermosas. ¡Sonríe! ¿Quién soy?',
    sentences: [
      { en: 'He is a photographer.', es: 'Él es fotógrafo.' },
      { en: 'A photographer takes nice photos.', es: 'Un fotógrafo toma buenas fotos.' },
      { en: 'The photographer captures the sunset.', es: 'El fotógrafo captura el atardecer.' }
    ],
    colombianContext: 'Los fotógrafos viajan por el Amazonas, el Chocó y el Nevado del Ruiz retratando la magia de Colombia.',
    svgIconKey: 'Camera'
  },
  {
    id: 'pilot',
    nameEn: 'Pilot',
    nameEs: 'Piloto / Pilota',
    category: 'professions',
    categoryLabelEn: 'Professional',
    categoryLabelEs: 'Profesión Creativa y Técnica',
    pronunciation: '/ˈpaɪlət/',
    phoneticTip: 'PY-let',
    color: '#0284C7',
    accentBg: 'bg-sky-50',
    textColor: 'text-sky-700',
    workplace: { en: 'Airplane cockpit & Airport', es: 'Cabina de avión y aeropuerto', icon: 'Plane' },
    tools: [
      { en: 'Flight controls', es: 'Mandos de vuelo' },
      { en: 'Pilot headset', es: 'Auriculares de aviación' },
      { en: 'Navigation map', es: 'Mapa de navegación aérea' }
    ],
    descriptionEn: 'A pilot flies airplanes across the sky, connecting cities and countries high above clouds.',
    descriptionEs: 'El piloto vuela aviones por los cielos, conectando ciudades y transportando viajeros por las nubes.',
    clueEn: 'I sit high in the cockpit and fly airplanes above the clouds. Who am I?',
    clueEs: 'Me siento en la cabina y vuelo aviones por encima de las nubes. ¿Quién soy?',
    sentences: [
      { en: 'She is a pilot.', es: 'Ella es piloto.' },
      { en: 'A pilot flies an airplane.', es: 'Un piloto vuela un avión.' },
      { en: 'The pilot lands safely at the airport.', es: 'El piloto aterriza a salvo en el aeropuerto.' }
    ],
    colombianContext: 'Los pilotos en Colombia unen regiones lejanas como San Andrés, Leticia y los Llanos Orientales.',
    svgIconKey: 'Plane'
  },

  // Rural and Agricultural Occupations
  {
    id: 'farmer',
    nameEn: 'Farmer',
    nameEs: 'Campesino / Cafetero / Agricultor',
    category: 'rural',
    categoryLabelEn: 'Rural & Agricultural',
    categoryLabelEs: 'Campo y Agricultura',
    pronunciation: '/ˈfɑːrmər/',
    phoneticTip: 'FAR-mer',
    color: '#15803D',
    accentBg: 'bg-green-50',
    textColor: 'text-green-700',
    workplace: { en: 'Farm / Coffee plantation', es: 'Finca cafetera / Granja / Campo', icon: 'Tractor' },
    tools: [
      { en: 'Hoe & Shovel', es: 'Azadón y pala' },
      { en: 'Coffee basket (Canasto)', es: 'Canasto cafetero' },
      { en: 'Straw hat (Sombrero)', es: 'Sombrero vueltiao o aguadeño' }
    ],
    descriptionEn: 'A farmer grows crops like coffee, potatoes, and corn, and cares for farm animals.',
    descriptionEs: 'El campesino y cafetero cultiva alimentos como café, papa, frutas y cuida los animales en el campo.',
    clueEn: 'I work early in the fields, wearing a straw hat and growing coffee and fruits. Who am I?',
    clueEs: 'Trabajo temprano en el campo con mi sombrero, cultivando café y deliciosas frutas. ¿Quién soy?',
    sentences: [
      { en: 'He is a farmer.', es: 'Él es campesino / agricultor.' },
      { en: 'A farmer works on a farm.', es: 'Un campesino trabaja en la finca o granja.' },
      { en: 'The farmer grows delicious Colombian coffee.', es: 'El campesino cultiva delicioso café colombiano.' }
    ],
    colombianContext: 'Los campesinos y cafeteros de Boyacá, Antioquia, Nariño, Huila y el Eje Cafetero alimentan a toda la patria.',
    svgIconKey: 'Tractor'
  },
  {
    id: 'fisherman',
    nameEn: 'Fisherman',
    nameEs: 'Pescador',
    category: 'rural',
    categoryLabelEn: 'Rural & Agricultural',
    categoryLabelEs: 'Campo y Tradición',
    pronunciation: '/ˈfɪʃərmən/',
    phoneticTip: 'FISH-er-man',
    color: '#0891B2',
    accentBg: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    workplace: { en: 'River, Sea, or Boat', es: 'Río Magdalena, mar Caribe o canoa', icon: 'Fish' },
    tools: [
      { en: 'Fishing net (Atarraya)', es: 'Atarraya / Red' },
      { en: 'Fishing rod & Canoe', es: 'Caña de pescar y canoa' },
      { en: 'Life jacket', es: 'Chaleco salvavidas' }
    ],
    descriptionEn: 'A fisherman sails on rivers and coastal seas, casting nets to catch fresh fish.',
    descriptionEs: 'El pescador navega en canoa por ríos y costas lanzando su atarraya para pescar.',
    clueEn: 'I wake up at dawn, launch my wooden boat, and cast nets into the river. Who am I?',
    clueEs: 'Madrugo en mi canoa y lanzo la atarraya al río para pescar. ¿Quién soy?',
    sentences: [
      { en: 'He is a fisherman.', es: 'Él es pescador.' },
      { en: 'A fisherman catches fish with a net.', es: 'Un pescador atrapa peces con una red.' },
      { en: 'The fisherman sails along the Magdalena river.', es: 'El pescador navega por el río Magdalena.' }
    ],
    colombianContext: 'Los pescadores artesanales del Río Magdalena, el Pacífico y la Costa Caribe proveen pescado fresco a las familias.',
    svgIconKey: 'Fish'
  },
  {
    id: 'gardener',
    nameEn: 'Gardener',
    nameEs: 'Jardinero / Jardinera',
    category: 'rural',
    categoryLabelEn: 'Rural & Agricultural',
    categoryLabelEs: 'Campo y Naturaleza',
    pronunciation: '/ˈɡɑːrdnər/',
    phoneticTip: 'GAR-duh-ner',
    color: '#65A30D',
    accentBg: 'bg-lime-50',
    textColor: 'text-lime-700',
    workplace: { en: 'Garden / Park / Flower field', es: 'Jardín / Parque / Cultivo de flores', icon: 'Flower2' },
    tools: [
      { en: 'Watering can', es: 'Regadera' },
      { en: 'Pruning shears & Rake', es: 'Tijeras de podar y rastrillo' },
      { en: 'Gardening gloves', es: 'Guantes de jardinería' }
    ],
    descriptionEn: 'A gardener plants colorful flowers, trims bushes, waters orchids, and keeps green parks beautiful.',
    descriptionEs: 'El jardinero cuida las flores, corta el pasto, riega orquídeas y mantiene los parques verdes.',
    clueEn: 'I water colorful orchids, trim bushes, and plant beautiful flowers. Who am I?',
    clueEs: 'Riego orquídeas coloridas, podo arbustos y planto flores hermosas. ¿Quién soy?',
    sentences: [
      { en: 'She is a gardener.', es: 'Ella es jardinera.' },
      { en: 'A gardener waters the flowers.', es: 'Una jardinera riega las flores.' },
      { en: 'The gardener takes care of beautiful orchids.', es: 'El jardinero cuida hermosas orquídeas.' }
    ],
    colombianContext: 'Los silleteros de Santa Elena en Medellín y los floricultores cultivan las flores más hermosas del mundo.',
    svgIconKey: 'Flower2'
  },
  {
    id: 'baker',
    nameEn: 'Baker',
    nameEs: 'Panadero / Panadera',
    category: 'rural',
    categoryLabelEn: 'Community & Artisan',
    categoryLabelEs: 'Oficio Tradicional',
    pronunciation: '/ˈbeɪkər/',
    phoneticTip: 'BAY-ker',
    color: '#D97706',
    accentBg: 'bg-amber-50',
    textColor: 'text-amber-700',
    workplace: { en: 'Bakery', es: 'Panadería de barrio', icon: 'Croissant' },
    tools: [
      { en: 'Rolling pin', es: 'Rodillo' },
      { en: 'Oven & Baking trays', es: 'Horno y latas' },
      { en: 'Flour & Cheese', es: 'Harina y queso' }
    ],
    descriptionEn: 'A baker wakes up early to knead dough and bake fresh bread, pandebonos, and cakes.',
    descriptionEs: 'El panadero amasa la harina y hornea pan caliente, pandebonos, almojábanas y buñuelos.',
    clueEn: 'I knead warm dough with a rolling pin and bake hot bread and pandebonos. Who am I?',
    clueEs: 'Amaso la harina con el rodillo y horneo rico pan caliente y pandebonos. ¿Quién soy?',
    sentences: [
      { en: 'He is a baker.', es: 'Él es panadero.' },
      { en: 'A baker works in a bakery.', es: 'Un panadero trabaja en una panadería.' },
      { en: 'The baker bakes fresh bread every morning.', es: 'El panadero hornea pan fresco cada mañana.' }
    ],
    colombianContext: 'En cada esquina de los barrios colombianos, las panaderías nos deleitan con pan caliente y pandequeso.',
    svgIconKey: 'Croissant'
  },
  {
    id: 'carpenter',
    nameEn: 'Carpenter',
    nameEs: 'Carpintero / Carpintera',
    category: 'rural',
    categoryLabelEn: 'Artisan & Craft',
    categoryLabelEs: 'Oficio y Taller',
    pronunciation: '/ˈkɑːrpəntər/',
    phoneticTip: 'KAR-pen-ter',
    color: '#B45309',
    accentBg: 'bg-amber-50',
    textColor: 'text-amber-800',
    workplace: { en: 'Carpentry workshop', es: 'Taller de carpintería', icon: 'Hammer' },
    tools: [
      { en: 'Hammer & Nails', es: 'Martillo y puntillas' },
      { en: 'Saw & Wood planer', es: 'Serrucho y cepillo de madera' },
      { en: 'Measuring tape', es: 'Metro / Cinta métrica' }
    ],
    descriptionEn: 'A carpenter shapes wood to make sturdy tables, chairs, school desks, and wooden doors.',
    descriptionEs: 'El carpintero corta y pule la madera para construir mesas, sillas, pupitres y puertas.',
    clueEn: 'I use a hammer, nails, and a saw to build wooden chairs and tables. Who am I?',
    clueEs: 'Uso martillo, serrucho y clavos para fabricar sillas y mesas de madera. ¿Quién soy?',
    sentences: [
      { en: 'She is a carpenter.', es: 'Ella es carpintera.' },
      { en: 'A carpenter makes tables and chairs.', es: 'Un carpintero hace mesas y sillas.' },
      { en: 'The carpenter cuts wood with a saw.', es: 'El carpintero corta madera con serrucho.' }
    ],
    colombianContext: 'Los carpinteros de nuestros pueblos y ciudades fabrican los pupitres de los colegios y muebles resistentes.',
    svgIconKey: 'Hammer'
  }
];

export const CATEGORIES = [
  { id: 'all', labelEn: 'All Occupations', labelEs: 'Todas las Profesiones', count: OCCUPATIONS.length },
  { id: 'community', labelEn: 'Community Helpers', labelEs: 'Ayudantes de la Comunidad', count: OCCUPATIONS.filter(o => o.category === 'community').length },
  { id: 'professions', labelEn: 'Professions & Arts', labelEs: 'Profesiones y Artes', count: OCCUPATIONS.filter(o => o.category === 'professions').length },
  { id: 'rural', labelEn: 'Rural & Traditional', labelEs: 'Campo y Oficios Tradicionales', count: OCCUPATIONS.filter(o => o.category === 'rural').length }
];
