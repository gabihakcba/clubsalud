const {
  PrismaClient,
  AccountPermissions,
  MemberState,
  Days
} = require('@prisma/client')
const faker = require('faker')
const { start } = require('repl')
const { convertToObject } = require('typescript')

const db = new PrismaClient()

// const godsArray = [
//   'inti',
//   'pachamama',
//   'viracocha',
//   'anteojito',
//   'elal',
//   'pehuenche',
//   'yu_huang',
//   'guan_yu',
//   'ma_zu',
//   'bu_xiu_niang_niang',
//   'fu_xi',
//   'chenghuang',
//   'xi_wangmu',
//   'tu_er_shen',
//   'xiangyue_shi',
//   'hou_yi',
//   'cang_jie',
//   'lu_dongbin',
//   'zu_xian',
//   'shen_nong',
//   'yao',
//   'quetzalcoatl',
//   'huitzilopochtli',
//   'tezcatlipoca',
//   'tlaloc',
//   'xipe_totec',
//   'coyolxauhqui',
//   'xochiquetzal',
//   'mictlantecuhtli',
//   'tonatiuh',
//   'chicomecoatl',
//   'tlazolteotl',
//   'xolotl',
//   'zeus',
//   'poseidon',
//   'ares',
//   'afrodita',
//   'hera',
//   'demeter',
//   'atenea',
//   'apolo',
//   'artemisa',
//   'hefesto',
//   'hermes',
//   'dionisio',
//   'hestia',
//   'hades',
//   'hecate',
//   'dagda',
//   'morrigan',
//   'lugh',
//   'brigid',
//   'cernunnos',
//   'arawn',
//   'manannan_mac_lir',
//   'nuada',
//   'belenos',
//   'danu',
//   'epona',
//   'lir',
//   'teutates',
//   'cailleach',
//   'sucellus',
//   'anu',
//   'enlil',
//   'enki',
//   'inanna',
//   'nanna',
//   'utu',
//   'marduk',
//   'ashur',
//   'nergal',
//   'ereshkigal',
//   'dumuzi',
//   'gula',
//   'ninurta',
//   'nabu',
//   'ninhursag',
//   'ra',
//   'osiris',
//   'isis',
//   'horus',
//   'anubis',
//   'hathor',
//   'thoth',
//   'bastet',
//   'sobek',
//   'set',
//   'maat',
//   'nut',
//   'geb',
//   'ptah',
//   'anuket',
//   'jupiter',
//   'juno',
//   'marte',
//   'venus',
//   'mercurio',
//   'neptuno',
//   'minerva',
//   'apolo',
//   'diana',
//   'vulcano',
//   'ceres',
//   'baco',
//   'jano',
//   'pluton',
//   'cupido',
//   'brahma',
//   'vishnu',
//   'shiva',
//   'lakshmi',
//   'parvati',
//   'ganesha',
//   'hanuman',
//   'saraswati',
//   'rama',
//   'krishna',
//   'kali',
//   'durga',
//   'surya',
//   'indra',
//   'varuna',
//   'odin',
//   'thor',
//   'frigg',
//   'loki',
//   'balder',
//   'tyr',
//   'freya',
//   'freyr',
//   'heimdall',
//   'skadi',
//   'njord',
//   'hel',
//   'bragi',
//   'forseti',
//   'ullr',
//   'el_ciego',
//   'los_antiguos',
//   'el_padre',
//   'la_madre',
//   'el_guerrero',
//   'la_doncella',
//   'el_forjador',
//   'el_desconocido',
//   'el_septimo'
// ]

// const generateMembers = () => {
//   function generateRandomNumber(length) {
//     return parseInt(Math.random().toString().substr(2, length))
//   }

//   function generateRandomDate() {
//     const startDate = new Date(2000, 0, 1)
//     const endDate = new Date(2023, 11, 31)
//     return faker.date.between(startDate, endDate)
//   }

