import { useMemo, useState } from "react";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHjnq-pf7V4TyenkkCHBa9nPodjXRIdhhyVxsVw5UON2SaoWIPm0FMGUQhboELKvcn/exec"

const USERS = [
"A AFRIADI ALI - KMDI",
"A ANDRY ERWIN M - PAM",
"A. FAISAL ANSHARI - BMT",
"A. RUSTAN - BJU",
"A. Wahyu Hermawan - TJY",
"A. Wahyu Hermawan - TRANSJAYA",
"AAN PRASETYO - PNJ",
"Abd syakur - BJU",
"ABDUL AZIZ - KMDI",
"abdul basit mas - KSL",
"ABDUL HAYAT - ACT",
"ABDUL JALAL - TOPI",
"Abdul Karim - ALP",
"ABDUL MAJID - TOPI",
"ABDUL MANAP - ACT",
"ABDUL RAHIM - KMDI",
"ABDUL RAHMAN - KGM",
"Abdul Rohim - ACT",
"ABDUL ROHMAN - ACT",
"ABDUL ROHMAN - PAM",
"Abdul rohman (ANG)  - ANG",
"ABDUL ROKHIM - ACT",
"Abdul Siraj - TOPI",
"Abdul Syukur - AKS",
"Abdul Wahid - KSL",
"ABDULAH - ACT",
"Abraham krisi - KMDI",
"Abrar Khaer - BJU",
"Abu Solikhin - BSP",
"ABU SOPYAN - ACT",
"ABUDADIN - KMDI",
"Acep - KPLM",
"ACEP HAERUDIN - KMDI",
"Acep Hirawan - KPLM",
"Acep hurawan - KPLM",
"ACEP SUPARTA - HSP",
"ACHMAD FUADY - ACT",
"Achza Fahrurrozie - TJY",
"Achza Fahrurrozie - TRANSJAYA",
"ADADI - ANG",
"ADE IRAWAN - PNJ",
"ADE KUSWANTO - KMDI",
"Ade Matopani - ACM",
"ADE METRA (PIC Carrier)  - TAG",
"ADE NOVANDI - TOPI",
"Ade Samsudin - KPLM",
"ADE SUHERMAN - PAM",
"ADE SUPRIYATNA - KMDI",
"ADE SUPRIYATNA - TOPI",
"ADEN AGA SAPUTRA - ACT",
"Adi Guna Bambang  - SELOG",
"ADI IRAWAN PANE - ACT",
"ADI ISKANDAR - ZAB",
"Adi Kurniawan - TJY",
"ADI RACHMAN - PNJ",
"Adi Suhendri - BJU",
"ADI SUSANTO - ACT",
"ADI SUUENDRI - BJU",
"ADI WILATMA - PAM",
"Adil hariansyah - BJU",
"AEP GUNAWAN - TOPI",
"AFDAH ALIF - TOPI",
"Afif Ainun Ashur - BJU",
"Afrizol - ACT",
"AGIP JUANTO - KMDI",
"AGUNG HANDOKO - ACT",
"Agung Pratama - SELOG",
"Agung Santoso - TRANSJAYA",
"AGUNG SRIYANTO - KOPKARNAS",
"Agus Andriyanto - BSP",
"AGUS DODI MULYADI - ACT",
"Agus Fadjar Harimansyah - TRANSJAYA",
"Agus Istanto - KPLM",
"AGUS JUMANI - KOPKARNAS",
"Agus Lilik - TRANSJAYA",
"AGUS MULYONO  - KMDI",
"AGUS NANA NURALIN TIANA - ACT",
"Agus Rahmat - KPLM",
"AGUS RIYANTO - PNJ",
"AGUS SABIRIN - ACT",
"AGUS SETIAWAN - TOPI",
"AGUS SETIONO - KSL",
"Agus Sobirin - ACT",
"Agus Sudrajat - KPLM",
"Agus Sugiana - KPLM",
"AGUS WIDODO - ACT",
"Agus Yogi Setiana - KPLM",
"Agus Yuwono - TRANSJAYA",
"AGUS.S - KOPKARNAS",
"Agustang - BJU",
"Ahmad - BJU",
"AHMAD AZIZ - TOPI",
"AHMAD BAHRI - PNJ",
"Ahmad basrifin - ACT",
"AHMAD BASRIPIN - ACT",
"AHMAD bin SUBARNAS - KMDI",
"Ahmad Erjan Pulungan  - MTP",
"AHMAD ERJAN PULUNGAN - MTP",
"AHMAD HENDRI - ACT",
"AHMAD HIDAYAT - ANG",
"AHMAD HIDAYAT (ANG) - ANG",
"AHMAD IMAM RAYA - TAG",
"AHMAD ISMAIL - ACT",
"AHMAD JAHRUDIN - KPLM",
"Ahmad Jailani ( ACT)  - ACT",
"AHMAD JENI - ANG",
"AHMAD JUDIN - ACT",
"Ahmad Khobir - MTP",
"AHMAD KOMARUDIN - ACT",
"AHMAD LUTFI (PDI)  - TAG",
"AHMAD REZA HUSAIN - BMT",
"Ahmad Rizki - SELOG",
"AHMAD SOBARI - PNJ",
"Ahmad suganda - BJU",
"AHMAD SULKIFLI - BJU",
"AHMAD SYAKIR (Dispatch)  - TAG",
"AHMAD TOMMY - ACT",
"AHMAD YANI  - ACT",
"AHMAD ZAILANI - ACT",
"Ahmadan Saputra - Dispatcher",
"AHMAT SANUSI  - ACT",
"Aidil hariansyah - BJU",
"Aji purnomo  - ACT",
"AJI PURNOMO - ACT",
"AJI RASA - KMDI",
"AJI SONAJI - KMDI",
"Aji Sonaji - KPLM",
"AJI SUNARJI - ACT",
"AJO SUPARJO BIN IYAN - ACT",
"Akbar Maulana - BJU",
"AKBAR MAULANA - PNJ",
"Akhmad Khozin - TRANSJAYA",
"Akhmad Nursekhu - TJY",
"AKHMAD RIYADI - ANG",
"AKHSAN - MTP",
"AKMAL BUDIMAN MUKHTASAR - BJU",
"Akrandi - BJU",
"ALAM NUARI - BJU",
"ALAMNUARI - BJU",
"ALAMSYAH - BJU",
"Alamsyah.M - BJU",
"ALATAN PARULIAN NAIBAHO  - KPLM",
"Alatan Paruluan Naibaho - KPLM",
"ALBERTUS SUBRATA - ACT",
"ALDI SAPUTRA - ACT",
"Alexander Thomas egam - LTS",
"ALFIAN ANTONIUS SINAGA - ACT",
"ALFIN - PAM",
"ALI FIKRI - KMDI",
"Ali muntaha - KMDI",
"Ali Rojikin - UTI",
"Ali Sopyan - KPLM",
"ALI YUSNI - KMDI",
"ALI ZUBAIDI - ACT",
"Ali Zubaidi ( ACT ) - ACT",
"Alita Pratama - KPLM",
"ALMADI - PNJ",
"Alwin wangania - JSS",
"AMAR MA'RUF - BJU",
"AMARULLAH - ACT",
"AMARULLAH ALFATA - ACT",
"AMIN TOHARI - ACT",
"Aminudin - KPLM",
"Amir - BJU",
"AMIR HAKIM - ZAB",
"Amran arif - ACT",
"AMRAN ARIF - MTP",
"AMSORI - ACT",
"Amsori ( ACT ) - ACT",
"ANAS FARIS ATHIF GHOFAR - KMDI",
"Andi  - ACT",
"Andi angga - KPLM",
"Andi Angga Saputra - KPLM",
"ANDI NALDI - ACT",
"Andi Winata ( KPLM )  - KPLM",
"ANDING SUHARDIN - BOJ",
"Andirizky Aprianto - Dispatcher",
"ANDISTA VIKY SAPUTRA - ACT",
"Andre Setiawan - KPLM",
"Andreas - SELOG",
"Andri - PAM",
"ANDRI - TOPI",
"ANDRI HERMAWAN - TOPI",
"Angga - ACT",
"Angga - KPLM",
"Angga ( ACT ) - ACT",
"ANGGA MDN - ACT",
"ANGGA PRATAMA - ACT",
"Angga tari pradana - ACT",
"Angga Wijaya - KPLM",
"ANJANI BIN KARMO - KMDI",
"Ansyari Putra Lubis - ACT",
"ANTON RUSDI - TOPI",
"ANTON SUKAEDIR - ACT",
"Anung Suwarsono - TJY",
"ANWAS - TOPI",
"APEN TARMIDI - ACT",
"APID USMAN - ACT",
"Aprinaldi Koto - MTP",
"APRIYANTONI - ACT",
"APRIZAL DJUWARTO - BOJ",
"APUNG SAEPULLAH - PNJ",
"Aras Arta prayoga - BJU",
"Ardiansyah - KPLM",
"ARDIYANSYAH - ZAB",
"ARFHANDIE - UTI",
"ARI KASTUBI - PAM",
"ARI PURNOMO - ACT",
"ARI YANA - ACT",
"Ariadi - KMDI",
"ARIF DERMAWAN - BOJ",
"Arifin - BSP",
"ARIFIN ESTOMIHI SIREGAR - ACT",
"aris Alfian - ACT",
"Aris Astomi - ALP",
"Aris fardiansah - PARANI",
"ARIS LUKMAN  - ACT",
"ARIS RAGIL - KMDI",
"ARIS RUSMANA - TOPI",
"Aris Suharyadi - AKS",
"Ariyana - KPLM",
"ARIYANTO - PNJ",
"ARMANDA WIRANTO - ACT",
"Armin - BJU",
"Arnan - BJU",
"ARPANI - ACT",
"Ary Febrian - BJU",
"ARYANDI - BJU",
"Arzani - ACT",
"ASDI - KMDI",
"Asep Anang - KPLM",
"ASEP DEDI DJUNAEDI - PAM",
"Asep Erlangga - KPLM",
"ASEP JALALUDIN - PAM",
"ASEP RAHMAN - PAM",
"ASEP RIADI - ACT",
"Asep Riadi ( ACT ) - ACT",
"Asep Sabarudin - KPLM",
"Asep Saepul Akdam - KPLM",
"ASEP SAPRUDIN - PAM",
"ASEP SUPRIYADI - ACT",
"Asep syarip hidayat - ACT",
"Asri - BJU",
"Asri D - BJU",
"ASRI S - BJU",
"ASRUWIANTO - BJU",
"ATAM BIN TALIB - ACT",
"ATRAM SUNGAIDI - ACT",
"AULYA RAHMAN - PAM",
"AWAL SYAPUTRA - UTI",
"AWAN SETIAWAN - KMDI",
"AWANG HERMAWAN - KMDI",
"AZIS NIARA - TOPI",
"AZUWAR - ACT",
"BADRU - KMDI",
"Badrun ( KMDI ) - KMDI",
"BADRUZZAMAN - HSP",
"BAGUS BACHTIAR - PAM",
"Bagus Rahmat Setiawan - Dispatcher",
"BAHRUL FALAQ - ACT",
"BAHRUL HADI  - ACT",
"BAJURI - KMDI",
"Bakri - BJU",
"BAMBANG HARYANTO - ANG",
"BAMBANG HERMANTO - ACT",
"Bambang Irawan - MTP",
"Bambang Kasiyanto - KPLM",
"BAMBANG SUGIANTO - PAM",
"Baruna - ACT",
"BARUNA RIZKI RAMADHAN - ACT",
"Basri Deli - ACM",
"BAYONG - TOPI",
"BAYU ADRIAN - BJU",
"BAYU NATA - KMDI",
"Bayu Permana Bastian - TOPI",
"Beben - ACT",
"BEBEN BIN TASWAN - ACT",
"Beni Kurniawan - SELOG",
"BENI RAHMAN - ANG",
"BENI RAHMAN (ANG) - ANG",
"BENU  - KMDI",
"Benu - KMDI",
"BINSAR HALOMOAN P.P - ACT",
"BINSAR HALOMOAN PANDAPOTAN P. - ACT",
"Binsar Sihombing  - KPLM",
"Binsar Sihombing - KPLM",
"Bobi Herawan - KPLM",
"Boby Rahman  - MTP",
"BOBY RAHMAN - MTP",
"BONDAN BUDI KUSUMA - TAG",
"Budi Aryanto - MTP",
"Budi mulyono - KMDI",
"BUDI PRASTIA - PAM",
"Budi prastia - PARANI",
"Budi Prayitno - TJY",
"Budi Purwanto - TJY",
"BUDI SUCI SETIAWAN - KMDI",
"BUDI SUPRAPTO - ACT",
"Budiono - KMDI",
"Burhanuddin  - KMDI",
"BURHANUDIN - KMDI",
"CAHYA SETIADI - PNJ",
"CALAM - KMDI",
"CANDRA SUWITNO - ANG",
"CARNATA (NATA) - TOPI",
"CARNOTO - TOPI",
"CARTAM - PNJ",
"CASMAIN - TOPI",
"CASMUDI - TOPI",
"CASNUDI - TOPI",
"CASTORI - ACT",
"CATUR - TOPI",
"Cecep Mulyadi - ALP",
"CECEP SUKANDA - TOPI",
"CHIKI HARTANTO - ANG",
"Choirul Imam - BSP",
"CHRISTIAN SRI S - TAG",
"CICI SANUSI - ACT",
"DADANG HERMAWAN - TOPI",
"DADANG KURNIAWAN - ACT",
"Dadang Mulyana - KPLM",
"Dahud - KPLM",
"DAKIM - TOPI",
"Dalim - ANG",
"DAMAN - ACT",
"DAMAN - TOPI",
"Damianus Mamo - ALP",
"DANDI - BJU",
"DANI IBRAHIM - KMDI",
"Danil - BJU",
"DANU TIRTA - TOPI",
"DARMA TRI ARIANSYAH - ACT",
"DARMADI - ACT",
"Darmadi - TRANSJAYA",
"DARMAJI - TOPI",
"Darmawan Susanto - KPLM",
"Darsono - KPLM",
"DARTO - TOPI",
"Darwis - BJU",
"DASIM - ACT",
"DAVID KRISTIAN HUTAPEA - ACT",
"DAVID SETIADI - ANG",
"Dede - PAM",
"DEDE AHMAD SYAHID - KMDI",
"DEDE ANEN - TOPI",
"DEDE HAMZAH - PNJ",
"DEDE HERYANA - TOPI",
"Dede Hoerudin - KPLM",
"DEDE SAHBUDIN - PAM",
"DEDE SELAMET PRIAMBODO - ANG",
"DEDE SUPIANDI - HSP",
"Dede Yusup - KPLM",
"DEDEN - KMDI",
"Dedi - KPLM",
"DEDI ARISANDI (Washing)  - TAG",
"DEDI CHANDRA - PAM",
"Dedi Priyanto - BSP",
"Dediazwar - ACT",
"Dedy Rudianto - UTI",
"DEDY SUTIRA - ACT",
"DEFRI ISWANTO - ACT",
"Defril ramadhan - ACT",
"DEFRIL RAMADHAN SIREGAR - ACT",
"Dendi Afrinal - ACM",
"DENI ANANTA - PAM",
"Deni Caniago  - KMDI",
"DENI CHANIAGO - KMDI",
"DENI EKO PRASETIYO - ACT",
"DENI SAPUTRA - ACT",
"DENI SYAFRIZAL - ACT",
"DENI ZULIAMIN - BOJ",
"DENIS HERDIANSYAH - TOPI",
"DENO LARISA - KPLM",
"DERRY SETIAWAN - AKS",
"DIAN FADLI - ACT",
"DIDIK CAHYONO - ACT",
"Didik Cahyono (ACT)  - ACT",
"DIDIK PURNOMO - ACT",
"DIDIT MAHARI CAHYANTO - KMDI",
"Didit Sugiarto - BSP",
"DIEGO SIRAIT  - KPLM",
"Dijan Frinando Sianturi - KPLM",
"DIJANFRINANDO SIANTURI  - KPLM",
"DIKI DARMAWAN - KMDI",
"Diki Dirmawan  - KMDI",
"DIMAS ADITIA - ACT",
"Diski Saputra - ALP",
"DIYONO - PAM",
"DJODJO TARDJO - KMDI",
"Djoko Edi Puryanto - BSP",
"DODIK SANDI WINATA - ACT",
"DODO - ACT",
"DONI PURNAMA - PAM",
"DUDUNG - ACT",
"DUDUNG (ACT)  - ACT",
"DWI MUJIONO - INL",
"Dwi Wirasto - TRANSJAYA",
"EBIN SAPUTRA - TOPI",
"EDAR SUBAROS - ACT",
"Eddy Susanto - TRANSJAYA",
"EDI DARSONO - TOPI",
"EDI JUNAEDI - ACT",
"EDI PURWANTO - HSP",
"EDI SOPANDI - KMDI",
"EDI SUSANTO - KMDI",
"EDI SUTARNO - PAM",
"EDY BUNYAMIN - KGM",
"Edy junaidi - MTP",
"EDY SAMPOERNO - KMDI",
"Edy Warsito - TRANSJAYA",
"EGI CORNELIS - KMDI",
"EGI RIZKY PERMANA - KMDI",
"Egi Saputra - ALP",
"Egi sayana - INL",
"EGO PRASETYO - ACT",
"EKA MARDIYANTA - PAM",
"Eka mardiyanta - PARANI",
"EKA PRAYUDHA APRILIANTO - KGM",
"EKO ANAR Q - TOPI",
"Eko Anar Q Ramadhan - KPLM",
"EKO APRIYANTO - PNJ",
"Eko Budi Mulyono - TRANSJAYA",
"Eko Friando Manulang - ACT",
"EKO NUGROHO - ACT",
"Eko nugroho ( ACT ) - ACT",
"EKO SAPUTRO - ANG",
"Eko Setiawan - TRANSJAYA",
"Eko Supriyadi - KPLM",
"Eko Wahyu Hervianto - ALP",
"ELANG MAULANA CITRA - ACT",
"Eman - KPLM",
"ENDANG KURNIA - PNJ",
"ENDANG SOPIAN - TOPI",
"ENDANG SUSANTO - ACT",
"Endang Wahyudi - KPLM",
"ENDAY - ACT",
"ENDRA LINGGA SAPUTRA - ACT",
"Endra Wicahyono - BSP",
"ENDRI SETIAWAN - KOPKARNAS",
"ENDRIK - TOPI",
"ENGKOS - ACT",
"Engkos ( ACT)  - ACT",
"Entis Sutisna - KPLM",
"ERI MUAMAR - MPC",
"Eri Pujianto - BSP",
"ERIH NUGRAHA - TOPI",
"Erik Depiyan - TJY",
"Erik Saputra - UTI",
"Erik Xtrada T - BJU",
"ERIK XTRADA TANDI - BJU",
"ERLAN - ACT",
"Erwin - PARANI",
"ERWIN ATMAJA - PAM",
"Erwinta - ACT",
"ERWINTA MATONDANG - ACT",
"Eva Ruhyana - KPLM",
"FACHRIZA AKHBAR NUGRAHA - BOJ",
"FACHRUL RIZAL - MPC",
"Fadli usman - BJU",
"Fadliansyah - BOJ",
"Fahmi Sanitra - KPLM",
"FAHREZA HUSA - MPC",
"FAHRIZAL ANTONI - PAM",
"FAHRIZAL ANTONI - TOPI",
"Fahru Rozi - MTP",
"FAISAL - ACT",
"Faisal ( ACT ) - ACT",
"FAISAL PERDANA (F.Out)  - TAG",
"FAIZAL - ZAB",
"FAKHRY ARYA DHINATHA - BMT",
"Fandy Griston  - KPLM",
"Fandy Griston Sinabariba - KPLM",
"FARHAN JUANDA - KMDI",
"Farid Adi Kusmawan - TRANSJAYA",
"FARID YASSIN - PAM",
"FARISH - PAM",
"Farish - PARANI",
"FARIYADI - ZAB",
"Fathullah Rahman - TJY",
"Fauzi Zain - ACT",
"FAWWAS AKBAR - BJU",
"FEBRIANTO PAKPAHAN - ACT",
"Febrinaldi - ACM",
"Fendi Dwi Pastyawan - AKS",
"FERI IRAWANTO - ANG",
"FERY FRAN DIAZ T (Koordinator)  - TAG",
"Feryadi - KPLM",
"FIERMAN SYAH - TOPI",
"firdaus - KSL",
"Firma Syahputra  - MTP",
"Firma Syahputra - MTP",
"FIRMAN HERMANSYAH - PAM",
"FIRMANSYAH - BOJ",
"Firmawan - Dispatcher",
"Fitri heri setiyono - KMDI",
"Fransiskus Dani - ALP",
"FRENGKI LEONARDO TAMBUNAN - ACT",
"FRENGKY - BJU",
"GALIH WISNU SADEWA - KSL",
"Gani Yuli Sutanto - TJY",
"Gani Yuli Sutanto - TRANSJAYA",
"GATOT SUPRAYOGI - PAM",
"GINDO DODI GUNAWAN - ACT",
"Giyantoro - TJY",
"Giyantoro - TRANSJAYA",
"Gladis Yulius Verlani - BSP",
"Gunawan - KMDI",
"GUNAWAN - KOPKARNAS",
"GUNAWAN GINTING - TAG",
"GUNAWAN RIZKI - KGM",
"GUNAWAN WIBIS0NO - KMDI",
"GUNTUR SAPUTRA - KGM",
"Guntur Swara Dwifa - ACT",
"HABIBI - ANG",
"Hadi Cahyono - ACT",
"HADI KUSRINTO - ANG",
"HADIANTO - KMDI",
"Haerudin - KPLM",
"Haerudinsyah - KPLM",
"Haerul - BJU",
"Haidir - BJU",
"HAKIMIN - ZAB",
"Halim perdana - BJU",
"HALIMI - ANG",
"HALIMI - TOPI",
"Hamami - PAM",
"HAMDANI LUBIS - MTP",
"Hamid nur rahman - KMDI",
"Hamka - BJU",
"Hamzah - BJU",
"HAMZAH DT - BJU",
"HAMZAH HS - BJU",
"HAMZAH SUNJAYA - TOPI",
"HANAPIH - KMDI",
"Hani Rohani - KPLM",
"Haqqu - MTP",
"HARIS FEBRIYANA - TOPI",
"HARIYONA - KMDI",
"Harmansyah - MTP",
"HARRI PRAMANA A - SELOG",
"HARRI PRAMANA NST  - SELOG",
"HARRI PRAMANA PUTRA NST - SELOG",
"HARSONO KURNIAWAN - KMDI",
"HARSONO KURNIAWAN - PAM",
"Harsono kurniawan - PARANI",
"Hasan Basri - ACT",
"HASAN BASRI - SELOG",
"HASAN BISRI - TOPI",
"HASANUDDIN - KSL",
"HASANUDDIN B - ACT",
"HASANUDIN - ACT",
"Hasanudin ( ACT ) - ACT",
"HASTO DWI PRABOWO - ANG",
"Hasyim Rifai - KPLM",
"Hefi Fitriady - ALP",
"HELMI (Dispatch)  - TAG",
"HELMI SUBANGKIT - KPLM",
"HENDRA - ACT",
"Hendra Apriyadi - ALP",
"Hendra budi hartanto - PARANI",
"HENDRA BUDI HARTONO - PAM",
"Hendra Gunawan - ALP",
"Hendrawan - KPLM",
"Hendri - ACM",
"HENDRIK HARAHAP - ACT",
"HENDRIK HRP - ACT",
"Hendro Siregar  - KPLM",
"Hendro Siregar - KPLM",
"HENGKI - KGM",
"Hengki Adi Gazali - ACT",
"HEPRI JUNI YANTO - TOPI",
"HERDI - TOPI",
"HERI - PAM",
"HERI - TOPI",
"HERI HAERUDIN - TOPI",
"HERI HERMAWANDI - TOPI",
"HERI MARDIANTO - PAM",
"Heri Sihombing  - KPLM",
"HERI SUGARIA - ACT",
"HERIYANTO  - ACT",
"HERMAN - ACT",
"HERMAN - ANG",
"Herman - KPLM",
"Herman ( PARANI) - PAM",
"Herman Felani - KMDI",
"Hermanto D. wenas - JSS",
"Hermawanto - KPLM",
"Herry Kurniawan - ACM",
"HERTHA DELLA - TAG",
"HERU HERMAWANDI - PAM",
"HERU RUKMANA - TOPI",
"HERUL - PNJ",
"HERWANTO - TOPI",
"HIDAYAT - PNJ",
"Hifni Heryanto - KPLM",
"HOTNER PANJAITAN  - ACT",
"HOTNER PANJAITAN ACTSDR - ACT",
"Hudiyanto - TJY",
"I Gede Suardana - ACT",
"I Kadek Ardi Iranata - ACT",
"I ketut supariadi - ANG",
"I Komang Sujana Arta - ACT",
"I KOMANG SWIDIA WIJANA - ACT",
"I nyoman sukerta - KMDI",
"I Putu Eka Arnyana - ACT",
"IBNU MAULANA - PAM",
"IBRAHIM - KSL",
"IBRAHIM NEKEN. - ALP",
"ICCANG - BJU",
"IDA DASUKI JULIANA - PAM",
"IDAN - TOPI",
"IDIL FAHRANI - BMT",
"IFAN GEOFANI - HSP",
"IFTAHIL AINI - BOJ",
"IGO CAHYO SAPUTRA - TOPI",
"IHAN MUHAMMAD BURHANUDIN - PNJ",
"IKA ADITYA - ANG",
"IKHSANUDIN - ACT",
"Iksan - UTI",
"ILHAM ROMADHONI - ACT",
"ILYAS - BJU",
"Ilyas nontji - BJU",
"ILYAS T - BJU",
"IMAM BUDIANTO - ZAB",
"IMAM FAUZI - KMDI",
"Imam Maulana - BSP",
"Imam Nurpa'I - KPLM",
"Imam wahyudi - KMDI",
"Imanuel Tarigan - SELOG",
"IMAT SUHIMAT - ANG",
"Imran - BJU",
"Imron Cahyadi - KPLM",
"Imron cahyo - KPLM",
"INDARTO - KMDI",
"Indra - AKS",
"Indra Budiman - KPLM",
"Indra Ismail - BJU",
"INDRA PERMANA - HSP",
"Ino Saputra Hidayat - BJU",
"Ipnu Hidayatullah  - KMDI",
"IPNU HIDAYATULLAH - KMDI",
"IQBAL - BJU",
"IRFAN  - BJU",
"Irfan ( KPLM ) - KPLM",
"Irfan Lilik Setyawan - TJY",
"Irfan Lilik Setyawan - TRANSJAYA",
"Irman untung  - BJU",
"IRMAN UNTUNG CAHYADI - BJU",
"IRMANSYA - KGM",
"IRPAN - PNJ",
"Irsan - BJU",
"IRSAN - PAM",
"IRSYAM - BJU",
"Irwan Efendi - KMDI",
"Irwan Nur Hendi - KPLM",
"Irwan nurhendi - KPLM",
"IRWAN SUSANTO - KMDI",
"IRWAN TRI WIJAYA - KSL",
"ISA LUKMAN NUL HAKIM  - ACT",
"ISKANDAR - BJU",
"ISMAL WAHYUDI - PNJ",
"ISTAFID - KMDI",
"Iswadi - UTI",
"ISWAHYUDI - PAM",
"Iswahyudi - PARANI",
"ISWANDI  - ACT",
"Iswanto (ACT) - ACT",
"ISWANTO CC - ACT",
"ISYANTO - PAM",
"ITA KARSITA - KMDI",
"Iwan - KPLM",
"Iwan Hermawan ( KPLM) - KPLM",
"IWAN LASMANA - PAM",
"IYAN KARYANA - PAM",
"IYAN SOFIYAN - ACT",
"JABAL NUR - BJU",
"JAENAL ABIDIN - KMDI",
"JAFIRMAN - PNJ",
"JAHARI - TOPI",
"JAHRI - ACT",
"JAJULI - KMDI",
"Jajuli (  KMDI ) - KMDI",
"JAKA KUSWARA - KMDI",
"JAKA PURNAMA - TOPI",
"JAMALUDIN - HSP",
"JAMANUDIN - KMDI",
"James kiki syamsudin - JSS",
"JAPARUDIN - TOPI",
"Jasri - TJY",
"Jasri - TRANSJAYA",
"JASRUDDIN - BOJ",
"Jeffry herlando - ACT",
"JEFRI NAINGGOLAN  - KPLM",
"Jefri Nainggolan - KPLM",
"JEJEN JAENAL ABIDIN - PAM",
"JEJEN JAENUDIN - ACT",
"JEKI SAPUTRA - PNJ",
"JENRY RIVIS LOTULONG - JSS",
"JEPERSON SINAMBELA - ACT",
"JERRY BAROKAH - TOPI",
"Jevi Arianto - BOJ",
"JIHAD HARIYANTO - KMDI",
"Joel Jeriko - KPLM",
"JOEL JERIKO MATANARI  - KPLM",
"Johan - KPLM",
"Johan Febrian - KPLM",
"JOHAN HANDOKO - ANG",
"Johan handoko ( ACT ) - ACT",
"JOHAN KRISDIANTO - ACT",
"JOJO JUNARI - KMDI",
"Joko Rismantoro - PAM",
"JOKO SANTOSO - ACT",
"JOKO SUMOSUSILO - ACT",
"JOKO SUROSO - KOPKARNAS",
"Joni Efendi - KPLM",
"Joni efendi (KPLM)  - KPLM",
"JOPIE HENIE SAERANG - ACT",
"JOSMAN SIHOTANG - ACT",
"Jost Busht  - KPLM",
"Jost Busht - KPLM",
"JULIANDO DOLOKSARIBU  - KPLM",
"Jumadi - BSP",
"JUMAKDIN PANJAITAN - MTP",
"JUMEDI - PAM",
"JUNADI - TOPI",
"JUNAIDI - ZAB",
"Juwendi - KPLM",
"KAHARUDDIN  - BJU",
"KAHARUDDIN - KMDI",
"KAHARUDDIN S - BJU",
"KAMALLUDIN - KMDI",
"KAMARUDDIN - BJU",
"KAONO - PAM",
"KARDONO - TOPI",
"Karjoko Andriyanto - TRANSJAYA",
"KARNA - TOPI",
"KARNO - INL",
"KARNOTO - KMDI",
"KARSUDI - ANG",
"KARTONO R. - ANG",
"KARWAN - KMDI",
"Kasi asrianto - BJU",
"KASIM BIN PATAH - ACT",
"KASMUDI  - ACT",
"KASPAN - KMDI",
"Ketut Indra Wijaya - TRANSJAYA",
"Ketut Inrda Wijaya - TJY",
"KEVINDA - KMDI",
"KGS. MUCHLIS - ZAB",
"KHOIRUL AMRI  - ACT",
"KIRAN - TOPI",
"KM SULAIMAN - KGM",
"KOMAEDI - KMDI",
"Komaedi - KPLM",
"KOMAR  - ACT",
"Komarudin - KPLM",
"KOSASIH - ACT",
"KRIDO WILLIANDO - ACT",
"KRISTIANTONO - ACT",
"KRISTIONO - KOPKARNAS",
"Kukuh Pamungkas - BSP",
"Kuntoro - ANG",
"KURNIA YUSSAR YAHYA - Dispatcher",
"KUSIRAN - ACT",
"KUSRIYANTO - ACT",
"KUSTORO - ANG",
"Kustoro - KPLM",
"Kuswanto - KMDI",
"Leo Silaban  - KPLM",
"LEON MEDYA AGUSTA - PAM",
"LESTARI WIDODO - KMDI",
"LINDRI FARDIANSYAH - KGM",
"LUKMAN - PNJ",
"LUKMAN NURHAKIM - ACT",
"LUKMANUL HAKIM - TOPI",
"M ARMAN SUDIRMAN - BJU",
"M Farhan Syarif - KMDI",
"M FIRDAUS MAULANA - PAM",
"M HIMAWAN TASTRA (Admin)  - TAG",
"M ikbal - ACT",
"M ISMAIL - ZAB",
"M MAHMUD (Dispatch)  - TAG",
"M NUR HUDA - KMDI",
"M RAHMAD HIDAYAT - TAG",
"M riza - ACT",
"M TITO PRATAMA - TAG",
"M. AGUS ARTA - ACT",
"M. AKBARUL FIKRI - ANG",
"M. AZMY - MTP",
"M. Jufri - BJU",
"M. KARDI - KSL",
"M. Mirza - MTP",
"M. RISKAN - ACT",
"M. Said - UTI",
"M. SAMSUL ARIFIN - BOJ",
"M. Taufik Irwan Marbun - KPLM",
"M. Yasir - MTP",
"M. YUSUF LUBIS - MTP",
"M. YUSUP - ANG",
"M.ADI PRANATA - ACT",
"M.badrun ( ACT) - ACT",
"M.DUWI FERDIYASYAH - MPC",
"M.JAPAR - BOJ",
"M.khaliq - MPC",
"M.SAMSUL ARIFIN - BOJ",
"Mahdi - BJU",
"MAHESA - ACT",
"MAHMUR - KMDI",
"Mahpudin - KPLM",
"MAMAN SURAHMAN - KMDI",
"MANSUR - ACT",
"Mansyur - BJU",
"MANUNTUN SILABAN - ACT",
"Mardi - KPLM",
"Mardi Utomo - ACT",
"Mardjono - AKS",
"MARGIONO - ACT",
"Margiono ( ACT ) - ACT",
"Markhaban - BMU",
"MARKRIUS HUTABARAT - ACT",
"Markurius hutabarar - ACT",
"MARSON SIMARMATA  - KPLM",
"MARSONO - ACT",
"MARWANSYAH B - BJU",
"Mas Rudiyanto - AKS",
"MASKUN - INL",
"MASUDI - KMDI",
"MASYKUR - KGM",
"MAY FRANS - KMDI",
"MHD AKHSAN - MTP",
"Mhd el Khairi - ACT",
"Mhd. Fajar - SELOG",
"MIRZA ULIL AZMI - ACT",
"MISJIANTO - ACT",
"Misjianto ( ACT ) - ACT",
"MISRA SUMANA - ACT",
"MISSAD - TOPI",
"MISYADI - KMDI",
"Moch Nisam - TRANSJAYA",
"Mochamad subur - PAM",
"MOCHAMAD YASIN - ACT",
"MOH AZMY - MTP",
"MOH. ABDUL ROFIQ. H - ACT",
"MOH. DALIM - ANG",
"MOH. SYARIFUDIN - TOPI",
"Mohamad arif ngatenan - LTS",
"MUALIM AJI AZHARI - ACT",
"Muchamad Sofyan - KPLM",
"Muchlis - BJU",
"Muchlis pancaralaksa - KMDI",
"MUDIONO - PAM",
"Muh anugrah sija - BJU",
"Muh arqam h s - BJU",
"Muh Aswar dahlan - BJU",
"MUH IKSAN - BJU",
"Muh Irfan Tahir  - BJU",
"Muh rizal - BJU",
"MUH YUSUF - BJU",
"Muh Yusuf Abdullah  - BJU",
"MUH ZHAFRAN A. - BJU",
"Muh. ALI l - BJU",
"Muh. Alif Nur Rahmatullah  - BJU",
"Muh. Arqam HS - BJU",
"Muh. Ikhsan - BJU",
"MUH. IRHAMDANI PUTRA - BJU",
"MUH. NURSAFAAT - BJU",
"MUH. SOFYAN - BJU",
"MUH. YAHYA - BJU",
"MUH. YANI - BJU",
"Muh.ilham abdullah - BJU",
"Muh.Zhafran - BJU",
"MUHAIMIN - ACT",
"Muhaimin ( ACT ) - ACT",
"MUHAMAD ANDRI WIJAYA - ACT",
"MUHAMAD HERI - ANG",
"Muhamad Rahmanda - INL",
"MUHAMAD RIZAL AFFANDI - ACT",
"MUHAMAD ROFIK - ACT",
"Muhamad Rosi Sumantri - KPLM",
"MUHAMAT SIANTO ZAINUL - ACT",
"MUHAMAT SIANTO ZAINUL R - ACT",
"Muhammad abdul azis - KMDI",
"MUHAMMAD ADITYA NUGRAHA - BMT",
"Muhammad Adrian - BJU",
"Muhammad Agus - BJU",
"MUHAMMAD ARDIANSYAH - ACT",
"MUHAMMAD ARIF ADITIYA - ACT",
"MUHAMMAD BADRUN KHAIRUSSH - ACT",
"Muhammad Darwis - BJU",
"Muhammad Fajar Rizki - TJY",
"Muhammad Farid - Dispatcher",
"MUHAMMAD FIQKY - BOJ",
"MUHAMMAD HERU MUNAWIR - ACT",
"MUHAMMAD IHSAN - ACT",
"MUHAMMAD KAUTSAR - TAG",
"Muhammad Khoiri - MTP",
"Muhammad nur huda - KMDI",
"Muhammad Ridho Pahrezi - SELOG",
"MUHAMMAD RIDUAN - TAG",
"Muhammad Ridwan - UTI",
"MUHAMMAD RIZA - ACT",
"MUHAMMAD ROMI ANDREAN - BOJ",
"Muhammad rosi ( KPLM ) - KPLM",
"MUHAMMAD RUSDI - ACT",
"Muhammad Safri - BJU",
"Muhammad Sahrul - BJU",
"MUHAMMAD SIDIK - ACT",
"MUHAMMAD SUHANDRI - MTP",
"Muhammad Ulil Alfalah - TJY",
"Muhammad Yani - MTP",
"Muhammad Yusuf - BJU",
"Muhammad yusuf - KMDI",
"Muhdi - KPLM",
"MUHIBIN - KMDI",
"MUHKLAS - KOPKARNAS",
"MUHLIS  - BJU",
"MUHLIS - BJU",
"MUHLISIN - ANG",
"MUJIKO INDRA PRASTIYO - KMDI",
"MUJIONO - PNJ",
"MUJIONO - TOPI",
"MUKHAMAD HADIYANTO - PAM",
"Mukhammad Imron Ali Aziz - BSP",
"MUKSIN - ACT",
"MULAKHIR - ACT",
"MULYANI BIN IMAN - TOPI",
"MULYATNO - PNJ",
"MUNIM - ANG",
"MURDIANTO - ZAB",
"MURSALIM - BJU",
"MURYANTO - PAM",
"MUSDI - ACT",
"MUSRIANDI - KMDI",
"MUSTAKIM - BJU",
"Mustakim - INL",
"Mustalif - ACM",
"MUSTOPA - TOPI",
"Nana Mulyana - ANG",
"Nana Mulyana - KPLM",
"NANA MULYANA - PNJ",
"NANANG APRIYADI - TOPI",
"NANANG ARYADI - PNJ",
"NANANG KOSIM - KMDI",
"NANANG KRISNA - TOPI",
"Nanang Suryana - KPLM",
"Nesarius Hutabarat - MTP",
"NGATNO - ACT",
"NONO SURYONO - KMDI",
"Nono Suryono - KPLM",
"NOPSINT ALBERT MARBUN  - ACT",
"Nor Kamali - MPC",
"Normin Noermala - KPLM",
"Not je Frenku joel - BJU",
"NOTJE FRENKY JOEL - BJU",
"Novan Firdaus - KPLM",
"Noviyanto - TRANSJAYA",
"Nur Heny - TRANSJAYA",
"NUR KHALIP - KMDI",
"NUR SETIO BUDI - ACT",
"NUR SOLEH - TOPI",
"NURASID - TOPI",
"Nurdin - KPLM",
"NURHILAL - ANG",
"NURIDAH - TOPI",
"NURJAYA - KMDI",
"NURKHOLIS - PAM",
"Nurmi Anjarrudy - TRANSJAYA",
"NUROHMAT - TOPI",
"NURSIDIK - PNJ",
"Nurwenda - BMU",
"NURYADI - KMDI",
"NURYAMAN Bin RIBAD - KMDI",
"NYOMIN - ACT",
"Odih - KPLM",
"Oi Juhroni - KPLM",
"OKA - KOPKARNAS",
"Oman - KPLM",
"OSEP NURKHOLIS - PAM",
"OTAN MOHUNE - LTS",
"PADLI - BJU",
"PAILASUF - KGM",
"Paino - MTP",
"PAIRUN - ACT",
"PALI MURNI - PNJ",
"PAMUNGKAS INDRA GUNAWAN - KOPKARNAS",
"Pandu - SELOG",
"PANTAS SILALAHI  - KPLM",
"PARJIONO - KOPKARNAS",
"PARMINTO - KOPKARNAS",
"Peri Andriani - KPLM",
"PRATISTA DEBY FRAYUDO - KMDI",
"PRAYITNO - ANG",
"PRAYOGA LESMANA - PAM",
"PREDI - TOPI",
"Priyano - UTI",
"PUJI ANDRIYANTO - ACT",
"Puji Purnawan - Dispatcher",
"PURNAMA GIRI - ANG",
"Purwanto - MTP",
"Putra Suhendra - MTP",
"QOSIM - MTP",
"R Yanoear Prasetijono - TRANSJAYA",
"RAFI JULIANSAH - KMDI",
"Rafi juliansyah ( KMDI ) - KMDI",
"Rafli akbar - BJU",
"RAHADIAN RACHMAD - KSL",
"Rahmad Cahyandi - Dispatcher",
"Rahmad hidayat - TAG",
"Rahmad Noor Sholeh - TJY",
"Rahmad Noor Sholeh - TRANSJAYA",
"Rahman - BJU",
"RAHMAN - PNJ",
"RAHMAN A - BJU",
"RAHMAT  - ACT",
"Rahmat - KPLM",
"RAHMAT AJI SUSENO - ACT",
"Rahmat Arip - KPLM",
"RAHMAT CANDRA PRATAMA - BJU",
"RAHMAT PKU - ACT",
"Rahmat Umbang Syamhari - TJY",
"Rahmat Umbang Syamhari - TRANSJAYA",
"Raimon  - KPLM",
"Raimon Panjaitan - KPLM",
"RAIS - HSP",
"RAJAB - TOPI",
"RAKHMAT HIDAYAT - TOPI",
"Rakim M. Suharja - AKS",
"Rakiwan - KPLM",
"RALDI RAKASIWI - ACT",
"Raldi Rakasiwi (ACT) - ACT",
"RAMADI - KSL",
"Ramadiansyah - ACT",
"Ramly munir - LTS",
"RAMOT LASROHA GULTOM - ACT",
"RANDI SETIAWAN - KGM",
"Rangga - KMDI",
"RANGGA GIRINDARA - KMDI",
"RASIM - ANG",
"RATONO - PAM",
"Ray agung pranata - BJU",
"Regen Andro Juanda S - KPLM",
"RELLY YANTO - ACT",
"RELLYANTO - ACT",
"Renold Andrian - KSL",
"RENOLD ANDRIAN - MPC",
"REZKINTAHIR - BJU",
"RIAN MARDIANSAH - PNJ",
"RIAN SYAFEI - ZAB",
"Rianda Syandi - SELOG",
"Richard MP Sitanggang - ACT",
"RICKY AGUSTRIA PAWIRA - KGM",
"RIDWAN - ACT",
"RIDWAN - HSP",
"RIDWAN FAUZI - KMDI",
"RIDWAN MAULANA - ANG",
"Rifal - BJU",
"RIKA INDRA - BJU",
"Riki Adrian - BJU",
"RIKI ARDIAN - BJU",
"RIKI HIDAYAT - ACT",
"RIKI JOHARIS - KMDI",
"RIKI RALIM - AKS",
"Riki Saepul Mahdi - KPLM",
"RIKY NURDIANSYAH - KMDI",
"RINALDI SURYANA - PAM",
"RINO - BJU",
"RIO DICKY MARDIANSYAH - ACT",
"RIO FEBRIYANTO - HSP",
"RIRIS SUTRIONO - MPC",
"Risal - BJU",
"RISALDI  - BJU",
"Risang Pendu Winata - TJY",
"Riskan - ACT",
"Riski - BJU",
"Riski Samsudin - TOPI",
"RISPANDI - PAM",
"Rivani Ridoni  - SELOG",
"RIYAN PERDIYANSA - KMDI",
"Riza wahyu saputra - JSS",
"Rizal - BJU",
"RIZAL HIDAYAT - HSP",
"Rizal Wardianto - BSP",
"Rizki Hidayat - ANG",
"Rizki Trimulya - SELOG",
"RIZKONI - BMT",
"Rizky hidayat - ANG",
"Rizky rakamanda  - MTP",
"RIZWAN ANASTAUFIK - PAM",
"Robert Sulaiman - MTP",
"ROCHIMIN - ACT",
"ROCHMANI - KMDI",
"RODIN - KMDI",
"ROHENDI - PAM",
"ROHIM - PAM",
"ROHIM - TOPI",
"ROHMAN KUKUH HIDAYAH - TAG",
"ROHYADI - ANG",
"ROHYADI (ANG) - ANG",
"ROJALI HIDAYAT - ACT",
"ROKADI - TOPI",
"RONA ANDIKA - ACT",
"Roni - BJU",
"Roni - KPLM",
"RONI HARDIANDI - ACT",
"Ropik - KPLM",
"ROSIKIN - TOPI",
"ROSMIN SUWINTO - KGM",
"ROSYID - KMDI",
"ROYADI - PAM",
"RUDDIN - INL",
"RUDI ADITIA - TOPI",
"RUDI HARTONO - ANG",
"Rudi Hartono - PAM",
"Rudi hartono - PARANI",
"Rudi Hermawan - KPLM",
"RUDI SURYANTO - KGM",
"Rujun - PAM",
"RUKISMAN - ANG",
"RUSDI - KMDI",
"RUSDI - KPLM",
"RUSDI - PAM",
"RUSDI - TOPI",
"Rusli - BJU",
"RUSLI ARI SAPUTRA - ACT",
"Rusli S - BJU",
"RUSLI. S - BJU",
"Rusmin - BJU",
"Rustang - BJU",
"SADJU AGUSTIONO - AKS",
"SAEFUL ANWAR - PAM",
"Saenal - BJU",
"Saepul Bahri - KPLM",
"Saepul Kohar - KPLM",
"SAFARI - KMDI",
"Safari ( KMDI) - KMDI",
"SAFI'I - KMDI",
"Safriadi - ACT",
"SAHIDIN - PNJ",
"Sahminan - MTP",
"SAHRU SIYAM - ANG",
"Sahrul  - BJU",
"SAHRUL - BJU",
"SAHRUL MUBAROK - KMDI",
"SAHRUL MUBAROK (KMDI ) - KMDI",
"SAIFUL - KSL",
"SAIFUL PARAMADINA - BMT",
"Saiful Rahmat - KPLM",
"saiful. - BOJ",
"SALAM MARSUDI - ZAB",
"SALEH - BJU",
"SAMAN - Dispatcher",
"Saman - KPLM",
"SAMBRI SANJAYA - ACT",
"SAMSUDIN - KMDI",
"Samsudin ( KMDI ) - KMDI",
"SAMSUL AFANDI - ACT",
"Samsul Anwar - KPLM",
"SAMSUL BAHRI - PNJ",
"SAMSURI - ACT",
"Samsurizal Eko Fahmiandi - TRANSJAYA",
"SAMUEL SITOMPUL - ACT",
"SANDI JUWIANSYAH - PNJ",
"SANDI SANAN - ACT",
"Sandi Supra Yogi  - KPLM",
"Sandy santoso - KMDI",
"SANING - ANG",
"Sanuri - KPLM",
"Sapaat - KPLM",
"Saparuddin - BJU",
"SAPRIANTO - ACT",
"SAPUTRA ERNANDA - ACT",
"SARIPIN - ANG",
"SARIPUDIN - ZAB",
"SARIPUDIN BIN KOAN - PNJ",
"SARIPULLAH - KSL",
"SARJIONO - PNJ",
"SARKO - ACT",
"Sarmin - BSP",
"SARMIN - INL",
"SARMIN - PAM",
"SARNAYO PUTRO - ACT",
"SARTONO - KMDI",
"Satria dimas anggara - ACT",
"SAWON - PAM",
"Sawon - PARANI",
"Sefi Wijayanto - BSP",
"SENDI HAKIM PURWANTO - TOPI",
"SEPTIAN ATMAJA - PAM",
"Setiawan - TJY",
"Setiawan - TRANSJAYA",
"Setya Pambudi - TRANSJAYA",
"SETYO BAYU TANTOKO - KOPKARNAS",
"SHOPIAN HADI - ACT",
"Sigit Eko Purwanto - BSP",
"Sinambel - ACT",
"Siprianus Tokuan - ALP",
"Sirajuddin - BJU",
"SIRAJUDDIN DG TINRI - BJU",
"Slamet - KPLM",
"SLAMET - PNJ",
"SLAMET PURWANTO - TOPI",
"SLAMET WARSITO - ACT",
"Slamet Widodo - BSP",
"Sodik Asror - Dispatcher",
"SODIKIN - HSP",
"Sofiyan  - TJY",
"Sofiyan - BSP",
"Sofyan - KPLM",
"Soleh - KPLM",
"Solekan - KMDI",
"Soleman - KPLM",
"Solikin - KPLM",
"Sonny Octaviano Derry A - TJY",
"SRIMULIADI  - SELOG",
"Suardi - BJU",
"SUBADRI - KMDI",
"SUBHAN - ACT",
"SUBUR PRIYONO - ACT",
"Subur priyono ( ACT ) - ACT",
"Sucipto - BJU",
"SUDADI - KMDI",
"SUDAKIM - TOPI",
"Sudarman - BJU",
"SUDARSONO - ANG",
"Sudirman - BJU",
"SUDORO - KMDI",
"Sugeng Hariyadi - TRANSJAYA",
"Sugeng pramono - ANG",
"SUGIANTO - BJU",
"SUGIANTO EFFENDI - KSL",
"SUGIARNO - HSP",
"SUGIONO CCR - ACT",
"Sugiyanto - ANG",
"SUHADI - ZAB",
"SUHANDI - KMDI",
"Suhandi ( KMDI) - KMDI",
"SUHARDI - ACT",
"SUHARDI - BJU",
"SUHARDI - TOPI",
"Suhardi ( ACT)  - ACT",
"Suhardiman - TRANSJAYA",
"SUHARTO - ANG",
"Suharto - MTP",
"SUHARTONO - ACT",
"Suhendar - KPLM",
"SUHENDRI - KMDI",
"SUHENDRIK - KMDI",
"SUHENDRIK - TOPI",
"Suheri - MTP",
"Suherna Mahpudin - KPLM",
"SUHIDI - PAM",
"Suit - KMDI",
"SUITMAN - BOJ",
"SUJADI - TOPI",
"Sukardi - KPLM",
"SUKARDJI - KMDI",
"SUKARYA - ACT",
"SUKENDI - TOPI",
"SUKOCO - KGM",
"SUKRISNA - ACT",
"SUKUR - PAM",
"Sukur - PARANI",
"SULAEMAN - TOPI",
"SULIS - TOPI",
"SULISTIO - TOPI",
"Sultan muhammad assarip - BJU",
"SUMA - TOPI",
"SUMANI - PAM",
"Sumardi - MTP",
"Sumartono - AKS",
"Sumispan - KMDI",
"Sunan Siregar - MTP",
"Sunanto - TOPI",
"Sunarno - TJY",
"Sunarno - TRANSJAYA",
"SUNARSO - TOPI",
"SUNARTO BIN SUTARJO - KMDI",
"Sunaryo - MTP",
"Supandi - KPLM",
"SUPANDI - TOPI",
"SUPARMAN - ANG",
"SUPARMAN - KMDI",
"SUPARMAN - TOPI",
"Supian noor - MPC",
"SUPRAWANTO - KMDI",
"Supriatin - MTP",
"SUPRIYANTO - INL",
"SUPRIYANTO - PAM",
"SUPRIYATNA  - ACT",
"SUPRIYATNA BP - TOPI",
"Supriyono - TRANSJAYA",
"SURAHMAN - TOPI",
"SURANA - TOPI",
"Surani - BSP",
"SURATIN - TOPI",
"SURATMAN - TOPI",
"Surip supary - KPLM",
"Surip Suparyadi - KPLM",
"SURONO - ACT",
"Suryadarma - BJU",
"SURYANI - ACT",
"Susi Tri Antono - BSP",
"sutadji - KSL",
"SUTANTO - KOPKARNAS",
"SUTIKNO - ANG",
"SUTOPO - TOPI",
"SUTRISNO A - TOPI",
"SUTRISNO B - TOPI",
"SUTRISNO Bin CARKIYAN - KMDI",
"SUWAJI - KMDI",
"Suwandi - BJU",
"SUWANDI B - ACT",
"Suwanta - KPLM",
"Suwardi - BJU",
"Suyadi - TRANSJAYA",
"SUYANI - ACT",
"Suyani ( ACT ) - ACT",
"SUYATNO - ACT",
"Suyono - BSP",
"SUYONO - KMDI",
"Suyud indra surya - KMDI",
"Syafrijon - ACM",
"Syahril Anuggra Firdaus - KPLM",
"Syamsu Dhuha S - BJU",
"Syamsu Dhuha Siala - BJU",
"Syamsuddin - BJU",
"Syamsul Bachtiar Hendrawan - KPLM",
"Syamsul Bahri - ACM",
"Syarif - BJU",
"Syarif Riyan Alidrus - ALP",
"SYARIFUDDIN - KMDI",
"SYARIPUDIN B. DAVID - TOPI",
"SYECH ABUDIN - ACT",
"SYEFI'IR CHOIRUL MILDA - KMDI",
"Syolikin - AKS",
"T Aulia adha - SELOG",
"T.raymond - ACT",
"TAMMU - BJU",
"TAMSIR RIFAI - KMDI",
"TANDI bin WALIM - KMDI",
"Tapsir - INL",
"TARIPAN - PAM",
"TARJONO - KMDI",
"TARJUNI - TOPI",
"TARNA SUTARNA - ACT",
"TARSIMIN - PAM",
"TARYANA - TOPI",
"TATANG - TOPI",
"TAUFIK HIDAYAT - TOPI",
"Teguh Hendriana - KPLM",
"Teguh Heri Purnomo - TJY",
"Teguh Heri Purnomo - TRANSJAYA",
"TEGUH PRAYOGI - MTP",
"Teguh Triyino ( ACT) - ACT",
"TEGUH TRIYONO - ACT",
"TEGUH WARDOYO  - ACT",
"THANTO ADITYA - TAG",
"THANTO ADTYA P - TAG",
"TINTON ASIL TANDOH - KSL",
"TIOPAN LIMBONG - PAM",
"TIPANI - TOPI",
"Tirto Roso Raharjo - BSP",
"TOIB - ANG",
"TOIB RIANTO - AKS",
"Toidi B Sutardi - INL",
"Toni cahyadi - ACT",
"TORO MARGEN - ACT",
"TOTOK BUDIHARTO - ACT",
"TOTOK INDARTO - KOPKARNAS",
"Totok Sugiarto - TRANSJAYA",
"TOYIB - TOPI",
"TREE AL VARIC - TOPI",
"Tree Al Varic Setyo Nugroho - KPLM",
"TRI AGUS SUYONO - KMDI",
"Tri Gonggo - MTP",
"TRI GONGGO SAPTA PUTRA - MTP",
"TRI GUNAWAN - TOPI",
"TRI HANDOKO - TAG",
"Tri Jaya - KPLM",
"TRI JAYA - TOPI",
"Tri Mulyanto - BSP",
"TRI SEPTIADI - TAG",
"TRIO LUROYO - ANG",
"TRIYONO - ACT",
"Triyono - TJY",
"Tubagus hariyono - KMDI",
"Tukiran - KMDI",
"Tukiyo - BSP",
"TUNGGUL HARIONO - ANG",
"UDIN BOLED - TOPI",
"Ujang kuswara - ACT",
"UJANG SAEPUDIN - ANG",
"UJANG SURATMAN BIN PANTA - ACT",
"Ukon - KPLM",
"Umin - KPLM",
"UNDANG BIN AMING - ACT",
"Untung waluyo - ACT",
"USEP SAEPUDIN - ACT",
"USIN MADIUSIN - ACT",
"USMAN - KSL",
"Utomo Prasetyo - TJY",
"VOLDY SEPTI BONA GULTOM - ACT",
"WAGINO - ACT",
"WAGIONO - ACT",
"WAHID NURHASYIM - TOPI",
"WAHIDIN  - ACT",
"WAHIDIN - TOPI",
"Wahyono - TJY",
"Wahyono - TRANSJAYA",
"WAHYU - ACT",
"WAHYU - PAM",
"WAHYUDI - PNJ",
"Wahyudin - BJU",
"WAHYUDIN - PNJ",
"WAHYUDIN - TOPI",
"WAISAL AMRI - TOPI",
"WAJDI - ANG",
"WANDI SUWANDI - PNJ",
"WANTO - TOPI",
"WANTOSO - PAM",
"Waram - INL",
"WARDIONO - ACT",
"WARMAN - UTI",
"WARSONO - TOPI",
"WARTONO - ANG",
"Wartono - BSP",
"WARTONO BIN RANDEG - TOPI",
"Waryanto - BSP",
"Waryono - TOPI",
"WARYONO KLEMUD - TOPI",
"WASDANA - TOPI",
"Wasito - ACT",
"WASITO UTOMO - ACT",
"WASKADI - TOPI",
"WASKIM - PAM",
"WAWAN - ACT",
"WAWAN - PNJ",
"WAWAN CASILAH - KMDI",
"WAWAN DASWAN - KMDI",
"WAWAN ROKHIM - KMDI",
"WAWAN SETIONO - ANG",
"WAWAN SETIONO - TOPI",
"WAWAN SUSANTO - KOPKARNAS",
"WENDI - ANG",
"WENDRA - PNJ",
"Wenslaus Lassi - ALP",
"WEWEN S - ZAB",
"Wibowo - ALP",
"WIHARJI - HSP",
"WIMPI - PNJ",
"WIRANTO SIHOMBING  - KPLM",
"WIRNATA - KMDI",
"WIWIL IRWAN - UTI",
"WIWIN HERMAWAN - BJU",
"WIWIN SAPUTRA  - BJU",
"YAHDI JEMRIZAL - PNJ",
"Yana Mulyana - KPLM",
"Yana Mulyana ( KPLM ) - KPLM",
"Yance Pompayo - UTI",
"YANDHI SATYA UTAMA - BMT",
"YANTOKO - KMDI",
"Yanuar Eko Saputro - TJY",
"Yanuar Eko Saputro - TRANSJAYA",
"YAYAN SUPRIATNA - ANG",
"YELI HALIM - TOPI",
"YOGI  - BOJ",
"Yogi Patra - BOJ",
"YOGI PATRA - KSL",
"Yohanes Banase - ALP",
"YOHVIADRI - UTI",
"YONY YUZANAS - ACT",
"Yudi Afriansyah  - MTP",
"YUDI DADING KALBUADI - ACT",
"YUDI SULISTIYO - PAM",
"Yudi sulistiyo - PARANI",
"YUDI WAHYUDI - ANG",
"YUDI. A - MTP",
"YUDIS HARTANTO - TOPI",
"YUDIYANTO - ACT",
"Yufbri Novialdi - MTP",
"YULIANTO - ACT",
"Yulianto - KSL",
"YUNUS - TOPI",
"Yusran - BJU",
"YUSRI  - TOPI",
"Yusri - ACT",
"Yusuf Lubis - MTP",
"YUSUF MAULANA - KMDI",
"Yusuf Maulana - KPLM",
"YUSUF PRANATA - PNJ",
"YUSUP ANWAR - TOPI",
"YUWANDA - PNJ",
"Zaenal Abidin - AKS",
"Zaiful - ACM",
"ZAINAL ABIDIN - ANG",
"ZAKY ANWAR SYARIFUDIN - PAM",
"Zasuli - KMDI",
"Zulfadli - ACT",
"ZULFAHMI - ACT",
"ZULFIDAR - ACT",
"ZULFIKAR - ACT",
"ZULKARNAIN - PAM",
"ZULKIFLI - MPC",
"Zulpana - KPLM"
];

