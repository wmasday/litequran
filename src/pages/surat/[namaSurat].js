import fs from 'fs';
import path from 'path';
import process from 'process';
import { useRouter } from "next/router";
import { NextSeo } from 'next-seo';
import style from '@/styles/index.module.css'
import Link from 'next/link';

function SuratDetail(props) {
    const { surat, detail } = props;

    if (!surat) { // Handle If Data Cannot Be Founded
        return <p>Loading ...</p>;
    }

    return (
        <div className='container'>
            <NextSeo
                title={"LiteQuran NextJS | Surat " + surat.surat}
                description="LiteQuran.net Rebuild With NextJS"
            />

            <h1 className={style['fw-700'] + ' text-center mt-5'}>Surat {surat.surat}</h1>
            <div className='row justify-content-center'>
                <div className='col-sm-3 text-center'>
                    <div className={style['anchor'] + ' badge bg-light text-secondary mx-1 px-3'}>{detail.length} Ayat</div>
                </div>
            </div>

            <section className='mt-5 container'>
                {detail.map((data, key) =>
                    <div className='border-bottom pb-5 pt-5' key={key}>
                        <div className={style['ayat'] + ' btn btn-dark rounded-0 mb-5'}>{key + 1}</div>
                        <div className={style['arabic'] + ' float-end top-0'}>{data.arabic}</div>
                        <br />
                        <div className={style['translate'] + ' mb-3'}>{data.translate}</div>
                        <div className={style['meaning']}>{data.meaning}</div>
                    </div>
                )}
            </section>

            <Link href='../../' className={style['btn-back'] + ' btn btn-light bg-white text-secondary mt-3 mb-5'}>Kembali</Link>
        </div>
    );
}

async function getData(jsonfile = '') {
    const openfile = jsonfile == '' ? 'surat.json' : jsonfile;
    const filePath = path.join(process.cwd(), 'json', openfile);
    const file = await fs.readFileSync(filePath);
    const data = JSON.parse(file);

    return data;
}


export async function getStaticProps(context) {
    const { params } = context;
    const namaSurat = params.namaSurat;

    const data = await getData();
    const dataSurat = data.find(singleSurat => singleSurat.surat === namaSurat);

    if (!dataSurat) { // Handle If Data Cannot Be Founded
        return {
            notFound: true
        }
    }

    const detailSurat = await getData(dataSurat.json);

    return {
        props: {
            surat: dataSurat,
            detail: detailSurat
        }
    }
}

export async function getStaticPaths() {
    const data = await getData();
    const params = data.map((surat) => ({ params: { namaSurat: surat.surat } }))
    return {
        paths: params,
        fallback: true // Default true, false, 'blocking'
    }
}

export default SuratDetail;