//   const jsonObjects = godsArray.map((godName) => ({
//     name: godName,
//     lastName: godName.toUpperCase(),
//     dni: generateRandomNumber(8),
//     phoneNumber: generateRandomNumber(7),
//     address: `St. ${godName}`,
//     inscriptionDate: generateRandomDate(),
//     derivedBy: `Dr. ${godName.charAt(0).toUpperCase() + godName.slice(1)}`,
//     affiliateNumber: generateRandomNumber(5),
//     state: MemberState.ACTIVE
//   }))

//   return jsonObjects
// }

function generateRandomNumber(length) {
  return parseInt(Math.random().toString().substr(2, length))
}

function generateRandomDate() {
  const startDate = new Date(2000, 0, 1)
  const endDate = new Date(2023, 11, 31)
  return faker.date.between(startDate, endDate)
}

const generateMember = (godName) => {
  const jsonMember = {
    name: godName,
    lastName: godName.toUpperCase(),
    dni: generateRandomNumber(8),
    phoneNumber: generateRandomNumber(7),
    address: `St. ${godName}`,
    inscriptionDate: generateRandomDate(),
    derivedBy: `Dr. ${godName.charAt(0).toUpperCase() + godName.slice(1)}`,
    afiliateNumber: generateRandomNumber(5),
    state: MemberState.ACTIVE
  }

  return jsonMember
}

const generateInstrucor = (godName) => {
  const jsonInstructor = {
    name: godName,
    lastName: godName.toUpperCase(),
    dni: generateRandomNumber(8),
    phoneNumber: generateRandomNumber(10),
    address: `St. ${godName.charAt(0) + godName.slice(1)}`,
    email: `${godName}@gmail.com`,
    degree: Math.random() < 0.5,
    cbu: generateRandomNumber(20),
    alias: `GOD.${godName}.MP`
  }

  return jsonInstructor
}

const manyAccounts = {
  OWN: [
    /**
     * Mapuche
     */
    {
      username: 'inti',
      password: 'inti',
      permissions: [AccountPermissions.OWN]
    },
    {
      username: 'pachamama',
      password: 'pachamama',
      permissions: [AccountPermissions.OWN]
    },
    {
      username: 'viracocha',
      password: 'viracocha',
      permissions: [AccountPermissions.OWN]
    },
    /**
     * Inca
     */
    {
      username: 'anteojito',
      password: 'anteojito',
      permissions: [AccountPermissions.OWN]
    },
    {
      username: 'elal',
      password: 'elal',
      permissions: [AccountPermissions.OWN]
    },
    {
      username: 'pehuenche',
      password: 'pehuenche',
      permissions: [AccountPermissions.OWN]
    }
  ],
  ADM: [
    /**
     * Chinos
     */
    {
      username: 'yu_huang',
      password: 'yu_huang',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'guan_yu',
      password: 'guan_yu',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'ma_zu',
      password: 'ma_zu',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'bu_xiu_niang_niang',
      password: 'bu_xiu_niang_niang',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'fu_xi',
      password: 'fu_xi',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'chenghuang',
      password: 'chenghuang',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'xi_wangmu',
      password: 'xi_wangmu',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'tu_er_shen',
      password: 'tu_er_shen',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'xiangyue_shi',
      password: 'xiangyue_shi',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'hou_yi',
      password: 'hou_yi',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'cang_jie',
      password: 'cang_jie',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'lu_dongbin',
      password: 'lu_dongbin',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'zu_xian',
      password: 'zu_xian',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'shen_nong',
      password: 'shen_nong',
      permissions: [AccountPermissions.ADM]
    },
    { username: 'yao', password: 'yao', permissions: [AccountPermissions.ADM] },
    /**
     * Aztecas
     */
    {
      username: 'quetzalcoatl',
      password: 'quetzalcoatl',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'huitzilopochtli',
      password: 'huitzilopochtli',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'tezcatlipoca',
      password: 'tezcatlipoca',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'tlaloc',
      password: 'tlaloc',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'xipe_totec',
      password: 'xipe_totec',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'coyolxauhqui',
      password: 'coyolxauhqui',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'xochiquetzal',
      password: 'xochiquetzal',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'mictlantecuhtli',
      password: 'mictlantecuhtli',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'tonatiuh',
      password: 'tonatiuh',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'chicomecoatl',
      password: 'chicomecoatl',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'tlazolteotl',
      password: 'tlazolteotl',
      permissions: [AccountPermissions.ADM]
    },
    {
      username: 'xolotl',
      password: 'xolotl',
      permissions: [AccountPermissions.ADM]
    }
  ],
  INS: [
    /**
     * Griegos
     */
    {
      username: 'zeus',
      password: 'zeus',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'poseidon',
      password: 'poseidon',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'ares',
      password: 'ares',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'afrodita',
      password: 'afrodita',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'hera',
      password: 'hera',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'demeter',
      password: 'demeter',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'atenea',
      password: 'atenea',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'apolo',
      password: 'apolo',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'artemisa',
      password: 'artemisa',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'hefesto',
      password: 'hefesto',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'hermes',
      password: 'hermes',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'dionisio',
      password: 'dionisio',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'hestia',
      password: 'hestia',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'hades',
      password: 'hades',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'hecate',
      password: 'hecate',
      permissions: [AccountPermissions.INS]
    },
    /**
     * Celtas
     */
    {
      username: 'dagda',
      password: 'dagda',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'morrigan',
      password: 'morrigan',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'lugh',
      password: 'lugh',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'brigid',
      password: 'brigid',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'cernunnos',
      password: 'cernunnos',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'arawn',
      password: 'arawn',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'manannan_mac_lir',
      password: 'manannan_mac_lir',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'nuada',
      password: 'nuada',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'belenos',
      password: 'belenos',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'danu',
      password: 'danu',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'epona',
      password: 'epona',
      permissions: [AccountPermissions.INS]
    },
    { username: 'lir', password: 'lir', permissions: [AccountPermissions.INS] },
    {
      username: 'teutates',
      password: 'teutates',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'cailleach',
      password: 'cailleach',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'sucellus',
      password: 'sucellus',
      permissions: [AccountPermissions.INS]
    },
    /**
     * Mesopotamicos
     */
    { username: 'anu', password: 'anu', permissions: [AccountPermissions.INS] },
    {
      username: 'enlil',
      password: 'enlil',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'enki',
      password: 'enki',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'inanna',
      password: 'inanna',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'nanna',
      password: 'nanna',
      permissions: [AccountPermissions.INS]
    },
    { username: 'utu', password: 'utu', permissions: [AccountPermissions.INS] },
    {
      username: 'marduk',
      password: 'marduk',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'ashur',
      password: 'ashur',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'nergal',
      password: 'nergal',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'ereshkigal',
      password: 'ereshkigal',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'dumuzi',
      password: 'dumuzi',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'gula',
      password: 'gula',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'ninurta',
      password: 'ninurta',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'nabu',
      password: 'nabu',
      permissions: [AccountPermissions.INS]
    },
    {
      username: 'ninhursag',
      password: 'ninhursag',
      permissions: [AccountPermissions.INS]
    }
  ],
  MEM: [
    /**
     * Egipcios
     */
    { username: 'ra', password: 'ra', permissions: [AccountPermissions.MEM] },
    {
      username: 'osiris',
      password: 'osiris',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'isis',
      password: 'isis',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'horus',
      password: 'horus',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'anubis',
      password: 'anubis',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'hathor',
      password: 'hathor',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'thoth',
      password: 'thoth',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'bastet',
      password: 'bastet',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'sobek',
      password: 'sobek',
      permissions: [AccountPermissions.MEM]
    },
    { username: 'set', password: 'set', permissions: [AccountPermissions.MEM] },
    {
      username: 'maat',
      password: 'maat',
      permissions: [AccountPermissions.MEM]
    },
    { username: 'nut', password: 'nut', permissions: [AccountPermissions.MEM] },
    { username: 'geb', password: 'geb', permissions: [AccountPermissions.MEM] },
    {
      username: 'ptah',
      password: 'ptah',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'anuket',
      password: 'anuket',
      permissions: [AccountPermissions.MEM]
    },
    /**
     * Romanos
     */
    {
      username: 'jupiter',
      password: 'jupiter',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'juno',
      password: 'juno',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'marte',
      password: 'marte',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'venus',
      password: 'venus',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'mercurio',
      password: 'mercurio',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'neptuno',
      password: 'neptuno',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'minerva',
      password: 'minerva',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'apolo_',
      password: 'apolo_',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'diana',
      password: 'diana',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'vulcano',
      password: 'vulcano',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'ceres',
      password: 'ceres',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'baco',
      password: 'baco',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'jano',
      password: 'jano',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'pluton',
      password: 'pluton',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'cupido',
      password: 'cupido',
      permissions: [AccountPermissions.MEM]
    },
    /**
     * Hindues
     */
    {
      username: 'brahma',
      password: 'brahma',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'vishnu',
      password: 'vishnu',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'shiva',
      password: 'shiva',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'lakshmi',
      password: 'lakshmi',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'parvati',
      password: 'parvati',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'ganesha',
      password: 'ganesha',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'hanuman',
      password: 'hanuman',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'saraswati',
      password: 'saraswati',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'rama',
      password: 'rama',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'krishna',
      password: 'krishna',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'kali',
      password: 'kali',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'durga',
      password: 'durga',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'surya',
      password: 'surya',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'indra',
      password: 'indra',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'varuna',
      password: 'varuna',
      permissions: [AccountPermissions.MEM]
    },
    /**
     * Nordicos
     */
    {
      username: 'odin',
      password: 'odin',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'thor',
      password: 'thor',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'frigg',
      password: 'frigg',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'loki',
      password: 'loki',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'balder',
      password: 'balder',
      permissions: [AccountPermissions.MEM]
    },
    { username: 'tyr', password: 'tyr', permissions: [AccountPermissions.MEM] },
    {
      username: 'freya',
      password: 'freya',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'freyr',
      password: 'freyr',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'heimdall',
      password: 'heimdall',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'skadi',
      password: 'skadi',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'njord',
      password: 'njdor',
      permissions: [AccountPermissions.MEM]
    },
    { username: 'hel', password: 'hel', permissions: [AccountPermissions.MEM] },
    {
      username: 'bragi',
      password: 'bragi',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'forseti',
      password: 'forseti',
      permissions: [AccountPermissions.MEM]
    },
    {
      username: 'ullr',
      password: 'ullr',
      permissions: [AccountPermissions.MEM]
    }
  ],
  OTHER: [
    /**
     * Got
     */
    /**
     * Antiguos
     */
    {
      username: 'el_ciego',
      password: 'el_ciego',
      permissions: [AccountPermissions.OTHER]
    },
    {
      username: 'los_antiguos',
      password: 'los_antiguos',
      permissions: [AccountPermissions.OTHER]
    },
    /**
     * Los siete
     */
    {
      username: 'el_padre',
      password: 'el_padre',
      permissions: [AccountPermissions.OTHER]
    },
    {
      username: 'la_madre',
      password: 'la_madre',
      permissions: [AccountPermissions.OTHER]
    },
    {
      username: 'el_guerrero',
      password: 'el_guerrero',
      permissions: [AccountPermissions.OTHER]
    },
    {
      username: 'la_doncella',
      password: 'la_doncella',
      permissions: [AccountPermissions.OTHER]
    },
    {
      username: 'el_forjador',
      password: 'el_forjador',
      permissions: [AccountPermissions.OTHER]
    },
    {
      username: 'el_desconocido',
      password: 'el_desconocido',
      permissions: [AccountPermissions.OTHER]
    },
    {
      username: 'el_septimo',
      password: 'el_septimo',
      permissions: [AccountPermissions.OTHER]
    }
  ]
}