const BANK = [
{id: 1, question: "Anda mengemudikan truk dan menemukan rambu STOP di persimpangan yang sepi. Apa tindakan yang benar?", choices: ["Memperlambat kendaraan lalu lanjut jalan","Berhenti penuh lalu memastikan kondisi aman","Membunyikan klakson dan melanjutkan","Menambah kecepatan agar cepat melewati persimpangan",], answer: 1,},
{id: 2, question: "Marka garis utuh tunggal di tengah jalan menunjukkan bahwa pengemudi:", choices: ["Boleh mendahului kapan saja","Boleh berpindah jalur jika jalan kosong","Tidak boleh melintasi garis untuk mendahului","Wajib berpindah jalur",], answer: 2,},
{id: 3, question: "Rambu batas kecepatan maksimum 60 km/jam berarti:", choices: ["Kendaraan harus tepat 60 km/jam","Kecepatan tidak boleh melebihi 60 km/jam","Kecepatan minimal 60 km/jam","Hanya berlaku malam hari",], answer: 1,},
{id: 4, question: "Saat melihat rambu 'Dilarang Masuk', tindakan yang benar adalah:", choices: ["Masuk jika jalan terlihat kosong","Masuk jika sedang terburu-buru","Mencari jalur alternatif","Meminta kendaraan lain memberi jalan",], answer: 2,},
{id: 5, question: "Fungsi utama marka zebra cross adalah:", choices: ["Area parkir sementara","Tempat pejalan kaki menyeberang","Jalur sepeda","Tempat berhenti kendaraan",], answer: 1,},
{id: 6, question: "Lampu lalu lintas kuning menyala sebelum garis berhenti. Tindakan terbaik adalah:", choices: ["Mempercepat kendaraan","Berhenti jika memungkinkan dengan aman","Membelok ke kiri","Membunyikan klakson",], answer: 1,},
{id: 7, question: "Marka kuning zig-zag di dekat sekolah menunjukkan:", choices: ["Area putar balik","Area yang harus dilalui cepat","Area yang memerlukan kewaspadaan tinggi","Jalur khusus logistik",], answer: 2,},
{id: 8, question: "Rambu segitiga merah umumnya menunjukkan:", choices: ["Perintah","Larangan","Peringatan bahaya","Informasi",], answer: 2,},
{id: 9, question: "Ketika melihat rambu jalan licin, pengemudi harus:", choices: ["Menambah kecepatan","Mengurangi kewaspadaan","Mengurangi kecepatan dan menjaga jarak","Mendahului kendaraan lain",], answer: 2,},
{id: 10, question: "Marka panah lurus pada lajur menunjukkan bahwa kendaraan:", choices: ["Harus lurus mengikuti arah panah","Boleh berbelok ke segala arah","Wajib berhenti","Wajib berpindah jalur",], answer: 0,},
{id: 11, question: "Rambu bundaran mengharuskan pengemudi:", choices: ["Berhenti total di tengah bundaran","Mengikuti arus bundaran sesuai arah","Mendahului kendaraan lain","Membunyikan klakson terus-menerus",], answer: 1,},
{id: 12, question: "Dua garis utuh sejajar di tengah jalan berarti:", choices: ["Mendahului diperbolehkan","Berhenti diperbolehkan","Tidak boleh melintas atau mendahului","Jalur kendaraan besar",], answer: 2,},
{id: 13, question: "Saat menemukan rambu tanjakan curam, pengemudi truk harus:", choices: ["Menggunakan gigi yang sesuai","Mematikan lampu","Menambah muatan","Mematikan rem tambahan",], answer: 0,},
{id: 14, question: "Marka garis putus-putus menunjukkan bahwa:", choices: ["Perpindahan jalur diperbolehkan dengan aman","Dilarang berpindah jalur","Kendaraan harus berhenti","Jalur khusus darurat",], answer: 0,},
{id: 15, question: "Rambu larangan parkir berarti:", choices: ["Kendaraan boleh berhenti sebentar","Kendaraan boleh parkir jika darurat","Kendaraan tidak boleh parkir di area tersebut","Kendaraan wajib parkir",], answer: 2,},
{id: 16, question: "Saat melihat rambu penyempitan jalan, pengemudi harus:", choices: ["Menambah kecepatan","Mempersiapkan pengurangan kecepatan","Menyalip kendaraan lain","Mengaktifkan lampu hazard terus menerus",], answer: 1,},
{id: 17, question: "Rambu tikungan tajam menandakan:", choices: ["Jalan lurus panjang","Jalan menurun","Perlunya mengurangi kecepatan","Area berhenti",], answer: 2,},
{id: 18, question: "Marka kotak kuning di persimpangan berarti:", choices: ["Kendaraan boleh berhenti di dalam kotak","Area harus tetap kosong saat macet","Area parkir resmi","Jalur kendaraan besar",], answer: 1,},
{id: 19, question: "Rambu jalan menurun panjang mengharuskan pengemudi:", choices: ["Mengandalkan rem terus-menerus","Menggunakan gigi rendah secara tepat","Mematikan mesin","Menambah kecepatan",], answer: 1,},
{id: 20, question: "Warna dasar rambu larangan umumnya adalah:", choices: ["Merah","Hijau","Biru","Cokelat",], answer: 0,},
{id: 21, question: "Marka tepi jalan berfungsi untuk:", choices: ["Menentukan batas jalur kendaraan","Area parkir liar","Tempat berhenti bus","Jalur pejalan kaki",], answer: 0,},
{id: 22, question: "Saat melihat rambu pekerjaan jalan, pengemudi harus:", choices: ["Menambah kecepatan","Tidak memperhatikan kondisi sekitar","Meningkatkan kewaspadaan","Mendahului semua kendaraan",], answer: 2,},
{id: 23, question: "Rambu U-turn diperbolehkan menunjukkan:", choices: ["Pengemudi boleh memutar arah di lokasi tersebut","Dilarang berhenti","Wajib lurus","Wajib ke kanan",], answer: 0,},
{id: 24, question: "Marka chevron pada jalan tol digunakan untuk:", choices: ["Menunjukkan jarak aman antar kendaraan","Tempat parkir","Jalur khusus motor","Area penyeberangan",], answer: 0,},
{id: 25, question: "Ketika rambu dan kebiasaan pengguna jalan bertentangan, yang harus dipatuhi adalah:", choices: ["Kendaraan terbesar","Mayoritas pengemudi","Rambu dan aturan lalu lintas","Kendaraan paling cepat",], answer: 2,},
{id: 26, question: "Sebelum memulai perjalanan, pemeriksaan yang paling penting dilakukan pengemudi adalah:", choices: ["Memastikan warna kendaraan masih bagus","Memeriksa rem, ban, lampu, dan kelengkapan kendaraan","Membersihkan dashboard terlebih dahulu","Mengisi bahan bakar setelah barang dikirim",], answer: 1,},
{id: 27, question: "Saat jarak pandang terganggu karena hujan lebat, tindakan terbaik adalah:", choices: ["Menambah kecepatan agar cepat sampai","Menyalakan lampu utama dan mengurangi kecepatan","Menyalakan lampu hazard selama berkendara normal","Mengikuti kendaraan depan dari jarak dekat",], answer: 1,},
{id: 28, question: "Penggunaan sabuk pengaman bertujuan untuk:", choices: ["Meningkatkan konsumsi bahan bakar","Menambah kenyamanan duduk","Mengurangi risiko cedera saat kecelakaan","Mengurangi suara bising di kabin",], answer: 2,},
{id: 29, question: "Saat mengemudi truk bermuatan penuh, jarak pengereman akan:", choices: ["Lebih pendek","Tetap sama","Lebih panjang","Tidak dipengaruhi muatan",], answer: 2,},
{id: 30, question: "Ketika merasa mengantuk saat mengemudi, tindakan yang paling tepat adalah:", choices: ["Membuka jendela dan melanjutkan perjalanan","Memaksakan diri sampai tujuan","Beristirahat di tempat yang aman","Menambah kecepatan agar cepat selesai",], answer: 2,},
{id: 31, question: "Fungsi menjaga jarak aman dengan kendaraan di depan adalah:", choices: ["Menghemat bahan bakar","Memberi waktu reaksi saat terjadi bahaya","Mempermudah menyalip","Mengurangi penggunaan rem parkir",], answer: 1,},
{id: 32, question: "Saat ban pecah ketika kendaraan melaju, pengemudi sebaiknya:", choices: ["Mengerem mendadak","Membanting setir ke bahu jalan","Memegang kemudi dengan stabil dan mengurangi kecepatan bertahap","Mematikan mesin",], answer: 2,},
{id: 33, question: "Menggunakan telepon genggam saat mengemudi dapat menyebabkan:", choices: ["Meningkatkan fokus","Mengurangi risiko kecelakaan","Gangguan konsentrasi dan peningkatan risiko kecelakaan","Konsumsi bahan bakar lebih hemat",], answer: 2,},
{id: 34, question: "Ketika mendekati area sekolah pada jam masuk sekolah, pengemudi harus:", choices: ["Mempercepat kendaraan","Meningkatkan kewaspadaan dan mengurangi kecepatan","Membunyikan klakson terus-menerus","Menyalip kendaraan lain",], answer: 1,},
{id: 35, question: "Jika lampu rem kendaraan tidak berfungsi, pengemudi harus:", choices: ["Tetap beroperasi seperti biasa","Menunggu laporan dari kendaraan lain","Memperbaikinya sebelum perjalanan dilanjutkan","Hanya berkendara pada siang hari",], answer: 2,},
{id: 36, question: "Saat berkendara di jalan menurun panjang, cara yang benar adalah:", choices: ["Menggunakan gigi rendah yang sesuai","Menekan rem terus-menerus","Mematikan mesin","Menginjak kopling sepanjang jalan",], answer: 0,},
{id: 37, question: "Salah satu tanda rem mengalami masalah adalah:", choices: ["Suara berisik atau jarak pengereman bertambah","Lampu utama menyala terang","Mesin lebih halus","Konsumsi BBM menurun",], answer: 0,},
{id: 38, question: "Dalam berkendara defensif, pengemudi harus:", choices: ["Selalu mendahului kendaraan lain","Mengantisipasi kemungkinan kesalahan pengguna jalan lain","Mengandalkan klakson","Fokus hanya pada kendaraan di depan",], answer: 1,},
{id: 39, question: "Saat membawa muatan, pengemudi wajib memastikan bahwa:", choices: ["Muatan ditata dan diikat dengan aman","Muatan mudah diambil selama perjalanan","Muatan berada di satu sisi kendaraan","Muatan tidak perlu diperiksa",], answer: 0,},
{id: 40, question: "Jika terjadi kecelakaan ringan tanpa korban, langkah awal yang tepat adalah:", choices: ["Meninggalkan lokasi","Menyalahkan pihak lain","Mengamankan lokasi dan melaporkan kejadian sesuai prosedur","Memindahkan kendaraan tanpa dokumentasi",], answer: 2,},
{id: 41, question: "Fungsi kaca spion adalah:", choices: ["Memantau kondisi sekitar kendaraan","Mengurangi kecepatan kendaraan","Menambah tenaga mesin","Menstabilkan suspensi",], answer: 0,},
{id: 42, question: "Ketika berkendara malam hari, pengemudi harus:", choices: ["Mengurangi perhatian pada spion","Meningkatkan kewaspadaan terhadap kondisi jalan","Menggunakan lampu jauh setiap saat","Mengurangi jarak aman",], answer: 1,},
{id: 43, question: "Kendaraan yang melebihi kapasitas muatan berisiko:", choices: ["Lebih hemat bahan bakar","Lebih stabil saat menikung","Merusak kendaraan dan meningkatkan risiko kecelakaan","Mempercepat perjalanan",], answer: 2,},
{id: 44, question: "Sebelum berpindah jalur, pengemudi harus:", choices: ["Langsung membelok","Membunyikan klakson panjang","Memeriksa spion dan menyalakan lampu sein","Mempercepat kendaraan",], answer: 2,},
{id: 45, question: "Kepatuhan terhadap batas kecepatan bertujuan:", choices: ["Mengurangi keselamatan","Mengurangi risiko kecelakaan dan menjaga ketertiban lalu lintas","Memperlambat distribusi barang","Mengurangi umur kendaraan",], answer: 1,},
{id: 46, question: "Jika kendaraan mengalami gangguan teknis di jalan tol, tindakan yang benar adalah:", choices: ["Berhenti di lajur kanan","Menyalakan lampu hazard dan menuju bahu jalan jika memungkinkan","Tetap melaju sampai kendaraan berhenti sendiri","Membuka pintu kabin",], answer: 1,},
{id: 47, question: "Saat memasuki tikungan tajam, pengemudi sebaiknya:", choices: ["Mengurangi kecepatan sebelum tikungan","Mengerem keras di tengah tikungan","Menambah kecepatan","Menggunakan klakson terus menerus",], answer: 0,},
{id: 48, question: "Pengemudi profesional harus mematuhi aturan jam kerja karena:", choices: ["Mengurangi kelelahan dan risiko kecelakaan","Menambah konsumsi BBM","Mengurangi kapasitas kendaraan","Mempercepat keausan kendaraan",], answer: 0,},
{id: 49, question: "Dalam kondisi kabut tebal, pengemudi harus:", choices: ["Menambah kecepatan","Menyalakan lampu yang sesuai dan menjaga jarak aman","Menonaktifkan lampu kendaraan","Mengikuti kendaraan depan dari jarak sangat dekat",], answer: 1,},
{id: 50, question: "Jika menemukan pejalan kaki akan menyeberang di zebra cross, pengemudi harus:", choices: ["Tetap melaju","Membunyikan klakson keras","Memberikan kesempatan pejalan kaki menyeberang dengan aman","Mendahului kendaraan lain",], answer: 2,},
{id: 51, question: "Tentukan angka berikutnya pada deret: 2, 4, 6, 8, ...", choices: ["9","10","12","14",], answer: 1,},
{id: 52, question: "Tentukan angka berikutnya pada deret: 5, 10, 15, 20, ...", choices: ["22","24","25","30",], answer: 2,},
{id: 53, question: "Berapakah hasil dari 15 + 28?", choices: ["41","42","43","44",], answer: 2,},
{id: 54, question: "Kata manakah yang berbeda dari kelompok berikut?", choices: ["Truk","Bus","Sepeda Motor","Gudang",], answer: 3,},
{id: 55, question: "Jika semua dokumen pengiriman harus ditandatangani sebelum berangkat, dan surat jalan belum ditandatangani, maka:", choices: ["Kendaraan tetap berangkat","Surat jalan tidak perlu diperiksa","Proses belum memenuhi syarat keberangkatan","Dokumen dapat diabaikan",], answer: 2,},
{id: 56, question: "Tentukan angka berikutnya: 3, 6, 9, 12, ...", choices: ["13","14","15","16",], answer: 2,},
{id: 57, question: "Manakah penulisan yang benar?", choices: ["Keselamattan","Keselamatan","Keselamatann","Keslamatan",], answer: 1,},
{id: 58, question: "Jika nomor kendaraan adalah B 1234 XYZ, karakter ke-6 adalah:", choices: ["3","4","X","Y",], answer: 1,},
{id: 59, question: "Berapakah hasil dari 75 - 18?", choices: ["55","56","57","58",], answer: 2,},
{id: 60, question: "Perhatikan urutan huruf: A, C, E, G, ...", choices: ["H","I","J","K",], answer: 1,},
{id: 61, question: "Kata yang paling mirip dengan 'teliti' adalah:", choices: ["Ceroboh","Hati-hati","Lambat","Keras",], answer: 1,},
{id: 62, question: "Jika pengiriman dijadwalkan pukul 08.00 dan memerlukan waktu 3 jam, maka estimasi tiba adalah:", choices: ["10.00","11.00","12.00","13.00",], answer: 1,},
{id: 63, question: "Berapakah hasil 8 × 7?", choices: ["54","55","56","57",], answer: 2,},
{id: 64, question: "Pilih kelompok angka yang berbeda:", choices: ["12, 24, 36","15, 30, 45","18, 36, 54","17, 31, 46",], answer: 3,},
{id: 65, question: "Jika sebuah dokumen memiliki 12 halaman dan diperiksa 3 halaman setiap 5 menit, waktu yang dibutuhkan adalah:", choices: ["15 menit","20 menit","25 menit","30 menit",], answer: 1,},
{id: 66, question: "Berapakah hasil dari 100 ÷ 4?", choices: ["20","25","30","35",], answer: 1,},
{id: 67, question: "Manakah yang memiliki ejaan benar?", choices: ["Pengiriman","Pengirriman","Pengriman","Penggiriman",], answer: 0,},
{id: 68, question: "Tentukan angka berikutnya: 10, 20, 30, 40, ...", choices: ["45","48","50","55",], answer: 2,},
{id: 69, question: "Jika ada 5 kendaraan dan masing-masing membawa 8 palet, jumlah seluruh palet adalah:", choices: ["35","38","40","45",], answer: 2,},
{id: 70, question: "Kata 'muatan' berhubungan dengan:", choices: ["Jalan","Kendaraan","Gedung","Cuaca",], answer: 1,},
{id: 71, question: "Berapakah hasil dari 48 + 27?", choices: ["73","74","75","76",], answer: 2,},
{id: 72, question: "Pilih angka yang tidak sesuai:", choices: ["4","8","12","11",], answer: 3,},
{id: 73, question: "Jika suatu rute berjarak 120 km dan kendaraan telah menempuh 90 km, sisa jarak adalah:", choices: ["20 km","25 km","30 km","35 km",], answer: 2,},
{id: 74, question: "Huruf keempat dari kata 'KESELAMATAN' adalah:", choices: ["E","S","L","A",], answer: 0,},
{id: 75, question: "Perhatikan deret: 7, 14, 21, 28, ...", choices: ["32","34","35","36",], answer: 2,},
{id: 76, question: "Saat menghadapi kemacetan panjang yang berpotensi menyebabkan keterlambatan pengiriman, tindakan terbaik adalah:", choices: ["Meninggalkan kendaraan","Tetap tenang dan menginformasikan kondisi kepada atasan atau dispatcher","Membunyikan klakson terus-menerus","Mengemudi melalui bahu jalan",], answer: 1,},
{id: 77, question: "Ketika pelanggan marah karena keterlambatan yang disebabkan kondisi cuaca, Anda sebaiknya:", choices: ["Membalas dengan nada tinggi","Mengabaikan pelanggan","Menjelaskan situasi secara profesional dan sopan","Menyalahkan perusahaan",], answer: 2,},
{id: 78, question: "Saat menemukan rute yang biasanya lancar ternyata ditutup, keputusan terbaik adalah:", choices: ["Berhenti bekerja hari itu","Mencari jalur alternatif yang aman dan sesuai aturan","Menerobos jalan yang ditutup","Menunggu tanpa mencari informasi",], answer: 1,},
{id: 79, question: "Jika atasan memberi tugas tambahan saat Anda sedang sibuk, langkah pertama adalah:", choices: ["Menolak tanpa penjelasan","Mengeluh kepada rekan kerja","Menilai prioritas pekerjaan dan berkomunikasi dengan atasan","Mengabaikan tugas baru",], answer: 2,},
{id: 80, question: "Ketika terjadi kesalahan administrasi pengiriman yang bukan disebabkan Anda, tindakan terbaik adalah:", choices: ["Menyalahkan rekan kerja di depan umum","Membantu menyelesaikan masalah dan melaporkannya sesuai prosedur","Membiarkan masalah selesai sendiri","Menolak terlibat",], answer: 1,},
{id: 81, question: "Saat menerima instruksi yang kurang jelas, Anda sebaiknya:", choices: ["Menafsirkan sendiri tanpa bertanya","Menunda pekerjaan","Meminta klarifikasi sebelum menjalankan tugas","Menyerahkan kepada orang lain",], answer: 2,},
{id: 82, question: "Dalam situasi darurat di jalan, pengemudi profesional perlu:", choices: ["Panik agar cepat bertindak","Menjaga ketenangan dan mengikuti prosedur keselamatan","Menunggu instruksi tanpa melakukan apa pun","Mengikuti tindakan pengguna jalan lain",], answer: 1,},
{id: 83, question: "Ketika menghadapi target pengiriman yang ketat, Anda harus:", choices: ["Melanggar batas kecepatan","Mengabaikan waktu istirahat","Tetap mematuhi aturan keselamatan dan mengelola waktu dengan baik","Mengurangi pemeriksaan kendaraan",], answer: 2,},
{id: 84, question: "Jika terjadi perbedaan pendapat dengan petugas gudang, langkah yang paling tepat adalah:", choices: ["Berdebat hingga menang","Menghindari komunikasi","Mencari solusi melalui komunikasi yang profesional","Langsung melapor tanpa diskusi",], answer: 2,},
{id: 85, question: "Saat mengalami tekanan akibat banyak pekerjaan, cara yang paling efektif adalah:", choices: ["Menunda semua pekerjaan","Membuat prioritas dan menyelesaikannya secara bertahap","Menyalahkan orang lain","Mengabaikan tenggat waktu",], answer: 1,},
{id: 86, question: "Jika kendaraan mengalami kerusakan ringan saat perjalanan, keputusan pertama yang harus dilakukan adalah:", choices: ["Memaksakan kendaraan terus berjalan tanpa pemeriksaan","Mengamankan kendaraan dan menilai tingkat risiko","Membongkar muatan di pinggir jalan","Meninggalkan kendaraan",], answer: 1,},
{id: 87, question: "Ketika menerima kritik dari atasan, sikap yang paling profesional adalah:", choices: ["Membalas kritik tersebut","Mengabaikannya","Mendengarkan dan menjadikannya bahan perbaikan","Menyalahkan kondisi kerja",], answer: 2,},
{id: 88, question: "Jika rekan kerja melakukan kesalahan yang berdampak pada tim, tindakan terbaik adalah:", choices: ["Mempermalukannya di depan tim","Membantu mencari solusi dan menyampaikan masukan secara profesional","Menyebarkan kesalahannya ke rekan lain","Tidak peduli",], answer: 1,},
{id: 89, question: "Saat menghadapi pelanggan yang sangat emosional, Anda perlu:", choices: ["Meniru emosi pelanggan","Tetap tenang dan fokus pada penyelesaian masalah","Memutus komunikasi","Membiarkan pelanggan tanpa tanggapan",], answer: 1,},
{id: 90, question: "Jika harus memilih antara kecepatan dan keselamatan dalam pengiriman, yang harus diprioritaskan adalah:", choices: ["Kecepatan","Keselamatan","Keuntungan perusahaan","Kenyamanan pribadi",], answer: 1,},
{id: 91, question: "Ketika menemukan informasi yang saling bertentangan mengenai lokasi tujuan, Anda sebaiknya:", choices: ["Memilih secara acak","Bertanya kepada pihak yang berwenang atau memverifikasi data","Menghentikan pekerjaan","Mengikuti pendapat teman",], answer: 1,},
{id: 92, question: "Saat menghadapi masalah yang belum pernah ditemui sebelumnya, langkah terbaik adalah:", choices: ["Bertindak tanpa berpikir","Menolak menangani masalah","Mengumpulkan informasi dan mengevaluasi pilihan yang ada","Menunggu masalah selesai sendiri",], answer: 2,},
{id: 93, question: "Jika jadwal berubah mendadak, sikap yang tepat adalah:", choices: ["Menolak perubahan","Beradaptasi dan menyusun rencana baru","Menghentikan seluruh pekerjaan","Menyalahkan pihak yang membuat jadwal",], answer: 1,},
{id: 94, question: "Ketika kondisi jalan memburuk akibat cuaca ekstrem, keputusan yang benar adalah:", choices: ["Tetap berkendara seperti biasa","Menambah kecepatan agar cepat selesai","Menyesuaikan kecepatan dan meningkatkan kewaspadaan","Mematikan lampu kendaraan",], answer: 2,},
{id: 95, question: "Saat terjadi konflik kecil antarrekan kerja di lokasi kerja, tindakan terbaik adalah:", choices: ["Memperbesar konflik","Mengambil keuntungan dari situasi","Mendorong penyelesaian secara profesional dan objektif","Memihak salah satu pihak tanpa fakta",], answer: 2,},
{id: 96, question: "Jika Anda merasa lelah secara mental selama perjalanan panjang, sebaiknya:", choices: ["Tetap memaksa diri bekerja","Beristirahat sesuai ketentuan yang berlaku","Menambah kecepatan agar cepat selesai","Mengonsumsi minuman energi secara berlebihan",], answer: 1,},
{id: 97, question: "Dalam pengambilan keputusan, data yang akurat penting karena:", choices: ["Membuat keputusan lebih objektif dan tepat","Mengurangi pekerjaan","Membuat pekerjaan lebih lama","Tidak berpengaruh",], answer: 0,},
{id: 98, question: "Saat terjadi kesalahan pengiriman, langkah pertama yang paling tepat adalah:", choices: ["Menutupi kesalahan tersebut","Melaporkan dan membantu memperbaikinya","Menyalahkan pihak lain","Mengabaikannya",], answer: 1,},
{id: 99, question: "Jika menghadapi dua tugas penting secara bersamaan, Anda sebaiknya:", choices: ["Mengerjakan yang paling mudah terlebih dahulu tanpa pertimbangan","Menentukan prioritas berdasarkan urgensi dan dampaknya","Menunda keduanya","Memilih secara acak",], answer: 1,},
{id: 100, question: "Seorang driver profesional yang baik ketika menghadapi tekanan tinggi akan:", choices: ["Tetap tenang, berpikir logis, dan mengutamakan keselamatan","Bertindak terburu-buru","Mengabaikan prosedur","Menyalahkan kondisi sekitar",], answer: 0,},

];

function randomFive() {
  const shuffledQuestions = [...BANK];

  for (
    let currentIndex = shuffledQuestions.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (currentIndex + 1)
    );

    [
      shuffledQuestions[currentIndex],
      shuffledQuestions[randomIndex],
    ] = [
      shuffledQuestions[randomIndex],
      shuffledQuestions[currentIndex],
    ];
  }

  return shuffledQuestions.slice(0, 5);
}

function createSubmissionId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `quiz-${Date.now()}`;
}
function splitUserAndCarrier(userValue) {
  const separatorIndex =
    userValue.lastIndexOf(" - ");

  if (separatorIndex === -1) {
    return {
      participantName: userValue.trim(),
      carrier: ""
    };
  }

  return {
    participantName: userValue
      .slice(0, separatorIndex)
      .trim(),

    carrier: userValue
      .slice(separatorIndex + 3)
      .trim()
  };
}

export default function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [wrongAttempts, setWrongAttempts] = useState({});
  const [wrongChoices, setWrongChoices] = useState({});

  const [startedAt, setStartedAt] = useState("");
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] =
  useState(false);

  const [submitError, setSubmitError] =
  useState("");

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return USERS.filter((name) =>
      name.toLowerCase().includes(keyword)
    );
  }, [search]);

  const currentQuestion = questions[questionIndex];
  const hasStarted = questions.length > 0;

  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      const selectedAnswer = answers[question.id];
      const isCorrect = selectedAnswer === question.answer;

      return total + (isCorrect ? 1 : 0);
    }, 0);
  }, [questions, answers]);

  const totalWrongAttempts = useMemo(() => {
    return Object.values(wrongAttempts).reduce(
      (total, amount) => total + amount,
      0
    );
  }, [wrongAttempts]);

  function selectUser(name) {
    setUser(name);
    setSearch(name);
    setDropdownOpen(false);
  }

  function startQuiz() {
    if (!user || !USERS.includes(user)) {
      return;
    }

    const selectedQuestions = randomFive();

    setQuestions(selectedQuestions);
    setQuestionIndex(0);
    setAnswers({});
    setWrongAttempts({});
    setWrongChoices({});
    setStartedAt(new Date().toISOString());
    setFinished(false);
    setResult(null);
  }

  function selectAnswer(choiceIndex) {
    const question = questions[questionIndex];

    if (!question) {
      return;
    }

    const answerIsCorrect = choiceIndex === question.answer;
    const questionWrongChoices =
      wrongChoices[question.id] || [];

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.id]: choiceIndex,
    }));

    if (
      !answerIsCorrect &&
      !questionWrongChoices.includes(choiceIndex)
    ) {
      setWrongAttempts((previousAttempts) => ({
        ...previousAttempts,
        [question.id]:
          (previousAttempts[question.id] || 0) + 1,
      }));

      setWrongChoices((previousWrongChoices) => ({
        ...previousWrongChoices,
        [question.id]: [
          ...(previousWrongChoices[question.id] || []),
          choiceIndex,
        ],
      }));
    }
  }

  function isCurrentAnswerCorrect() {
    const question = questions[questionIndex];

    if (!question) {
      return false;
    }

    return answers[question.id] === question.answer;
  }

  function goToPreviousQuestion() {
    if (questionIndex === 0) {
      return;
    }

    setQuestionIndex(
      (previousIndex) => previousIndex - 1
    );
  }

  function goToNextQuestion() {
    if (!isCurrentAnswerCorrect()) {
      return;
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(
        (previousIndex) => previousIndex + 1
      );
    }
  }

