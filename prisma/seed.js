const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    //Data roles
    await prisma.roles.createMany({
        data: [
            {
                name: "admin",
            },
            {
                name: "user",
            }
        ]
    });
    //Tutorials Data
    await prisma.tutorials.createMany({
        data: [
            {
                image_id: 1, //Data Bonang sementara
                link: 'https://www.youtube.com/watch?v=NrKvjxJsgQ0',
            },
            {
                image_id: 1, //Data Rebab sementara
                link: 'https://www.youtube.com/watch?v=dpbgoRcnugk',
            },
            {
                image_id: 1, //Data Saluang sementara
                link: 'https://www.youtube.com/watch?v=J2ICd7OeGAM',
            },
            {
                image_id: 1, //Data Sasando sementara
                link: 'https://www.youtube.com/watch?v=qqSAS_Moa6M',
            },
            {
                image_id: 1, //Data Sape sementara
                link: 'https://www.youtube.com/watch?v=rr_P6UPC1es',
            },
            {
                image_id: 1, //Data Kolintang sementara
                link: 'https://www.youtube.com/watch?v=BMV_TDrBCl8',
            },
            {
                image_id: 1, //Data Tifa sementara
                link: 'https://www.youtube.com/watch?v=MqPKmisiicg',
            },
        ]
    })
    //Articles Data
    await prisma.articles.createMany({
        data: [
            {
                user_id: 1, //Data sementara
                image_id: 1,// Data sementara
                tutorial_id: 1,// Data sementara
                title: 'Bonang',
                asal_daerah: 'Jawa',
                history: 'Bonang adalah salah satu alat musik pukul tradisional berbentuk gong kecil yang digunakan untuk pertunjukan musik gamelan Jawa, Bali, dan Sunda. Alat musik bonang awalnya adalah gubahan oleh Sunan Bonang yang memasukkan bonang ke dalam pertunjukkan musik gamelan. Saat ini, alat musik bonang ada beberapa jenis yaitu bonang penerus, bonang barung, bonang panembung.',
                bahan_pembuatan: 'Logam',
                sources: 'https://katadata.co.id/intan/berita/61a4f558884c0/mengenal-alat-musik-bonang-dan-beragam-jenisnya#:~:text=Alat%20musik%20bonang%20berawal%20dari,gubahan%20gamelan%20oleh%20Sunan%20Bonang, https://katadata.co.id/safrezi/berita/61a4eeaca021c/cara-memainkan-alat-musik-rebab-asal-usul-dan-fungsinya',  
            },
            {
                user_id: 1, //Data sementara
                image_id: 1,// Data sementara
                tutorial_id: 1,// Data sementara
                title: 'Rebab',
                asal_daerah: 'Jawa',
                history: 'Rebab adalah salah satu alat musik tradisional gesek yang menjadi cikal bakal alat musik biola dan tergabung dalam pertunjukkan musik gamelan. Rebab berasal dari Arab dan menyebar ke seluruh dunia seiring dengan menyebarnya agama Islam. Rebab sendiri masuk ke Indonesia melalui jalur Turki dan Asia Tengah',
                bahan_pembuatan: 'Kayu',
                sources: 'https://katadata.co.id/safrezi/berita/61a4eeaca021c/cara-memainkan-alat-musik-rebab-asal-usul-dan-fungsinya', 
            },
            {
                user_id: 1, //Data sementara
                image_id: 1,// Data sementara
                tutorial_id: 1,// Data sementara
                title: 'Saluang',
                asal_daerah: 'Sumatera',
                history: 'Saluang adalah alat musik tiup yang diambil dari nama seruling panjang. Alat musik Saluang sering dijadikan alat musik pengiring pertunjukkan Saluang jo Dendang. Menariknya dalam memainkan Saluang, pemain harus dapat meniup dan menarik nafas secara bersamaan dan tidak pernah terputus (circular breathing). Untuk dapat mendengarkan Saluang, bisa dengan menghadiri acara perkawinan, batagak rumah (pendirian rumah), batagak pangulu (peresmian penghulu) yang ada di Sumatera khususnya Minangkabau.',
                bahan_pembuatan: 'Bambu',
                sources: 'https://sumbarprov.go.id/home/news/12276-saluang-alat-musik-tradisional-minangkabau',
            },
            {
                user_id: 1, //Data sementara
                image_id: 1,// Data sementara
                tutorial_id: 1,// Data sementara
                title: 'Sasando',
                asal_daerah: 'Kalimantan',
                history: 'Sasando adalah alat musik petik yang hampir mirip dengan kecapi tetapi memiliki suara yang khas. Sasando dimainkan dengan dengan dua tangan dari arah yang berlawanan, yang berfungsi sebagai akord dan bass/melodi. Sasando saat ini memiliki beberapa jenis seperti Sasando Gong, Sasando Biola, dan Sasando Elektrik. Alat musik sasando sendiri memiliki beberapa sejarah tentang asal muasalnya, tetapi sejarah yang paling umum terdengar adalah berasal dari cerita Sangguana. Dalam cerita tersebut, diceritakan bahwa Sangguana adalah pria yang terdampar pada sebuah pulau dan kemudian jatuh cinta kepada seorang putri kerajaan. Namun, sebelum Sangguana dapat menikahi sang putri, raja pun memberi syarat agar Sangguana dapat membuat alat musik yang belum pernah ada sebelumnya. Kemudian, pada suatu malam Sangguana bermimpi, ia memainkan sebuah alat musik yang indah dengan suara yang merdu. Ia pun membuatnya dan diberi nama sasando, dan kemudian ia dapat menikahi sang putri karena raja menyukai alat musik tersebut. ',
                bahan_pembuatan: 'Daun Lontar',
                sources: 'https://www.gramedia.com/best-seller/alat-musik-sasando/, https://www.idntimes.com/life/education/robertus-ari/sejarah-alat-musik-sasando-dari-jenis-sampai-cara-mainnya?page=all',
            },
            {
                user_id: 1, //Data sementara
                image_id: 1,// Data sementara
                tutorial_id: 1,// Data sementara
                title: 'Sape',
                asal_daerah: 'Kalimantan',
                history: 'Sape adalah alat musik petik khas suku Dayak. Sape sering menjadi musik iringan untuk perayaan kesenian yang gembira bahkan konon dulu digunakan untuk mengiringi proses penyembuhan penyakit. Ada beberapa sumber yang menyebutkan bahwa Sape memiliki peraturan khusus untuk memainkannya, nada yang dihasilkan alat musik Sape dapat berbeda bergantung waktu memainkannya. Jika dimainkan pada pagi hari, maka nada yang dihasilkan adalah ceria dan gembira, tetapi jika dimainkan pada malam hari, nada yang dihasilkan adalah syahdu dan sedih. Sape sendiri memiliki beberapa jenis yaitu Sape dengan dua dawai atau disebut Sape Karaang, dan sape dengan empat hingga enam dawai.',
                bahan_pembuatan: 'Kayu Adau, Tempurung Kelapa',
                sources: 'https://katadata.co.id/agung/berita/631588f36ba83/mengenal-sape-alat-musik-tradisional-suku-dayak-dan-cara-memainkannya',
            },
            {
                user_id: 1, //Data sementara
                image_id: 1,// Data sementara
                tutorial_id: 1,// Data sementara
                title: 'Kolintang',
                asal_daerah: 'Sulawesi',
                history: 'Kolintang adalah alat musik pukul yang namanya berasal dari bunyi nadanya yaitu "Tong" untuk nada rendah, "Ting" untuk nada tinggi, dan "Tang" untuk nada tengah. Kolintang sendiri dipukul dengan menggunakan tongkat kecil bernama mallet yaitu tongkat kecil dengan bagian ujung yang dibalut kain atau benang. Kolintang dibagi ke dalam 9 jenis berdasarkan suaranya yaitu loway (bass), cella (cello), karua (tenor 1), karua rua (tenor 2), uner (alto 1), uner rua (alto 2), katelu (ukulele), ina esa (melodi 1), ina rua (melodi 2), dan ina taweng (melodi 3). Dahulu Kolintang digunakan untuk upacara pemujaan roh leluhur, tetapi seiring waktu Kolintang lebih difungsikan untuk pengiring tarian, pengiring lagu, atau pertunjukan musik.',
                bahan_pembuatan: 'Kayu',
                sources: 'https://www.gramedia.com/best-seller/alat-musik-kolintang/',
            },
            {
                user_id: 1, //Data sementara
                image_id: 1,// Data sementara
                tutorial_id: 1,// Data sementara
                title: 'Tifa',
                asal_daerah: 'Papua',
                history: 'Tifa adalah alat musik pukul mirip gendang dan biasa dikenal dengan nama Tahitoe atau Titir. Tifa memiliki beberapa jenis di antaranya adalah Tifa Jekir, Tifa Dasar, Tifa Potong, Tifa Jekir Potong, dan Tifa Bass. Tifa sendiri saat ini sering digunakan untuk mengiringi tarian perang dan tarian daerah seperti tari Lenso dan tari Gatsi. Asal usul Tifa berasal dari mitos 2 bersaudara yang menemukan pohon opsur yang mengeluarkan suara indah di tengah malam, lalu dua saudara tersebut menebang dan membuang bagian tengahnya. Terakhir, mereka menutup lubang kayu tersebut dan menutupinya dengan kulit hewan Soa-soa sehingga jadilah Tifa yang dikenal hingga saat ini.',
                bahan_pembuatan: 'Kayu Linggua, Kulit Rusa',
                sources: 'https://www.gramedia.com/literasi/alat-musik-tifa/',
            }
        ]
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })