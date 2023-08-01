import fs from 'fs';
import path from 'path';
import process from 'process';
import { useState, useEffect } from 'react';
import style from '@/styles/index.module.css'

function Home(props) {
  const { surat } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = event => {
    setSearchTerm(event.target.value);
  };

  const dataSurat = !searchTerm ? surat : surat.filter(surat => surat.surat.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

  return (
    <main className='container'>
      <h1 className={style['fw-700'] + ' text-center mt-5'}>LiteQuran | NextJS</h1>
      <div className='row justify-content-center'>
        <div className='col-sm-3 text-center'>
          <a className={style['anchor'] + ' badge bg-dark mx-1'} href='https://litequran.net/'>LiteQuran.net</a>
          <a className={style['anchor'] + ' badge bg-light text-secondary mx-1'} href='https://github.com/withmasday'>Rebuild By Withmasday</a>
        </div>
      </div>

      <form className='row justify-content-center mt-5'>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='Search' value={searchTerm} onChange={searchHandler} />
        </div>
      </form>

      <section className='row justify-content-center mt-5 container'>
        {dataSurat.map((data, key) =>
          <div className={style['gradient'] + ' col-sm-3 m-1 mb-3 p-3 text-center'} key={key}>
            <h4 className={style['name']}>
              <a href={'/surat/' + data.surat} className={style['anchor-surat'] + ' text-secondary'}>{data.surat}</a>
            </h4>
          </div>
        )}
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'json', 'surat.json');
  const data = await fs.readFileSync(filePath);
  const surat = JSON.parse(data);
  return {
    props: {
      surat: surat
    },
    // Refresh Data On Production Mode In 10s
    // revalidate: 10

    // Handle Not Found Page
    // notFound: true
  }
}

export default Home;