async function submitQuiz() {
  if (
    !isCurrentAnswerCorrect() ||
    isSubmitting
  ) {
    return;
  }

  setIsSubmitting(true);
  setSubmitError("");

  const submittedAt =
    new Date().toISOString();

  const startedTime =
    new Date(startedAt).getTime();

  const submittedTime =
    new Date(submittedAt).getTime();

  const durationSeconds = Math.max(
    0,
    Math.round(
      (submittedTime - startedTime) / 1000
    )
  );

  const {
    participantName,
    carrier
  } = splitUserAndCarrier(user);

  const quizResult = {
    submissionId: createSubmissionId(),
    user: participantName,
    carrier,
    startedAt,
    submittedAt,
    durationSeconds,
    score,
    totalQuestions: questions.length,
    wrongAttempts: totalWrongAttempts,
    status: "Selesai",
    answers: questions.map((question) => ({
      questionId: question.id,
      question: question.question,
      selectedAnswer:
        question.choices[
          answers[question.id]
        ],
      correctAnswer:
        question.choices[
          question.answer
        ],
      correct:
        answers[question.id] ===
        question.answer,
      wrongAttempts:
        wrongAttempts[question.id] || 0
    }))
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },
      body: JSON.stringify(quizResult)
    });

    try {
      const storedResults =
        localStorage.getItem("quizResults");

      const previousResults =
        storedResults
          ? JSON.parse(storedResults)
          : [];

      localStorage.setItem(
        "quizResults",
        JSON.stringify([
          ...previousResults,
          quizResult
        ])
      );
    } catch (localError) {
      console.warn(
        "Backup lokal tidak tersedia:",
        localError
      );
    }

    setResult(quizResult);
    setFinished(true);
  } catch (error) {
    console.error(
      "Pengiriman hasil gagal:",
      error
    );

    setSubmitError(
      "Hasil belum berhasil dikirim. Periksa koneksi internet, kemudian coba kembali."
    );
  } finally {
    setIsSubmitting(false);
  }
}

  function resetQuiz() {
    setSearch("");
    setUser("");
    setDropdownOpen(false);
    setQuestions([]);
    setQuestionIndex(0);
    setAnswers({});
    setWrongAttempts({});
    setWrongChoices({});
    setStartedAt("");
    setFinished(false);
    setResult(null);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-2xl">
        <header className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-3xl font-bold text-white shadow-lg">
            ?
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Quiz Pengetahuan Umum
          </h1>

          <p className="mt-3 text-slate-500">
            5 pertanyaan acak dari {BANK.length} pertanyaan
          </p>
        </header>

        <section className="rounded-3xl bg-white p-6 shadow-xl sm:p-9">
          {!hasStarted && !finished && (
            <div className="space-y-5">
              <div className="relative">
                <label
                  htmlFor="user-search"
                  className="mb-2 block text-sm font-semibold"
                >
                  Pilih user
                </label>

                <input
                  id="user-search"
                  type="text"
                  autoComplete="off"
                  value={search}
                  placeholder="Cari nama user..."
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  onFocus={() => {
                    if (!user) {
                      setDropdownOpen(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setDropdownOpen(false);
                    }, 150);
                  }}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setUser("");
                    setDropdownOpen(true);
                  }}
                />

                {dropdownOpen && (
                  <div className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((name) => (
                        <button
                          type="button"
                          key={name}
                          className="block w-full rounded-lg px-4 py-3 text-left transition hover:bg-indigo-50 hover:text-indigo-700"
                          onMouseDown={(event) => {
                            event.preventDefault();
                            selectUser(name);
                          }}
                        >
                          {name}
                        </button>
                      ))
                    ) : (
                      <p className="p-3 text-sm text-slate-500">
                        User tidak ditemukan.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {user && (
                <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
                  User terpilih: <strong>{user}</strong>
                </div>
              )}

              <button
                type="button"
                disabled={!user}
                onClick={startQuiz}
                className="h-12 w-full rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                Mulai Quiz
              </button>

              <p className="text-center text-xs text-slate-400">
                Hanya user yang sudah terdaftar yang dapat
                mengikuti quiz.
              </p>
            </div>
          )}

          {hasStarted &&
            !finished &&
            currentQuestion && (
              <div>
                <div className="mb-3 text-sm text-slate-500">
                  Peserta: <strong>{user}</strong>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm font-semibold text-indigo-700">
                  <span>
                    Pertanyaan {questionIndex + 1} dari{" "}
                    {questions.length}
                  </span>

                  <span>
                    {Math.round(
                      ((questionIndex + 1) /
                        questions.length) *
                        100
                    )}
                    %
                  </span>
                </div>

                <div className="mb-7 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                    style={{
                      width: `${
                        ((questionIndex + 1) /
                          questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <h2 className="mb-6 text-xl font-bold leading-relaxed">
                  {currentQuestion.question}
                </h2>

                <div className="grid gap-3">
                  {currentQuestion.choices.map(
                    (choice, choiceIndex) => {
                      const selected =
                        answers[currentQuestion.id] ===
                        choiceIndex;

                      const correct =
                        choiceIndex ===
                        currentQuestion.answer;

                      let choiceClass =
                        "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50";

                      if (selected && correct) {
                        choiceClass =
                          "border-emerald-600 bg-emerald-50 text-emerald-800";
                      }

                      if (selected && !correct) {
                        choiceClass =
                          "border-red-500 bg-red-50 text-red-800";
                      }

                      return (
                        <button
                          type="button"
                          key={choice}
                          onClick={() =>
                            selectAnswer(choiceIndex)
                          }
                          className={`rounded-xl border-2 p-4 text-left transition ${choiceClass}`}
                        >
                          <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">
                            {String.fromCharCode(
                              65 + choiceIndex
                            )}
                          </span>

                          {choice}
                        </button>
                      );
                    }
                  )}
                </div>

                {answers[currentQuestion.id] !==
                  undefined && (
                  <div
                    className={`mt-5 rounded-xl p-4 text-sm font-semibold ${
                      isCurrentAnswerCorrect()
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {isCurrentAnswerCorrect()
                      ? "Jawaban benar. Silakan lanjut ke pertanyaan berikutnya."
                      : "Jawaban belum tepat. Silakan pilih jawaban lain sampai benar."}
                  </div>
                )}

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    disabled={questionIndex === 0}
                    onClick={goToPreviousQuestion}
                    className="h-11 flex-1 rounded-xl border border-slate-300 font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Kembali
                  </button>

                  {questionIndex <
                  questions.length - 1 ? (
                    <button
                      type="button"
                      disabled={
                        !isCurrentAnswerCorrect()
                      }
                      onClick={goToNextQuestion}
                      className="h-11 flex-1 rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                    >
                      Berikutnya
                    </button>
                  ) : (
                    <button
                    type="button"
                    disabled={
                    !isCurrentAnswerCorrect() ||
                    isSubmitting
                    }
                    onClick={submitQuiz}
                    className="h-11 flex-1 rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                    >
                    {isSubmitting
                    ? "Menyimpan..."
                    : "Kirim Jawaban"}
                    </button>
                  )}
                  </div>
                  {submitError && (
  <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
    {submitError}
  </div>
)}
                
              </div>
            )}

          {finished && result && (
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600">
                OK
              </div>

              <p className="text-slate-500">
                Terima kasih, {result.user}
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                Quiz Selesai
              </h2>

              <div className="my-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-indigo-50 p-5">
                  <p className="text-sm text-indigo-600">
                    Jawaban benar
                  </p>

                  <p className="mt-1 text-3xl font-bold text-indigo-800">
                    {result.score}/{result.totalQuestions}
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5">
                  <p className="text-sm text-amber-700">
                    Percobaan salah
                  </p>

                  <p className="mt-1 text-3xl font-bold text-amber-800">
                    {result.wrongAttempts}
                  </p>
                </div>
              </div>

              <p className="mb-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                Hasil quiz telah disimpan sementara di browser.
                Integrasi Excel OneDrive akan ditambahkan pada
                tahap berikutnya.
              </p>

              <button
                type="button"
                onClick={resetQuiz}
                className="h-12 w-full rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700"
              >
                Selesai dan Kembali
              </button>
            </div>
          )}
        </section>

        <p className="mt-5 text-center text-xs text-slate-400">
          Daftar user dan pertanyaan dapat diperbarui sesuai
          database perusahaan.
        </p>
      </div>
    </main>
  );
}