const hours = [
  800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330, 1400,
  1430, 1500, 1530, 1600, 1630, 1700, 1730, 1800, 1830, 1900, 1930, 2000
]

const createSchedules = async () => {
  for (let day in Days) {
    hours.forEach(async (hour) => {
      await db.schedule.create({
        data: {
          day: day,
          start: Number(hour),
          end: Number(hour) + (Number(hour) % 100 < 30 ? 30 : 70)
        }
      })
    })
  }
}

const createClasses = async () => {
  await db.class.createMany({
    data: [
      {
        name: 'Zumba',
        duration: 1
      },
      {
        name: 'Strong',
        duration: 1
      },
      {
        name: 'Gym',
        duration: 1
      },
      {
        name: 'Crossfit',
        duration: 1
      },
      {
        name: 'Personalizada',
        duration: 1
      },
      {
        name: 'Rehabilitacion',
        duration: 1
      },
      {
        name: 'Tabata',
        duration: 1
      },
      {
        name: 'Funcional',
        duration: 1
      },
      {
        name: 'GAP',
        duration: 1
      },
      {
        name: 'Cardio',
        duration: 1
      },
      {
        name: 'TKD',
        duration: 1
      },
      {
        name: 'Karate-Do',
        duration: 1
      },
      {
        name: 'Kick',
        duration: 1
      },
      {
        name: 'Box',
        duration: 1
      }
    ]
  })
}

