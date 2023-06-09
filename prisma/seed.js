const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    //Data roles
    const roles = await prisma.roles.aggregate({
        _count: {
          name: true,
        },
    });
    if(roles._count.name === 0){
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
    };
    // Labels data
    const labels = await prisma.labels.aggregate({
        _count:{
            label: true,
        }
    })
    if(labels._count.label === 0){
        await prisma.labels.createMany({
            data:[
                {
                    id: 1,
                    label: 'Bonang'
                },
                {
                    id: 2,
                    label: 'Rebab'
                },
                {
                    id: 3,
                    label: 'Saluang'
                },
                {
                    id: 4,
                    label: 'Sasando'
                },
                {
                    id: 5,
                    label: 'Sape'
                },
                {
                    id: 6,
                    label: 'Kolintang'
                },
                {
                    id: 7,
                    label: 'Tifa'
                }
            ]
        })
    }

    const users = await prisma.users.aggregate({
        _count: {
          name: true,
        },
    });
    if(users._count.name === 0){
        await prisma.users.create({
            data:{
                name: 'Admin',
                email: 'admin1@gmail.com',
                username: 'admin1',
                password: '$2a$12$0vvzXKgpFoY2qRmOuMzNIetRNLalszVfLTUH/aosHvyplaCbv/p3i',
                role_id: 1,
                photo: 'photo',
            }
        })
    }
    //Images Data
    await prisma.images.createMany({
        data:[
            {
                id: 1,
                user_id: 1,
                label_id: 1,
                image: 'https://storage.googleapis.com/nusatala-images/scans/bonang.jpg',
            },
            {
                id: 2,
                user_id: 1,
                label_id: 2,
                image: 'https://storage.googleapis.com/nusatala-images/scans/rebab.jpg',
            },
            {
                id: 3,
                user_id: 1,
                label_id: 3,
                image: 'https://storage.googleapis.com/nusatala-images/scans/saluang.jpg',
            },
            {
                id: 4,
                user_id: 1,
                label_id: 4,
                image: 'https://storage.googleapis.com/nusatala-images/scans/sasando.jpg',
            },
            {
                id: 5,
                user_id: 1,
                label_id: 5,
                image: 'https://storage.googleapis.com/nusatala-images/scans/sape.jpeg',
            },
            {
                id: 6,
                user_id: 1,
                label_id: 6,
                image: 'https://storage.googleapis.com/nusatala-images/scans/kolintang.jpg',
            },
            {
                id: 7,
                user_id: 1,
                label_id: 7,
                image: 'https://storage.googleapis.com/nusatala-images/scans/tifa.jpg',
            },
        ]
    })
    // Tutorials Data
    await prisma.tutorials.createMany({
        data: [
            {
                label_id: 1,
                link: 'https://www.youtube.com/watch?v=NrKvjxJsgQ0',
            },
            {
                label_id: 2,
                link: 'https://www.youtube.com/watch?v=dpbgoRcnugk',
            },
            {
                label_id: 3,
                link: 'https://www.youtube.com/watch?v=J2ICd7OeGAM',
            },
            {
                label_id: 4,
                link: 'https://www.youtube.com/watch?v=qqSAS_Moa6M',
            },
            {
                label_id: 5,
                link: 'https://www.youtube.com/watch?v=rr_P6UPC1es',
            },
            {
                label_id: 6,
                link: 'https://www.youtube.com/watch?v=BMV_TDrBCl8',
            },
            {
                label_id: 7,
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
                label_id: 1,
                title: 'Bonang',
                asal_daerah: 'Jawa',
                history: 'Bonang adalah salah satu alat musik pukul tradisional berbentuk gong kecil yang digunakan untuk pertunjukan musik gamelan Jawa, Bali, dan Sunda. Alat musik bonang awalnya adalah gubahan oleh Sunan Bonang yang memasukkan bonang ke dalam pertunjukkan musik gamelan. Saat ini, alat musik bonang ada beberapa jenis yaitu bonang penerus, bonang barung, bonang panembung.',
                bahan_pembuatan: 'Logam',
                sources: 'https://katadata.co.id/intan/berita/61a4f558884c0/mengenal-alat-musik-bonang-dan-beragam-jenisnya#:~:text=Alat%20musik%20bonang%20berawal%20dari,gubahan%20gamelan%20oleh%20Sunan%20Bonang, https://katadata.co.id/safrezi/berita/61a4eeaca021c/cara-memainkan-alat-musik-rebab-asal-usul-dan-fungsinya',  
            },
            {
                user_id: 1, //Data sementara
                image_id: 2,// Data sementara
                tutorial_id: 2,// Data sementara
                label_id: 2,
                title: 'Rebab',
                asal_daerah: 'Jawa',
                history: 'Rebab adalah salah satu alat musik tradisional gesek yang menjadi cikal bakal alat musik biola dan tergabung dalam pertunjukkan musik gamelan. Rebab berasal dari Arab dan menyebar ke seluruh dunia seiring dengan menyebarnya agama Islam. Rebab sendiri masuk ke Indonesia melalui jalur Turki dan Asia Tengah',
                bahan_pembuatan: 'Kayu',
                sources: 'https://katadata.co.id/safrezi/berita/61a4eeaca021c/cara-memainkan-alat-musik-rebab-asal-usul-dan-fungsinya', 
            },
            {
                user_id: 1, //Data sementara
                image_id: 3,// Data sementara
                tutorial_id: 3,// Data sementara
                label_id: 3,
                title: 'Saluang',
                asal_daerah: 'Sumatera',
                history: 'Saluang adalah alat musik tiup yang diambil dari nama seruling panjang. Alat musik Saluang sering dijadikan alat musik pengiring pertunjukkan Saluang jo Dendang. Menariknya dalam memainkan Saluang, pemain harus dapat meniup dan menarik nafas secara bersamaan dan tidak pernah terputus (circular breathing). Untuk dapat mendengarkan Saluang, bisa dengan menghadiri acara perkawinan, batagak rumah (pendirian rumah), batagak pangulu (peresmian penghulu) yang ada di Sumatera khususnya Minangkabau.',
                bahan_pembuatan: 'Bambu',
                sources: 'https://sumbarprov.go.id/home/news/12276-saluang-alat-musik-tradisional-minangkabau',
            },
            {
                user_id: 1, //Data sementara
                image_id: 4,// Data sementara
                tutorial_id: 4,// Data sementara
                label_id: 4,
                title: 'Sasando',
                asal_daerah: 'Kalimantan',
                history: 'Sasando adalah alat musik petik yang hampir mirip dengan kecapi tetapi memiliki suara yang khas. Sasando dimainkan dengan dengan dua tangan dari arah yang berlawanan, yang berfungsi sebagai akord dan bass/melodi. Sasando saat ini memiliki beberapa jenis seperti Sasando Gong, Sasando Biola, dan Sasando Elektrik. Alat musik sasando sendiri memiliki beberapa sejarah tentang asal muasalnya, tetapi sejarah yang paling umum terdengar adalah berasal dari cerita Sangguana. Dalam cerita tersebut, diceritakan bahwa Sangguana adalah pria yang terdampar pada sebuah pulau dan kemudian jatuh cinta kepada seorang putri kerajaan. Namun, sebelum Sangguana dapat menikahi sang putri, raja pun memberi syarat agar Sangguana dapat membuat alat musik yang belum pernah ada sebelumnya. Kemudian, pada suatu malam Sangguana bermimpi, ia memainkan sebuah alat musik yang indah dengan suara yang merdu. Ia pun membuatnya dan diberi nama sasando, dan kemudian ia dapat menikahi sang putri karena raja menyukai alat musik tersebut. ',
                bahan_pembuatan: 'Daun Lontar',
                sources: 'https://www.gramedia.com/best-seller/alat-musik-sasando/, https://www.idntimes.com/life/education/robertus-ari/sejarah-alat-musik-sasando-dari-jenis-sampai-cara-mainnya?page=all',
            },
            {
                user_id: 1, //Data sementara
                image_id: 5,// Data sementara
                tutorial_id: 5,// Data sementara
                label_id: 5,
                title: 'Sape',
                asal_daerah: 'Kalimantan',
                history: 'Sape adalah alat musik petik khas suku Dayak. Sape sering menjadi musik iringan untuk perayaan kesenian yang gembira bahkan konon dulu digunakan untuk mengiringi proses penyembuhan penyakit. Ada beberapa sumber yang menyebutkan bahwa Sape memiliki peraturan khusus untuk memainkannya, nada yang dihasilkan alat musik Sape dapat berbeda bergantung waktu memainkannya. Jika dimainkan pada pagi hari, maka nada yang dihasilkan adalah ceria dan gembira, tetapi jika dimainkan pada malam hari, nada yang dihasilkan adalah syahdu dan sedih. Sape sendiri memiliki beberapa jenis yaitu Sape dengan dua dawai atau disebut Sape Karaang, dan sape dengan empat hingga enam dawai.',
                bahan_pembuatan: 'Kayu Adau, Tempurung Kelapa',
                sources: 'https://katadata.co.id/agung/berita/631588f36ba83/mengenal-sape-alat-musik-tradisional-suku-dayak-dan-cara-memainkannya',
            },
            {
                user_id: 1, //Data sementara
                image_id: 6,// Data sementara
                tutorial_id: 6,// Data sementara
                label_id: 6,
                title: 'Kolintang',
                asal_daerah: 'Sulawesi',
                history: 'Kolintang adalah alat musik pukul yang namanya berasal dari bunyi nadanya yaitu "Tong" untuk nada rendah, "Ting" untuk nada tinggi, dan "Tang" untuk nada tengah. Kolintang sendiri dipukul dengan menggunakan tongkat kecil bernama mallet yaitu tongkat kecil dengan bagian ujung yang dibalut kain atau benang. Kolintang dibagi ke dalam 9 jenis berdasarkan suaranya yaitu loway (bass), cella (cello), karua (tenor 1), karua rua (tenor 2), uner (alto 1), uner rua (alto 2), katelu (ukulele), ina esa (melodi 1), ina rua (melodi 2), dan ina taweng (melodi 3). Dahulu Kolintang digunakan untuk upacara pemujaan roh leluhur, tetapi seiring waktu Kolintang lebih difungsikan untuk pengiring tarian, pengiring lagu, atau pertunjukan musik.',
                bahan_pembuatan: 'Kayu',
                sources: 'https://www.gramedia.com/best-seller/alat-musik-kolintang/',
            },
            {
                user_id: 1, //Data sementara
                image_id: 7,// Data sementara
                tutorial_id: 7,// Data sementara
                label_id: 7,
                title: 'Tifa',
                asal_daerah: 'Papua',
                history: 'Tifa adalah alat musik pukul mirip gendang dan biasa dikenal dengan nama Tahitoe atau Titir. Tifa memiliki beberapa jenis di antaranya adalah Tifa Jekir, Tifa Dasar, Tifa Potong, Tifa Jekir Potong, dan Tifa Bass. Tifa sendiri saat ini sering digunakan untuk mengiringi tarian perang dan tarian daerah seperti tari Lenso dan tari Gatsi. Asal usul Tifa berasal dari mitos 2 bersaudara yang menemukan pohon opsur yang mengeluarkan suara indah di tengah malam, lalu dua saudara tersebut menebang dan membuang bagian tengahnya. Terakhir, mereka menutup lubang kayu tersebut dan menutupinya dengan kulit hewan Soa-soa sehingga jadilah Tifa yang dikenal hingga saat ini.',
                bahan_pembuatan: 'Kayu Linggua, Kulit Rusa',
                sources: 'https://www.gramedia.com/literasi/alat-musik-tifa/',
            }
        ]
    })
    // Product Data
    await prisma.products.createMany({
        data:[
            {   
                id: 1,
                user_id: 1,
                label_id: 1,
                name: 'Bonang talempong gong besi full - tanpa pukulan',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Bonang/1.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 2 kg\nKategori: Gong\nEtalase: gong\nsatu pcs bonang bahan besi full dikasih pukulan\ndiameter -+ 25cm tinggi -+10cm\nvarian\n*Bonang tanpa pukulan\n*Bonang plus pukulan',
                price: 275000,
                link: 'https://www.tokopedia.com/cahayaabadimusik/bonang-talempong-gong-besi-full-tanpa-pukulan?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 5
            },
            {
                id: 2,
                user_id: 1,
                label_id: 1,
                name: 'Bonang Kenong Kuda Lumping Jaranan Bahan Besi isi 3',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Bonang/2.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 3 kg\nKategori: Mainan Kuda\nEtalase: Gamelan\nBahan besi\nFinising Cat Duko\nPlus pemukul 2 buah\nIsi 3 bonang\nTanpa dudukan\nPakai alas dus atau kertas tebal / karpet bila tidak pakai dudukan',
                price: 600000,
                link: 'https://www.tokopedia.com/giripurwaseni/bonang-kenong-kuda-lumping-jaranan-bahan-besi-isi-3?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 5
            },
            {
                id: 3,
                user_id: 1,
                label_id: 2,
                name: 'REBAB SAWO GAMELAN JAWA',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Rebab/1.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 7 kg\nKategori: Aksesoris Alat Musik Gesek\nEtalase: REBAB\nRebab adalah salah satu alat musik tradiosional jawa, biasanya di mainkan bersama gamelan jawa.\nbahan kayu sawo.\n\nBeli produk ini langsung dari toko online Raff Collection Semarang saja yuk.\nToko online Raff Collection jual produk kerajinan gamelan, lebih murah dan terjamin kualitasnya\n\nIsi dalam paket:\n1 rebab bahan kayu sawo\n1 senggreng\n1 srenten\n1 gondorukem\n2 senar (untuk cadangan)\n\nBelum termasuk kotaknya (kotak hanya sebagai ilustrasi saja).\nJika menginginkan dengan kotaknya ada di etalase beda lagi.\n\nPerhitungan ongkir berdasarkan volume ya bukan berat produk.\n\nFoto adalah real pict yang kami punya.\n\nProduk ini asli hand made, bukan pabrikasi.\nReadi stok di toko online Raff Collection Semarang.\n\nSilahkan langsung diorder aja.',
                price: 550000,
                link: 'https://www.tokopedia.com/raff-collection/rebab-sawo-gamelan-jawa?extParam=ivf%3Dfalse%26src%3Dsearch&refined=true',
                rating: 5
            },
            {
                id: 4,
                user_id: 1,
                label_id: 2,
                name: 'Rebab Gamelan Jawa Kayu Sawo',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Rebab/2.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 2 kg\nKategori: Gamelan\nEtalase: Gamelan\n\nDeskripsi Rebab Sawo gamelan Jawa\nRebab adalah salah satu alat musik tradiosional jawa , biasanya di mainkan bersama gamelan jawa.\n\nharga ini hanyalah harga rebabnya saja tanpa kotak&plangkan(tempat dudukan)\n\nhubungi WA: 083866471799 jika datang ke toko (harga lebih murah)',
                price: 450000,
                link: 'https://www.tokopedia.com/airwinshop/rebab-gamelan-jawa-kayu-sawo?extParam=ivf%3Dfalse%26src%3Dsearch&refined=true',
                rating: 5
            },
            {
                id: 5,
                user_id: 1,
                label_id: 2,
                name: 'Rebab gamelan jawa kayu sonokeling Murah',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Rebab/3.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 7 kg\nKategori: Lainnya\nEtalase: ALAT MUSIK\n\nHanya di toko kami anda bisa menemukan Produk dengan kualitas TERBAIK...!!!\nRebab gamelan jawa bahan dari kayu sonokeling\n\nharga untuk satu rebab kayu sonokeling\n\nuntuk kain / dodotnya warna random tergantung stock yang ada\n\nBonus :\n1 kosok / senggreng\n2 senar cadangan\n1 batu kosok / gondorukem\n1 srentem\n\nSelamat berbelanja, stok selalu Ready. silahkan lgs di order gan/sis.\nJam Operasional: 08.00-17.00 WIB\nSKU : 3131/1075827616024018944/55',
                price: 645000,
                link: 'https://www.tokopedia.com/maliko-1/rebab-gamelan-jawa-kayu-sonokeling-murah?extParam=ivf%3Dfalse%26src%3Dsearch&refined=true',
                rating: 5
            },
            {
                id: 6,
                user_id: 1,
                label_id: 2,
                name: 'Rebab kayu Sawo dan kotak',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Rebab/4.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 7 kg\nKategori: Gamelan\nEtalase: Rebab\n\nRebab Jawa bahan dari kayu Sawo\n\nBeli produk ini langsung dari toko online Raff Collection Semarang saja yuk.\nToko online Raff Collection jual produk kerajinan gamelan, lebih murah dan terjamin kualitasnya\n\nHarga di atas untuk satu set rebab dan kotaknya.\nisi paket:\n- Rebab Sawo\n- kosok rebab\n- srenten\n- gondorukem\n- senar rebab ( untuk cadangan )\n- kotak rebab\n\nFoto diatas adalah real pict stock yang kami punya.\n\nRebab ini asli hand made punya kita, bukan dari pembuatan pabrikasi.\n\nReadi stok di toko online Raff Collection Semarang',
                price: 690000,
                link: 'https://www.tokopedia.com/raff-collection/rebab-kayu-sawo-dan-kotak?extParam=ivf%3Dfalse%26src%3Dsearch&refined=true',
                rating: 4.5
            },
            {
                id: 7,
                user_id: 1,
                label_id: 3,
                name: 'Saluang Minangkabau',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Saluang/1.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 250 g\nKategori: Alat Musik\nEtalase: Saluang\nSaluang Minangkabau, untuk profesional dengan nada presisi, bukan souvenir!! Tersedia nada dasar C, C#, dan Bb',
                price: 260000,
                link: 'https://www.tokopedia.com/tukangtukangan/saluang-minangkabau-alat-musik-minang-padang-sumatera-barat?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 5
            },
            {
                id: 8,
                user_id: 1,
                label_id: 3,
                name: 'Saluang Minang',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Saluang/2.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 750 g\nKategori: Aksesoris Alat Musik Tiup\nEtalase: Semua Etalase\n\nSelamat datang di toko kami :)\n\nFlute bambu diagonal. Cara meniupnya secara diagonal.\nNama tradisionalnya Saluang.\nBiasa dipakai dalam acara adat Minang sambil fiiringi nyanyian puji2an.\n\nSelama iklan masih ada 99% produk ready stok dan BER-GARANSI\nselamat berbelanja and happy shopping!!!',
                price: 223000,
                link: 'https://www.tokopedia.com/muhammadrazi-1/saluang-minang-diagonal-flute-traditional-minang-indonesia-populer?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 0
            },
            {
                id: 9,
                user_id: 1,
                label_id: 3,
                name: 'Saluang Darek',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Saluang/3.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 750 g\nKategori: Buku Kedokteran Spesialis\nEtalase: Semua Etalase\n\nNada : C\nPanjang : 60 cm\nDiameter : 3 cm\n\nKonfirmasi dulu untuk nada yg dibutuhkan\n\nSaluang merupakan alat musik tradisional Minangkabau, yg terbuat dari bambu tipis atau bambu talang. dengan 4 lubang nada. saluang ini termasuk jenis alat musik aerophon. yang dihiasi dengan ukiran khas Minangkabau menggunakan alat ukir dengan pemanas khusus.',
                price: 159000,
                link: 'https://www.tokopedia.com/cakra-marketshop/saluang-darek-alat-musik-tradisional-minangkabau?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 0
            },
            {
                id: 10,
                user_id: 1,
                label_id: 3,
                name: 'SALUANG Minang polos tanpa ukiran',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Saluang/4.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 450 g\nKategori: Biola\nEtalase: Ukiran Kayu\n\nSelamat Datang di Toko Kami\nHappy Shoping\n\nSebagian besar barang di toko kami ready stock, jangan ragu untuk checkout ya kak\n\nBIASAKAN MEMBACA DULU\n\nSALUANG minang Polos tanpa ukiran\nBernada dasar C=DO\n(Ukiran hanya bisa request nama)\n\nBahan dari bambu pilihan, di stem menggunakan piano, di ukir menggunakan alat ukir bakar bukan dari spidol. Kualitas boleh di uji.\n\nUkuran panjang +- 57cm\nDiamete +- 2.5 cm\n\nMempunyai 4 lobang tangga nada\nNada dasar C=DO\nJenis nada, DIATONIS (ber-urutan)\nUrutan Nada :\nC-D-E-F-G = DO-RE-MI-FA-SOL\n\nBagi pemula : Untuk tutorial cara memainkannya, bisa di cek di youtube dengan kata kunci "Tutorial Saluang Minang". Sudah banyak di bikin video nya oleh para konten kreator\n\nNote:\nUntuk ukurannya tidak bisa di pastikan, hanya bisa menulis dengan ukuran kira². Karna ini termasuk kerajinan tangan & bahannya pun dari alam, bukan mesin yang bekerja.',
                price: 181000,
                link: 'https://www.tokopedia.com/aestheticrooms/saluang-minang-polos-tanpa-ukiran-salingkuangcraft-limited-stock?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 0
            },
            {
                id: 11,
                user_id: 1,
                label_id: 4,
                name: 'Sasando 24 Senar',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Sasando/1.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 11 kg\nWaktu Preorder: 14 Hari\nKategori: Sasando\nEtalase: Sasando\nSetiap Sasando selalu dibuat baru dan proses pembuatan 3-5 hari untuk 1 sasando. Motif bisa dipilih.\nDijual Sasando 24 Senar (Non Elektrik) Rp 1.250.000,- (Pembelian lebih dari 1 mendapatkan harga spesial). Ukuran sama dengan 32 senar ukuran 3/4. Lebih kecil dari Sasando Elektrik atau Akustik 45 Senar ke atas. Detail SASANDO Handmade. Bisa dibuka tutup dan gampang dibawa kemana saja. Sasando di atas merupakan Sasando Biola yang bisa dimainkan oleh pemula. Kami sudah melayani pembelian ke berbagai daerah di Indonesia juga luar negeri. Kami juga menerima tawaran untuk performance Sasando solo maupun grup di nasional maupun internasional.\nPerhitungan berat produk dengan ukuran besar di dasarkan pada perhitungan volume 90x50x30cm digunakan rumus berat volume pada TIKI/JNE = (PxLxT)/6000.\nOngkir sudah termasuk pengiriman dengan packing kayu dan sangat aman sampai tujuan.',
                price: 1250000,
                link: 'https://www.tokopedia.com/sasando/alat-musik-sasando-24-senar-non-elektrik-termurah?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 5
            },
            {
                id: 12,
                user_id: 1,
                label_id: 4,
                name: 'Sasando 54 Senar',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Sasando/2.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 18 kg\nWaktu Preorder: 14 Hari\nKategori: Sasando\nEtalase: Sasando\nPENTING UNTUK DIBACA!\n\nDengan bangga mempersembahkan untuk Anda, desain baru Sasando 54 senar kami dengan stand dan hardcase. Jembatan (penahan senar) yang bisa dipindahkan dan senar warna-warni yang bisa digunakan untuk penghafalan chord, sehingga akan lebih mudah dipelajari.\nDesain dan warna sasando juga bisa di customsesuai dengan keinginan anda. Semua sasando akan dibuat baru untuk pelanggan dan membutuhkan waktu sekitar 7-14 hari. Kalian akan mendapatkan sasando terbaik dan baru dari kami. Jadi tunggu apa lagi. Ayo pesan !!!',
                price: 7000000,
                link: 'https://www.tokopedia.com/sasando/alat-musik-sasando-elektrik-54-senar-dengan-stand-hardcase-terbaik?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 5
            },
            {
                id: 13,
                user_id: 1,
                label_id: 5,
                name: 'Gitar Sape',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Sape/1.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 6 kg\nKategori: Alat Musik\nEtalase: Gitar\nGuitar Sape Alat Musik Dayak Kalimantan.\nAdalah alat musik khas Kalimantan.\nDimainkan dengan cara dipetik seperti gitar.\nSudah dilengkapi dengan preamp Aktif. Tinggal colok ke mixer/sound.\nSuaranya sangat khas.\nMaterial Kayu Kalampan (Kayu asli Kalimantan)\How to tuning??\nString 1-C4\nString 2-C4\nString 3-G3\nString 4-E3\nString 5-C3\nString 6-D3 (paling atas)\n\nDimensi:\nP x L x T= 110cm x 18cm x 10cm.\nDimensi packing: 120x20x12cm\n\nMotif di kirim random.',
                price: 1347000,
                link: 'https://www.tokopedia.com/dmay7musicshop/guitar-sape-sape-alat-musik-dayak-alat-musik-tradisional?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 5
            },
            {
                id: 14,
                user_id: 1,
                label_id: 5,
                name: 'Sape',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Sape/2.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 3 kg\nKategori: Alat Musik\nEtalase: Alat Musik\nSape 6 Senar\n\nPanjang 100 cm\nLebar 20 cm\nKetebalan body 5 cm\n\nORIGINAL!!! Preamp Equalizer Tuner Cowboy AW-6\n\nMotif timbul (Ukir)\n\nWarna marlon kombinasi hitam\nDreyr grover : 3 L dan 3 R\nWarna hitam\n\npenahan senar dari tembagaNut kayu ulin, bridg kayu ulin\nSaadle dari tembaga\nUkuran senar 0,13\nrets bambu gare(lokal)',
                price: 1950000,
                link: 'https://www.tokopedia.com/and2pedia/sapek-sape-sape-alat-musik-tradisioanl-dayak?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 3
            },
            {
                id: 15,
                user_id: 1,
                label_id: 6,
                name: 'Gambang Kolintang',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Kolintang/1.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 1 kg\nKategori: Lainnya\nEtalase: Semua Etalase\nCALUNG KOLINTANG BAMBU alat musik tradisional 1 oktaf 8 nada(DO-RE-MI-FA-SOL-LA-SI-DO) cara memainkan dipukul dengan alat yang sudah disediakan, cocok untuk pemula yang hobi bermain musik.\nKolintang atau kulintang adalah alat musik yang terdiri dari barisan bambu yang diletakkan mendatar.\nBahan : Bambu khusus untuk angklung yang sudah diproses tahan hama\n\nUkuran :\nTinggi dudukan 5 cm, panjang 40 cm, lebar 35 cm\nPanjang bambu nada DO - 35 cm, RE - 33 cm, MI - 32 cm, FA - 30 cm, SOL - 28 cm, LA - 26 cm, SI - 24 cm, DO - 22 cm.\nTidak bergaransi',
                price: 117000,
                link: 'https://www.tokopedia.com/darasco/gambang-kolintang-bambu-1-oktaf-8-nada-alat-musik-tradisional-ukuran?extParam=ivf%3Dfalse%26src%3Dsearch',
                rating: 4.8
            },
            {
                id: 16,
                user_id: 1,
                label_id: 7,
                name: 'Tifa Anak Alat Musik Papua',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Tifa/1.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 900 g\nKategori: Alat Musik\nEtalase: Perkusi\n\nTifa Kecil.\nBisa dipake untuk menari.\nTinggi 30cm\nDiameter 5 inch\n\nMaterial solid wood mahogany.\nMembran kulit kambing.',
                price: 79700,
                link: 'https://www.tokopedia.com/jazziepro1985/tifa-anak-alat-musik-papua-hitam?extParam=ivf%3Dfalse&src=topads',
                rating: 4.9
            },
            {
                id: 17,
                user_id: 1,
                label_id: 7,
                name: 'mainan anak alat musik tifa Papua jimbe rembana hadroh 30cm',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Tifa/2.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 1,8 kg\nKategori: Drum Elektrik\nEtalase: Semua Etalase\n\nAV(AILABLE)\n\nmainan anak alat musik tifa Papua jimbe rembana hadroh\n\n((NOTE:UNTUK WARNA ATAU SIZE MOHON DITULIS DI KOLOUM KETERANGAN ORDER))',
                price: 56000,
                link: 'https://www.tokopedia.com/anidea54/0-0-mainan-anak-alat-musik-tifa-papua-jimbe-rembana-hadroh-30cm?extParam=ivf%3Dfalse%26src%3Dsearch&refined=true',
                rating: 5.0
            },
            {
                id: 18,
                user_id: 1,
                label_id: 7,
                name: 'ALAT MUSIK TRADISIONAL TIFA PAPUA',
                thumbnail: 'https://storage.googleapis.com/nusatala-images/products-thumbnails/Tifa/3.jpg',
                description: 'Kondisi: Baru\nBerat Satuan: 1 kg\nKategori: Gendang\nEtalase: Semua Etalase\n\nAlat Musik TIFA PAPUA\n\ndari bahan Kayu tebal dan kuat, dengan ukiran dan tulisan Papua.\n\nSelain jadi alat musik, Tifa ini bisa dijadikan pajangan di rumah.\nRumah jadi terlihat indah dengan nuansa etnik.\n\nReady 2 warna : Black, Brown\nReady 5 ukuran : Size A, B, C, D, E\n\nSize C : T-25, D-12',
                price: 230000,
                link: 'https://www.tokopedia.com/clickpapua/alat-musik-tradisional-tifa-papua-size-e?extParam=ivf%3Dfalse%26src%3Dsearch&refined=true',
                rating: 5
            },
        ]
    })
    //Testimonials Data
    await prisma.testimonials.createMany({
        data: [
            {
                user_id: 3,
                testimony: 'Aplikasi sangat membantu saya dalam mengenali alat musik tradisional yang sebelumnya tidak saya ketahui.',
                rating: 5
            },
            {
                user_id: 4,
                testimony: 'Aplikasi ini membantu saya mengenal dan mempelajari alat musik tradisional Indonesia dengan fitur pengenalan gambar yang cerdas.',
                rating: 5
            },
            {
                user_id: 5,
                testimony: 'Saya suka bagaimana aplikasi ini menggunakan teknologi pengenalan gambar untuk memberikan informasi yang akurat tentang alat musik tradisional yang saya ambil gambarnya',
                rating: 5
            }
        ]
    })
    //FAQs Data
    await prisma.faqs.createMany({
        data: [
            {
                id: 1,
                user_id: 1,
                question: 'Apa itu Nusatala?',
                answer: 'Nusatala adalah sebuah aplikasi yang dapat mendeteksi gambar alat musik tradisional menggunakan teknologi image recognition.'
            },
            {
                id: 2,
                user_id: 1,
                question: 'Bagaimana cara menggunakan Nusatala?',
                answer: 'Unduh dan instal aplikasi Nusatala, lalu buka aplikasi tersebut. Ambil gambar alat musik tradisional Indonesia, dan aplikasi akan memberikan informasi terkait alat musik tersebut.'
            },
            {
                id: 3,
                user_id: 1,
                question: 'Apakah Aplikasi Nusatala mencakup semua alat musik tradisional Indonesia?',
                answer: 'Untuk saat ini, Nusatala hanya dapat mengenali beberapa alat musik tradisional saja. Tim pengembang terus berupaya untuk memperluas database alat musik tradisional yang terdaftar dalam aplikasi agar mencakup lebih banyak jenis alat musik di masa mendatang.'
            },
        ]
    })
    //Quizzes Data
    await prisma.quizzes.createMany({
        data: [
            {
                id: 1,
                user_id: 1,
                status: true,
                thumbnail: "https://storage.googleapis.com/nusatala-images/quiz-thumbnails/easy.png",
                total_question: 2,
                level: "easy",
            },
            {
                id: 2,
                user_id: 1,
                status: true,
                thumbnail: "https://storage.googleapis.com/nusatala-images/quiz-thumbnails/medium.png",
                total_question: 4,
                level: "medium",
            },
            {
                id: 3,
                user_id: 1,
                status: true,
                thumbnail: "https://storage.googleapis.com/nusatala-images/quiz-thumbnails/hard.png",
                total_question: 6,
                level: "hard",
            },
        ]
    });
    await prisma.quiz_questions.createMany({
        data: [
            {
                id: 1,
                quiz_id: 1,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/bonang.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Rebab",
                option2: "Kolintang",
                option3: "Gong",
                option4: "Bonang",
                real_answer: "Bonang",
            },
            {
                id: 2,
                quiz_id: 1,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/saluang.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Tifa",
                option2: "Saron",
                option3: "Saluang",
                option4: "Sape",
                real_answer: "Saluang",
            },
            {
                id: 3,
                quiz_id: 2,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/kolintang.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Kolintang",
                option2: "Kecapi",
                option3: "Sasando",
                option4: "Gendang",
                real_answer: "Kolintang",
            },
            {
                id: 4,
                quiz_id: 2,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/sape.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Yi				Sape",
                option2: "Sape",
                option3: "Angklung",
                option4: "Gambus",
                real_answer: "Sape",
            },
            {
                id: 5,
                quiz_id: 2,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/sape2.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Akordeon",
                option2: "Bansi",
                option3: "Sape",
                option4: "Tanjidor",
                real_answer: "Sape",
            },
            {
                id: 6,
                quiz_id: 2,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/tifa.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Gendang",
                option2: "Tifa",
                option3: "Babun",
                option4: "Gong",
                real_answer: "Tifa",
            },
            {
                id: 7,
                quiz_id: 3,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/sasando.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Siter",
                option2: "Kolintang",
                option3: "Fu",
                option4: "Sasando",
                real_answer: "Sasando",
            },
            {
                id: 8,
                quiz_id: 3,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/sasando.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Bonang",
                option2: "Seruling",
                option3: "Slenthem",
                option4: "Sasando",
                real_answer: "Sasando",
            },
            {
                id: 9,
                quiz_id: 2,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/rebab.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Rebana",
                option2: "Rebab",
                option3: "Gambus",
                option4: "Yi",
                real_answer: "Rebab",
            },
            {
                id: 10,
                quiz_id: 2,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/rebab2.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Tifa",
                option2: "Saron",
                option3: "Kecapi",
                option4: "Rebab",
                real_answer: "Rebab",
            },
            {
                id: 11,
                quiz_id: 2,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/saluang.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Terompet",
                option2: "Siter",
                option3: "Saluang",
                option4: "Sasando",
                real_answer: "Saluang",
            },
            {
                id: 12,
                quiz_id: 2,
                status: true,
                question_image: "https://storage.googleapis.com/nusatala-images/questions/saluang.jpg",
                question_text: "Apa nama alat musik tradisional di atas?",
                option1: "Kolintang",
                option2: "Angklung",
                option3: "Tifa",
                option4: "Sape",
                real_answer: "Kolintang",
            },
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