const createPromotions = async () => {
  await db.promotion.createMany({
    data: [
      {
        title: '1 x Semanal',
        description:
          '1 clase a elección por semana, 1 mes de duración, $7000 x clase',
        amountWeeklyClasses: 1,
        amountPrice: 7000
      },
      {
        title: '2 x semanal',
        description:
          '2 clases a elección por semana, 1 mes de duracion, $6500 x clase',
        amountWeeklyClasses: 2,
        amountPrice: 13000
      },
      {
        title: '3 x semanal',
        description:
          '3 clases a elección por semana, 1 mes de duracion, $6000 x clase',
        amountWeeklyClasses: 3,
        amountPrice: 18000
      },
      {
        title: '4 x semanal',
        description:
          '4 clases a elección por semana, 1 mes de duracion, $5500 x clase',
        amountWeeklyClasses: 4,
        amountPrice: 22000
      },
      {
        title: '5 x semanal',
        description:
          '5 clases a elección por semana, 1 mes de duracion, $5000 x clase',
        amountWeeklyClasses: 0,
        amountPrice: 25000
      },
      {
        title: 'Pase Libre',
        description: 'Pase sin limitaciones',
        amountWeeklyClasses: 99999,
        amountPrice: 30000
      }
    ]
  })
}

const dSche = async () => {
  console.log('Deleting schedules ...')
  try {
    await db.schedule.deleteMany()
  } catch (error) {
    console.log('Failed deleting schedules :(')
    console.log(error)
  }
}

const cSche = async () => {
  console.log('Creating schedules ...')
  try {
    await createSchedules()
  } catch (error) {
    console.log('Failed deleting schedules :(')
    console.log(error)
  }
}

const dAll = async () => {
  console.log('Deleting all ...')
  try {
    await db.account.deleteMany()
    await db.class.deleteMany()
    await db.schedule.deleteMany()
    await db.promotion.deleteMany()
    await db.subscription.deleteMany()
    await db.payment.deleteMany()
    // await db.$queryRaw`DROP TABLE "Account" CASCADE`
  } catch (error) {
    console.log('Failed to deleting all :(')
    console.log(error)
  }
}

const cAll = async () => {
  console.log('Creating all ...')
  console.log('Creating accounts, members and instructors ...')
  for (let typeAccount in manyAccounts) {
    manyAccounts[typeAccount].forEach(async (account) => {
      try {
        await db.account
          .create({
            data: account
          })
          .then(async (account) => {
            if (account.permissions.includes(AccountPermissions.MEM)) {
              await db.member.create({
                data: {
                  ...generateMember(account.username),
                  account: {
                    connect: {
                      id: account.id
                    }
                  }
                }
              })
            } else if (account.permissions.includes(AccountPermissions.INS)) {
              await db.instructor.create({
                data: {
                  ...generateInstrucor(account.username),
                  account: {
                    connect: {
                      id: account.id
                    }
                  }
                }
              })
            }
          })
      } catch (error) {
        throw new Error(error)
      }
    })
  }
  console.log('Creating schedules ...')
  try {
    await createSchedules()
  } catch (error) {
    console.log(error)
  }
  console.log('Creating classes ...')
  try {
    await createClasses()
  } catch (error) {
    console.log(error)
  }
  console.log('Creating promotions ...')
  try {
    await createPromotions()
  } catch (error) {
    console.log(error)
  }
}

// const cAccounts = async (args) => {
//   console.log('Creating accounts ...')
//   try {
//     switch (args) {
//       case '-all':
//         for (let a in manyAccounts) {
//           console.log(`Creating ${a} ...`)
//           const all = await db.account.createMany({
//             data: manyAccounts[a]
//           })
//         }
//         break

//       case '-ins':
//         console.log(`Creating INS ...`)
//         const ins = await db.account.createMany({
//           data: manyAccounts['INS']
//         })
//         break

//       case '-adm':
//         console.log(`Creating ADM ...`)
//         const adm = await db.account.createMany({
//           data: manyAccounts['ADM']
//         })
//         break

//       case '-own':
//         console.log(`Creating OWN ...`)
//         const own = await db.account.createMany({
//           data: manyAccounts['OWN']
//         })
//         break

//       case '-mem':
//         console.log(`Creating MEM ...`)
//         const mem = await db.account.createMany({
//           data: manyAccounts['MEM']
//         })
//         break

//       case '-other':
//         console.log(`Creating OTHER ...`)
//         const other = await db.account.createMany({
//           data: manyAccounts['OTHER']
//         })
//         break

//       default:
//         console.log('Wrong args')
//         break
//     }
//   } catch (error) {
//     console.log('Failed to creating accounts :(')
//     console.log(error)
//   }
// }

// const cMemebers = async (args) => {
//   console.log('Creating members ...')
//   try {
//     switch (args[0]) {
//       case '-all':
//         break

//       default:
//         break
//     }
//   } catch (error) {
//     console.log('Failed to creating members :(')
//     console.log(error)
//   }
// }

const createDB = async (args) => {
  switch (args[0]) {
    case '-all':
      cAll()
      break

    case '-acc':
      cAccounts(args.slice(1))
      break

    case '-mem':
      cMemebers(args.slice(1))
      break

    case '-sche':
      cSche()
      break

    case '-single':
      console.log('Creating single own account')
      const single = await db.account.create({
        data: {
          username: 'gabi',
          password: 'pollo',
          permissions: [AccountPermissions.OWN]
        }
      })
      break

    default:
      break
  }
}

const deleteDB = async (args) => {
  try {
    switch (args[0]) {
      case '-all':
        dAll()
        break

      case '-sche':
        await dSche()
        break

      // case '-ins':
      //   console.log(`Creating INS ...`)
      //   const ins = await db.account.createMany({
      //     data: manyAccounts['INS']
      //   })
      //   break

      // case '-adm':
      //   console.log(`Creating ADM ...`)
      //   const adm = await db.account.createMany({
      //     data: manyAccounts['ADM']
      //   })
      //   break

      // case '-own':
      //   console.log(`Creating OWN ...`)
      //   const own = await db.account.createMany({
      //     data: manyAccounts['OWN']
      //   })
      //   break

      // case '-mem':
      //   console.log(`Creating MEM ...`)
      //   const mem = await db.account.createMany({
      //     data: manyAccounts['MEM']
      //   })
      //   break

      // case '-other':
      //   console.log(`Creating OTHER ...`)
      //   const other = await db.account.createMany({
      //     data: manyAccounts['OTHER']
      //   })
      //   break

      default:
        console.log('Wrong args')
        break
    }
  } catch (error) {
    console.log('Failed to creating accounts :(')
    console.log(error)
  }
}

const main = async (args) => {
  switch (args[0]) {
    case '-c':
      createDB(args.slice(1))
      break

    case '-d':
      deleteDB(args.slice(1))
      break

    default:
      console.log('Wrong arguments')
      break
  }
  // switch (args[2]) {
  //   case 'accounts':
  //     accounts(args[3])
  //     break

  //   default:
  //     console.log(await db.account.findFirst())
  //     break
  // }
}

main(process.argv.slice(2))
// console.log(process.argv.slice(2))
